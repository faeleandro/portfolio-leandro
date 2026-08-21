import Link from "next/link";
import { getSite } from "@/lib/site";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";

export default async function SiteFooter() {
  const site = await getSite();
  const locale = getLocale();

  return (
    <footer className="border-t border-line/15 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 font-mono text-xs uppercase tracking-widest2 text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <div className="flex gap-6">
          <Link href="/#work" className="hover:text-lime">
            {t(locale, "nav_work")}
          </Link>
          <Link href="/about" className="hover:text-lime">
            {t(locale, "nav_about")}
          </Link>
          <Link href="/contact" className="hover:text-lime">
            {t(locale, "nav_contact")}
          </Link>
          <Link href="/admin" className="hover:text-lime">
            {t(locale, "nav_edit")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
