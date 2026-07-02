export interface Career {
  slug: string;
  title: string;
  type: "Full-time" | "Part-time" | "Intern";
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const departments = [
  { name: "Content & Research", count: 10, description: "Nghiên cứu, viết kịch bản và sản xuất nội dung chuyên sâu" },
  { name: "Production Team", count: 8, description: "Quay phim, đạo diễn hình ảnh, ánh sáng" },
  { name: "Post-production Team", count: 8, description: "Dựng phim, motion graphics, chỉnh màu, sound design" },
  { name: "Digital & Social", count: 5, description: "Quản lý kênh, tối ưu nội dung, phân tích data" },
  { name: "Business Development", count: 4, description: "Phát triển đối tác, quản lý dự án doanh nghiệp" },
];

export const careers: Career[] = [
  {
    slug: "scriptwriter-researcher",
    title: "Biên kịch & Researcher",
    type: "Full-time",
    location: "Hà Nội",
    department: "Content & Research",
    description: "Nghiên cứu chuyên sâu và viết kịch bản cho các kênh YouTube (quân sự, khoa học, lịch sử) và phim tài liệu.",
    responsibilities: [
      "Nghiên cứu đề tài chuyên sâu: quân sự, địa chính trị, lịch sử, khoa học",
      "Viết kịch bản video YouTube 10-30 phút",
      "Viết kịch bản phim tài liệu cho các dự án VTV, đối tác",
      "Fact-check và xác minh nguồn tin",
      "Đề xuất đề tài mới dựa trên xu hướng và data",
    ],
    requirements: [
      "Đam mê nghiên cứu, đọc nhiều, hiểu biết rộng",
      "Viết tiếng Việt tốt, rõ ràng, logic",
      "Ưu tiên kiến thức về quân sự, lịch sử hoặc khoa học",
      "Khả năng đọc hiểu tài liệu tiếng Anh",
      "Có portfolio bài viết hoặc kịch bản là lợi thế",
    ],
    benefits: [
      "Lương: 10-18 triệu (theo kinh nghiệm)",
      "Thưởng video đạt triệu views",
      "Được tiếp cận nguồn tài liệu phong phú",
      "Môi trường làm việc sáng tạo, tự do",
      "Bảo hiểm đầy đủ, team building hàng quý",
    ],
  },
  {
    slug: "video-editor",
    title: "Video Editor",
    type: "Full-time",
    location: "Hà Nội",
    department: "Post-production Team",
    description: "Dựng phim cho các kênh YouTube CD Media và phim tài liệu. Làm việc với Premiere Pro, After Effects, DaVinci Resolve.",
    responsibilities: [
      "Dựng video YouTube theo kịch bản (quân sự, khám phá, du lịch)",
      "Dựng phim tài liệu cho VTV và đối tác",
      "Chỉnh màu, sound mixing, xuất master",
      "Phối hợp với team motion graphics và research",
      "Đảm bảo tiến độ xuất bản đúng lịch",
    ],
    requirements: [
      "Tối thiểu 1 năm kinh nghiệm dựng phim",
      "Thành thạo Premiere Pro hoặc DaVinci Resolve",
      "Biết After Effects là lợi thế lớn",
      "Có portfolio hoặc showreel",
      "Chịu được áp lực deadline, đa dự án",
    ],
    benefits: [
      "Lương: 10-18 triệu",
      "Thưởng dự án và video viral",
      "Làm việc với thiết bị và phần mềm bản quyền",
      "Cơ hội tham gia sản xuất phim tài liệu phát sóng VTV",
      "Môi trường sáng tạo, trẻ trung",
    ],
  },
  {
    slug: "motion-graphics-designer",
    title: "Motion Graphics Designer",
    type: "Full-time",
    location: "Hà Nội",
    department: "Post-production Team",
    description: "Thiết kế đồ họa chuyển động, infographic video và hiệu ứng hình ảnh cho nội dung YouTube và phim tài liệu.",
    responsibilities: [
      "Thiết kế motion graphics minh hoạ cho video quân sự, khoa học",
      "Tạo map animations, infographic chuyển động",
      "Làm intro, outro, lower-third cho các kênh",
      "Hỗ trợ VFX cơ bản cho phim tài liệu",
      "Phát triển template đồ họa nhất quán cho hệ thống kênh",
    ],
    requirements: [
      "Thành thạo After Effects, Illustrator",
      "Biết Cinema 4D hoặc Blender là lợi thế",
      "1-2 năm kinh nghiệm motion graphics",
      "Khả năng thiết kế map, biểu đồ, infographic",
      "Có showreel thể hiện phong cách",
    ],
    benefits: [
      "Lương: 12-20 triệu",
      "Thưởng dự án lớn",
      "Được đào tạo nâng cao (3D, VFX)",
      "Phần mềm bản quyền, workstation mạnh",
      "Giờ làm việc linh hoạt",
    ],
  },
  {
    slug: "cameraman",
    title: "Cameraman / Quay phim",
    type: "Full-time",
    location: "Hà Nội",
    department: "Production Team",
    description: "Quay phim cho phim tài liệu, TVC và nội dung đa nền tảng. Đi quay on-location tại nhiều tỉnh thành.",
    responsibilities: [
      "Quay phim tài liệu tại các địa phương",
      "Quay TVC và phim ngắn thương hiệu",
      "Setup ánh sáng, âm thanh cho các cảnh quay",
      "Bảo quản và vận chuyển thiết bị quay",
      "Phối hợp với đạo diễn và team sản xuất",
    ],
    requirements: [
      "1-2 năm kinh nghiệm quay phim",
      "Thành thạo camera Sony FX / Canon Cinema",
      "Hiểu biết về ánh sáng, bố cục, chuyển động camera",
      "Sẵn sàng đi công tác nhiều ngày",
      "Sức khỏe tốt, chịu được áp lực",
    ],
    benefits: [
      "Lương: 10-16 triệu",
      "Phụ cấp công tác, ăn ở khi đi quay",
      "Được sử dụng thiết bị cao cấp",
      "Thưởng dự án",
      "Cơ hội đi nhiều nơi, trải nghiệm phong phú",
    ],
  },
  {
    slug: "channel-manager",
    title: "Channel Manager (YouTube/Facebook)",
    type: "Full-time",
    location: "Hà Nội",
    department: "Digital & Social",
    description: "Quản lý và phát triển hệ thống kênh YouTube, Facebook của CD Media — tối ưu SEO, lên lịch đăng, phân tích data.",
    responsibilities: [
      "Quản lý lịch đăng tải trên YouTube và Facebook",
      "Tối ưu tiêu đề, thumbnail, tags, description (YouTube SEO)",
      "Phân tích analytics và đề xuất cải thiện",
      "Quản lý comment, cộng đồng người xem",
      "Theo dõi trends và đề xuất nội dung phù hợp",
    ],
    requirements: [
      "Hiểu biết sâu về YouTube algorithm và Facebook",
      "Kinh nghiệm quản lý kênh YouTube 100K+ subscribers",
      "Khả năng phân tích data (YouTube Studio, Analytics)",
      "Kỹ năng thiết kế thumbnail cơ bản",
      "Am hiểu thị trường nội dung Việt Nam",
    ],
    benefits: [
      "Lương: 9-15 triệu",
      "Thưởng theo tăng trưởng kênh",
      "Được training digital marketing nâng cao",
      "Laptop làm việc",
      "Giờ làm linh hoạt, có thể WFH 1 ngày/tuần",
    ],
  },
  {
    slug: "content-intern",
    title: "Thực tập sinh Content & Research",
    type: "Intern",
    location: "Hà Nội",
    department: "Content & Research",
    description: "Thực tập nghiên cứu và hỗ trợ sản xuất nội dung cho hệ thống kênh YouTube CD Media.",
    responsibilities: [
      "Hỗ trợ research đề tài cho video",
      "Viết draft kịch bản dưới hướng dẫn của editor",
      "Kiểm tra fact và nguồn tài liệu",
      "Tham gia brainstorm ý tưởng nội dung mới",
    ],
    requirements: [
      "Sinh viên năm 3-4 ngành báo chí, truyền thông, lịch sử, quốc tế học",
      "Đam mê kiến thức, đọc nhiều",
      "Viết tiếng Việt mạch lạc, logic",
      "Đọc hiểu tiếng Anh tốt",
      "Cam kết thực tập tối thiểu 3 tháng",
    ],
    benefits: [
      "Trợ cấp: 3-5 triệu/tháng",
      "Được mentor bởi senior researcher",
      "Cơ hội chuyển chính thức sau thực tập",
      "Tiếp cận nguồn tài liệu phong phú",
      "Tham gia sản xuất video hàng triệu views",
    ],
  },
];
