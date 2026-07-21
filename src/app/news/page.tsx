import { Metadata } from "next";
import NewsClient from "./NewsClient";
import { getNews } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Tin Tức & Góc Nhìn CD Media – Tri Thức, Truyền Thông",
  description:
    "Tin tức thế giới, tri thức đại chúng và phân tích chuyên sâu từ CD Media – 13 năm sản xuất nội dung, 2.6M theo dõi, 1B+ lượt xem đa nền tảng.",
};

// Tự cập nhật sau tối đa 60s khi có bài mới (không cần deploy lại)
export const revalidate = 60;

export default async function NewsPage() {
  const news = await getNews();
  return <NewsClient news={news} />;
}