import { getContent } from "./content";
import { Collection } from "./types";

export async function getCollections(): Promise<Collection[]> {
  const content = await getContent();
  return [...content.collections].sort((a, b) => a.order - b.order);
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | undefined> {
  const collections = await getCollections();
  return collections.find((c) => c.slug === slug);
}
