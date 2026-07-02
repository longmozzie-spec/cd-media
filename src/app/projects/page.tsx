import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Dự án",
  description: "Khám phá các dự án truyền thông, sản xuất video và marketing mà CD Media đã triển khai.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}