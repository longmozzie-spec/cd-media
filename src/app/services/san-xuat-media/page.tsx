import { Metadata } from "next";
import SanXuatMediaClient from "./SanXuatMediaClient";

export const metadata: Metadata = {
  title: "Sản Xuất TVC & Phim Doanh Nghiệp Chuẩn Điện Ảnh | CD Media",
  description:
    "13 năm sản xuất phim chuẩn điện ảnh. CD Media làm TVC, phim tài liệu, phim diễn họa, triển lãm ảo – từ kịch bản đến hậu kỳ. Xem showreel và báo giá.",
};

export default function SanXuatMediaPage() {
  return <SanXuatMediaClient />;
}
