import { LocalStorageService } from "./storage.service";
import { PageSEO } from "@/types/seo";

const seedSEO: PageSEO[] = [
  { id: "seo-home", page: "Trang chủ", metaTitle: "CD Media — Creative Digital Media Agency", metaDescription: "Giải pháp truyền thông, sản xuất nội dung và marketing tổng thể cho doanh nghiệp.", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "seo-about", page: "Về CD Media", metaTitle: "Về CD Media — Đơn vị sản xuất nội dung hàng đầu", metaDescription: "CD Media — đơn vị sản xuất nội dung số và phim tài liệu hàng đầu Việt Nam.", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "seo-services", page: "Dịch vụ", metaTitle: "Dịch vụ — CD Media", metaDescription: "Sản xuất phim, nội dung số, marketing tổng thể cho doanh nghiệp.", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "seo-projects", page: "Dự án", metaTitle: "Dự án tiêu biểu — CD Media", metaDescription: "Những dự án nổi bật của CD Media trong lĩnh vực sản xuất nội dung số.", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "seo-news", page: "Tin tức", metaTitle: "Tin tức & Blog — CD Media", metaDescription: "Cập nhật tin tức, kiến thức marketing và xu hướng nội dung số.", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "seo-careers", page: "Tuyển dụng", metaTitle: "Tuyển dụng — CD Media", metaDescription: "Cơ hội nghề nghiệp tại CD Media — Gia nhập đội ngũ sáng tạo.", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "seo-contact", page: "Liên hệ", metaTitle: "Liên hệ — CD Media", metaDescription: "Liên hệ CD Media để nhận tư vấn giải pháp truyền thông phù hợp.", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
];

export const seoService = new LocalStorageService<PageSEO>(
  "cdmedia_admin_seo",
  seedSEO
);
