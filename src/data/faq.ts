// Nội dung FAQ theo tài liệu khách (tab "GEO – Nội dung").
// Dùng cho cả section FAQ hiển thị lẫn JSON-LD FAQPage.
import type { FaqItem } from "@/data/schema";

// Câu định nghĩa mở đầu (đặt đầu trang, tự chứa đủ nghĩa) — kỹ thuật GEO.
export const definitionSentences: Record<string, string> = {
  home:
    "CD Media là agency truyền thông và sản xuất media đa nền tảng tại Hà Nội, hoạt động từ năm 2013, cung cấp giải pháp trọn gói từ chiến lược, sản xuất đến đo lường hiệu quả.",
  about:
    "CD Media khởi đầu năm 2013 với năng lực sản xuất phim chuẩn điện ảnh, đến 2018 chinh phục nền tảng số với hàng trăm triệu lượt xem, và hiện là agency truyền thông chiến lược toàn diện.",
  services:
    "Giải pháp của CD Media được xây trên ba trụ cột: sản xuất media chuẩn điện ảnh, truyền thông chiến lược và marketing thực thi, vận hành theo quy trình khép kín từ ý tưởng đến đo lường.",
  sanXuatMedia:
    "CD Media là đơn vị sản xuất media chuẩn điện ảnh tại Hà Nội với hơn 13 năm kinh nghiệm, thực hiện TVC, phim doanh nghiệp, phim tài liệu, phim diễn họa và triển lãm số 3D từ kịch bản đến hậu kỳ.",
  truyenThong:
    "CD Media cung cấp giải pháp truyền thông chiến lược gồm chiến lược thương hiệu, truyền thông tích hợp (IMC), PR và media relations, cùng xử lý khủng hoảng truyền thông cho doanh nghiệp và tổ chức.",
  marketing:
    "CD Media triển khai marketing thực thi gồm performance marketing, content marketing và growth marketing, với cam kết KPI và đo lường hiệu quả theo mục tiêu kinh doanh của khách hàng.",
  projects:
    "CD Media đã thực hiện các dự án truyền thông và sản xuất media cho cơ quan nhà nước, tập đoàn và doanh nghiệp, tiêu biểu là triển lãm số 3D, phim tài liệu và chiến dịch truyền thông tích hợp.",
  news:
    "Chuyên mục tin tức của CD Media cung cấp tin tức thế giới, tri thức đại chúng và các bài phân tích chuyên sâu về truyền thông, marketing và thương hiệu, dựa trên 13 năm kinh nghiệm sản xuất nội dung.",
  careers:
    "CD Media tuyển dụng nhân sự ngành sáng tạo và truyền thông tại Hà Nội, gồm biên kịch, đạo diễn, editor, designer và chuyên viên marketing, cho một agency 13 năm kinh nghiệm.",
  contact:
    "Liên hệ CD Media để nhận tư vấn giải pháp truyền thông, sản xuất media và marketing qua hotline 0975 605 069, email data@cdmedia.vn, hoặc tại văn phòng ở Thanh Xuân, Hà Nội.",
};

export const faqHome: FaqItem[] = [
  {
    q: "CD Media là công ty gì?",
    a: "CD Media là agency truyền thông và sản xuất media đa nền tảng tại Hà Nội, thành lập năm 2013, chuyên sản xuất phim chuẩn điện ảnh, truyền thông chiến lược và marketing thực thi cho doanh nghiệp và tổ chức.",
  },
  {
    q: "CD Media cung cấp những dịch vụ gì?",
    a: "CD Media cung cấp ba nhóm dịch vụ chính: sản xuất media chuyên nghiệp (TVC, phim doanh nghiệp, triển lãm số), truyền thông chiến lược (PR, IMC, KOL) và marketing thực thi (performance, content, growth).",
  },
  {
    q: "CD Media có bao nhiêu năm kinh nghiệm?",
    a: "CD Media có hơn 13 năm kinh nghiệm sản xuất nội dung, tính từ năm 2013, với hệ sinh thái 3 kênh YouTube đạt hơn 2.6 triệu người theo dõi và 1 tỷ lượt xem tích lũy.",
  },
];

export const faqAbout: FaqItem[] = [
  {
    q: "CD Media được thành lập khi nào?",
    a: "CD Media được thành lập năm 2013, khởi đầu từ năng lực sản xuất phim chuẩn điện ảnh, sau đó mở rộng thành agency truyền thông và marketing đa nền tảng.",
  },
  {
    q: "CD Media có trụ sở ở đâu?",
    a: "CD Media đặt văn phòng tại 56 16A-18B, Ngõ 140 Khuất Duy Tiến, quận Thanh Xuân, thành phố Hà Nội.",
  },
];

export const faqServices: FaqItem[] = [
  {
    q: "CD Media cung cấp giải pháp truyền thông nào?",
    a: "CD Media cung cấp giải pháp truyền thông tích hợp gồm sản xuất media (TVC, phim, triển lãm số), truyền thông chiến lược (PR, IMC, KOL/KOC) và marketing thực thi đa nền tảng có cam kết KPI.",
  },
  {
    q: "Quy trình làm việc của CD Media thế nào?",
    a: "CD Media làm việc theo quy trình khép kín: tiếp nhận và nghiên cứu, xây chiến lược, sản xuất nội dung, triển khai đa nền tảng, rồi đo lường và tối ưu theo mục tiêu kinh doanh của khách hàng.",
  },
];

export const faqSanXuatMedia: FaqItem[] = [
  {
    q: "CD Media sản xuất những loại video nào?",
    a: "CD Media sản xuất phim tài liệu, TVC và phim quảng cáo, phim diễn họa lịch sử, nội dung YouTube, content đa nền tảng và triển lãm ảo 3D — tất cả theo tiêu chuẩn điện ảnh.",
  },
  {
    q: "Sản xuất TVC ở Hà Nội chọn đơn vị nào?",
    a: "CD Media là đơn vị sản xuất TVC và phim doanh nghiệp tại Hà Nội với hơn 13 năm kinh nghiệm, quy trình khép kín từ kịch bản, tiền kỳ, quay dựng đến hậu kỳ và bàn giao.",
  },
  {
    q: "Quy trình sản xuất phim của CD Media gồm mấy bước?",
    a: "Quy trình sản xuất của CD Media gồm 5 bước: tiếp nhận và brief, kịch bản và storyboard, tiền kỳ, quay dựng, và hậu kỳ bàn giao.",
  },
];

export const faqTruyenThong: FaqItem[] = [
  {
    q: "Dịch vụ truyền thông của CD Media gồm những gì?",
    a: "Dịch vụ truyền thông của CD Media gồm chiến lược thương hiệu, truyền thông tích hợp IMC, PR và quan hệ báo chí, và xử lý khủng hoảng truyền thông.",
  },
  {
    q: "CD Media có kênh truyền thông riêng không?",
    a: "CD Media sở hữu hệ sinh thái 3 kênh YouTube với hơn 2.6 triệu người theo dõi, giúp khuếch đại độ nhận biết thương hiệu ở tầng đại chúng cho các chiến dịch truyền thông.",
  },
];

export const faqMarketing: FaqItem[] = [
  {
    q: "CD Media làm những mảng marketing nào?",
    a: "CD Media triển khai ba mảng marketing: performance marketing (quảng cáo hiệu suất), content marketing (nội dung) và growth marketing (tăng trưởng), tất cả đều có đo lường hiệu quả.",
  },
  {
    q: "CD Media có cam kết KPI marketing không?",
    a: "CD Media áp dụng cấu trúc KPI hai tầng gồm mức cam kết và mức mục tiêu, đo lường bằng các chỉ số reach, engagement, chi phí trên mỗi kết quả và tỷ lệ chuyển đổi.",
  },
];

export const faqNews: FaqItem[] = [
  {
    q: "CD Media chia sẻ nội dung gì trên chuyên mục tin tức?",
    a: "Chuyên mục tin tức của CD Media chia sẻ hai nhóm nội dung: tri thức đại chúng (quân sự, khám phá, đời sống) và góc nhìn truyền thông chuyên ngành (phân tích marketing, case study thương hiệu).",
  },
];

export const faqCareers: FaqItem[] = [
  {
    q: "CD Media đang tuyển những vị trí nào?",
    a: "CD Media tuyển dụng các vị trí ngành media và marketing như biên kịch, đạo diễn, video editor, designer, chuyên viên SEO và marketing, làm việc tại văn phòng Hà Nội.",
  },
  {
    q: "Làm việc tại CD Media như thế nào?",
    a: "Nhân sự CD Media tham gia các dự án truyền thông tầm vóc thực tế, có lộ trình thăng tiến rõ ràng và được làm việc trong hệ sinh thái media hơn 2.6 triệu người theo dõi.",
  },
];

export const faqContact: FaqItem[] = [
  {
    q: "Liên hệ CD Media bằng cách nào?",
    a: "Có thể liên hệ CD Media qua hotline 0975 605 069, email data@cdmedia.vn, website cdmedia.vn, hoặc trực tiếp tại văn phòng ở Ngõ 140 Khuất Duy Tiến, Thanh Xuân, Hà Nội.",
  },
  {
    q: "Văn phòng CD Media ở đâu?",
    a: "Văn phòng CD Media đặt tại 56 16A-18B, Ngõ 140 Khuất Duy Tiến, quận Thanh Xuân, thành phố Hà Nội.",
  },
];
