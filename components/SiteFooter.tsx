import Link from "next/link";
import { getSite } from "@/lib/site";

export default async function SiteFooter() {
  const site = await getSite();

  return (
    <footer className="border-t border-line/15 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 font-mono text-xs uppercase tracking-widest2 text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <div className="flex gap-6">
          <Link href="/#work" className="hover:text-lime">
            Work
          </Link>
          <Link href="/about" className="hover:text-lime">
            About
          </Link>
          <Link href="/contact" className="hover:text-lime">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
