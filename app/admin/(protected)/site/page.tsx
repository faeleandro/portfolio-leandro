import { getSite } from "@/lib/site";
import { saveSite, uploadSitePhoto } from "../../actions";

export const dynamic = "force-dynamic";

const inputClass =
  "rounded-lg border border-line/30 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-muted focus:border-lime focus:outline-none";
const labelClass = "font-mono text-xs uppercase tracking-widest2 text-muted";

export default async function AdminSitePage({
  searchParams,
}: {
  searchParams: { saved?: string; error?: string };
}) {
  const site = await getSite();

  return (
    <div className="flex max-w-2xl flex-col gap-12">
      <div>
        <h1 className="font-serif text-4xl uppercase leading-[0.95] text-cream">
          Datos del sitio
        </h1>
        {searchParams.saved && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-lime">
            Guardado ✓
          </p>
        )}
        {searchParams.error === "save" && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-red-400">
            No se pudo guardar. Revisá que Vercel Blob esté configurado
            (variable BLOB_READ_WRITE_TOKEN) e intentá de nuevo.
          </p>
        )}
        {searchParams.error === "nofile" && (
          <p className="mt-3 font-mono text-xs uppercase tracking-widest2 text-red-400">
            Elegí un archivo antes de subir.
          </p>
        )}
      </div>

      <section className="rounded-2xl border border-line/15 p-6 md:p-8">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest2 text-lime">
          Foto de portada
        </h2>
        {site.photo?.src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.photo.src}
            alt=""
            className="mb-4 h-40 w-32 rounded-xl object-cover"
          />
        )}
        <form action={uploadSitePhoto} className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            name="photo"
            accept="image/*"
            required
            className="text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-lime file:px-4 file:py-2 file:font-mono file:text-xs file:uppercase file:tracking-widest2 file:text-ink"
          />
          <button
            type="submit"
            className="rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:border-lime hover:text-lime"
          >
            Subir
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-line/15 p-6 md:p-8">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest2 text-lime">
          Datos generales
        </h2>
        <form action={saveSite} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Nombre</span>
            <input name="name" defaultValue={site.name} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Usuario de Instagram (@handle)</span>
            <input name="handle" defaultValue={site.handle} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Rol</span>
            <input name="role" defaultValue={site.role} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Email</span>
            <input name="email" defaultValue={site.email} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>Instagram (link completo)</span>
            <input
              name="instagram"
              defaultValue={site.instagram}
              placeholder="https://www.instagram.com/..."
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>LinkedIn (opcional)</span>
            <input
              name="linkedin"
              defaultValue={site.linkedin}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>WhatsApp (con código de país)</span>
            <input
              name="whatsapp"
              defaultValue={site.whatsapp}
              placeholder="+54 9 ..."
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={labelClass}>
              Bio (un párrafo por bloque — dejá una línea vacía entre cada uno)
            </span>
            <textarea
              name="bio"
              defaultValue={site.bio.join("\n\n")}
              rows={10}
              className={inputClass}
            />
          </label>

          <button
            type="submit"
            className="w-fit rounded-full bg-lime px-5 py-3 font-mono text-xs uppercase tracking-widest2 text-ink transition-transform hover:-translate-y-0.5"
          >
            Guardar
          </button>
        </form>
      </section>
    </div>
  );
}
