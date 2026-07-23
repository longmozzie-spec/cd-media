import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { getProjects } from "@/lib/public-data";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/data/schema";

export const metadata: Metadata = {
  title: "Dự Án Truyền Thông & Sản Xuất Media Tiêu Biểu | CD Media",
  description:
    "Dự án CD Media triển khai cho cơ quan nhà nước, tập đoàn và doanh nghiệp: triển lãm số 3D, TVC, phim tài liệu, chiến dịch truyền thông tích hợp.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <JsonLd data={organizationSchema} />
      <ProjectsClient projects={projects} />
    </>
  );
}