"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import {
  finalizeSitePhoto,
  finalizeSingleMedia,
  finalizeListMedia,
  type SingleMediaField,
  type ListMediaField,
} from "@/app/admin/actions";

type Props =
  | { kind: "sitePhoto"; accept: string; buttonLabel?: string }
  | {
      kind: "single";
      accept: string;
      collection: string;
      slug: string;
      field: SingleMediaField;
      buttonLabel?: string;
    }
  | {
      kind: "list";
      accept: string;
      collection: string;
      slug: string;
      field: ListMediaField;
      buttonLabel?: string;
    };

type Status = "idle" | "uploading" | "processing" | "error";

/**
 * Sube archivos directo del navegador a Vercel Blob (sin límite de
 * tamaño — las Server Actions normales solo aceptan ~4.5MB) y después
 * dispara la compresión server-side (fotos vía sharp, videos vía ffmpeg,
 * sin perder calidad visible).
 */
export default function MediaUploader(props: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    setStatus("uploading");
    setErrorMsg(null);

    try {
      const uploaded: { rawUrl: string; originalName: string; contentType: string }[] =
        [];

      for (const file of files) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/blob-upload",
        });
        uploaded.push({
          rawUrl: blob.url,
          originalName: file.name,
          contentType: file.type,
        });
      }

      setStatus("processing");

      if (props.kind === "sitePhoto") {
        await finalizeSitePhoto(
          uploaded[0].rawUrl,
          uploaded[0].originalName,
          uploaded[0].contentType
        );
      } else if (props.kind === "single") {
        await finalizeSingleMedia(
          props.collection,
          props.slug,
          props.field,
          uploaded[0].rawUrl,
          uploaded[0].originalName,
          uploaded[0].contentType
        );
      } else {
        await finalizeListMedia(props.collection, props.slug, props.field, uploaded);
      }

      router.refresh();
      setStatus("idle");
    } catch (err) {
      console.error(err);
      setErrorMsg(
        err instanceof Error ? err.message : "No se pudo subir. Probá de nuevo."
      );
      setStatus("error");
    } finally {
      e.target.value = "";
    }
  }

  const isBusy = status === "uploading" || status === "processing";
  const label =
    status === "uploading"
      ? "Subiendo..."
      : status === "processing"
        ? "Comprimiendo..."
        : (props.buttonLabel ?? "Subir");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label
        className={`cursor-pointer rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:border-lime hover:text-lime ${
          isBusy ? "pointer-events-none opacity-60" : ""
        }`}
      >
        {label}
        <input
          type="file"
          accept={props.accept}
          multiple={props.kind === "list"}
          className="hidden"
          disabled={isBusy}
          onChange={handleChange}
        />
      </label>
      {status === "error" && errorMsg && (
        <span className="font-mono text-xs text-red-400">{errorMsg}</span>
      )}
    </div>
  );
}
