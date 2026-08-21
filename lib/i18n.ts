import { Locale } from "./types";

// Nota: este módulo NO importa next/headers a propósito. Lo usan tanto
// Server Components como Client Components (Gallery, MediaGrid, etc.) —
// si importara cookies() acá, Next.js rompería el bundle de cualquier
// componente cliente que solo necesita t()/pick(). getLocale() (que sí
// necesita cookies()) vive aparte, en lib/get-locale.ts.
export const LOCALE_COOKIE = "locale";
export const DEFAULT_LOCALE: Locale = "es";

// ---------------------------------------------------------------------------
// Textos fijos de la interfaz (no editables desde /admin — son la
// "cáscara" del sitio, no el contenido que carga Leandro).
// ---------------------------------------------------------------------------

export const dict = {
  es: {
    nav_work: "Trabajos",
    nav_about: "Sobre mí",
    nav_contact: "Contacto",
    nav_edit: "Editar",
    home_journey: "Un recorrido profesional contado en cuatro etapas, en orden cronológico.",
    work_label: "Trabajos",
    view_stage: "Ver etapa",
    view_project: "Ver proyecto",
    no_projects_yet: "Todavía no hay proyectos cargados en esta etapa.",
    client: "Cliente",
    year: "Año",
    year_pending: "Pendiente",
    category_pending: "Categoría pendiente",
    photo_pending: "Foto pendiente",
    cover_pending: "Portada pendiente",
    services: "Servicios",
    section_video: "Video",
    section_photography: "Fotografía",
    section_process: "Proceso",
    section_results: "Resultado",
    fullscreen: "Fullscreen",
    pending_media: "Contenido audiovisual pendiente de carga para este proyecto.",
    website: "Sitio web",
    instagram: "Instagram",
    next_project: "Siguiente proyecto",
    about_title: "About",
    about_heading_1: "Quien",
    about_heading_2: "Soy?",
    about_intro_pill: "Introduction",
    contact_title: "Contact",
    contact_heading: "Trabajemos juntos",
    contact_go: "Ir",
    footer_copy: "Leandro Fae",
    not_found_title: "Página no encontrada",
    not_found_body: "El contenido que buscás no existe o todavía no fue publicado.",
    not_found_back: "Volver al inicio",
    ampliar: "Ampliar",
    cerrar: "Cerrar",
    anterior: "Anterior",
    siguiente: "Siguiente",
  },
  en: {
    nav_work: "Work",
    nav_about: "About",
    nav_contact: "Contact",
    nav_edit: "Edit",
    home_journey: "A professional journey told in four chapters, in chronological order.",
    work_label: "Work",
    view_stage: "View chapter",
    view_project: "View project",
    no_projects_yet: "No projects loaded for this chapter yet.",
    client: "Client",
    year: "Year",
    year_pending: "Pending",
    category_pending: "Category pending",
    photo_pending: "Photo pending",
    cover_pending: "Cover pending",
    services: "Services",
    section_video: "Video",
    section_photography: "Photography",
    section_process: "Process",
    section_results: "Results",
    fullscreen: "Fullscreen",
    pending_media: "Audiovisual content pending upload for this project.",
    website: "Website",
    instagram: "Instagram",
    next_project: "Next project",
    about_title: "About",
    about_heading_1: "Who",
    about_heading_2: "Am I?",
    about_intro_pill: "Introduction",
    contact_title: "Contact",
    contact_heading: "Let's work together",
    contact_go: "Go",
    footer_copy: "Leandro Fae",
    not_found_title: "Page not found",
    not_found_body: "This content doesn't exist or hasn't been published yet.",
    not_found_back: "Back to home",
    ampliar: "Enlarge",
    cerrar: "Close",
    anterior: "Previous",
    siguiente: "Next",
  },
} as const;

export type DictKey = keyof typeof dict.es;

export function t(locale: Locale, key: DictKey): string {
  return dict[locale][key];
}

/** Devuelve el valor en el idioma actual de un campo Localized<T>. */
export function pick<T>(locale: Locale, value: { es: T; en: T } | undefined, fallback: T): T {
  if (!value) return fallback;
  return value[locale] ?? value.es ?? fallback;
}

/**
 * category es un string[] sin traducir (nombres propios como "Photography").
 * Cuando está vacío, o todavía tiene el placeholder viejo en español, se
 * muestra el texto "pendiente" en el idioma actual en vez de dejarlo fijo.
 */
export function pickCategory(locale: Locale, category: string[]): string {
  const real = category.filter((c) => c !== "Categoría pendiente");
  if (real.length === 0) return t(locale, "category_pending");
  return real.join(" / ");
}
