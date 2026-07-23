import { Metadata } from "next";
import CareersClient from "./CareersClient";
import { getCareers } from "@/lib/public-data";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/data/schema";
import { faqCareers } from "@/data/faq";

export const metadata: Metadata = {
  title: "Tuyển Dụng CD Media – Gia Nhập Đội Ngũ Sáng Tạo",
  description:
    "CD Media tuyển dụng Biên kịch, Đạo diễn, Editor, Growth Marketing tại Hà Nội. Agency 13 năm kinh nghiệm, hệ sinh thái 2.6M theo dõi. Xem vị trí.",
};

export const revalidate = 60;

export default async function CareersPage() {
  const careers = await getCareers();
  return (
    <>
      <JsonLd data={faqSchema(faqCareers)} />
      <CareersClient careers={careers} />
    </>
  );
}