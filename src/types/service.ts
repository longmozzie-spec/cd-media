export interface AdminService {
  id: string;
  slug: string;
  title: string;
  group: "media" | "communication" | "marketing";
  shortDescription: string;
  description: string;
  icon: string;
  thumbnail?: string;
  subItems: string[];
  order: number;
  visible: boolean;
  status: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}
