"use client";

import { useEffect, useRef, type TouchEvent } from "react";
import { MediaItem } from "@/lib/types";
import PlaceholderMedia from "./PlaceholderMedia";

type Props = {
  items: MediaItem[];
  index: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/**
 * Visor a pantalla completa reutilizable: navegación anterior/siguiente,
 * swipe en mobile, teclado (flechas / escape), contador y transición
 * suave entre fotos/videos. Lo usan tanto la galería de fotografía como
 * las secciones de proceso y resultado.
 */
export default function LightboxViewer({
  items,
  index,
  title,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const total = items.length;
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    const THRESHOLD = 50;
    if (delta > THRESHOLD) onPrev();
    else if (delta < -THRESHOLD) onNext();
    touchStartX.current = null;
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-ink/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Visor — ${title}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between px-6 py-5 font-mono text-xs uppercase tracking-widest2 text-white/80 md:px-10">
        <span>{title}</span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          data-cursor="Cerrar"
          className="hover:text-white"
        >
          Cerrar ✕
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-editorial"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="relative flex h-full w-full flex-shrink-0 items-center justify-center px-4"
            >
              <PlaceholderMedia
                item={item}
                fallbackLabel={item.alt ?? `Contenido pendiente — ${title}`}
                className="h-full w-full max-w-5xl"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              data-cursor="Anterior"
              aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 border border-white/40 bg-ink/50 px-3 py-3 text-lg text-white transition-colors hover:bg-white hover:text-ink md:left-8"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={onNext}
              data-cursor="Siguiente"
              aria-label="Siguiente"
              className="absolute right-4 top-1/2 -translate-y-1/2 border border-white/40 bg-ink/50 px-3 py-3 text-lg text-white transition-colors hover:bg-white hover:text-ink md:right-8"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="px-6 py-5 text-center font-mono text-xs uppercase tracking-widest2 text-white/80 md:px-10">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}
