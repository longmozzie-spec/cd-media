import { Metadata } from "next";
import { notFound } from "next/navigation";
import { careers } from "@/data/careers";
import CareerDetailClient from "./CareerDetailClient";

export async function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const career = careers.find((c) => c.slug === slug);
  if (!career) return { title: "Không tìm thấy vị trí" };
  return {
    title: `${career.title} — Tuyển dụng`,
    description: career.description,
  };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const career = careers.find((c) => c.slug === slug);
  if (!career) notFound();
  return <CareerDetailClient career={career} />;
}