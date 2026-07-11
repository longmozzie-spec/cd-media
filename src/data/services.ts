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
  items: ServiceItem[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export const servicePillars: ServicePillar[] = [
  {
    key: "san-xuat-media",
    title: "Sản xuất Media",
    tagline: "Chuẩn điện ảnh",
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
    description:
      "Tư vấn chiến lược và triển khai truyền thông tổng thể cho thương hiệu.",
    items: [
      // TODO: Client content required — bổ sung các gói giải pháp truyền thông cụ thể.
      { title: "Chiến lược truyền thông", description: "Xây dựng định vị thương hiệu, thông điệp cốt lõi và kế hoạch truyền thông tổng thể.", icon: "Compass" },
      { title: "Quản trị kênh & cộng đồng", description: "Vận hành fanpage, kênh YouTube/TikTok và quản lý cộng đồng người theo dõi.", icon: "Users" },
      { title: "Xử lý khủng hoảng truyền thông", description: "Tư vấn và đồng hành xử lý các tình huống truyền thông nhạy cảm. (Nội dung chi tiết sẽ bổ sung.)", icon: "ShieldAlert" },
    ],
    primaryCta: { label: "Xem dự án thực tế", href: "/projects" },
  },
  {
    key: "marketing-tong-the",
    title: "Marketing tổng thể",
    tagline: "Doanh thu thật",
    description:
      "Dành cho doanh nghiệp SME & Startup muốn marketing tạo ra doanh thu thật — không phải báo cáo đẹp. CD Media thiết kế chiến lược, sản xuất nội dung và đo kết quả bằng số liệu thực tế.",
    items: [
      { title: "Chiến lược trước", description: "Chẩn đoán thương hiệu, xác định positioning và tệp khách hàng mục tiêu.", icon: "Search" },
      { title: "Sản xuất sau", description: "Triển khai nội dung chuẩn chỉnh theo chiến lược đã thống nhất.", icon: "Clapperboard" },
      { title: "Đo lường xuyên suốt", description: "Theo dõi số liệu thực tế, báo cáo minh bạch và tối ưu liên tục theo kết quả kinh doanh.", icon: "LineChart" },
    ],
    primaryCta: { label: "Xem chi tiết", href: "/services/marketing-tong-the" },
    secondaryCta: { label: "Nhận tư vấn miễn phí", href: "/contact" },
  },
  {
    key: "dao-tao-chuyen-giao",
    title: "Đào tạo & Chuyển giao",
    tagline: "Kỹ năng + Chiến lược",
    description:
      "CD Media đào tạo hai thứ mà hầu hết khóa học không dạy cùng lúc: kỹ năng sản xuất nội dung chuẩn chỉnh và chiến lược phân phối đúng tệp, đúng thời điểm.",
    items: [
      // TODO: Client content required — bổ sung chương trình đào tạo chi tiết & học phí.
      { title: "Đào tạo đại chúng (100–500 người)", description: "Chương trình đào tạo quy mô lớn về sản xuất nội dung và truyền thông số.", icon: "GraduationCap" },
      { title: "Đào tạo chuyên sâu", description: "Đào tạo cá nhân & doanh nghiệp theo nhu cầu chuyên biệt.", icon: "UserCog" },
      { title: "Chuyển giao quy trình", description: "Chuyển giao quy trình sản xuất và vận hành nội dung cho đội ngũ nội bộ của doanh nghiệp.", icon: "Repeat" },
    ],
    primaryCta: { label: "Xem dự án thực tế", href: "/projects" },
    secondaryCta: { label: "Nhận tư vấn miễn phí", href: "/contact" },
  },
];

// Giữ tương thích ngược cho các nơi còn import `services` cũ (nếu có).
export const services = {
  media: servicePillars[0],
  communication: servicePillars[1],
  marketing: servicePillars[2],
  training: servicePillars[3],
};
