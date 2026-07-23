import { Metadata } from "next";
import AboutClient from "./AboutClient";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/ui/FaqSection";
import { faqSchema } from "@/data/schema";
import { faqAbout } from "@/data/faq";

export const metadata: Metadata = {
  title: "Về CD Media – 13 Năm Sản Xuất Media & Truyền Thông",
  description:
    "Hành trình CD Media từ 2013: sản xuất phim chuẩn điện ảnh đến agency truyền thông chiến lược. Hệ sinh thái 1 tỷ+ lượt xem, đội ngũ thực chiến.",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqAbout)} />
      <AboutClient />
      <FaqSection items={faqAbout} />
    </>
  );
}