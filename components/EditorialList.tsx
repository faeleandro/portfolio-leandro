import Link from "next/link";
import Reveal from "./Reveal";
import { MediaItem } from "@/lib/types";

export type EditorialListItem = {
  index: number;
  title: string;
  subtitle?: string;
  href: string;
  preview?: MediaItem;
};

type Props = {
  items: EditorialListItem[];
  /** Texto que muestra el cursor personalizado al pasar por cada fila. */
  cursorLabel?: string;
};

/**
 * Listado editorial (no grilla de tarjetas): cada fila es un número, un
 * título grande y una línea de categoría. Al pasar el mouse el fondo se
 * llena de verde lima (barrido desde la izquierda) y el texto pasa a
 * oscuro para mantener contraste.
 */
export default function EditorialList({
  items,
  cursorLabel = "Ver proyecto",
}: Props) {
  return (
    <ul className="border-t border-line/20">
      {items.map((item, i) => (
        <li key={item.href} className="relative">
          <Reveal delay={i * 80}>
            <Link
              href={item.href}
              data-cursor={cursorLabel}
              className="group relative flex items-baseline gap-6 overflow-hidden border-b border-line/20 px-4 py-8 transition-colors duration-500 ease-editorial md:px-6 md:py-10"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-editorial group-hover:scale-x-100"
              />

              <span className="font-mono text-xs text-lime transition-colors duration-500 ease-editorial group-hover:text-ink md:text-sm">
                {String(item.index).padStart(2, "0")}
              </span>

              <span className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <span className="inline-block font-serif text-3xl uppercase leading-none tracking-tight text-cream transition-all duration-500 ease-editorial group-hover:translate-x-3 group-hover:text-ink sm:text-5xl md:text-6xl">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="font-mono text-[11px] uppercase tracking-widest2 text-muted transition-opacity duration-300 ease-editorial group-hover:opacity-0">
                    {item.subtitle}
                  </span>
                )}
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
