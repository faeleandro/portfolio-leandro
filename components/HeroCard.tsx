import PlaceholderMedia from "./PlaceholderMedia";
import { getSite } from "@/lib/site";

/**
 * Tarjeta de portada de la home: foto + título, estilo tarjeta redondeada
 * con fondo lima.
 */
export default async function HeroCard() {
  const site = await getSite();

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-lime px-6 py-8 md:px-12 md:py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <div className="mx-auto w-full max-w-xs shrink-0 md:mx-0">
          <PlaceholderMedia
            item={site.photo}
            fallbackLabel={`Foto pendiente — ${site.name}`}
            className="aspect-[4/5] w-full rounded-[2rem]"
            sizes="(min-width: 768px) 320px, 80vw"
            fit="contain"
          />
        </div>

        <div className="flex min-w-0 flex-1 items-center">
          <h1 className="min-w-0 break-words font-serif text-4xl uppercase leading-[0.95] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
            Portafolio
            <br />
            Creativo
          </h1>
        </div>
      </div>
    </div>
  );
}
