export interface AdminNews {
  id: string;
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  content: string;
  author: string;
  date: string;
  featured: boolean;
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}
