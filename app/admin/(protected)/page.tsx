import Link from "next/link";
import { getContent } from "@/lib/content";
import { saveCollection, deleteProject } from "../actions";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";

export const dynamic = "force-dynamic";

const inputClass =
  "rounded-lg border border-line/30 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-muted focus:border-lime focus:outline-none";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { saved?: string; deleted?: string; error?: string };
}) {
  const content = await getContent();
  const collections = [...content.collections].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-serif text-4xl uppercase leading-[0.95] text-cream">
          Dashboard
        </h1>
        {searchParams.saved && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-lime">
            Guardado ✓
          </p>
        )}
        {searchParams.deleted && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-lime">
            Proyecto eliminado ✓
          </p>
        )}
        {searchParams.error === "save" && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-red-400">
            No se pudo guardar. Revisá que Vercel Blob esté configurado
            (variable BLOB_READ_WRITE_TOKEN) e intentá de nuevo.
          </p>
        )}
      </div>

      {collections.map((collection) => {
        const projects = content.projects.filter(
          (p) => p.collection === collection.slug
        );

        return (
          <section
            key={collection.slug}
            className="rounded-2xl border border-line/15 p-6 md:p-8"
          >
            <form action={saveCollection} className="flex flex-col gap-3">
              <input type="hidden" name="slug" value={collection.slug} />
              <div className="flex flex-wrap items-center gap-3">
                <input
                  name="title"
                  defaultValue={collection.title}
                  className={`${inputClass} flex-1 font-serif text-lg uppercase`}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  name="role_es"
                  defaultValue={collection.role?.es}
                  placeholder="Rol / forma de trabajo (ES)"
                  className={inputClass}
                />
                <input
                  name="role_en"
                  defaultValue={collection.role?.en}
                  placeholder="Role (EN)"
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <textarea
                  name="description_es"
                  defaultValue={collection.description?.es}
                  placeholder="Descripción de la etapa (ES)"
                  rows={2}
                  className={inputClass}
                />
                <textarea
                  name="description_en"
                  defaultValue={collection.description?.en}
                  placeholder="Description (EN)"
                  rows={2}
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                className="w-fit rounded-full bg-lime px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-ink transition-transform hover:-translate-y-0.5"
              >
                Guardar etapa
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-2">
              {projects.length === 0 && (
                <p className="font-mono text-xs uppercase tracking-widest2 text-muted">
                  Sin proyectos todavía.
                </p>
              )}
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="flex items-center justify-between gap-4 rounded-lg border border-line/10 px-4 py-3"
                >
                  <Link
                    href={`/admin/projects/${collection.slug}/${project.slug}`}
                    className="font-mono text-sm text-cream transition-colors hover:text-lime"
                  >
                    {project.title}
                  </Link>
                  <form action={deleteProject}>
                    <input type="hidden" name="collection" value={collection.slug} />
                    <input type="hidden" name="slug" value={project.slug} />
                    <ConfirmSubmitButton
                      confirmMessage={`¿Borrar "${project.title}"? No se puede deshacer.`}
                      className="font-mono text-xs uppercase tracking-widest2 text-muted transition-colors hover:text-red-400"
                    >
                      Borrar
                    </ConfirmSubmitButton>
                  </form>
                </div>
              ))}
            </div>

            <Link
              href={`/admin/projects/new?collection=${collection.slug}`}
              className="mt-4 inline-block rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:border-lime hover:text-lime"
            >
              + Nuevo proyecto
            </Link>
          </section>
        );
      })}
    </div>
  );
}
