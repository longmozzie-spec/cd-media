/**
 * Hàm chuyển đổi giữa row của Supabase (snake_case, jsonb) và type của app (camelCase).
 * Mỗi entity có: fromRow (DB → app) và toRow (app → DB).
 */
import { AdminNews } from "@/types/news";
import { AdminProject } from "@/types/project";
import { AdminCareer } from "@/types/career";
import { AdminService } from "@/types/service";
import { PageSEO } from "@/types/seo";
import { ContactSubmission } from "@/types/contact";

type Row = Record<string, unknown>;
const s = (v: unknown): string => (v == null ? "" : String(v));
const arr = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : []);

// ---------- NEWS ----------
export const newsFromRow = (r: Row): AdminNews => ({
  id: s(r.id),
  slug: s(r.slug),
  title: s(r.title),
  category: s(r.category),
  thumbnail: s(r.thumbnail),
  description: s(r.description),
  content: s(r.content),
  author: s(r.author),
  date: s(r.date),
  featured: Boolean(r.featured),
  status: (r.status as AdminNews["status"]) ?? "draft",
  seoTitle: r.seo_title ? s(r.seo_title) : undefined,
  seoDescription: r.seo_description ? s(r.seo_description) : undefined,
  createdAt: s(r.created_at),
  updatedAt: s(r.updated_at),
});
export const newsToRow = (d: Partial<AdminNews>): Row => ({
  slug: d.slug,
  title: d.title,
  category: d.category,
  thumbnail: d.thumbnail,
  description: d.description,
  content: d.content,
  author: d.author,
  date: d.date,
  featured: d.featured,
  status: d.status,
  seo_title: d.seoTitle ?? null,
  seo_description: d.seoDescription ?? null,
});

// ---------- PROJECT ----------
export const projectFromRow = (r: Row): AdminProject => ({
  id: s(r.id),
  slug: s(r.slug),
  title: s(r.title),
  client: s(r.client),
  category: s(r.category),
  industry: s(r.industry),
  thumbnail: s(r.thumbnail),
  banner: r.banner ? s(r.banner) : undefined,
  description: s(r.description),
  challenge: s(r.challenge),
  solution: s(r.solution),
  results: arr(r.results),
  services: arr(r.services),
  images: arr(r.images),
  videoId: r.video_id ? s(r.video_id) : undefined,
  featured: Boolean(r.featured),
  status: (r.status as AdminProject["status"]) ?? "draft",
  seoTitle: r.seo_title ? s(r.seo_title) : undefined,
  seoDescription: r.seo_description ? s(r.seo_description) : undefined,
  createdAt: s(r.created_at),
  updatedAt: s(r.updated_at),
});
export const projectToRow = (d: Partial<AdminProject>): Row => ({
  slug: d.slug,
  title: d.title,
  client: d.client,
  category: d.category,
  industry: d.industry,
  thumbnail: d.thumbnail,
  banner: d.banner ?? null,
  description: d.description,
  challenge: d.challenge,
  solution: d.solution,
  results: d.results ?? [],
  services: d.services ?? [],
  images: d.images ?? [],
  video_id: d.videoId ?? null,
  featured: d.featured,
  status: d.status,
  seo_title: d.seoTitle ?? null,
  seo_description: d.seoDescription ?? null,
});

// ---------- CAREER ----------
export const careerFromRow = (r: Row): AdminCareer => ({
  id: s(r.id),
  slug: s(r.slug),
  title: s(r.title),
  department: s(r.department),
  type: (r.type as AdminCareer["type"]) ?? "Full-time",
  location: s(r.location),
  salary: r.salary ? s(r.salary) : undefined,
  description: s(r.description),
  responsibilities: arr(r.responsibilities),
  requirements: arr(r.requirements),
  benefits: arr(r.benefits),
  deadline: r.deadline ? s(r.deadline) : undefined,
  status: (r.status as AdminCareer["status"]) ?? "draft",
  seoTitle: r.seo_title ? s(r.seo_title) : undefined,
  seoDescription: r.seo_description ? s(r.seo_description) : undefined,
  createdAt: s(r.created_at),
  updatedAt: s(r.updated_at),
});
export const careerToRow = (d: Partial<AdminCareer>): Row => ({
  slug: d.slug,
  title: d.title,
  department: d.department,
  type: d.type,
  location: d.location,
  salary: d.salary ?? null,
  description: d.description,
  responsibilities: d.responsibilities ?? [],
  requirements: d.requirements ?? [],
  benefits: d.benefits ?? [],
  deadline: d.deadline || null,
  status: d.status,
  seo_title: d.seoTitle ?? null,
  seo_description: d.seoDescription ?? null,
});

// ---------- SERVICE ----------
export const serviceFromRow = (r: Row): AdminService => ({
  id: s(r.id),
  slug: s(r.slug),
  title: s(r.title),
  group: (r.group as AdminService["group"]) ?? "media",
  shortDescription: s(r.short_description),
  description: s(r.description),
  icon: s(r.icon),
  thumbnail: r.thumbnail ? s(r.thumbnail) : undefined,
  subItems: arr(r.sub_items),
  order: Number(r.order ?? 0),
  visible: r.visible !== false,
  status: (r.status as AdminService["status"]) ?? "draft",
  seoTitle: r.seo_title ? s(r.seo_title) : undefined,
  seoDescription: r.seo_description ? s(r.seo_description) : undefined,
  createdAt: s(r.created_at),
  updatedAt: s(r.updated_at),
});
export const serviceToRow = (d: Partial<AdminService>): Row => ({
  slug: d.slug,
  title: d.title,
  group: d.group,
  short_description: d.shortDescription,
  description: d.description,
  icon: d.icon,
  thumbnail: d.thumbnail ?? null,
  sub_items: d.subItems ?? [],
  order: d.order ?? 0,
  visible: d.visible,
  status: d.status,
  seo_title: d.seoTitle ?? null,
  seo_description: d.seoDescription ?? null,
});

// ---------- SEO ----------
export const seoFromRow = (r: Row): PageSEO => ({
  id: s(r.id),
  page: s(r.page),
  metaTitle: s(r.meta_title),
  metaDescription: s(r.meta_description),
  ogImage: r.og_image ? s(r.og_image) : undefined,
  canonicalUrl: r.canonical_url ? s(r.canonical_url) : undefined,
  keywords: r.keywords ? s(r.keywords) : undefined,
  createdAt: s(r.created_at),
  updatedAt: s(r.updated_at),
});
export const seoToRow = (d: Partial<PageSEO>): Row => ({
  page: d.page,
  meta_title: d.metaTitle,
  meta_description: d.metaDescription,
  og_image: d.ogImage ?? null,
  canonical_url: d.canonicalUrl ?? null,
  keywords: d.keywords ?? null,
});

// ---------- CONTACT ----------
export const contactFromRow = (r: Row): ContactSubmission => ({
  id: s(r.id),
  name: s(r.name),
  phone: s(r.phone),
  email: r.email ? s(r.email) : undefined,
  company: r.company ? s(r.company) : undefined,
  need: s(r.need),
  budget: r.budget ? s(r.budget) : undefined,
  content: r.content ? s(r.content) : undefined,
  status: (r.status as ContactSubmission["status"]) ?? "new",
  note: r.note ? s(r.note) : undefined,
  createdAt: s(r.created_at),
  updatedAt: s(r.updated_at),
});
export const contactToRow = (d: Partial<ContactSubmission>): Row => ({
  name: d.name,
  phone: d.phone,
  email: d.email ?? null,
  company: d.company ?? null,
  need: d.need,
  budget: d.budget ?? null,
  content: d.content ?? null,
  status: d.status,
  note: d.note ?? null,
});
