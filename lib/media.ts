import { put, del } from "@vercel/blob";
import sharp from "sharp";
import { execFile } from "child_process";
import { promisify } from "util";
import { writeFile, readFile, unlink, mkdtemp, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import ffmpegPath from "ffmpeg-static";

const execFileAsync = promisify(execFile);

const MAX_IMAGE_DIMENSION = 2000;
const JPEG_QUALITY = 82;
const MAX_VIDEO_DIMENSION = 1920;

/**
 * Comprime un video con ffmpeg preservando buena calidad visual:
 * - Achica solo si supera 1920px en el lado más largo (nunca agranda).
 * - CRF 20 (H.264): visualmente muy cercano al original, bien liviano.
 * - +faststart: permite reproducir mientras carga en vez de esperar todo
 *   el archivo.
 */
async function compressVideoBuffer(buffer: Buffer): Promise<Buffer> {
  if (!ffmpegPath) {
    throw new Error("ffmpeg no está disponible en este entorno.");
  }

  const dir = await mkdtemp(join(tmpdir(), "video-"));
  const inPath = join(dir, "in.mp4");
  const outPath = join(dir, "out.mp4");

  try {
    await writeFile(inPath, buffer);

    await execFileAsync(ffmpegPath, [
      "-y",
      "-i",
      inPath,
      "-vf",
      `scale=w='min(${MAX_VIDEO_DIMENSION},iw)':h='min(${MAX_VIDEO_DIMENSION},ih)':force_original_aspect_ratio=decrease:force_divisible_by=2`,
      "-c:v",
      "libx264",
      "-preset",
      "faster",
      "-crf",
      "20",
      "-c:a",
      "aac",
      "-b:a",
      "160k",
      "-movflags",
      "+faststart",
      outPath,
    ]);

    return await readFile(outPath);
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

function safeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .toLowerCase();
}

/**
 * Toma un archivo YA subido a Blob (por el cliente, directo desde el
 * navegador — así no hay límite de tamaño) y lo reemplaza por una versión
 * comprimida en el mismo storage. Si la compresión de video falla por
 * cualquier motivo, se conserva el archivo original subido en vez de
 * perder la carga del usuario.
 */
export async function compressUploadedBlob(
  rawUrl: string,
  folder: string,
  originalName: string,
  contentType: string
): Promise<{ url: string; type: "image" | "video" }> {
  const isImage = contentType.startsWith("image/");
  const isVideo = contentType.startsWith("video/");
  const base = safeName(originalName);

  const res = await fetch(rawUrl);
  if (!res.ok) throw new Error("No se pudo leer el archivo recién subido.");
  const buffer = Buffer.from(await res.arrayBuffer());

  if (isImage) {
    const optimized = await sharp(buffer)
      .rotate()
      .resize({
        width: MAX_IMAGE_DIMENSION,
        height: MAX_IMAGE_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();

    const blob = await put(`work/${folder}/${Date.now()}-${base}.jpg`, optimized, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: false,
    });

    await del(rawUrl).catch(() => {});
    return { url: blob.url, type: "image" };
  }

  if (isVideo) {
    try {
      const compressed = await compressVideoBuffer(buffer);
      const blob = await put(`work/${folder}/${Date.now()}-${base}.mp4`, compressed, {
        access: "public",
        contentType: "video/mp4",
        addRandomSuffix: false,
      });
      await del(rawUrl).catch(() => {});
      return { url: blob.url, type: "video" };
    } catch (err) {
      // No perdemos la carga del usuario si la compresión falla (video
      // muy pesado, timeout, etc.) — se queda con el original ya subido.
      console.error("No se pudo comprimir el video, se usa el original:", err);
      return { url: rawUrl, type: "video" };
    }
  }

  return { url: rawUrl, type: "image" };
}
