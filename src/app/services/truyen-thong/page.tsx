import { Metadata } from "next";
import TruyenThongClient from "./TruyenThongClient";

export const metadata: Metadata = {
  title: "Giải Pháp Truyền Thông Chiến Lược – PR, IMC | CD Media",
  description:
    "Chiến lược thương hiệu, truyền thông tích hợp IMC, PR & Media Relations. CD Media xây dựng và bảo vệ hình ảnh thương hiệu bằng chiến lược tổng thể.",
};

export default function TruyenThongPage() {
  return <TruyenThongClient />;
}
