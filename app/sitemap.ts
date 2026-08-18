import type { MetadataRoute } from "next";
import { getCollections } from "@/lib/collections";
import { getAllProjects } from "@/lib/projects";

// Set NEXT_PUBLIC_SITE_URL in your hosting provider's env vars once the
// site has a real domain (e.g. https://leandrofae.dev). Falls back to a
// placeholder so `next build` never fails locally.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, projects] = await Promise.all([
    getCollections(),
    getAllProjects(),
  ]);

  const staticRoutes = ["", "/about", "/contact"].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${BASE_URL}/work/${c.slug}`,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${BASE_URL}/work/${p.collection}/${p.slug}`,
  }));

  return [...staticRoutes, ...collectionRoutes, ...projectRoutes];
}
