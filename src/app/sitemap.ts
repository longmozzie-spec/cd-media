import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/common";
import { news } from "@/data/news";
import { projects } from "@/data/projects";
import { careers } from "@/data/careers";

// Sitemap tĩnh dựng từ dữ liệu seed (an toàn khi build, không phụ thuộc DB).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
      { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${siteUrl}/services/san-xuat-media`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${siteUrl}/services/truyen-thong`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${siteUrl}/services/marketing-tong-the`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${siteUrl}/projects`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${siteUrl}/news`, changeFrequency: "daily", priority: 0.8 },
      { url: `${siteUrl}/careers`, changeFrequency: "weekly", priority: 0.7 },
      { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((r) => ({ ...r, lastModified: now }));

  const newsRoutes: MetadataRoute.Sitemap = news.map((a) => ({
    url: `${siteUrl}/news/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const careerRoutes: MetadataRoute.Sitemap = careers.map((c) => ({
    url: `${siteUrl}/careers/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...newsRoutes, ...projectRoutes, ...careerRoutes];
}
