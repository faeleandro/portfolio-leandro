import Image from "next/image";
import { MediaItem } from "@/lib/types";

type Props = {
  item?: MediaItem;
  /** Clases de aspect ratio / tamaño, ej: "aspect-[4/5]" o "aspect-video" */
  className?: string;
  /** Texto a mostrar cuando no hay src todavía. */
  fallbackLabel?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Muestra la imagen/video real si "item.src" existe. Si no, muestra un
 * placeholder visual claramente identificado como contenido pendiente —
 * nunca se inventa ni se simula contenido real.
 */
export default function PlaceholderMedia({
  item,
  className = "",
  fallbackLabel,
  priority,
  sizes,
}: Props) {
  const label = fallbackLabel ?? item?.alt ?? "Contenido pendiente";

  if (item?.src) {
    const isVideo =
      item.type === "video" || /\.(mp4|webm|mov)$/i.test(item.src);

    if (isVideo) {
      return (
        <div className={`relative overflow-hidden bg-ink ${className}`}>
          <video
            src={item.src}
            poster={item.poster}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden bg-ink ${className}`}>
        <Image
          src={item.src}
          alt={item.alt ?? ""}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-[repeating-linear-gradient(135deg,#1c1c1a_0px,#1c1c1a_2px,#0a0a0a_2px,#0a0a0a_14px)] ${className}`}
    >
      <span className="border border-white/20 px-4 py-2 text-center font-mono text-[10px] uppercase tracking-widest2 text-white/60">
        {label}
      </span>
    </div>
  );
}
