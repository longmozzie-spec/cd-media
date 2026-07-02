import { Metadata } from "next";
import { notFound } from "next/navigation";
import { news } from "@/data/news";
import NewsDetailClient from "./NewsDetailClient";

export async function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) return { title: "Không tìm thấy bài viết" };
  return {
    title: article.title,
    description: article.description,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = news.find((n) => n.slug === slug);
  if (!article) notFound();
  const related = news.filter((n) => n.slug !== slug && n.category === article.category).slice(0, 2);
  return <NewsDetailClient article={article} related={related} />;
}