import { ContentData, MediaItem } from "./types";

// ---------------------------------------------------------------------------
// Contenido inicial ("semilla"). Se usa una sola vez, la primera vez que se
// guarda algo desde /admin — a partir de ahí toda la data real vive en
// Vercel Blob (ver lib/content.ts) y este archivo deja de tener efecto.
// También sirve como fallback si Vercel Blob todavía no está configurado
// (ej: corriendo el proyecto en una máquina nueva sin las variables de
// entorno), para que el sitio nunca se rompa por falta de datos.
// ---------------------------------------------------------------------------

function placeholderImages(count: number, label: string): MediaItem[] {
  return Array.from({ length: count }, (_, i) => ({
    type: "image" as const,
    alt: `Foto pendiente — ${label} ${String(i + 1).padStart(2, "0")}`,
  }));
}

const NOMBRE = "Leandro Fae";
const DESCRIPCION_PROYECTO_PENDIENTE = `Descripción pendiente — ${NOMBRE} va a agregar el detalle de este proyecto.`;
const DESCRIPCION_ETAPA_PENDIENTE = `Descripción pendiente — ${NOMBRE} va a agregar el detalle de esta etapa.`;

export const SEED_CONTENT: ContentData = {
  site: {
    name: NOMBRE,
    handle: "@leanfae",
    role: "Creador de contenido visual / Fotografía y producción audiovisual",
    email: "Faeleandro9@gmail.com",
    instagram: "https://www.instagram.com/leanfae",
    linkedin: undefined,
    whatsapp: "+54 9 2617 48-6501",
    photo: { alt: NOMBRE },
    bio: [
      `Soy ${NOMBRE}, creador de contenido visual especializado en fotografía y producción audiovisual orientada a marcas, gastronomía, moda y proyectos con identidad propia.`,
      "Mi enfoque creativo nace de la búsqueda constante por capturar momentos reales y transformarlos en historias visuales que generen conexión. Me interesa crear imágenes que transmitan sensaciones, personalidad y estilo, combinando una estética urbana con una mirada cinematográfica y natural.",
      "A lo largo de mi recorrido profesional fui desarrollando proyectos de contenido para redes sociales, ayudando a negocios y marcas a comunicar su esencia a través de producciones visuales modernas, dinámicas y auténticas. Mi trabajo se caracteriza por buscar siempre un equilibrio entre lo artístico y lo estratégico, entendiendo la importancia de crear contenido que no solo se vea bien, sino que también genere impacto y alcance.",
      "Gran parte de mi crecimiento creativo estuvo influenciado por mis experiencias viviendo y trabajando en Chile y Brasil, donde tuve la oportunidad de convivir con nuevas culturas, estilos visuales y formas de comunicación. Estos viajes marcaron mi manera de observar los detalles, la luz, las personas y los espacios, aportando una mirada más amplia y versátil a mis producciones.",
      "Actualmente me enfoco en desarrollar contenido que refleje la identidad de cada marca o proyecto, priorizando la autenticidad, la estética y la conexión con el público. Disfruto trabajar en entornos dinámicos, explorando nuevas ideas y generando propuestas visuales que transmitan emociones y construyan una identidad sólida.",
      "Entiendo la fotografía y el video como herramientas para contar historias, crear experiencias y dejar una huella visual que represente verdaderamente a cada proyecto con el que trabajo.",
    ],
  },

  collections: [
    {
      slug: "re-estudio-creativo",
      order: 1,
      title: "RE! Estudio Creativo",
      role: "Creador de contenido",
      description: DESCRIPCION_ETAPA_PENDIENTE,
    },
    {
      slug: "almagourmet",
      order: 2,
      title: "Almagourmet",
      role: "Diseñador gráfico / Editor de video / Creador de contenido",
      description: DESCRIPCION_ETAPA_PENDIENTE,
    },
    {
      slug: "trabajos-independientes",
      order: 3,
      title: "Trabajos Independientes",
      role: "Proyectos realizados de manera independiente",
      description: DESCRIPCION_ETAPA_PENDIENTE,
    },
    {
      slug: "agencia-wedo",
      order: 4,
      title: "Agencia Wedo",
      role: "Community Manager",
      description: DESCRIPCION_ETAPA_PENDIENTE,
    },
  ],

  projects: [
    // 01 — RE! ESTUDIO CREATIVO
    {
      slug: "el-gordo-alarco",
      collection: "re-estudio-creativo",
      title: "El Gordo Alarco",
      client: "El Gordo Alarco",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      images: placeholderImages(10, "Gordo Alarco"),
    },
    {
      slug: "shikko",
      collection: "re-estudio-creativo",
      title: "Shikko",
      client: "Shikko",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      images: placeholderImages(10, "Shikko"),
    },
    {
      slug: "la-lucia",
      collection: "re-estudio-creativo",
      title: "La Lucía",
      client: "La Lucía",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      coverImage: { src: "/work/la-lucia/foto-01.jpg", alt: "La Lucía" },
      images: Array.from({ length: 10 }, (_, i) => ({
        type: "image" as const,
        src: `/work/la-lucia/foto-${String(i + 1).padStart(2, "0")}.jpg`,
        alt: `La Lucía ${String(i + 1).padStart(2, "0")}`,
      })),
    },
    {
      slug: "paisana",
      collection: "re-estudio-creativo",
      title: "Paisana",
      client: "Paisana",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "cielito-comida-mexicana",
      collection: "re-estudio-creativo",
      title: "Cielito Comida Mexicana",
      client: "Cielito Comida Mexicana",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "cordillera-motorhome",
      collection: "re-estudio-creativo",
      title: "Cordillera Motorhome",
      client: "Cordillera Motorhome",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },

    // 02 — ALMAGOURMET
    {
      slug: "gulerie",
      collection: "almagourmet",
      title: "Gulerie",
      client: "Gulerie",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "premium-tower",
      collection: "almagourmet",
      title: "Premium Tower",
      client: "Premium Tower",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "tower-bar",
      collection: "almagourmet",
      title: "Tower Bar",
      client: "Tower Bar",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "cafeteria-argentina",
      collection: "almagourmet",
      title: "Cafetería Argentina",
      client: "Cafetería Argentina",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "faro-bristro",
      collection: "almagourmet",
      title: "Faro Bristro",
      client: "Faro Bristro",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "faro-brill",
      collection: "almagourmet",
      title: "Faro Brill",
      client: "Faro Brill",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },

    // 03 — TRABAJOS INDEPENDIENTES
    {
      slug: "pato-coffee",
      collection: "trabajos-independientes",
      title: "Pato Coffee",
      client: "Pato Coffee",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      heroVideo: { type: "video", src: "/work/pato-coffee/video.mp4", alt: "Pato Coffee" },
    },
    {
      slug: "bocon",
      collection: "trabajos-independientes",
      title: "Bocón",
      client: "Bocón",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "bar-cafe-proyecto-1",
      collection: "trabajos-independientes",
      title: "Bar Café — Proyecto 1",
      client: "Bar Café",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "paulette-y-plantine",
      collection: "trabajos-independientes",
      title: "Paulette & Plantine",
      client: "Paulette & Plantine",
      category: ["Categoría pendiente"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },

    // 04 — AGENCIA WEDO
    {
      slug: "beerlin",
      collection: "agencia-wedo",
      title: "Beerlin",
      client: "Beerlin",
      category: ["Content", "Photography", "Filmmaking"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      heroVideo: { type: "video", alt: "Video pendiente — Beerlin" },
      images: placeholderImages(6, "Beerlin"),
    },
    {
      slug: "napo",
      collection: "agencia-wedo",
      title: "Napo",
      client: "Napo",
      category: ["Content", "Photography", "Social Media"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      heroVideo: { type: "video", alt: "Video pendiente — Napo" },
      images: placeholderImages(6, "Napo"),
    },
    {
      slug: "loff",
      collection: "agencia-wedo",
      title: "Loff",
      client: "Loff",
      category: ["Campaign", "Content", "Photography"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      heroVideo: { type: "video", alt: "Video pendiente — Loff" },
      images: placeholderImages(6, "Loff"),
    },
    {
      slug: "al-fuego",
      collection: "agencia-wedo",
      title: "Al Fuego",
      client: "Al Fuego",
      category: ["Content", "Photography", "Filmmaking"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      heroVideo: { type: "video", alt: "Video pendiente — Al Fuego" },
      images: placeholderImages(6, "Al Fuego"),
    },
  ],
};
