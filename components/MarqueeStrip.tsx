type Props = {
  items: string[];
};

/**
 * Marquesina horizontal infinita (CSS puro, sin JS) — un recurso gráfico
 * decorativo para romper la monotonía entre secciones.
 */
export default function MarqueeStrip({ items }: Props) {
  const repeated = Array.from({ length: 4 }, () => items).flat();

  return (
    <div className="overflow-hidden border-y border-line/15 py-5">
      <div className="flex w-max animate-marquee items-center whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {repeated.map((word, i) => (
              <span key={i} className="flex items-center">
                <span className="px-4 font-serif text-2xl uppercase tracking-tight text-cream md:px-6 md:text-4xl">
                  {word}
                </span>
                <span className="text-lime" aria-hidden>
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
