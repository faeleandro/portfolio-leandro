import Link from "next/link";
import { getSite } from "@/lib/site";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";
import LanguageSwitcher from "./LanguageSwitcher";

const pillClass =
  "group relative shrink-0 overflow-hidden whitespace-nowrap rounded-full border border-lime/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-lime transition-colors duration-500 ease-editorial hover:text-ink sm:px-4 sm:py-2 sm:text-xs";

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
  const locale = getLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/10 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-4 md:px-10">
        <Link href="/" className={pillClass}>
          <PillFill />
          {site.name}
        </Link>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <nav className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest2 text-lime sm:gap-3">
            <Link href="/#work" className={pillClass}>
              <PillFill />
              {t(locale, "nav_work")}
            </Link>
            <Link href="/about" className={pillClass}>
              <PillFill />
              {t(locale, "nav_about")}
            </Link>
            <Link href="/contact" className={pillClass}>
              <PillFill />
              {t(locale, "nav_contact")}
            </Link>
          </nav>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
