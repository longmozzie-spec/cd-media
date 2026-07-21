import { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { getNews } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "CD Media – Giải Pháp Truyền Thông Marketing Đa Phương Tiện",
  description:
    "CD Media cung cấp sản xuất media chuẩn điện ảnh, chiến lược truyền thông và thực thi marketing. Quy trình khép kín từ ý tưởng đến đo lường kết quả.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const news = await getNews();
  return <ServicesClient news={news} />;
}