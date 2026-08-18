import { getContent } from "./content";
import { SiteData } from "./types";

/** Datos generales del sitio (nombre, rol, contacto). Editables desde /admin. */
export async function getSite(): Promise<SiteData> {
  const content = await getContent();
  return content.site;
}
