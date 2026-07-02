import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Về CD Media",
  description: "Câu chuyện, con người và sứ mệnh của CD Media — đơn vị truyền thông sáng tạo hàng đầu.",
};

export default function AboutPage() {
  return <AboutClient />;
}