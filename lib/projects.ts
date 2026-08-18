import { MediaItem, Project } from "./types";
import { SITE } from "./site";

// ---------------------------------------------------------------------------
// CÓMO AGREGAR UN PROYECTO NUEVO
//
// 1. Copiá un objeto de acá abajo como plantilla.
// 2. Completá los campos que tengas (los que no tengas, simplemente no los
//    pongas — la web se adapta sola).
// 3. Poné las fotos/videos reales en /public/work/<slug>/... y reemplazá
//    los "src" de placeholder por esas rutas.
// 4. Agregá el objeto al array PROJECTS, en el lugar del array donde quieras
//    que aparezca dentro de su colección (el orden del array es el orden de
//    "siguiente proyecto" y el orden del listado editorial).
//
// No hay que tocar ningún componente ni ninguna otra página: todo lo demás
// (listados, rutas, "siguiente proyecto") se genera automáticamente a partir
// de este array. Ver README.md para más detalle.
// ---------------------------------------------------------------------------

/** Genera N placeholders de foto claramente identificados como pendientes. */
function placeholderImages(count: number, label: string): MediaItem[] {
  return Array.from({ length: count }, (_, i) => ({
    type: "image" as const,
    alt: `Foto pendiente — ${label} ${String(i + 1).padStart(2, "0")}`,
  }));
}

const DESCRIPCION_PENDIENTE = `Descripción pendiente — ${SITE.name} va a agregar el detalle de este proyecto.`;

export const PROJECTS: Project[] = [
  // ---------------------------------------------------------------------
  // 01 — RE! ESTUDIO CREATIVO
  // ---------------------------------------------------------------------
  {
    slug: "el-gordo-alarco",
    collection: "re-estudio-creativo",
    title: "El Gordo Alarco",
    client: "El Gordo Alarco",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
    images: placeholderImages(10, "Gordo Alarco"),
  },
  {
    slug: "shikko",
    collection: "re-estudio-creativo",
    title: "Shikko",
    client: "Shikko",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
    images: placeholderImages(10, "Shikko"),
  },
  {
    slug: "la-lucia",
    collection: "re-estudio-creativo",
    title: "La Lucía",
    client: "La Lucía",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
    images: placeholderImages(10, "La Lucía"),
  },
  {
    slug: "paisana",
    collection: "re-estudio-creativo",
    title: "Paisana",
    client: "Paisana",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "cielito-comida-mexicana",
    collection: "re-estudio-creativo",
    title: "Cielito Comida Mexicana",
    client: "Cielito Comida Mexicana",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "cordillera-motorhome",
    collection: "re-estudio-creativo",
    title: "Cordillera Motorhome",
    client: "Cordillera Motorhome",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },

  // ---------------------------------------------------------------------
  // 02 — ALMAGOURMET
  // ---------------------------------------------------------------------
  {
    slug: "gulerie",
    collection: "almagourmet",
    title: "Gulerie",
    client: "Gulerie",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "premium-tower",
    collection: "almagourmet",
    title: "Premium Tower",
    client: "Premium Tower",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "tower-bar",
    collection: "almagourmet",
    title: "Tower Bar",
    client: "Tower Bar",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "cafeteria-argentina",
    collection: "almagourmet",
    title: "Cafetería Argentina",
    client: "Cafetería Argentina",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "faro-bristro",
    collection: "almagourmet",
    title: "Faro Bristro",
    client: "Faro Bristro",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "faro-brill",
    collection: "almagourmet",
    title: "Faro Brill",
    client: "Faro Brill",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },

  // ---------------------------------------------------------------------
  // 03 — TRABAJOS INDEPENDIENTES
  // ---------------------------------------------------------------------
  {
    slug: "pato-coffee",
    collection: "trabajos-independientes",
    title: "Pato Coffee",
    client: "Pato Coffee",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "bocon",
    collection: "trabajos-independientes",
    title: "Bocón",
    client: "Bocón",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "bar-cafe-proyecto-1",
    collection: "trabajos-independientes",
    title: "Bar Café — Proyecto 1",
    client: "Bar Café",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },
  {
    slug: "paulette-y-plantine",
    collection: "trabajos-independientes",
    title: "Paulette & Plantine",
    client: "Paulette & Plantine",
    category: ["Categoría pendiente"],
    description: DESCRIPCION_PENDIENTE,
  },

  // ---------------------------------------------------------------------
  // 04 — AGENCIA WEDO
  // Los cuatro proyectos de esta etapa (rol: Community Manager) reciben el
  // mismo tratamiento entre sí. El orden acá abajo es el que define la
  // cadena de "siguiente proyecto": Beerlin → Napo → Loff → Al Fuego.
  // ---------------------------------------------------------------------
  {
    slug: "beerlin",
    collection: "agencia-wedo",
    title: "Beerlin",
    client: "Beerlin",
    category: ["Content", "Photography", "Filmmaking"],
    description: DESCRIPCION_PENDIENTE,
    heroVideo: { type: "video", alt: "Video pendiente — Beerlin" },
    images: placeholderImages(6, "Beerlin"),
  },
  {
    slug: "napo",
    collection: "agencia-wedo",
    title: "Napo",
    client: "Napo",
    category: ["Content", "Photography", "Social Media"],
    description: DESCRIPCION_PENDIENTE,
    heroVideo: { type: "video", alt: "Video pendiente — Napo" },
    images: placeholderImages(6, "Napo"),
  },
  {
    slug: "loff",
    collection: "agencia-wedo",
    title: "Loff",
    client: "Loff",
    category: ["Campaign", "Content", "Photography"],
    description: DESCRIPCION_PENDIENTE,
    heroVideo: { type: "video", alt: "Video pendiente — Loff" },
    images: placeholderImages(6, "Loff"),
  },
  {
    slug: "al-fuego",
    collection: "agencia-wedo",
    title: "Al Fuego",
    client: "Al Fuego",
    category: ["Content", "Photography", "Filmmaking"],
    description: DESCRIPCION_PENDIENTE,
    heroVideo: { type: "video", alt: "Video pendiente — Al Fuego" },
    images: placeholderImages(6, "Al Fuego"),
  },
];

// ---------------------------------------------------------------------------
// Helpers — no hace falta tocar nada de acá para agregar proyectos.
// ---------------------------------------------------------------------------

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectsByCollection(collectionSlug: string): Project[] {
  return PROJECTS.filter((p) => p.collection === collectionSlug);
}

export function getProjectBySlug(
  collectionSlug: string,
  projectSlug: string
): Project | undefined {
  return PROJECTS.find(
    (p) => p.collection === collectionSlug && p.slug === projectSlug
  );
}

/**
 * Siguiente proyecto en el orden global (el orden en que aparecen acá
 * arriba, recorriendo las 4 colecciones en orden cronológico). Al llegar al
 * final, vuelve a empezar por el primero. Cualquier proyecto nuevo que se
 * agregue al array pasa a formar parte de esta cadena automáticamente.
 */
export function getNextProject(currentSlug: string): Project | undefined {
  const index = PROJECTS.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return undefined;
  const nextIndex = (index + 1) % PROJECTS.length;
  return PROJECTS[nextIndex];
}
