export interface AdminProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  thumbnail: string;
  banner?: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  services: string[];
  images: string[];
  videoId?: string;
  featured: boolean;
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}
