import Link from "next/link";
import { Project, Locale } from "@/lib/types";
import { t } from "@/lib/i18n";
import PlaceholderMedia from "./PlaceholderMedia";

type Props = {
  project: Project;
  locale: Locale;
};

export default function NextProjectLink({ project, locale }: Props) {
  return (
    <Link
      href={`/work/${project.collection}/${project.slug}`}
      data-cursor={t(locale, "view_project")}
      className="group relative block h-[70vh] w-full overflow-hidden"
    >
      <PlaceholderMedia
        item={project.coverImage}
        fallbackLabel={`${locale === "en" ? "Preview pending" : "Preview pendiente"} — ${project.title}`}
        className="h-full w-full transition-transform duration-700 ease-editorial group-hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/50 transition-colors duration-500 group-hover:bg-ink/60" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-16">
        <span className="font-mono text-xs uppercase tracking-widest2 text-lime transition-colors duration-500">
          {t(locale, "next_project")}
        </span>
        <span className="mt-3 flex max-w-full flex-wrap items-baseline gap-4 break-words font-serif text-4xl text-white transition-transform duration-500 ease-editorial group-hover:translate-x-3 sm:text-5xl md:text-8xl">
          {project.title}
          <span aria-hidden className="text-lime transition-transform duration-500 ease-editorial group-hover:translate-x-2">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
