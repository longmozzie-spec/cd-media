export interface AdminCareer {
  id: string;
  slug: string;
  title: string;
  department: string;
  type: "Full-time" | "Part-time" | "Intern" | "Freelance";
  location: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  deadline?: string;
  status: "open" | "closed" | "draft";
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}
