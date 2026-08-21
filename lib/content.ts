import { list, put } from "@vercel/blob";
import { ContentData } from "./types";
import { SEED_CONTENT } from "./seed-content";

// ---------------------------------------------------------------------------
// Fuente de verdad del contenido del sitio: un único JSON guardado en
// Vercel Blob. getContent() lo lee (con un fallback a los datos semilla si
// Blob no está configurado todavía o el archivo no existe aún).
// saveContent() lo sobreescribe — la usa exclusivamente el panel /admin.
// ---------------------------------------------------------------------------

const CONTENT_PATHNAME = "content/data.json";

let memoryCache: { data: ContentData; expiresAt: number } | null = null;
const CACHE_MS = 3000;

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/**
 * El contenido guardado en Blob puede ser de antes de que el sitio fuera
 * bilingüe (role/description/bio como string simple en vez de {es,en}).
 * Esto normaliza esos campos "legacy" duplicando el valor viejo en ambos
 * idiomas, para que el contenido ya cargado por Leandro no desaparezca al
 * activar el selector de idioma — sigue viéndose (en español) hasta que
 * cargue la traducción en inglés desde /admin.
 */
function localize(value: unknown): { es: string; en: string } | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return { es: value, en: value };
  const obj = value as { es?: unknown; en?: unknown };
  if (typeof obj.es === "string" || typeof obj.en === "string") {
    const es = typeof obj.es === "string" ? obj.es : "";
    const en = typeof obj.en === "string" ? obj.en : "";
    return { es: es || en, en: en || es };
  }
  return undefined;
}

function localizeParagraphs(value: unknown): { es: string[]; en: string[] } {
  if (Array.isArray(value)) return { es: value, en: value };
  const obj = value as { es?: unknown; en?: unknown } | undefined;
  const es = Array.isArray(obj?.es) ? (obj!.es as string[]) : [];
  const en = Array.isArray(obj?.en) ? (obj!.en as string[]) : [];
  return { es: es.length ? es : en, en: en.length ? en : es };
}

function normalizeContent(data: ContentData): ContentData {
  data.site.role = localize(data.site.role) ?? { es: "", en: "" };
  data.site.bio = localizeParagraphs(data.site.bio);
  for (const collection of data.collections) {
    collection.role = localize(collection.role);
    collection.description = localize(collection.description);
  }
  for (const project of data.projects) {
    project.description = localize(project.description);
  }
  return data;
}

export async function getContent(): Promise<ContentData> {
  if (memoryCache && memoryCache.expiresAt > Date.now()) {
    return memoryCache.data;
  }

  if (!hasBlobToken()) {
    return SEED_CONTENT;
  }

  try {
    const { blobs } = await list({ prefix: CONTENT_PATHNAME, limit: 1 });
    const blob = blobs.find((b) => b.pathname === CONTENT_PATHNAME);
    if (!blob) return SEED_CONTENT;

    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return SEED_CONTENT;

    const raw = (await res.json()) as ContentData;
    const data = normalizeContent(raw);
    memoryCache = { data, expiresAt: Date.now() + CACHE_MS };
    return data;
  } catch {
    return SEED_CONTENT;
  }
}

export async function saveContent(data: ContentData): Promise<void> {
  if (!hasBlobToken()) {
    throw new Error(
      "Vercel Blob no está configurado (falta la variable de entorno BLOB_READ_WRITE_TOKEN)."
    );
  }

  await put(CONTENT_PATHNAME, JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  memoryCache = null;
}
