"use client";

import { useEffect, useState } from "react";

/**
 * Cursor personalizado. Cualquier elemento con el atributo
 * data-cursor="VIEW PROJECT" (el texto que quieras) hace que, al pasar el
 * mouse por encima, aparezca esa etiqueta siguiendo al cursor y se oculte
 * el cursor del sistema sobre ese elemento.
 *
 * Se monta una sola vez en el layout general — no hace falta repetir nada
 * en cada componente, solo agregar el atributo data-cursor donde se use.
 */
export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Los dispositivos táctiles no tienen cursor — no hacemos nada ahí.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    function handleMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      setLabel(target?.getAttribute("data-cursor") ?? null);
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style jsx global>{`
        body.has-custom-cursor [data-cursor] {
          cursor: none;
        }
      `}</style>
      <div
        className={`pointer-events-none fixed z-[100] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-lime/80 bg-ink/70 text-center font-mono text-[10px] uppercase tracking-widest2 text-lime backdrop-blur-sm transition-opacity duration-200 ${
          label ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: pos.x, top: pos.y }}
        aria-hidden
      >
        {label}
      </div>
    </>
  );
}
