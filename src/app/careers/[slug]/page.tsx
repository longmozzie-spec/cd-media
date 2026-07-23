import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareers } from "@/lib/public-data";
import CareerDetailClient from "./CareerDetailClient";
import JsonLd from "@/components/JsonLd";
import { jobPostingSchema, breadcrumbSchema } from "@/data/schema";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const careers = await getCareers();
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const careers = await getCareers();
  const career = careers.find((c) => c.slug === slug);
  if (!career) return { title: "Không tìm thấy vị trí" };
  return {
    title: `${career.title} — Tuyển dụng`,
    description: career.description,
  };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const careers = await getCareers();
  const career = careers.find((c) => c.slug === slug);
  if (!career) notFound();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Trang chủ", path: "/" },
            { name: "Tuyển dụng", path: "/careers" },
            { name: career.title, path: `/careers/${career.slug}` },
          ]),
          jobPostingSchema({
            title: career.title,
            description: career.description,
            slug: career.slug,
            department: career.department,
          }),
        ]}
      />
      <CareerDetailClient career={career} />
    </>
  );
}