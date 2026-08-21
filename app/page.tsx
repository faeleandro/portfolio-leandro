import EditorialList, { EditorialListItem } from "@/components/EditorialList";
import HeroCard from "@/components/HeroCard";
import MarqueeStrip from "@/components/MarqueeStrip";
import Reveal from "@/components/Reveal";
import { getCollections } from "@/lib/collections";
import { getSite } from "@/lib/site";
import { pick, t } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";

const TAGS = {
  es: [
    "Fotografía",
    "Producción Audiovisual",
    "Contenido para Redes",
    "Marcas & Gastronomía",
    "Dirección de Arte",
  ],
  en: [
    "Photography",
    "Audiovisual Production",
    "Content for Social Media",
    "Brands & Gastronomy",
    "Art Direction",
  ],
};

export default async function HomePage() {
  const [collections, site] = await Promise.all([getCollections(), getSite()]);
  const locale = getLocale();

  const items: EditorialListItem[] = collections.map((c) => ({
    index: c.order,
    title: c.title,
    subtitle: pick(locale, c.role, ""),
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
            {pick(locale, site.role, "")}
          </p>
          <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
            {t(locale, "home_journey")}
          </p>
        </Reveal>
      </section>

      <MarqueeStrip items={TAGS[locale]} />

      <section id="work" className="mx-auto max-w-7xl px-6 pb-24 pt-4 md:px-10">
        <EditorialList items={items} cursorLabel={t(locale, "view_stage")} />
      </section>
    </div>
  );
}
