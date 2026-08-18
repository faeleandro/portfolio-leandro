import Link from "next/link";
import PlaceholderMedia from "./PlaceholderMedia";
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
 * llena de verde lima (barrido desde la izquierda), el texto pasa a oscuro
 * para mantener contraste, aparece una imagen de preview y el cursor
 * cambia.
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

            <span className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <span className="inline-block font-serif text-3xl uppercase leading-none tracking-tight text-cream transition-all duration-500 ease-editorial group-hover:translate-x-3 group-hover:text-ink sm:text-5xl md:text-6xl">
                {item.title}
              </span>
              {item.subtitle && (
                <span className="font-mono text-[11px] uppercase tracking-widest2 text-muted transition-colors duration-500 ease-editorial group-hover:text-ink/70">
                  {item.subtitle}
                </span>
              )}
            </span>

            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-1/2 z-10 hidden h-64 w-48 -translate-y-1/2 translate-x-4 scale-95 rotate-3 opacity-0 shadow-2xl transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 md:right-16 md:block md:h-72 md:w-56"
            >
              <PlaceholderMedia
                item={item.preview}
                fallbackLabel={`Preview pendiente — ${item.title}`}
                className="h-full w-full"
                sizes="240px"
              />
            </span>
          </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
