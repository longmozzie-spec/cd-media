// 4 trụ cột dịch vụ theo tài liệu khách hàng (PDF Figma — trang Giải pháp)
// Thứ tự: Sản xuất Media / Giải pháp truyền thông / Marketing tổng thể / Đào tạo & Chuyển giao
// TODO: Client content required — một số mô tả card cần khách bổ sung/hoàn thiện.

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface ServicePillar {
  key: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  items: ServiceItem[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export const servicePillars: ServicePillar[] = [
  {
    key: "san-xuat-media",
    title: "Sản xuất Media",
    tagline: "Chuẩn điện ảnh",
    image: "/services/san-xuat-media.jpg",
    description:
      "Giải bài toán hình ảnh cao cấp bằng tư duy chiến lược và quy trình sản xuất khép kín.",
    items: [
      { title: "Phim tài liệu", description: "Sản xuất phim tài liệu chất lượng cao, giàu tính nhân văn — đã phát sóng trên VTV1, VTV4.", icon: "Clapperboard" },
      { title: "TVC & Quảng cáo", description: "Sản xuất TVC chuyên nghiệp từ concept, kịch bản đến hậu kỳ hoàn chỉnh.", icon: "Play" },
      { title: "Phim doanh nghiệp & lịch sử", description: "Phim giới thiệu doanh nghiệp, phim tái hiện lịch sử kết hợp kỹ xảo và nghiên cứu chuyên sâu.", icon: "Building2" },
      { title: "Nội dung số", description: "Sản xuất video chuyên đề: quân sự, khoa học, khám phá, du lịch — hơn 1 tỷ lượt xem tích lũy.", icon: "Video" },
      { title: "Content đa nền tảng", description: "Sáng tạo nội dung cho YouTube, Facebook, TikTok theo chiến lược và xu hướng.", icon: "Smartphone" },
      { title: "Triển lãm ảo", description: "Thiết kế và sản xuất triển lãm ảo (virtual exhibition) tương tác, trải nghiệm 360°.", icon: "Monitor" },
    ],
    primaryCta: { label: "Xem dự án thực tế", href: "/projects" },
  },
  {
    key: "giai-phap-truyen-thong",
    title: "Giải pháp truyền thông",
    tagline: "Tư vấn chiến lược",
    image: "/services/giai-phap-truyen-thong.jpg",
    description:
      "Tư vấn chiến lược và triển khai truyền thông tổng thể cho thương hiệu.",
    items: [
      { title: "Chiến lược thương hiệu", description: "Định vị, messaging, brand identity — xây dựng nền tảng thương hiệu bền vững trước khi làm bất cứ thứ gì khác.", icon: "Compass" },
      { title: "Truyền thông tích hợp (IMC)", description: "Kế hoạch truyền thông đa kênh: PR, digital, events, social — tất cả phục vụ một mục tiêu duy nhất.", icon: "Megaphone" },
      { title: "PR & Media Relations", description: "Quan hệ báo chí, quản lý khủng hoảng truyền thông và xây dựng uy tín thương hiệu trên truyền thông đại chúng.", icon: "Newspaper" },
    ],
    primaryCta: { label: "Xem dự án thực tế", href: "/projects" },
  },
  {
    key: "marketing-tong-the",
    title: "Marketing tổng thể",
    tagline: "Doanh thu thật",
    image: "/services/marketing-tong-the.jpg",
    description:
      "Dành cho doanh nghiệp SME & Startup muốn marketing tạo ra doanh thu thật — không phải báo cáo đẹp. CD Media thiết kế chiến lược, sản xuất nội dung và đo kết quả bằng số liệu thực tế.",
    items: [
      { title: "Performance Marketing", description: "Facebook Ads, Google Ads, TikTok Ads — tối ưu theo conversion thật, báo cáo minh bạch từng đồng.", icon: "BarChart3" },
      { title: "Content Marketing", description: "Chiến lược nội dung, lịch đăng bài, copywriting — xây dựng kênh có giá trị lâu dài.", icon: "PenLine" },
      { title: "Growth Marketing", description: "Tối ưu phễu chuyển đổi, A/B testing, growth hacking phù hợp với giai đoạn và ngân sách của doanh nghiệp.", icon: "TrendingUp" },
    ],
    primaryCta: { label: "Nhận tư vấn miễn phí", href: "/contact" },
    secondaryCta: { label: "Xem chi tiết Marketing tổng thể", href: "/services/marketing-tong-the" },
  },
  {
    key: "dao-tao-chuyen-giao",
    title: "Đào tạo & Chuyển giao",
    tagline: "Kỹ năng + Chiến lược",
    image: "/services/dao-tao-chuyen-giao.jpg",
    description:
      "CD Media đào tạo hai thứ mà hầu hết khóa học không dạy cùng lúc: kỹ năng sản xuất nội dung chuẩn chỉnh và chiến lược phân phối đúng tệp, đúng thời điểm.",
    items: [
      { title: "Workshop & Seminar", description: "Sự kiện đào tạo quy mô lớn 300–500 người — kiến thức thực chiến từ người đang làm, format tương tác cao.", icon: "Mic" },
      { title: "Media Creator 1-on-1", description: "Đào tạo cá nhân: kịch bản video, phân phối đa nền tảng, monetize và xây personal brand.", icon: "UserCog" },
      { title: "In-house Media Team", description: "Xây năng lực nội dung nội bộ cho doanh nghiệp — đào tạo trực tiếp trên dự án thật của công ty.", icon: "Building2" },
    ],
    primaryCta: { label: "Nhận tư vấn miễn phí", href: "/contact" },
    secondaryCta: { label: "Xem dự án", href: "/projects" },
  },
];

// Giữ tương thích ngược cho các nơi còn import `services` cũ (nếu có).
export const services = {
  media: servicePillars[0],
  communication: servicePillars[1],
  marketing: servicePillars[2],
  training: servicePillars[3],
};
