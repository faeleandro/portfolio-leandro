"use client";

import { useState, useTransition, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { updateSitePhotoFocal } from "@/app/admin/actions";

type Props = {
  src: string;
  initialFocalX?: number;
  initialFocalY?: number;
};

/**
 * Muestra la foto completa (sin recortar) y deja hacer click en el punto
 * que se quiere como centro — ese punto es el que despues se usa como
 * object-position donde la foto se muestra recortada (home, about).
 */
export default function FocalPointPicker({
  src,
  initialFocalX = 50,
  initialFocalY = 50,
}: Props) {
  const [focal, setFocal] = useState({ x: initialFocalX, y: initialFocalY });
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLImageElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    const clamped = { x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) };
    setFocal(clamped);
    setSaved(false);
    startTransition(async () => {
      await updateSitePhotoFocal(clamped.x, clamped.y);
      setSaved(true);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-muted">
        Hacé click en la foto para elegir qué parte queda centrada al
        recortarla (home / about)
      </p>
      <div className="relative w-full max-w-xs cursor-crosshair select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          onClick={handleClick}
          className="block w-full rounded-lg"
          draggable={false}
        />
        <span
          className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-lime bg-lime/30 shadow-[0_0_0_1px_rgba(0,0,0,0.6)]"
          style={{ left: `${focal.x}%`, top: `${focal.y}%` }}
        />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-muted">
        {isPending ? "Guardando..." : saved ? "Guardado ✓" : " "}
      </p>
    </div>
  );
}
