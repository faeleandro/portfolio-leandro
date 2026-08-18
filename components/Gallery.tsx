"use client";

import { useCallback, useState } from "react";
import { MediaItem } from "@/lib/types";
import PlaceholderMedia from "./PlaceholderMedia";
import LightboxViewer from "./LightboxViewer";

type Props = {
  images: MediaItem[];
  projectTitle: string;
};

/**
 * Galería fotográfica en grilla densa (estilo feed de Instagram). Al hacer
 * click sobre cualquier foto se abre un visor a pantalla completa con
 * navegación anterior/siguiente, swipe en mobile, teclado, contador de
 * foto y transiciones suaves.
 */
export default function Gallery({ images, projectTitle }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = images.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + total) % total));
  }, [total]);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  if (total === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-5 md:gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            data-cursor="Ampliar"
            aria-label={img.alt ?? `Ampliar foto ${i + 1} de ${total} — ${projectTitle}`}
            className="group relative block aspect-square w-full overflow-hidden text-left"
          >
            <PlaceholderMedia
              item={img}
              fallbackLabel={img.alt ?? `Foto pendiente — ${projectTitle}`}
              className="h-full w-full transition-transform duration-500 ease-editorial group-hover:scale-105"
              sizes="(min-width: 768px) 20vw, 33vw"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <LightboxViewer
          items={images}
          index={openIndex}
          title={projectTitle}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
