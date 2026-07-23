import { Metadata } from "next";
import TruyenThongClient from "./TruyenThongClient";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/ui/FaqSection";
import { faqSchema, breadcrumbSchema } from "@/data/schema";
import { faqTruyenThong } from "@/data/faq";

export const metadata: Metadata = {
  title: "Giải Pháp Truyền Thông Chiến Lược – PR, IMC | CD Media",
  description:
    "Chiến lược thương hiệu, truyền thông tích hợp IMC, PR & Media Relations. CD Media xây dựng và bảo vệ hình ảnh thương hiệu bằng chiến lược tổng thể.",
};

export default function TruyenThongPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Trang chủ", path: "/" },
            { name: "Giải pháp", path: "/services" },
            { name: "Truyền thông", path: "/services/truyen-thong" },
          ]),
          faqSchema(faqTruyenThong),
        ]}
      />
      <TruyenThongClient />
      <FaqSection items={faqTruyenThong} />
    </>
  );
}
