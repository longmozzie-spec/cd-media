import { LocalStorageService } from "./storage.service";
import { AdminNews } from "@/types/news";
import { news } from "@/data/news";

const seedNews: AdminNews[] = news.map((n, i) => ({
  ...n,
  id: `news-${i + 1}`,
  author: "CD Media Team",
  status: "published" as const,
  createdAt: n.date || "2025-01-01T00:00:00Z",
  updatedAt: "2025-06-01T00:00:00Z",
}));

export const newsService = new LocalStorageService<AdminNews>(
  "cdmedia_admin_news",
  seedNews
);
