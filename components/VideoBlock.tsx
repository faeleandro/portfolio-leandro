"use client";

import { useRef, useState } from "react";
import { MediaItem } from "@/lib/types";
import PlaceholderMedia from "./PlaceholderMedia";

type Props = {
  item?: MediaItem;
  label: string;
};

/**
 * Video con protagonismo visual y botón para abrir en pantalla completa
 * (usa la API nativa de fullscreen del navegador sobre el <video>).
 *
 * La orientación (horizontal o vertical, ej: un reel) se detecta sola en
 * cuanto el navegador lee los metadatos del archivo — no hace falta
 * indicarla a mano en lib/projects.ts.
 */
export default function VideoBlock({ item, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );

  const hasVideo = Boolean(item?.src);

  function goFullscreen() {
    videoRef.current?.requestFullscreen?.();
  }

  function handleLoadedMetadata() {
    const video = videoRef.current;
    if (!video) return;
    setOrientation(
      video.videoHeight > video.videoWidth ? "vertical" : "horizontal"
    );
  }

  return (
    <div
      className={`relative mx-auto w-full overflow-hidden bg-ink ${
        orientation === "vertical" ? "aspect-[9/16] max-w-sm" : "aspect-video"
      }`}
    >
      {hasVideo ? (
        <video
          ref={videoRef}
          src={item!.src}
          poster={item?.poster}
          onLoadedMetadata={handleLoadedMetadata}
          className="h-full w-full object-cover"
          controls
          playsInline
        />
      ) : (
        <PlaceholderMedia
          item={item}
          fallbackLabel={`Video pendiente — ${label}`}
          className="h-full w-full"
        />
      )}

      {hasVideo && (
        <button
          type="button"
          onClick={goFullscreen}
          data-cursor="Fullscreen"
          className="absolute bottom-6 right-6 border border-white/50 bg-ink/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest2 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-ink"
        >
          Fullscreen
        </button>
      )}
    </div>
  );
}
