import { Metadata } from "next";
import SanXuatMediaClient from "./SanXuatMediaClient";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/ui/FaqSection";
import { faqSchema, breadcrumbSchema } from "@/data/schema";
import { faqSanXuatMedia } from "@/data/faq";

export const metadata: Metadata = {
  title: "Sản Xuất TVC & Phim Doanh Nghiệp Chuẩn Điện Ảnh | CD Media",
  description:
    "13 năm sản xuất phim chuẩn điện ảnh. CD Media làm TVC, phim tài liệu, phim diễn họa, triển lãm ảo – từ kịch bản đến hậu kỳ. Xem showreel và báo giá.",
};

export default function SanXuatMediaPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Trang chủ", path: "/" },
            { name: "Giải pháp", path: "/services" },
            { name: "Sản xuất Media", path: "/services/san-xuat-media" },
          ]),
          faqSchema(faqSanXuatMedia),
        ]}
      />
      <SanXuatMediaClient />
      <FaqSection items={faqSanXuatMedia} />
    </>
  );
}
