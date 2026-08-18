"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getContent, saveContent } from "@/lib/content";
import { uploadMedia } from "@/lib/media";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { MediaItem, Project } from "@/lib/types";

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
    content.site.role = textField(formData, "role") ?? content.site.role;
    content.site.email = textField(formData, "email") ?? content.site.email;
    content.site.instagram = textField(formData, "instagram");
    content.site.linkedin = textField(formData, "linkedin");
    content.site.whatsapp = textField(formData, "whatsapp");

    const bioRaw = formData.get("bio");
    if (typeof bioRaw === "string") {
      content.site.bio = bioRaw
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);
    }

    await saveContent(content);
  }, "/admin/site?error=save");

  revalidatePublicPages();
  redirect("/admin/site?saved=1");
}

export async function uploadSitePhoto(formData: FormData) {
  await requireAdmin();
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) {
    redirect("/admin/site?error=nofile");
  }

  await runOrRedirect(async () => {
    const content = await getContent();
    const url = await uploadMedia(file, "site");
    const previousAlt = content.site.photo?.alt ?? content.site.name;
    content.site.photo = { src: url, alt: previousAlt };
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
    collection.role = textField(formData, "role");
    collection.description = textField(formData, "description");

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
      description: textField(formData, "description"),
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
    project.description = textField(formData, "description");
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
// Media de un proyecto (portada, video, galería, proceso, resultado)
// ---------------------------------------------------------------------------

type SingleMediaField = "coverImage" | "heroVideo";
type ListMediaField = "images" | "process" | "results";

async function findProject(collection: string, slug: string) {
  const content = await getContent();
  const project = content.projects.find(
    (p) => p.collection === collection && p.slug === slug
  );
  if (!project) throw new Error("Proyecto no encontrado.");
  return { content, project };
}

export async function uploadSingleMedia(formData: FormData) {
  await requireAdmin();
  const collection = textField(formData, "collection")!;
  const slug = textField(formData, "slug")!;
  const field = textField(formData, "field") as SingleMediaField;
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    redirect(`/admin/projects/${collection}/${slug}?error=nofile`);
  }

  await runOrRedirect(async () => {
    const { content, project } = await findProject(collection, slug);
    const url = await uploadMedia(file, `${collection}/${slug}`);
    const isVideo = file.type.startsWith("video/");

    project[field] = {
      src: url,
      type: isVideo ? "video" : "image",
      alt: project.title,
    } satisfies MediaItem;

    await saveContent(content);
  }, `/admin/projects/${collection}/${slug}?error=save`);

  revalidatePublicPages();
  redirect(`/admin/projects/${collection}/${slug}?saved=1`);
}

export async function addListMedia(formData: FormData) {
  await requireAdmin();
  const collection = textField(formData, "collection")!;
  const slug = textField(formData, "slug")!;
  const field = textField(formData, "field") as ListMediaField;
  const files = formData.getAll("files").filter((f) => f instanceof File) as File[];

  const usableFiles = files.filter((f) => f.size > 0);
  if (usableFiles.length === 0) {
    redirect(`/admin/projects/${collection}/${slug}?error=nofile`);
  }

  await runOrRedirect(async () => {
    const { content, project } = await findProject(collection, slug);
    const existing = project[field] ?? [];

    const uploaded: MediaItem[] = [];
    for (const file of usableFiles) {
      const url = await uploadMedia(file, `${collection}/${slug}`);
      uploaded.push({
        src: url,
        type: file.type.startsWith("video/") ? "video" : "image",
        alt: project.title,
      });
    }

    project[field] = [...existing, ...uploaded];
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
