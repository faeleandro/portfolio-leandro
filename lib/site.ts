import { MediaItem } from "./types";

// Datos generales del sitio. Editá esto para actualizar nombre, rol y
// contacto sin tocar ningún componente.
export const SITE = {
  name: "Leandro Fae",
  handle: "@leanfae",
  role: "Creador de contenido visual / Fotografía y producción audiovisual",
  email: "Faeleandro9@gmail.com",
  instagram: "https://www.instagram.com/leanfae",
  linkedin: undefined as string | undefined,
  whatsapp: "https://wa.me/5492617486501",
  // Foto de perfil para la portada — completá "src" cuando la subas a
  // /public/leandro.jpg (o el nombre que prefieras).
  photo: { alt: "Leandro Fae" } as MediaItem,
};
