import { login } from "@/lib/auth";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6">
      <p className="font-mono text-xs uppercase tracking-widest2 text-muted">
        Admin
      </p>
      <h1 className="mt-4 font-serif text-4xl uppercase leading-[0.95] text-cream">
        Ingresar
      </h1>

      <form action={login} className="mt-8 flex flex-col gap-4">
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          autoFocus
          required
          className="rounded-xl border border-line/30 bg-transparent px-4 py-3 text-cream placeholder:text-muted focus:border-lime focus:outline-none"
        />

        {searchParams.error === "wrong" && (
          <p className="font-mono text-xs text-red-400">
            Contraseña incorrecta.
          </p>
        )}
        {searchParams.error === "config" && (
          <p className="font-mono text-xs text-red-400">
            Faltan variables de entorno (ADMIN_PASSWORD / ADMIN_SESSION_SECRET)
            en la configuración de Vercel.
          </p>
        )}

        <button
          type="submit"
          className="rounded-xl bg-lime px-4 py-3 font-mono text-xs uppercase tracking-widest2 text-ink transition-transform duration-300 ease-editorial hover:-translate-y-0.5"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
