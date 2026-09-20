import { MetadataRoute } from "next";
import { components } from "@/registry";
import { absoluteUrl } from "@/lib/site";
import { componentCollections } from "@/lib/component-collections";

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/docs"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/docs/mcp"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const componentSitemap: MetadataRoute.Sitemap = Object.keys(components).map(
    (slug) => ({
      url: absoluteUrl(`/docs/components/${slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  const collectionPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/collections") },
    ...componentCollections.map(({ slug }) => ({ url: absoluteUrl(`/collections/${slug}`) })),
  ];

  return [...staticPages, ...componentSitemap, ...collectionPages];
}
