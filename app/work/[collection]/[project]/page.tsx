import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getCollections } from "@/lib/collections";
import {
  getNextProject,
  getProjectBySlug,
  getProjectsByCollection,
} from "@/lib/projects";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import VideoBlock from "@/components/VideoBlock";
import Gallery from "@/components/Gallery";
import MediaGrid from "@/components/MediaGrid";
import SectionHeading from "@/components/SectionHeading";
import NextProjectLink from "@/components/NextProjectLink";
import PillBreadcrumb from "@/components/PillBreadcrumb";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getCollections().flatMap((c) =>
    getProjectsByCollection(c.slug).map((p) => ({
      collection: c.slug,
      project: p.slug,
    }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { collection: string; project: string };
}): Metadata {
  const project = getProjectBySlug(params.collection, params.project);
  if (!project) return {};
  return {
    title: `${project.title} — ${SITE.name}`,
    description: project.description ?? `${project.title} — ${SITE.name}`,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { collection: string; project: string };
}) {
  const collection = getCollectionBySlug(params.collection);
  if (!collection) notFound();

  const project = getProjectBySlug(params.collection, params.project);
  if (!project) notFound();

  const nextProject = getNextProject(project.slug);

  const heroBackground = project.coverImage ?? project.heroVideo;
  const hasImages = Boolean(project.images && project.images.length);
  const hasProcess = Boolean(project.process && project.process.length);
  const hasResults = Boolean(project.results && project.results.length);

  return (
    <div>
      {/* 01 — PORTADA */}
      <section className="relative flex h-[85vh] w-full flex-col justify-between overflow-hidden bg-ink">
        <PlaceholderMedia
          item={heroBackground}
          fallbackLabel={`Portada pendiente — ${project.title}`}
          className="absolute inset-0 h-full w-full"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="relative z-10 px-6 pt-8 md:px-10 md:pt-10">
          <PillBreadcrumb
            onMedia
            items={[
              { label: collection.title, href: `/work/${collection.slug}` },
              { label: project.title },
            ]}
          />
        </div>
        <div className="relative z-10 w-full px-6 pb-10 md:px-10 md:pb-16">
          <h1 className="font-serif text-5xl leading-none text-white md:text-9xl">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-6 border-t border-line/15 pt-8 font-mono text-xs uppercase tracking-widest2 text-muted sm:grid-cols-4">
            <div>
              <div className="mb-2 text-[10px] text-muted/70">Cliente</div>
              <div className="text-cream">{project.client ?? project.title}</div>
            </div>
            <div>
              <div className="mb-2 text-[10px] text-muted/70">Año</div>
              <div className="text-cream">{project.year ?? "Pendiente"}</div>
            </div>
            <div className="col-span-2 sm:col-span-2">
              <div className="mb-2 text-[10px] text-muted/70">Servicios</div>
              <div className="text-cream">
                {(project.services ?? project.category).join(" / ")}
              </div>
            </div>
          </div>

          {project.description && (
            <p className="mt-10 max-w-2xl text-sm text-muted md:text-base">
              {project.description}
            </p>
          )}
        </Reveal>
      </section>

      {/* 02 — VIDEO */}
      {project.heroVideo && (
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <SectionHeading index="02" title="Video" />
            <VideoBlock item={project.heroVideo} label={project.title} />
          </Reveal>
        </section>
      )}

      {/* 03 — FOTOGRAFÍA */}
      {hasImages && (
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <SectionHeading index="03" title="Fotografía" />
            <Gallery images={project.images!} projectTitle={project.title} />
          </Reveal>
        </section>
      )}

      {/* 04 — PROCESO (opcional) */}
      {hasProcess && (
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <SectionHeading index="04" title="Proceso" />
            <MediaGrid
              items={project.process!}
              projectTitle={project.title}
              sectionLabel="Proceso"
            />
          </Reveal>
        </section>
      )}

      {/* 05 — RESULTADO */}
      {hasResults && (
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <SectionHeading index="05" title="Resultado" />
            <MediaGrid
              items={project.results!}
              projectTitle={project.title}
              sectionLabel="Resultado"
            />
          </Reveal>
        </section>
      )}

      {!project.heroVideo && !hasImages && !hasProcess && !hasResults && (
        <section className="mx-auto max-w-7xl px-6 py-4 pb-16 md:px-10">
          <p className="border-t border-line/15 py-12 font-mono text-xs uppercase tracking-widest2 text-muted">
            Contenido audiovisual pendiente de carga para este proyecto.
          </p>
        </section>
      )}

      {(project.website || project.instagram) && (
        <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
          <div className="flex flex-wrap gap-6 border-t border-line/15 pt-8 font-mono text-xs uppercase tracking-widest2 text-muted">
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="hover:text-lime"
              >
                Sitio web ↗
              </a>
            )}
            {project.instagram && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-lime"
              >
                Instagram ↗
              </a>
            )}
          </div>
        </section>
      )}

      {/* 06 — SIGUIENTE PROYECTO */}
      {nextProject && <NextProjectLink project={nextProject} />}
    </div>
  );
}
