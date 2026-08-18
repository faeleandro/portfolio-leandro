import type { Metadata } from "next";
import { getSite } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: `Contact — ${site.name}`,
    description: `Contactá a ${site.name}.`,
  };
}

export default async function ContactPage() {
  const site = await getSite();

  const links = [
    { label: "Email", href: `mailto:${site.email}`, value: site.email },
    site.instagram
      ? { label: "Instagram", href: site.instagram, value: site.handle }
      : null,
    site.linkedin
      ? { label: "LinkedIn", href: site.linkedin, value: site.linkedin }
      : null,
    site.whatsapp
      ? {
          label: "WhatsApp",
          href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`,
          value: site.whatsapp,
        }
      : null,
  ].filter(Boolean) as { label: string; href: string; value: string }[];

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
      <p className="font-mono text-xs uppercase tracking-widest2 text-muted">
        Contact
      </p>
      <h1 className="mt-4 font-serif text-4xl uppercase leading-[1.05] tracking-tight text-cream md:text-6xl">
        Trabajemos juntos
      </h1>

      <ul className="mt-12 border-t border-line/15">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              data-cursor="Ir"
              className="group relative flex items-baseline justify-between overflow-hidden border-b border-line/15 px-4 py-5 font-mono text-sm uppercase tracking-widest2 transition-colors duration-500 ease-editorial md:px-6"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-editorial group-hover:scale-x-100"
              />
              <span className="text-muted transition-colors duration-500 ease-editorial group-hover:text-ink/70">
                {link.label}
              </span>
              <span className="text-cream transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-ink">
                {link.value} →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
