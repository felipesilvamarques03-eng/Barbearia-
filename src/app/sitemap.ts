import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { publishedProjects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/servicos`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/solucoes`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/sobre`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];
  const cases = publishedProjects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...pages, ...cases];
}
