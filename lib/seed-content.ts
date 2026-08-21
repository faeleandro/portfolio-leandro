import { ContentData, Localized, MediaItem } from "./types";

// ---------------------------------------------------------------------------
// Contenido inicial ("semilla"). Se usa una sola vez, la primera vez que se
// guarda algo desde /admin — a partir de ahí toda la data real vive en
// Vercel Blob (ver lib/content.ts) y este archivo deja de tener efecto.
// También sirve como fallback si Vercel Blob todavía no está configurado
// (ej: corriendo el proyecto en una máquina nueva sin las variables de
// entorno), para que el sitio nunca se rompa por falta de datos.
// ---------------------------------------------------------------------------

// Sin "alt" a propósito: así los componentes (Gallery, etc.) muestran su
// propio texto "pendiente" en el idioma actual en vez de dejarlo fijo en
// español acá.
function placeholderImages(count: number): MediaItem[] {
  return Array.from({ length: count }, () => ({ type: "image" as const }));
}

const NOMBRE = "Leandro Fae";

const DESCRIPCION_PROYECTO_PENDIENTE: Localized<string> = {
  es: `Descripción pendiente — ${NOMBRE} va a agregar el detalle de este proyecto.`,
  en: `Description pending — ${NOMBRE} will add the details for this project soon.`,
};

const DESCRIPCION_ETAPA_PENDIENTE: Localized<string> = {
  es: `Descripción pendiente — ${NOMBRE} va a agregar el detalle de esta etapa.`,
  en: `Description pending — ${NOMBRE} will add the details for this chapter soon.`,
};

export const SEED_CONTENT: ContentData = {
  site: {
    name: NOMBRE,
    handle: "@leanfae",
    role: {
      es: "Creador de contenido visual / Fotografía y producción audiovisual",
      en: "Visual content creator / Photography and audiovisual production",
    },
    email: "Faeleandro9@gmail.com",
    instagram: "https://www.instagram.com/leanfae",
    linkedin: undefined,
    whatsapp: "+54 9 2617 48-6501",
    photo: { alt: NOMBRE },
    bio: {
      es: [
        `Soy ${NOMBRE}, creador de contenido visual especializado en fotografía y producción audiovisual orientada a marcas, gastronomía, moda y proyectos con identidad propia.`,
        "Mi enfoque creativo nace de la búsqueda constante por capturar momentos reales y transformarlos en historias visuales que generen conexión. Me interesa crear imágenes que transmitan sensaciones, personalidad y estilo, combinando una estética urbana con una mirada cinematográfica y natural.",
        "A lo largo de mi recorrido profesional fui desarrollando proyectos de contenido para redes sociales, ayudando a negocios y marcas a comunicar su esencia a través de producciones visuales modernas, dinámicas y auténticas. Mi trabajo se caracteriza por buscar siempre un equilibrio entre lo artístico y lo estratégico, entendiendo la importancia de crear contenido que no solo se vea bien, sino que también genere impacto y alcance.",
        "Gran parte de mi crecimiento creativo estuvo influenciado por mis experiencias viviendo y trabajando en Chile y Brasil, donde tuve la oportunidad de convivir con nuevas culturas, estilos visuales y formas de comunicación. Estos viajes marcaron mi manera de observar los detalles, la luz, las personas y los espacios, aportando una mirada más amplia y versátil a mis producciones.",
        "Actualmente me enfoco en desarrollar contenido que refleje la identidad de cada marca o proyecto, priorizando la autenticidad, la estética y la conexión con el público. Disfruto trabajar en entornos dinámicos, explorando nuevas ideas y generando propuestas visuales que transmitan emociones y construyan una identidad sólida.",
        "Entiendo la fotografía y el video como herramientas para contar historias, crear experiencias y dejar una huella visual que represente verdaderamente a cada proyecto con el que trabajo.",
      ],
      en: [
        `I'm ${NOMBRE}, a visual content creator specialized in photography and audiovisual production for brands, gastronomy, fashion, and projects with a distinct identity.`,
        "My creative approach comes from a constant search to capture real moments and turn them into visual stories that create connection. I'm interested in creating images that convey feeling, personality and style, blending an urban aesthetic with a cinematic, natural eye.",
        "Throughout my professional path I've developed content projects for social media, helping businesses and brands communicate their essence through modern, dynamic and authentic visual production. My work always aims for a balance between the artistic and the strategic, understanding that content shouldn't just look good — it should also generate impact and reach.",
        "A big part of my creative growth was shaped by my experience living and working in Chile and Brazil, where I got to engage with new cultures, visual styles and ways of communicating. Those trips shaped how I observe detail, light, people and spaces, bringing a broader, more versatile eye to my work.",
        "Today I focus on developing content that reflects the identity of each brand or project, prioritizing authenticity, aesthetics and connection with the audience. I enjoy working in dynamic environments, exploring new ideas and building visual proposals that convey emotion and construct a solid identity.",
        "I see photography and video as tools to tell stories, create experiences and leave a visual mark that truly represents every project I work on.",
      ],
    },
  },

  collections: [
    {
      slug: "re-estudio-creativo",
      order: 1,
      title: "RE! Estudio Creativo",
      role: { es: "Creador de contenido", en: "Content creator" },
      description: DESCRIPCION_ETAPA_PENDIENTE,
    },
    {
      slug: "almagourmet",
      order: 2,
      title: "Almagourmet",
      role: {
        es: "Diseñador gráfico / Editor de video / Creador de contenido",
        en: "Graphic designer / Video editor / Content creator",
      },
      description: DESCRIPCION_ETAPA_PENDIENTE,
    },
    {
      slug: "trabajos-independientes",
      order: 3,
      title: "Trabajos Independientes",
      role: {
        es: "Proyectos realizados de manera independiente",
        en: "Independently produced projects",
      },
      description: DESCRIPCION_ETAPA_PENDIENTE,
    },
    {
      slug: "agencia-wedo",
      order: 4,
      title: "Agencia Wedo",
      role: { es: "Community Manager", en: "Community Manager" },
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
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      images: placeholderImages(10),
    },
    {
      slug: "shikko",
      collection: "re-estudio-creativo",
      title: "Shikko",
      client: "Shikko",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      images: placeholderImages(10),
    },
    {
      slug: "la-lucia",
      collection: "re-estudio-creativo",
      title: "La Lucía",
      client: "La Lucía",
      category: [],
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
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "cielito-comida-mexicana",
      collection: "re-estudio-creativo",
      title: "Cielito Comida Mexicana",
      client: "Cielito Comida Mexicana",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "cordillera-motorhome",
      collection: "re-estudio-creativo",
      title: "Cordillera Motorhome",
      client: "Cordillera Motorhome",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },

    // 02 — ALMAGOURMET
    {
      slug: "gulerie",
      collection: "almagourmet",
      title: "Gulerie",
      client: "Gulerie",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "premium-tower",
      collection: "almagourmet",
      title: "Premium Tower",
      client: "Premium Tower",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "tower-bar",
      collection: "almagourmet",
      title: "Tower Bar",
      client: "Tower Bar",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "cafeteria-argentina",
      collection: "almagourmet",
      title: "Cafetería Argentina",
      client: "Cafetería Argentina",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "faro-bristro",
      collection: "almagourmet",
      title: "Faro Bristro",
      client: "Faro Bristro",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "faro-brill",
      collection: "almagourmet",
      title: "Faro Brill",
      client: "Faro Brill",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },

    // 03 — TRABAJOS INDEPENDIENTES
    {
      slug: "pato-coffee",
      collection: "trabajos-independientes",
      title: "Pato Coffee",
      client: "Pato Coffee",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      heroVideo: { type: "video", src: "/work/pato-coffee/video.mp4", alt: "Pato Coffee" },
    },
    {
      slug: "bocon",
      collection: "trabajos-independientes",
      title: "Bocón",
      client: "Bocón",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "bar-cafe-proyecto-1",
      collection: "trabajos-independientes",
      title: "Bar Café — Proyecto 1",
      client: "Bar Café",
      category: [],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
    },
    {
      slug: "paulette-y-plantine",
      collection: "trabajos-independientes",
      title: "Paulette & Plantine",
      client: "Paulette & Plantine",
      category: [],
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
      images: placeholderImages(6),
    },
    {
      slug: "napo",
      collection: "agencia-wedo",
      title: "Napo",
      client: "Napo",
      category: ["Content", "Photography", "Social Media"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      heroVideo: { type: "video", alt: "Video pendiente — Napo" },
      images: placeholderImages(6),
    },
    {
      slug: "loff",
      collection: "agencia-wedo",
      title: "Loff",
      client: "Loff",
      category: ["Campaign", "Content", "Photography"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      heroVideo: { type: "video", alt: "Video pendiente — Loff" },
      images: placeholderImages(6),
    },
    {
      slug: "al-fuego",
      collection: "agencia-wedo",
      title: "Al Fuego",
      client: "Al Fuego",
      category: ["Content", "Photography", "Filmmaking"],
      description: DESCRIPCION_PROYECTO_PENDIENTE,
      heroVideo: { type: "video", alt: "Video pendiente — Al Fuego" },
      images: placeholderImages(6),
    },
  ],
};
