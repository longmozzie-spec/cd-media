import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Giải pháp & Dịch vụ",
  description: "Sản xuất media, truyền thông thương hiệu, marketing tổng thể — CD Media cung cấp giải pháp toàn diện.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}