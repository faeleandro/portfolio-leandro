import { put } from "@vercel/blob";
import sharp from "sharp";

const MAX_DIMENSION = 2000;
const JPEG_QUALITY = 82;

/**
 * Sube un archivo (foto/video) a Vercel Blob y devuelve su URL pública.
 * Las fotos se redimensionan y comprimen automáticamente (fotos de cámara
 * o celular sin optimizar pueden pesar 20-40MB — eso rompe la performance
 * del sitio y satura el storage). Los videos se suben tal cual.
 */
export async function uploadMedia(file: File, folder: string): Promise<string> {
  const isImage = file.type.startsWith("image/");

  const safeBaseName = file.name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\.[^.]+$/, "") // saca la extensión original
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .toLowerCase();

  if (isImage) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const optimized = await sharp(buffer)
      .rotate() // respeta la orientación EXIF antes de recomprimir
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();

    const pathname = `work/${folder}/${Date.now()}-${safeBaseName}.jpg`;
    const blob = await put(pathname, optimized, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: false,
    });
    return blob.url;
  }

  const extension = file.name.split(".").pop() || "mp4";
  const pathname = `work/${folder}/${Date.now()}-${safeBaseName}.${extension}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
  });
  return blob.url;
}
