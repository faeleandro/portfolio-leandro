import { Collection } from "./types";
import { SITE } from "./site";

// ---------------------------------------------------------------------------
// Las 4 etapas del recorrido profesional. Orden puramente cronológico —
// ninguno de estos bloques tiene más peso visual ni jerárquico que otro.
// Si en algún momento agregás una quinta etapa, sumala acá con el "order"
// que corresponda; el resto de la web (home, navegación) se actualiza sola.
// ---------------------------------------------------------------------------

export const COLLECTIONS: Collection[] = [
  {
    slug: "re-estudio-creativo",
    order: 1,
    title: "RE! Estudio Creativo",
    role: "Creador de contenido",
    description: `Descripción pendiente — ${SITE.name} va a agregar el detalle de esta etapa.`,
  },
  {
    slug: "almagourmet",
    order: 2,
    title: "Almagourmet",
    role: "Diseñador gráfico / Editor de video / Creador de contenido",
    description: `Descripción pendiente — ${SITE.name} va a agregar el detalle de esta etapa.`,
  },
  {
    slug: "trabajos-independientes",
    order: 3,
    title: "Trabajos Independientes",
    role: "Proyectos realizados de manera independiente",
    description: `Descripción pendiente — ${SITE.name} va a agregar el detalle de esta etapa.`,
  },
  {
    slug: "agencia-wedo",
    order: 4,
    title: "Agencia Wedo",
    role: "Community Manager",
    description: `Descripción pendiente — ${SITE.name} va a agregar el detalle de esta etapa.`,
  },
];

export function getCollections(): Collection[] {
  return [...COLLECTIONS].sort((a, b) => a.order - b.order);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
