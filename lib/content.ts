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

    const data = (await res.json()) as ContentData;
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
