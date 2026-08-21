import { getCollections } from "@/lib/collections";
import { createProject } from "../../../actions";

export const dynamic = "force-dynamic";

const inputClass =
  "rounded-lg border border-line/30 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-muted focus:border-lime focus:outline-none";
const labelClass = "font-mono text-xs uppercase tracking-widest2 text-muted";

export default async function NewProjectPage({
  searchParams,
}: {
  searchParams: { collection?: string; error?: string };
}) {
  const collections = await getCollections();

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-4xl uppercase leading-[0.95] text-cream">
        Nuevo proyecto
      </h1>
      {searchParams.error === "save" && (
        <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-red-400">
          No se pudo crear. Revisá que Vercel Blob esté configurado (variable
          BLOB_READ_WRITE_TOKEN) e intentá de nuevo.
        </p>
      )}
      {searchParams.error === "missing" && (
        <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-red-400">
          Completá al menos etapa y título.
        </p>
      )}

      <form action={createProject} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className={labelClass}>Etapa</span>
          <select
            name="collection"
            defaultValue={searchParams.collection}
            className={inputClass}
          >
            {collections.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className={labelClass}>Título / Cliente</span>
          <input name="title" required className={inputClass} />
        </label>

        <label className="flex flex-col gap-1">
          <span className={labelClass}>Cliente (si difiere del título)</span>
          <input name="client" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1">
          <span className={labelClass}>Categorías (separadas por coma)</span>
          <input
            name="category"
            placeholder="Content, Photography, Filmmaking"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className={labelClass}>Descripción</span>
          <textarea name="description" rows={4} className={inputClass} />
        </label>

        <button
          type="submit"
          className="w-fit rounded-full bg-lime px-5 py-3 font-mono text-xs uppercase tracking-widest2 text-ink transition-transform hover:-translate-y-0.5"
        >
          Crear proyecto
        </button>
      </form>
    </div>
  );
}
