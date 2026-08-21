"use client";

import { useCallback, useState } from "react";
import { MediaItem } from "@/lib/types";
import PlaceholderMedia from "./PlaceholderMedia";
import LightboxViewer from "./LightboxViewer";

type Props = {
  items: MediaItem[];
  projectTitle: string;
  sectionLabel: string;
};

/**
 * Grilla flexible para "Proceso" y "Resultado": se adapta a la cantidad y
 * tipo de piezas que tenga cada proyecto (fotos, videos, reels, piezas
 * gráficas). Si no hay items, no se renderiza nada.
 */
export default function MediaGrid({ items, projectTitle, sectionLabel }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = items.length;

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            data-cursor="Ampliar"
            aria-label={
              item.caption ??
              item.alt ??
              `Ampliar ${sectionLabel.toLowerCase()} ${i + 1} de ${total} — ${projectTitle}`
            }
            className={`group relative block overflow-hidden text-left ${
              i % 3 === 0 ? "sm:col-span-2 aspect-video" : "aspect-[4/5]"
            }`}
          >
            <PlaceholderMedia
              item={item}
              fallbackLabel={
                item.alt ?? `${sectionLabel} pendiente — ${projectTitle}`
              }
              className="h-full w-full transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
              sizes="100vw"
            />
            {item.caption && (
              <span className="absolute bottom-4 left-4 max-w-[80%] font-mono text-[11px] uppercase tracking-widest2 text-white/80">
                {item.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <LightboxViewer
          items={items}
          index={openIndex}
          title={`${projectTitle} — ${sectionLabel}`}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
