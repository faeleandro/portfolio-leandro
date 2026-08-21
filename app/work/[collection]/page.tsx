import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditorialList, { EditorialListItem } from "@/components/EditorialList";
import PillBreadcrumb from "@/components/PillBreadcrumb";
import Reveal from "@/components/Reveal";
import { getCollectionBySlug } from "@/lib/collections";
import { getProjectsByCollection } from "@/lib/projects";
import { getSite } from "@/lib/site";

// El contenido vive en Vercel Blob y puede cambiar en cualquier momento
// desde /admin — se renderiza siempre en el momento, sin cachear páginas
// estáticas viejas.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const [collection, site] = await Promise.all([
    getCollectionBySlug(params.collection),
    getSite(),
  ]);
  if (!collection) return {};
  return {
    title: `${collection.title} — ${site.name}`,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: { collection: string };
}) {
  const collection = await getCollectionBySlug(params.collection);
  if (!collection) notFound();

  const projects = await getProjectsByCollection(collection.slug);

  const items: EditorialListItem[] = projects.map((p, i) => ({
    index: i + 1,
    title: p.title,
    subtitle: p.category.join(" / "),
    href: `/work/${collection.slug}/${p.slug}`,
    preview: p.coverImage,
  }));

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24">
        <PillBreadcrumb items={[{ label: "Trabajos", href: "/#work" }, { label: collection.title }]} />
        <Reveal delay={100}>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest2 text-muted">
            {collection.role}
          </p>
          <h1 className="mt-4 max-w-4xl break-words font-serif text-4xl uppercase leading-[1.05] tracking-tight text-cream md:text-7xl">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="mt-6 max-w-xl text-sm text-muted md:text-base">
              {collection.description}
            </p>
          )}
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        {items.length > 0 ? (
          <EditorialList items={items} cursorLabel="Ver proyecto" />
        ) : (
          <p className="border-t border-line/15 py-12 font-mono text-xs uppercase tracking-widest2 text-muted">
            Todavía no hay proyectos cargados en esta etapa.
          </p>
        )}
      </section>
    </div>
  );
}
