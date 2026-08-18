import Link from "next/link";
import { Project } from "@/lib/types";
import PlaceholderMedia from "./PlaceholderMedia";

type Props = {
  project: Project;
};

export default function NextProjectLink({ project }: Props) {
  return (
    <Link
      href={`/work/${project.collection}/${project.slug}`}
      data-cursor="Ver proyecto"
      className="group relative block h-[70vh] w-full overflow-hidden"
    >
      <PlaceholderMedia
        item={project.coverImage}
        fallbackLabel={`Preview pendiente — ${project.title}`}
        className="h-full w-full transition-transform duration-700 ease-editorial group-hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/50 transition-colors duration-500 group-hover:bg-ink/60" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-16">
        <span className="font-mono text-xs uppercase tracking-widest2 text-lime transition-colors duration-500">
          Siguiente proyecto
        </span>
        <span className="mt-3 inline-flex items-baseline gap-4 font-serif text-5xl text-white transition-transform duration-500 ease-editorial group-hover:translate-x-3 md:text-8xl">
          {project.title}
          <span aria-hidden className="text-lime transition-transform duration-500 ease-editorial group-hover:translate-x-2">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
