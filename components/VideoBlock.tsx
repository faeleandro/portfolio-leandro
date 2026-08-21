"use client";

import { useEffect, useRef, useState } from "react";
import { MediaItem, Locale } from "@/lib/types";
import PlaceholderMedia from "./PlaceholderMedia";

type Props = {
  item?: MediaItem;
  label: string;
  locale: Locale;
};

// Safari en iOS no soporta la API estándar de fullscreen sobre <video> —
// usa su propio método "webkitEnterFullscreen". La tipamos acá porque no
// forma parte de los tipos estándar del DOM.
type FullscreenVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
};

/**
 * Video con protagonismo visual y botón para abrir en pantalla completa.
 * El botón solo se muestra si el navegador realmente soporta alguna API
 * de fullscreen — así nunca queda un botón que no hace nada.
 *
 * La orientación (horizontal o vertical, ej: un reel) se detecta sola en
 * cuanto el navegador lee los metadatos del archivo — no hace falta
 * indicarla a mano en lib/projects.ts.
 */
export default function VideoBlock({ item, label, locale }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [canFullscreen, setCanFullscreen] = useState(false);

  const hasVideo = Boolean(item?.src);

  useEffect(() => {
    const video = videoRef.current as FullscreenVideoElement | null;
    if (!video) return;
    setCanFullscreen(
      Boolean(
        video.requestFullscreen ||
          video.webkitEnterFullscreen ||
          video.webkitRequestFullscreen
      )
    );
  }, [hasVideo]);

  function goFullscreen() {
    const video = videoRef.current as FullscreenVideoElement | null;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
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
          fallbackLabel={`${locale === "en" ? "Video pending" : "Video pendiente"} — ${label}`}
          className="h-full w-full"
        />
      )}

      {hasVideo && canFullscreen && (
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
