/**
 * Lớp lấy dữ liệu cho các trang CÔNG KHAI (server-side + ISR).
 * ------------------------------------------------------------
 * Nguyên tắc an toàn: nếu chưa cấu hình Supabase (thiếu env) hoặc query lỗi,
 * tự động fallback về dữ liệu tĩnh trong src/data/* — web không bao giờ trắng trang.
 */
import { createPublicClient } from "@/lib/supabase/server";
import { news as staticNews, NewsArticle } from "@/data/news";
import { projects as staticProjects, Project } from "@/data/projects";
import { careers as staticCareers, Career } from "@/data/careers";

type Row = Record<string, unknown>;
const s = (v: unknown): string => (v == null ? "" : String(v));
const arr = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : []);

function hasSupabase(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// ---------- NEWS ----------
function rowToNews(r: Row): NewsArticle {
  return {
    slug: s(r.slug),
    title: s(r.title),
    category: s(r.category),
    thumbnail: s(r.thumbnail),
    description: s(r.description),
    date: s(r.date),
    content: s(r.content),
    featured: Boolean(r.featured),
  };
}

export async function getNews(): Promise<NewsArticle[]> {
  if (!hasSupabase()) return staticNews;
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("status", "published")
      .order("date", { ascending: false });
    if (error || !data || data.length === 0) return staticNews;
    return data.map(rowToNews);
  } catch {
    return staticNews;
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const all = await getNews();
  return all.find((n) => n.slug === slug) ?? null;
}

// ---------- PROJECTS ----------
function rowToProject(r: Row): Project {
  const cat = s(r.category);
  return {
    slug: s(r.slug),
    title: s(r.title),
    client: s(r.client),
    category: cat,
    // DB lưu loại khách hàng ở cột category → ánh xạ sang clientType cho filter công khai
    clientType: (cat as Project["clientType"]) || "Nội dung số",
    industry: s(r.industry),
    thumbnail: s(r.thumbnail),
    description: s(r.description),
    challenge: s(r.challenge),
    solution: s(r.solution),
    results: arr(r.results),
    services: arr(r.services),
    images: arr(r.images),
    featured: Boolean(r.featured),
    videoId: r.video_id ? s(r.video_id) : undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!hasSupabase()) return staticProjects;
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return staticProjects;
    return data.map(rowToProject);
  } catch {
    return staticProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

// ---------- CAREERS ----------
function rowToCareer(r: Row): Career {
  return {
    slug: s(r.slug),
    title: s(r.title),
    type: (r.type as Career["type"]) ?? "Full-time",
    location: s(r.location),
    department: s(r.department),
    salary: s(r.salary),
    deadline: s(r.deadline),
    description: s(r.description),
    responsibilities: arr(r.responsibilities),
    requirements: arr(r.requirements),
    benefits: arr(r.benefits),
  };
}

export async function getCareers(): Promise<Career[]> {
  if (!hasSupabase()) return staticCareers;
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("careers")
      .select("*")
      .eq("status", "open")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return staticCareers;
    return data.map(rowToCareer);
  } catch {
    return staticCareers;
  }
}

export async function getCareerBySlug(slug: string): Promise<Career | null> {
  const all = await getCareers();
  return all.find((c) => c.slug === slug) ?? null;
}
