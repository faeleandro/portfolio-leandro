"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/lib/locale-actions";
import { Locale } from "@/lib/types";

type Props = {
  locale: Locale;
};

/** Pill ES/EN — cambia el idioma de todo el sitio (queda guardado en una cookie). */
export default function LanguageSwitcher({ locale }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale || isPending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div className="flex shrink-0 items-center overflow-hidden rounded-full border border-lime/40 font-mono text-[11px] uppercase tracking-widest2 sm:text-xs">
      <button
        type="button"
        onClick={() => switchTo("es")}
        disabled={isPending}
        aria-current={locale === "es"}
        className={`px-3 py-1.5 transition-colors duration-300 sm:px-3.5 sm:py-2 ${
          locale === "es" ? "bg-lime text-ink" : "text-lime hover:text-ink hover:bg-lime/60"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        disabled={isPending}
        aria-current={locale === "en"}
        className={`px-3 py-1.5 transition-colors duration-300 sm:px-3.5 sm:py-2 ${
          locale === "en" ? "bg-lime text-ink" : "text-lime hover:text-ink hover:bg-lime/60"
        }`}
      >
        EN
      </button>
    </div>
  );
}
