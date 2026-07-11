import { Metadata } from "next";
import MarketingClient from "./MarketingClient";

export const metadata: Metadata = {
  title: "Marketing Tổng thể",
  description:
    "Dành cho doanh nghiệp SME & Startup muốn marketing tạo ra doanh thu thật. CD Media thiết kế chiến lược, sản xuất nội dung và đo kết quả bằng số liệu thực tế.",
};

export default function MarketingTongThePage() {
  return <MarketingClient />;
}
