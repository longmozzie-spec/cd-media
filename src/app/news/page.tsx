import { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Kiến thức marketing, xu hướng truyền thông và chia sẻ chuyên môn từ CD Media.",
};

export default function NewsPage() {
  return <NewsClient />;
}