import { getContent } from "./content";
import { Project } from "./types";

export async function getAllProjects(): Promise<Project[]> {
  const content = await getContent();
  return content.projects;
}

export async function getProjectsByCollection(
  collectionSlug: string
): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.collection === collectionSlug);
}

export async function getProjectBySlug(
  collectionSlug: string,
  projectSlug: string
): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find(
    (p) => p.collection === collectionSlug && p.slug === projectSlug
  );
}

/**
 * Siguiente proyecto en el orden global (el orden en que aparecen en el
 * array, recorriendo las colecciones en orden cronológico). Al llegar al
 * final, vuelve a empezar por el primero.
 */
export async function getNextProject(
  currentSlug: string
): Promise<Project | undefined> {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return undefined;
  const nextIndex = (index + 1) % projects.length;
  return projects[nextIndex];
}
