import { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Tuyển Dụng CD Media – Gia Nhập Đội Ngũ Sáng Tạo",
  description:
    "CD Media tuyển dụng Biên kịch, Đạo diễn, Editor, Growth Marketing tại Hà Nội. Agency 13 năm kinh nghiệm, hệ sinh thái 2.6M theo dõi. Xem vị trí.",
};

export default function CareersPage() {
  return <CareersClient />;
}