import Link from "next/link";

export type Pill = { label: string; href?: string };

type Props = {
  items: Pill[];
  /** Si es true, se estiliza para ir sobre una foto/video (fondo oscuro). */
  onMedia?: boolean;
};

/**
 * Fila de "pills" de navegación (ej: "↗ Re! Studio" + "Shikko") usada como
 * breadcrumb en las páginas de colección y proyecto. Al pasar el mouse el
 * fondo se llena de verde lima y el texto pasa a oscuro.
 */
export default function PillBreadcrumb({ items, onMedia }: Props) {
  const base =
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest2 transition-colors duration-500 ease-editorial hover:text-ink";
  const theme = onMedia ? "border-white/30 text-white" : "border-line/30 text-cream";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item, i) => {
        const content = (
          <>
            <span
              aria-hidden
              className="absolute inset-0 -z-10 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-editorial group-hover:scale-x-100"
            />
            {i === 0 && <span aria-hidden>↗</span>}
            {item.label}
          </>
        );
        return item.href ? (
          <Link key={item.label} href={item.href} className={`${base} ${theme}`}>
            {content}
          </Link>
        ) : (
          <span key={item.label} className={`${base} ${theme} cursor-default`}>
            {content}
          </span>
        );
      })}
    </div>
  );
}
