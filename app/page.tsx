import EditorialList, { EditorialListItem } from "@/components/EditorialList";
import HeroCard from "@/components/HeroCard";
import MarqueeStrip from "@/components/MarqueeStrip";
import Reveal from "@/components/Reveal";
import { getCollections } from "@/lib/collections";
import { getSite } from "@/lib/site";

const TAGS = [
  "Fotografía",
  "Producción Audiovisual",
  "Contenido para Redes",
  "Marcas & Gastronomía",
  "Dirección de Arte",
];

export default async function HomePage() {
  const [collections, site] = await Promise.all([getCollections(), getSite()]);

  const items: EditorialListItem[] = collections.map((c) => ({
    index: c.order,
    title: c.title,
    subtitle: c.role,
    href: `/work/${c.slug}`,
    preview: c.coverImage,
  }));

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-10 md:px-10 md:pb-16 md:pt-16">
        <Reveal>
          <HeroCard />
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 max-w-xl font-mono text-xs uppercase tracking-widest2 text-muted">
            {site.role}
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
            Un recorrido profesional contado en cuatro etapas, en orden
            cronológico.
          </p>
        </Reveal>
      </section>

      <MarqueeStrip items={TAGS} />

      <section id="work" className="mx-auto max-w-7xl px-6 pb-24 pt-4 md:px-10">
        <EditorialList items={items} cursorLabel="Ver etapa" />
      </section>
    </div>
  );
}
