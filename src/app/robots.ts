import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/common";

// Mở cho các AI crawler (GEO) + bot tìm kiếm thường. Chặn khu vực admin.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
