import { Metadata } from "next";
import MarketingClient from "./MarketingClient";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/ui/FaqSection";
import { faqSchema, breadcrumbSchema } from "@/data/schema";
import { faqMarketing } from "@/data/faq";

export const metadata: Metadata = {
  title: "Marketing Thực Thi – Từ Kế Hoạch Đến Kết Quả | CD Media",
  description:
    "Performance, Content và Growth Marketing. CD Media triển khai chiến dịch đa nền tảng, cam kết KPI và đo lường hiệu quả theo mục tiêu kinh doanh.",
};

export default function MarketingTongThePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Trang chủ", path: "/" },
            { name: "Giải pháp", path: "/services" },
            { name: "Marketing", path: "/services/marketing-tong-the" },
          ]),
          faqSchema(faqMarketing),
        ]}
      />
      <MarketingClient />
      <FaqSection items={faqMarketing} />
    </>
  );
}
