import { LocalStorageService } from "./storage.service";
import { AdminService } from "@/types/service";

const seedServices: AdminService[] = [
  { id: "svc-1", slug: "phim-tai-lieu", title: "Phim tài liệu", group: "media", shortDescription: "Sản xuất phim tài liệu chất lượng phát sóng truyền hình", description: "Sản xuất phim tài liệu chuyên sâu, phim diễn hoạ lịch sử với chất lượng phát sóng VTV.", icon: "Film", subItems: ["Phim tài liệu truyền hình", "Phim diễn hoạ lịch sử", "Phim khoa học"], order: 1, visible: true, status: "published", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "svc-2", slug: "tvc-phim-thuong-hieu", title: "TVC & Phim thương hiệu", group: "media", shortDescription: "Sản xuất TVC, phim ngắn thương hiệu cho doanh nghiệp", description: "TVC quảng cáo, phim ngắn thương hiệu, viral video cho các thương hiệu lớn.", icon: "Clapperboard", subItems: ["TVC 15s/30s", "Phim ngắn thương hiệu", "Viral video"], order: 2, visible: true, status: "published", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "svc-3", slug: "noi-dung-youtube", title: "Nội dung YouTube", group: "media", shortDescription: "Sản xuất và quản lý kênh YouTube chuyên nghiệp", description: "Sản xuất nội dung, tối ưu SEO YouTube, phát triển kênh từ 0 đến triệu views.", icon: "Play", subItems: ["Sản xuất video", "Quản lý kênh", "YouTube SEO"], order: 3, visible: true, status: "published", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "svc-4", slug: "trien-lam-ao", title: "Triển lãm ảo", group: "media", shortDescription: "Thiết kế triển lãm ảo 360° tương tác", description: "Triển lãm ảo 360°, virtual tour, trải nghiệm tương tác trên mọi thiết bị.", icon: "Globe", subItems: ["Virtual exhibition", "360° tour", "Interactive experience"], order: 4, visible: true, status: "published", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "svc-5", slug: "social-media", title: "Quản lý Social Media", group: "communication", shortDescription: "Quản lý và phát triển mạng xã hội cho doanh nghiệp", description: "Lập kế hoạch, sản xuất content, quản lý fanpage Facebook, TikTok, Instagram.", icon: "Share2", subItems: ["Content planning", "Social content", "Community management"], order: 5, visible: true, status: "published", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "svc-6", slug: "digital-marketing", title: "Digital Marketing", group: "marketing", shortDescription: "Giải pháp marketing tổng thể cho doanh nghiệp", description: "Facebook Ads, Google Ads, SEO, Email Marketing — giải pháp growth toàn diện.", icon: "TrendingUp", subItems: ["Facebook Ads", "Google Ads", "SEO", "Email Marketing"], order: 6, visible: true, status: "published", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
];

export const servicesService = new LocalStorageService<AdminService>(
  "cdmedia_admin_services",
  seedServices
);
