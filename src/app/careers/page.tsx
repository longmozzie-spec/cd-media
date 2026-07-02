import { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description: "Gia nhập CD Media — môi trường sáng tạo, dự án thật, đội ngũ trẻ và năng động.",
};

export default function CareersPage() {
  return <CareersClient />;
}