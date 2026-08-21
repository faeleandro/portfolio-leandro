// ---------------------------------------------------------------------------
// Modelo de datos del portfolio.
//
// Nada de esto es obligatorio salvo lo mínimo (slug, title). Un proyecto
// puede tener video y no fotos, fotos y no proceso, resultado y no proceso,
// etc. Cada sección de la página de proyecto se muestra únicamente si hay
// datos para esa sección — si el campo está vacío o no existe, la sección
// simplemente no se renderiza.
//
// El sitio es bilingüe (español/inglés): los campos de texto largo/prosa
// (bio, descripciones, roles) se escriben en los dos idiomas por separado
// desde /admin — ver Localized<string> más abajo. Nombres propios (título
// del proyecto, cliente, categorías) no se traducen.
// ---------------------------------------------------------------------------

export type Locale = "es" | "en";

/** Un mismo valor, uno por idioma. */
export type Localized<T> = { es: T; en: T };

export type MediaItem = {
  /** Ruta dentro de /public, ej: "/work/beerlin/proceso-01.jpg". Si no hay
   * src todavía, se muestra un placeholder claramente identificado. */
  src?: string;
  /** Para videos: imagen de portada mientras carga. */
  poster?: string;
  /** "image" | "video". Si no se especifica, se infiere por la extensión de src. */
  type?: "image" | "video";
  alt?: string;
  caption?: string;
};

export type Collection = {
  slug: string;
  /** Orden cronológico de aparición. No implica jerarquía de importancia. */
  order: number;
  title: string;
  /** Rol o forma de trabajo durante esta etapa. */
  role?: Localized<string>;
  description?: Localized<string>;
  coverImage?: MediaItem;
};

export type Project = {
  /** Identificador único dentro de su colección, usado en la URL. */
  slug: string;
  collection: string;
  title: string;
  client?: string;
  year?: number | string;
  /** Etiquetas cortas para el listado editorial, ej: ["Content", "Photography", "Filmmaking"] */
  category: string[];
  /** Detalle más largo de servicios realizados, si difiere de "category". */
  services?: string[];
  description?: Localized<string>;
  coverImage?: MediaItem;
  heroVideo?: MediaItem;
  images?: MediaItem[];
  videos?: MediaItem[];
  process?: MediaItem[];
  results?: MediaItem[];
  website?: string;
  instagram?: string;
};

export type SiteData = {
  name: string;
  handle: string;
  role: Localized<string>;
  email: string;
  instagram?: string;
  linkedin?: string;
  whatsapp?: string;
  photo?: MediaItem;
  /** Párrafos de la bio en /about (uno por elemento), por idioma. */
  bio: Localized<string[]>;
};

export type ContentData = {
  site: SiteData;
  collections: Collection[];
  projects: Project[];
};
