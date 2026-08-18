import Link from "next/link";
import { logout } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-line/15 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:border-lime hover:text-lime"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/site"
            className="rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:border-lime hover:text-lime"
          >
            Sitio
          </Link>
          <Link
            href="/"
            target="_blank"
            className="rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-muted transition-colors hover:border-lime hover:text-lime"
          >
            Ver sitio ↗
          </Link>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-widest2 text-muted transition-colors hover:text-lime"
          >
            Salir
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
