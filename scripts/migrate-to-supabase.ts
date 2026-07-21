/**
 * Script chuyển dữ liệu tĩnh (src/data/*) vào Supabase.
 * ------------------------------------------------------------
 * Chạy 1 lần sau khi đã tạo schema và có key:
 *   npx tsx scripts/migrate-to-supabase.ts
 *
 * Cần trong .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (service key — bỏ qua RLS để seed)
 *
 * An toàn chạy lại: dùng upsert theo slug, không tạo trùng.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";
import { config } from "dotenv";

import { news } from "../src/data/news";
import { projects } from "../src/data/projects";
import { careers } from "../src/data/careers";

config({ path: resolve(process.cwd(), ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("❌ Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

async function migrateNews() {
  const rows = news.map((n) => ({
    slug: n.slug,
    title: n.title,
    category: n.category,
    thumbnail: n.thumbnail ?? "",
    description: n.description ?? "",
    content: n.content ?? "",
    author: "CD Media Team",
    date: n.date || null,
    featured: Boolean(n.featured),
    status: "published",
  }));
  const { error } = await supabase.from("news").upsert(rows, { onConflict: "slug" });
  if (error) throw new Error("news: " + error.message);
  console.log(`✅ news: ${rows.length} bài`);
}

async function migrateProjects() {
  const rows = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    client: p.client ?? "",
    category: p.clientType ?? p.category ?? "",
    industry: p.industry ?? "",
    thumbnail: p.thumbnail ?? "",
    description: p.description ?? "",
    challenge: p.challenge ?? "",
    solution: p.solution ?? "",
    results: p.results ?? [],
    services: p.services ?? [],
    images: p.images ?? [],
    video_id: p.videoId ?? null,
    featured: Boolean(p.featured),
    status: "published",
  }));
  const { error } = await supabase.from("projects").upsert(rows, { onConflict: "slug" });
  if (error) throw new Error("projects: " + error.message);
  console.log(`✅ projects: ${rows.length} dự án`);
}

async function migrateCareers() {
  const rows = careers.map((c) => ({
    slug: c.slug,
    title: c.title,
    department: c.department ?? "",
    type: c.type ?? "Full-time",
    location: c.location ?? "",
    salary: c.salary ?? null,
    description: c.description ?? "",
    responsibilities: c.responsibilities ?? [],
    requirements: c.requirements ?? [],
    benefits: c.benefits ?? [],
    deadline: c.deadline || null,
    status: "open",
  }));
  const { error } = await supabase.from("careers").upsert(rows, { onConflict: "slug" });
  if (error) throw new Error("careers: " + error.message);
  console.log(`✅ careers: ${rows.length} vị trí`);
}

const seedServices = [
  { slug: "phim-tai-lieu", title: "Phim tài liệu", group: "media", short_description: "Sản xuất phim tài liệu chất lượng phát sóng truyền hình", description: "Sản xuất phim tài liệu chuyên sâu, phim diễn hoạ lịch sử với chất lượng phát sóng VTV.", icon: "Film", sub_items: ["Phim tài liệu truyền hình", "Phim diễn hoạ lịch sử", "Phim khoa học"], order: 1, visible: true, status: "published" },
  { slug: "tvc-phim-thuong-hieu", title: "TVC & Phim thương hiệu", group: "media", short_description: "Sản xuất TVC, phim ngắn thương hiệu cho doanh nghiệp", description: "TVC quảng cáo, phim ngắn thương hiệu, viral video cho các thương hiệu lớn.", icon: "Clapperboard", sub_items: ["TVC 15s/30s", "Phim ngắn thương hiệu", "Viral video"], order: 2, visible: true, status: "published" },
  { slug: "noi-dung-youtube", title: "Nội dung YouTube", group: "media", short_description: "Sản xuất và quản lý kênh YouTube chuyên nghiệp", description: "Sản xuất nội dung, tối ưu SEO YouTube, phát triển kênh từ 0 đến triệu views.", icon: "Play", sub_items: ["Sản xuất video", "Quản lý kênh", "YouTube SEO"], order: 3, visible: true, status: "published" },
  { slug: "trien-lam-ao", title: "Triển lãm ảo", group: "media", short_description: "Thiết kế triển lãm ảo 360° tương tác", description: "Triển lãm ảo 360°, virtual tour, trải nghiệm tương tác trên mọi thiết bị.", icon: "Globe", sub_items: ["Virtual exhibition", "360° tour", "Interactive experience"], order: 4, visible: true, status: "published" },
  { slug: "social-media", title: "Quản lý Social Media", group: "communication", short_description: "Quản lý và phát triển mạng xã hội cho doanh nghiệp", description: "Lập kế hoạch, sản xuất content, quản lý fanpage Facebook, TikTok, Instagram.", icon: "Share2", sub_items: ["Content planning", "Social content", "Community management"], order: 5, visible: true, status: "published" },
  { slug: "digital-marketing", title: "Digital Marketing", group: "marketing", short_description: "Giải pháp marketing tổng thể cho doanh nghiệp", description: "Facebook Ads, Google Ads, SEO, Email Marketing — giải pháp growth toàn diện.", icon: "TrendingUp", sub_items: ["Facebook Ads", "Google Ads", "SEO", "Email Marketing"], order: 6, visible: true, status: "published" },
];

const seedSEO = [
  { page: "Trang chủ", meta_title: "CD Media — Creative Digital Media Agency", meta_description: "Giải pháp truyền thông, sản xuất nội dung và marketing tổng thể cho doanh nghiệp." },
  { page: "Về CD Media", meta_title: "Về CD Media — Đơn vị sản xuất nội dung hàng đầu", meta_description: "CD Media — đơn vị sản xuất nội dung số và phim tài liệu hàng đầu Việt Nam." },
  { page: "Dịch vụ", meta_title: "Dịch vụ — CD Media", meta_description: "Sản xuất phim, nội dung số, marketing tổng thể cho doanh nghiệp." },
  { page: "Dự án", meta_title: "Dự án tiêu biểu — CD Media", meta_description: "Những dự án nổi bật của CD Media trong lĩnh vực sản xuất nội dung số." },
  { page: "Tin tức", meta_title: "Tin tức & Blog — CD Media", meta_description: "Cập nhật tin tức, kiến thức marketing và xu hướng nội dung số." },
  { page: "Tuyển dụng", meta_title: "Tuyển dụng — CD Media", meta_description: "Cơ hội nghề nghiệp tại CD Media — Gia nhập đội ngũ sáng tạo." },
  { page: "Liên hệ", meta_title: "Liên hệ — CD Media", meta_description: "Liên hệ CD Media để nhận tư vấn giải pháp truyền thông phù hợp." },
];

async function migrateServices() {
  const { error } = await supabase.from("services").upsert(seedServices, { onConflict: "slug" });
  if (error) throw new Error("services: " + error.message);
  console.log(`✅ services: ${seedServices.length} dịch vụ`);
}

async function migrateSEO() {
  // seo không có unique key theo page → chỉ seed nếu bảng rỗng
  const { count } = await supabase.from("seo").select("*", { count: "exact", head: true });
  if ((count ?? 0) > 0) {
    console.log("⏭️  seo: đã có dữ liệu, bỏ qua");
    return;
  }
  const { error } = await supabase.from("seo").insert(seedSEO);
  if (error) throw new Error("seo: " + error.message);
  console.log(`✅ seo: ${seedSEO.length} trang`);
}

async function main() {
  console.log("🚀 Bắt đầu migrate dữ liệu vào Supabase...\n");
  await migrateNews();
  await migrateProjects();
  await migrateCareers();
  await migrateServices();
  await migrateSEO();
  console.log("\n🎉 Xong! Kiểm tra Table Editor trên Supabase.");
}

main().catch((e) => {
  console.error("❌ Lỗi:", e.message);
  process.exit(1);
});
