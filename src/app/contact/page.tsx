import { Metadata } from "next";
import ContactClient from "./ContactClient";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/ui/FaqSection";
import { localBusinessSchema, faqSchema } from "@/data/schema";
import { faqContact } from "@/data/faq";

export const metadata: Metadata = {
  title: "Liên Hệ CD Media – Hợp Tác Truyền Thông & Số Hóa",
  description:
    "Liên hệ CD Media nhận tư vấn chiến lược truyền thông, sản xuất media chuẩn điện ảnh, triển lãm số 3D. Hotline 0975 605 069 – Thanh Xuân, Hà Nội.",
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[localBusinessSchema, faqSchema(faqContact)]} />
      <ContactClient />
      <FaqSection items={faqContact} />
    </>
  );
}