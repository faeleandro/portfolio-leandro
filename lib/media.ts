import { put, del } from "@vercel/blob";
import sharp, { type ResizeOptions } from "sharp";
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
// Tamaño de referencia para "Historia" (formato vertical de Instagram
// Stories, 9:16).
const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;

export type MediaFormat = "estandar" | "historia";

/**
 * Comprime un video con ffmpeg preservando buena calidad visual:
 * - Formato "estandar": achica solo si supera 1920px en el lado más largo
 *   (nunca agranda), conserva el encuadre y orientación originales.
 * - Formato "historia": recorta al centro a 1080x1920 (9:16 vertical, como
 *   Instagram Stories), sea cual sea la orientación original.
 * - CRF 20 (H.264): visualmente muy cercano al original, bien liviano.
 * - +faststart: permite reproducir mientras carga en vez de esperar todo
 *   el archivo.
 */
async function compressVideoBuffer(buffer: Buffer, format: MediaFormat): Promise<Buffer> {
  if (!ffmpegPath) {
    throw new Error("ffmpeg no está disponible en este entorno.");
  }

  const dir = await mkdtemp(join(tmpdir(), "video-"));
  const inPath = join(dir, "in.mp4");
  const outPath = join(dir, "out.mp4");

  const scaleFilter =
    format === "historia"
      ? `scale=${STORY_WIDTH}:${STORY_HEIGHT}:force_original_aspect_ratio=increase,crop=${STORY_WIDTH}:${STORY_HEIGHT}`
      : `scale=w='min(${MAX_VIDEO_DIMENSION},iw)':h='min(${MAX_VIDEO_DIMENSION},ih)':force_original_aspect_ratio=decrease:force_divisible_by=2`;

  try {
    await writeFile(inPath, buffer);

    await execFileAsync(ffmpegPath, [
      "-y",
      "-i",
      inPath,
      "-vf",
      scaleFilter,
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

/**
 * Detecta HEIC/HEIF (formato por defecto de la cámara del iPhone) por
 * content-type o por los "magic bytes" del archivo — sharp no lo puede
 * decodificar directamente en el entorno serverless, así que hace falta
 * convertirlo a JPEG antes.
 */
function isHeic(buffer: Buffer, contentType: string): boolean {
  if (/hei[cf]/i.test(contentType)) return true;
  if (buffer.length < 12) return false;
  const boxType = buffer.toString("ascii", 4, 8);
  if (boxType !== "ftyp") return false;
  const majorBrand = buffer.toString("ascii", 8, 12).toLowerCase();
  return ["heic", "heix", "hevc", "hevx", "heim", "heis", "hevm", "hevs", "mif1", "msf1"].includes(
    majorBrand
  );
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
  contentType: string,
  format: MediaFormat = "estandar"
): Promise<{ url: string; type: "image" | "video" }> {
  const isImage = contentType.startsWith("image/");
  const isVideo = contentType.startsWith("video/");
  const base = safeName(originalName);

  const res = await fetch(rawUrl);
  if (!res.ok) throw new Error("No se pudo leer el archivo recién subido.");
  const buffer = Buffer.from(await res.arrayBuffer());

  if (isImage) {
    try {
      // HEIC/HEIF (cámara del iPhone por default) — sharp no lo puede leer
      // directo en este entorno, así que primero se convierte a JPEG.
      let sourceBuffer: Buffer = buffer;
      if (isHeic(buffer, contentType)) {
        // Import diferido a propósito: si esta librería (WASM) llegara a
        // fallar en el entorno serverless, que solo afecte a HEIC y no
        // tire abajo la carga de fotos normales (JPG/PNG).
        const { default: heicConvert } = await import("heic-convert");
        const jpegArrayBuffer = await heicConvert({
          buffer,
          format: "JPEG",
          quality: 0.92,
        });
        sourceBuffer = Buffer.from(jpegArrayBuffer);
      }

      const resizeOptions: ResizeOptions =
        format === "historia"
          ? { width: STORY_WIDTH, height: STORY_HEIGHT, fit: "cover", position: "attention" }
          : {
              width: MAX_IMAGE_DIMENSION,
              height: MAX_IMAGE_DIMENSION,
              fit: "inside",
              withoutEnlargement: true,
            };

      const optimized = await sharp(sourceBuffer)
        .rotate()
        .resize(resizeOptions)
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toBuffer();

      const blob = await put(`work/${folder}/${Date.now()}-${base}.jpg`, optimized, {
        access: "public",
        contentType: "image/jpeg",
        addRandomSuffix: false,
      });

      await del(rawUrl).catch(() => {});
      return { url: blob.url, type: "image" };
    } catch (err) {
      // Cualquier falla al procesar (formato raro, decodificación, etc.)
      // no debe frenar la carga: se guarda el archivo original tal cual,
      // igual que con los videos que no se pudieron comprimir.
      console.error("No se pudo procesar la imagen, se usa el original:", err);
      return { url: rawUrl, type: "image" };
    }
  }

  if (isVideo) {
    try {
      const compressed = await compressVideoBuffer(buffer, format);
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
