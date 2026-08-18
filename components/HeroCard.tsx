import PlaceholderMedia from "./PlaceholderMedia";
import { SITE } from "@/lib/site";

/**
 * Tarjeta de portada de la home: foto + título, estilo tarjeta redondeada
 * con fondo lima.
 */
export default function HeroCard() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-lime px-6 py-8 md:px-12 md:py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <div className="mx-auto w-full max-w-xs shrink-0 md:mx-0">
          <PlaceholderMedia
            item={SITE.photo}
            fallbackLabel={`Foto pendiente — ${SITE.name}`}
            className="aspect-[4/5] w-full rounded-[2rem]"
            sizes="(min-width: 768px) 320px, 80vw"
          />
        </div>

        <div className="flex min-w-0 flex-1 items-center">
          <h1 className="min-w-0 font-serif text-5xl uppercase leading-[0.95] text-ink md:text-6xl lg:text-7xl">
            Portafolio
            <br />
            Creativo
          </h1>
        </div>
      </div>
    </div>
  );
}
