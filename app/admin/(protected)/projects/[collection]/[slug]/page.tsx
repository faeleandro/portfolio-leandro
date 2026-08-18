import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";
import { MediaItem } from "@/lib/types";
import {
  saveProjectDetails,
  uploadSingleMedia,
  addListMedia,
  removeListMedia,
} from "../../../../actions";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";

export const dynamic = "force-dynamic";

const inputClass =
  "rounded-lg border border-line/30 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-muted focus:border-lime focus:outline-none";
const labelClass = "font-mono text-xs uppercase tracking-widest2 text-muted";
const fileInputClass =
  "text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-lime file:px-4 file:py-2 file:font-mono file:text-xs file:uppercase file:tracking-widest2 file:text-ink";

function Thumb({ item }: { item: MediaItem }) {
  if (!item.src) return null;
  if (item.type === "video") {
    return (
      <video src={item.src} className="h-24 w-24 rounded-lg object-cover" muted />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.src} alt="" className="h-24 w-24 rounded-lg object-cover" />;
}

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: { collection: string; slug: string };
  searchParams: { saved?: string; created?: string; error?: string };
}) {
  const project = await getProjectBySlug(params.collection, params.slug);
  if (!project) notFound();

  return (
    <div className="flex max-w-2xl flex-col gap-10">
      <div>
        <p className={labelClass}>{params.collection}</p>
        <h1 className="mt-1 font-serif text-4xl uppercase leading-[0.95] text-cream">
          {project.title}
        </h1>
        {(searchParams.saved || searchParams.created) && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-lime">
            {searchParams.created ? "Proyecto creado ✓" : "Guardado ✓"}
          </p>
        )}
        {searchParams.error === "nofile" && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-red-400">
            Elegí un archivo antes de subir.
          </p>
        )}
        {searchParams.error === "save" && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-red-400">
            No se pudo guardar. Revisá que Vercel Blob esté configurado
            (variable BLOB_READ_WRITE_TOKEN) e intentá de nuevo.
          </p>
        )}
      </div>

      {/* Texto */}
      <section className="rounded-2xl border border-line/15 p-6 md:p-8">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest2 text-lime">
          Información
        </h2>
        <form action={saveProjectDetails} className="flex flex-col gap-4">
          <input type="hidden" name="collection" value={params.collection} />
          <input type="hidden" name="slug" value={params.slug} />

          <label className="flex flex-col gap-1">
            <span className={labelClass}>Título</span>
            <input name="title" defaultValue={project.title} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Cliente</span>
            <input name="client" defaultValue={project.client} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Año</span>
            <input
              name="year"
              defaultValue={project.year as string}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Categorías (separadas por coma)</span>
            <input
              name="category"
              defaultValue={project.category.join(", ")}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Servicios (opcional, si difiere de categorías)</span>
            <input
              name="services"
              defaultValue={project.services?.join(", ")}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Descripción</span>
            <textarea
              name="description"
              defaultValue={project.description}
              rows={4}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Sitio web (opcional)</span>
            <input name="website" defaultValue={project.website} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Instagram del cliente (opcional)</span>
            <input
              name="instagram"
              defaultValue={project.instagram}
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            className="w-fit rounded-full bg-lime px-5 py-3 font-mono text-xs uppercase tracking-widest2 text-ink transition-transform hover:-translate-y-0.5"
          >
            Guardar información
          </button>
        </form>
      </section>

      {/* Portada */}
      <section className="rounded-2xl border border-line/15 p-6 md:p-8">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest2 text-lime">
          Foto de portada
        </h2>
        {project.coverImage?.src && (
          <div className="mb-4">
            <Thumb item={project.coverImage} />
          </div>
        )}
        <form action={uploadSingleMedia} className="flex flex-wrap items-center gap-3">
          <input type="hidden" name="collection" value={params.collection} />
          <input type="hidden" name="slug" value={params.slug} />
          <input type="hidden" name="field" value="coverImage" />
          <input type="file" name="file" accept="image/*" required className={fileInputClass} />
          <button
            type="submit"
            className="rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:border-lime hover:text-lime"
          >
            Subir
          </button>
        </form>
      </section>

      {/* Video */}
      <section className="rounded-2xl border border-line/15 p-6 md:p-8">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest2 text-lime">
          Video (horizontal o vertical, se adapta solo)
        </h2>
        {project.heroVideo?.src && (
          <div className="mb-4">
            <Thumb item={project.heroVideo} />
          </div>
        )}
        <form action={uploadSingleMedia} className="flex flex-wrap items-center gap-3">
          <input type="hidden" name="collection" value={params.collection} />
          <input type="hidden" name="slug" value={params.slug} />
          <input type="hidden" name="field" value="heroVideo" />
          <input type="file" name="file" accept="video/*" required className={fileInputClass} />
          <button
            type="submit"
            className="rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:border-lime hover:text-lime"
          >
            Subir
          </button>
        </form>
      </section>

      {/* Galería / Proceso / Resultado */}
      {(
        [
          ["images", "Fotografía"],
          ["process", "Proceso"],
          ["results", "Resultado"],
        ] as const
      ).map(([field, label]) => {
        const items = project[field] ?? [];
        return (
          <section key={field} className="rounded-2xl border border-line/15 p-6 md:p-8">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest2 text-lime">
              {label}
            </h2>

            {items.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-3">
                {items.map((item, i) =>
                  item.src ? (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <Thumb item={item} />
                      <form action={removeListMedia}>
                        <input type="hidden" name="collection" value={params.collection} />
                        <input type="hidden" name="slug" value={params.slug} />
                        <input type="hidden" name="field" value={field} />
                        <input type="hidden" name="index" value={i} />
                        <ConfirmSubmitButton
                          confirmMessage="¿Borrar esta foto/video?"
                          className="font-mono text-[10px] uppercase tracking-widest2 text-muted transition-colors hover:text-red-400"
                        >
                          Borrar
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  ) : null
                )}
              </div>
            )}

            <form action={addListMedia} className="flex flex-wrap items-center gap-3">
              <input type="hidden" name="collection" value={params.collection} />
              <input type="hidden" name="slug" value={params.slug} />
              <input type="hidden" name="field" value={field} />
              <input
                type="file"
                name="files"
                accept="image/*,video/*"
                multiple
                required
                className={fileInputClass}
              />
              <button
                type="submit"
                className="rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:border-lime hover:text-lime"
              >
                Agregar
              </button>
            </form>
          </section>
        );
      })}
    </div>
  );
}
