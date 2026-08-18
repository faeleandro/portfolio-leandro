import Link from "next/link";
import { getSite } from "@/lib/site";

const pillClass =
  "group relative overflow-hidden rounded-full border border-line/30 px-4 py-2 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors duration-500 ease-editorial hover:text-ink";

function PillFill() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 -z-10 origin-left scale-x-0 bg-lime transition-transform duration-500 ease-editorial group-hover:scale-x-100"
    />
  );
}

export default async function SiteHeader() {
  const site = await getSite();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/10 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href="/" className={pillClass}>
          <PillFill />
          {site.name}
        </Link>
        <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-cream sm:gap-3">
          <Link href="/#work" className={pillClass}>
            <PillFill />
            Work
          </Link>
          <Link href="/about" className={pillClass}>
            <PillFill />
            About
          </Link>
          <Link href="/contact" className={pillClass}>
            <PillFill />
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
