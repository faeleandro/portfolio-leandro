"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getContent, saveContent } from "@/lib/content";
import { compressUploadedBlob } from "@/lib/media";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { Localized, MediaItem, Project } from "@/lib/types";

function revalidatePublicPages() {
  revalidatePath("/", "layout");
}

function textField(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function listField(formData: FormData, name: string): string[] {
  const raw = textField(formData, name);
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Lee un par de campos "<name>_es" / "<name>_en" del formulario. Si falta
 * uno de los dos, usa el otro como respaldo (para no dejar el sitio con un
 * idioma vacío si Leandro todavía no cargó la traducción).
 */
function localizedField(formData: FormData, name: string): Localized<string> | undefined {
  const es = textField(formData, `${name}_es`) ?? "";
  const en = textField(formData, `${name}_en`) ?? "";
  if (!es && !en) return undefined;
  return { es: es || en, en: en || es };
}

/** Igual que localizedField, pero para textareas de párrafos (bio). */
function localizedParagraphs(formData: FormData, name: string): Localized<string[]> {
  const split = (raw: string) =>
    raw
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

  const esRaw = formData.get(`${name}_es`);
  const enRaw = formData.get(`${name}_en`);
  const es = typeof esRaw === "string" ? split(esRaw) : [];
  const en = typeof enRaw === "string" ? split(enRaw) : [];
  return { es: es.length ? es : en, en: en.length ? en : es };
}

/**
 * Corre una operación riesgosa (habla con Vercel Blob) y, si falla, redirige
 * a errorPath en vez de dejar que Next.js muestre una pantalla de error
 * cruda. redirect() en sí lanza internamente — eso no lo capturamos acá
 * porque solo se llama dentro del catch, nunca envuelto en otro try.
 */
async function runOrRedirect<T>(work: () => Promise<T>, errorPath: string): Promise<T> {
  try {
    return await work();
  } catch (err) {
    console.error(err);
    redirect(errorPath);
  }
}

// ---------------------------------------------------------------------------
// Sitio (datos generales + bio)
// ---------------------------------------------------------------------------

export async function saveSite(formData: FormData) {
  await requireAdmin();

  await runOrRedirect(async () => {
    const content = await getContent();

    content.site.name = textField(formData, "name") ?? content.site.name;
    content.site.handle = textField(formData, "handle") ?? content.site.handle;
    content.site.role = localizedField(formData, "role") ?? content.site.role;
    content.site.email = textField(formData, "email") ?? content.site.email;
    content.site.instagram = textField(formData, "instagram");
    content.site.linkedin = textField(formData, "linkedin");
    content.site.whatsapp = textField(formData, "whatsapp");
    content.site.bio = localizedParagraphs(formData, "bio");

    await saveContent(content);
  }, "/admin/site?error=save");

  revalidatePublicPages();
  redirect("/admin/site?saved=1");
}

// ---------------------------------------------------------------------------
// Colecciones (las 4 etapas)
// ---------------------------------------------------------------------------

export async function saveCollection(formData: FormData) {
  await requireAdmin();
  const slug = textField(formData, "slug");
  if (!slug) redirect("/admin?error=missing");

  await runOrRedirect(async () => {
    const content = await getContent();
    const collection = content.collections.find((c) => c.slug === slug);
    if (!collection) redirect("/admin?error=notfound");

    collection.title = textField(formData, "title") ?? collection.title;
    collection.role = localizedField(formData, "role");
    collection.description = localizedField(formData, "description");

    await saveContent(content);
  }, "/admin?error=save");

  revalidatePublicPages();
  redirect("/admin?saved=1");
}

// ---------------------------------------------------------------------------
// Proyectos
// ---------------------------------------------------------------------------

function uniqueSlug(base: string, collectionSlug: string, projects: Project[]) {
  let candidate = base || "proyecto";
  let i = 2;
  while (
    projects.some((p) => p.collection === collectionSlug && p.slug === candidate)
  ) {
    candidate = `${base}-${i}`;
    i += 1;
  }
  return candidate;
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const collection = textField(formData, "collection");
  const title = textField(formData, "title");
  if (!collection || !title) {
    redirect("/admin/projects/new?error=missing");
  }

  const slug = await runOrRedirect(async () => {
    const content = await getContent();
    const slug = uniqueSlug(slugify(title), collection, content.projects);

    const newProject: Project = {
      slug,
      collection,
      title,
      client: textField(formData, "client") ?? title,
      category: listField(formData, "category"),
      description: localizedField(formData, "description"),
    };

    content.projects.push(newProject);
    await saveContent(content);
    return slug;
  }, "/admin/projects/new?error=save");

  revalidatePublicPages();
  redirect(`/admin/projects/${collection}/${slug}?created=1`);
}

export async function saveProjectDetails(formData: FormData) {
  await requireAdmin();
  const collection = textField(formData, "collection");
  const slug = textField(formData, "slug");
  if (!collection || !slug) redirect("/admin?error=missing");

  await runOrRedirect(async () => {
    const content = await getContent();
    const project = content.projects.find(
      (p) => p.collection === collection && p.slug === slug
    );
    if (!project) redirect("/admin?error=notfound");

    project.title = textField(formData, "title") ?? project.title;
    project.client = textField(formData, "client");
    project.year = textField(formData, "year");
    project.category = listField(formData, "category");
    project.services = listField(formData, "services");
    project.description = localizedField(formData, "description");
    project.website = textField(formData, "website");
    project.instagram = textField(formData, "instagram");

    await saveContent(content);
  }, `/admin/projects/${collection}/${slug}?error=save`);

  revalidatePublicPages();
  redirect(`/admin/projects/${collection}/${slug}?saved=1`);
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const collection = textField(formData, "collection");
  const slug = textField(formData, "slug");
  if (!collection || !slug) redirect("/admin?error=missing");

  await runOrRedirect(async () => {
    const content = await getContent();
    content.projects = content.projects.filter(
      (p) => !(p.collection === collection && p.slug === slug)
    );
    await saveContent(content);
  }, "/admin?error=save");

  revalidatePublicPages();
  redirect("/admin?deleted=1");
}

// ---------------------------------------------------------------------------
// Media (portada, video, galería, proceso, resultado, foto de sitio)
//
// El archivo se sube directo del navegador a Vercel Blob (ver
// app/api/blob-upload/route.ts) — así no hay límite de tamaño. Estas
// acciones reciben la URL cruda ya subida, la comprimen (foto o video) y
// actualizan el contenido del sitio.
// ---------------------------------------------------------------------------

export type SingleMediaField = "coverImage" | "heroVideo";
export type ListMediaField = "images" | "process" | "results";

async function findProject(collection: string, slug: string) {
  const content = await getContent();
  const project = content.projects.find(
    (p) => p.collection === collection && p.slug === slug
  );
  if (!project) throw new Error("Proyecto no encontrado.");
  return { content, project };
}

export async function finalizeSitePhoto(
  rawUrl: string,
  originalName: string,
  contentType: string
) {
  await requireAdmin();
  const content = await getContent();
  const { url } = await compressUploadedBlob(rawUrl, "site", originalName, contentType);
  const previousAlt = content.site.photo?.alt ?? content.site.name;
  content.site.photo = { src: url, alt: previousAlt };
  await saveContent(content);
  revalidatePublicPages();
  return { url };
}

export async function finalizeSingleMedia(
  collection: string,
  slug: string,
  field: SingleMediaField,
  rawUrl: string,
  originalName: string,
  contentType: string
) {
  await requireAdmin();
  const { content, project } = await findProject(collection, slug);
  const { url, type } = await compressUploadedBlob(
    rawUrl,
    `${collection}/${slug}`,
    originalName,
    contentType
  );
  project[field] = { src: url, type, alt: project.title } satisfies MediaItem;
  await saveContent(content);
  revalidatePublicPages();
  return { url };
}

export async function finalizeListMedia(
  collection: string,
  slug: string,
  field: ListMediaField,
  uploads: { rawUrl: string; originalName: string; contentType: string }[]
) {
  await requireAdmin();
  const { content, project } = await findProject(collection, slug);
  const existing = project[field] ?? [];

  const added: MediaItem[] = [];
  for (const u of uploads) {
    const { url, type } = await compressUploadedBlob(
      u.rawUrl,
      `${collection}/${slug}`,
      u.originalName,
      u.contentType
    );
    added.push({ src: url, type, alt: project.title });
  }

  project[field] = [...existing, ...added];
  await saveContent(content);
  revalidatePublicPages();
  return { count: added.length };
}

export async function removeSingleMedia(formData: FormData) {
  await requireAdmin();
  const collection = textField(formData, "collection")!;
  const slug = textField(formData, "slug")!;
  const field = textField(formData, "field") as SingleMediaField;

  await runOrRedirect(async () => {
    const { content, project } = await findProject(collection, slug);
    delete project[field];
    await saveContent(content);
  }, `/admin/projects/${collection}/${slug}?error=save`);

  revalidatePublicPages();
  redirect(`/admin/projects/${collection}/${slug}?saved=1`);
}

export async function removeListMedia(formData: FormData) {
  await requireAdmin();
  const collection = textField(formData, "collection")!;
  const slug = textField(formData, "slug")!;
  const field = textField(formData, "field") as ListMediaField;
  const index = Number(formData.get("index"));

  await runOrRedirect(async () => {
    const { content, project } = await findProject(collection, slug);
    const items = project[field] ?? [];
    project[field] = items.filter((_, i) => i !== index);
    await saveContent(content);
  }, `/admin/projects/${collection}/${slug}?error=save`);

  revalidatePublicPages();
  redirect(`/admin/projects/${collection}/${slug}?saved=1`);
}
