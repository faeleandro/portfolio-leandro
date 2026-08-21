import type { Metadata } from "next";
import { getSite } from "@/lib/site";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import PillBreadcrumb from "@/components/PillBreadcrumb";
import Reveal from "@/components/Reveal";
import { pick, t } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const locale = getLocale();
  return {
    title: `About — ${site.name}`,
    description: pick(locale, site.role, ""),
  };
}

export default async function AboutPage() {
  const site = await getSite();
  const locale = getLocale();
  const bio = pick(locale, site.bio, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
      <div className="flex flex-col overflow-hidden rounded-[2rem] md:flex-row">
        <div className="flex flex-col items-center justify-between gap-10 bg-forest px-8 py-10 md:w-[38%] md:items-start md:px-10 md:py-14">
          <PillBreadcrumb items={[{ label: t(locale, "about_intro_pill") }]} />

          <div className="w-40 shrink-0 md:w-48">
            <PlaceholderMedia
              item={site.photo}
              fallbackLabel={`${t(locale, "photo_pending")} — ${site.name}`}
              className="aspect-square w-full rounded-full"
              sizes="200px"
            />
          </div>

          <p className="font-mono text-xs uppercase tracking-widest2 text-cream/70">
            {site.name}
          </p>
        </div>

        <div className="flex-1 px-6 py-10 md:px-14 md:py-16">
          <Reveal>
            <h1 className="font-serif text-4xl uppercase leading-[0.95] md:text-6xl">
              <span className="text-cream">{t(locale, "about_heading_1")}</span>
              <br />
              <span className="text-lime">{t(locale, "about_heading_2")}</span>
            </h1>
          </Reveal>

          <div className="mt-10 flex max-w-2xl flex-col gap-5 text-sm text-muted md:text-base">
            {bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 90}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
