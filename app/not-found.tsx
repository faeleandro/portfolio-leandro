import Link from "next/link";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";

export default function NotFound() {
  const locale = getLocale();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-6 py-28 md:px-10 md:py-40">
      <p className="font-mono text-xs uppercase tracking-widest2 text-muted">404</p>
      <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
        {t(locale, "not_found_title")}
      </h1>
      <p className="mt-6 max-w-md text-sm text-muted md:text-base">
        {t(locale, "not_found_body")}
      </p>
      <Link
        href="/"
        className="mt-10 border-b border-line/15 pb-1 font-mono text-xs uppercase tracking-widest2 text-cream transition-colors hover:text-lime"
      >
        {t(locale, "not_found_back")} →
      </Link>
    </div>
  );
}
