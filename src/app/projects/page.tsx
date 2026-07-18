import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Dự Án Truyền Thông & Sản Xuất Media Tiêu Biểu | CD Media",
  description:
    "Dự án CD Media triển khai cho cơ quan nhà nước, tập đoàn và doanh nghiệp: triển lãm số 3D, TVC, phim tài liệu, chiến dịch truyền thông tích hợp.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}