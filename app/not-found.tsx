import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-6 py-28 md:px-10 md:py-40">
      <p className="font-mono text-xs uppercase tracking-widest2 text-muted">
        404
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
        Página no encontrada
      </h1>
      <p className="mt-6 max-w-md text-sm text-muted md:text-base">
        El contenido que buscás no existe o todavía no fue publicado.
      </p>
      <Link
        href="/"
        className="mt-10 border-b border-line/15 pb-1 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:text-lime"
      >
        Volver al inicio →
      </Link>
    </div>
  );
}
