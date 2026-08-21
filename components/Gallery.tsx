"use client";

import { useCallback, useState } from "react";
import { MediaItem, Locale } from "@/lib/types";
import { t } from "@/lib/i18n";
import PlaceholderMedia from "./PlaceholderMedia";
import LightboxViewer from "./LightboxViewer";

type Props = {
  images: MediaItem[];
  projectTitle: string;
  locale: Locale;
};

/**
 * Galería fotográfica en grilla densa (estilo feed de Instagram). Al hacer
 * click sobre cualquier foto se abre un visor a pantalla completa con
 * navegación anterior/siguiente, swipe en mobile, teclado, contador de
 * foto y transiciones suaves.
 */
export default function Gallery({ images, projectTitle, locale }: Props) {
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

  const pendingLabel = locale === "en" ? "Photo pending" : "Foto pendiente";

  return (
    <>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-5 md:gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            data-cursor={t(locale, "ampliar")}
            aria-label={img.alt ?? `${t(locale, "ampliar")} ${i + 1}/${total} — ${projectTitle}`}
            className="group relative block aspect-square w-full overflow-hidden text-left"
          >
            <PlaceholderMedia
              item={img}
              fallbackLabel={img.alt ?? `${pendingLabel} — ${projectTitle}`}
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
          locale={locale}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
