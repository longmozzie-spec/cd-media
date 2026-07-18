import { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "Tin Tức & Góc Nhìn CD Media – Tri Thức, Truyền Thông",
  description:
    "Tin tức thế giới, tri thức đại chúng và phân tích chuyên sâu từ CD Media – 13 năm sản xuất nội dung, 2.6M theo dõi, 1B+ lượt xem đa nền tảng.",
};

export default function NewsPage() {
  return <NewsClient />;
}