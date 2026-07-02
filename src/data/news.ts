export interface NewsArticle {
  slug: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  date: string;
  content: string;
  featured: boolean;
}

export const newsCategories = [
  "Tất cả",
  "Quân sự",
  "Why?",
  "Khám phá",
  "Travel",
  "Triển lãm ảo",
];

export const news: NewsArticle[] = [
  {
    slug: "5-xu-huong-video-marketing-2025",
    title: "5 xu hướng Video Marketing không thể bỏ qua năm 2025",
    category: "Khám phá",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    description: "Từ AI-generated content đến vertical video dài, đây là những xu hướng video marketing đang định hình lại cách thương hiệu kể chuyện.",
    date: "2025-06-15",
    content: `Video marketing tiếp tục là kênh truyền thông hiệu quả nhất cho doanh nghiệp. Năm 2025 chứng kiến nhiều thay đổi đáng kể trong cách người dùng tiêu thụ nội dung video.

## 1. Short-form Video vẫn thống trị

TikTok, Reels và Shorts tiếp tục là định dạng có engagement cao nhất. Tuy nhiên, xu hướng mới là các video ngắn có chiều sâu hơn — không chỉ giải trí mà còn mang giá trị thông tin.

## 2. AI-assisted Production

Các công cụ AI hỗ trợ từ viết kịch bản, tạo storyboard đến chỉnh sửa hậu kỳ. Điều này giảm chi phí sản xuất nhưng đòi hỏi đội ngũ creative có khả năng điều phối AI hiệu quả.

## 3. Vertical Video dài (2-5 phút)

Người dùng bắt đầu xem video dọc dài hơn trên mobile. Đây là cơ hội cho các nội dung storytelling, behind-the-scenes, và educational content.

## 4. Interactive & Shoppable Video

Video có tính tương tác — cho phép người xem click mua hàng, chọn nội dung, hoặc tham gia trực tiếp — đang tăng trưởng mạnh trên các nền tảng e-commerce.

## 5. Authentic > Polished

Người xem ngày càng ưa thích nội dung chân thực hơn là quá bóng bẩy. Xu hướng "raw content" từ founder, nhân viên, và khách hàng thật đang cho hiệu quả cao hơn studio-quality content.`,
    featured: true,
  },
  {
    slug: "tai-sao-doanh-nghiep-can-chien-luoc-noi-dung",
    title: "Tại sao doanh nghiệp cần chiến lược nội dung thay vì chỉ đăng bài?",
    category: "Why?",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    description: "Nhiều doanh nghiệp vẫn đang 'đăng bài cho có' mà không có chiến lược. Bài viết phân tích sự khác biệt giữa content có chiến lược và content tùy hứng.",
    date: "2025-06-10",
    content: `Đăng bài mỗi ngày nhưng không có kết quả? Vấn đề không nằm ở tần suất, mà ở việc thiếu chiến lược.

## Content không chiến lược = lãng phí ngân sách

Khi không có content strategy, mỗi bài đăng là một mũi tên bắn trong bóng tối. Bạn không biết đang nói với ai, nói để làm gì, và đo lường bằng gì.

## 3 dấu hiệu bạn đang thiếu chiến lược nội dung

1. Engagement giảm dần dù đăng nhiều hơn
2. Không biết bài nào hiệu quả và tại sao
3. Nội dung không liên kết với mục tiêu kinh doanh

## Chiến lược nội dung bắt đầu từ đâu?

Một chiến lược nội dung tốt bắt đầu từ việc hiểu rõ khách hàng mục tiêu, xác định content pillar, lập editorial calendar, và thiết lập KPIs rõ ràng cho từng giai đoạn.`,
    featured: true,
  },
  {
    slug: "behind-the-scenes-quay-phim-tvc",
    title: "Behind The Scenes: Quy trình sản xuất một TVC chuyên nghiệp",
    category: "Khám phá",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
    description: "Từ brief đến final cut — cùng CD Media đi qua từng bước trong quy trình sản xuất một TVC quảng cáo từ A đến Z.",
    date: "2025-06-05",
    content: `Một TVC 30 giây có thể mất 4-6 tuần để hoàn thành. Đây là quy trình mà CD Media áp dụng cho mỗi dự án.

## Giai đoạn 1: Pre-production (1-2 tuần)

Bao gồm nhận brief, research, brainstorm concept, viết kịch bản, storyboard, casting, chọn location, và lên kế hoạch sản xuất chi tiết.

## Giai đoạn 2: Production (1-3 ngày quay)

Ngày quay là kết quả của cả tuần chuẩn bị. Ekip bao gồm đạo diễn, DOP, gaffer, sound, stylist, và production manager.

## Giai đoạn 3: Post-production (1-2 tuần)

Dựng rough cut, chỉnh màu, sound design, motion graphics, và nhiều vòng feedback với khách hàng để đạt final cut hoàn hảo.`,
    featured: true,
  },
  {
    slug: "cach-chon-agency-media-phu-hop",
    title: "Cách chọn agency media phù hợp cho doanh nghiệp của bạn",
    category: "Why?",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    description: "Không phải agency nào cũng phù hợp. Bài viết chia sẻ 7 tiêu chí quan trọng giúp bạn chọn đúng đối tác truyền thông.",
    date: "2025-05-28",
    content: `Chọn sai agency có thể khiến bạn mất tiền, mất thời gian, và mất cả cơ hội thị trường. Đây là 7 tiêu chí bạn nên cân nhắc.

## 1. Portfolio phù hợp ngành

Xem agency đã làm cho ngành nào, có hiểu insight ngành bạn không.

## 2. Quy trình làm việc rõ ràng

Agency tốt có process rõ ràng từ brief đến delivery, có timeline và checkpoint cụ thể.

## 3. Team size và cơ cấu

Đội ngũ có đủ vai trò: creative, production, account, strategy không?`,
    featured: false,
  },
  {
    slug: "tiktok-marketing-cho-doanh-nghiep-nho",
    title: "TikTok Marketing cho doanh nghiệp nhỏ: Bắt đầu từ đâu?",
    category: "Khám phá",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop",
    description: "TikTok không chỉ dành cho Gen Z. Hướng dẫn chi tiết cách doanh nghiệp nhỏ có thể tận dụng TikTok để tăng doanh thu.",
    date: "2025-05-20",
    content: `TikTok đã vượt qua giai đoạn chỉ là nền tảng giải trí. Với hơn 40 triệu người dùng tại Việt Nam, đây là kênh marketing không thể bỏ qua.

## Bắt đầu với nội dung authentic

Không cần studio đắt tiền. Smartphone + ánh sáng tự nhiên + nội dung giá trị = công thức thành công trên TikTok.

## 3 loại content hiệu quả nhất

1. Behind-the-scenes quá trình làm việc
2. Tips/hướng dẫn nhanh trong ngành
3. Storytelling về hành trình kinh doanh`,
    featured: false,
  },
  {
    slug: "su-kien-cuoi-nam-agency-media",
    title: "Mùa sự kiện cuối năm: Agency media cần chuẩn bị gì?",
    category: "Khám phá",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop",
    description: "Q4 là mùa cao điểm của agency. Chia sẻ cách CD Media quản lý 15+ dự án đồng thời trong mùa cuối năm.",
    date: "2025-05-15",
    content: `Tháng 10 đến tháng 12 là thời điểm bận rộn nhất với agency media. Đây là cách chúng tôi chuẩn bị.

## Lập kế hoạch từ Q3

Bắt đầu pitch và confirm dự án từ tháng 8-9 để có đủ thời gian chuẩn bị ekip và resource.

## Resource management

Sử dụng hệ thống quản lý project để phân bổ nhân lực, tránh quá tải và đảm bảo chất lượng.`,
    featured: false,
  },
];
