"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import { NewsArticle } from "@/data/news";

function slugifyHeading(text: string, i: number): string {
  const base = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${base || "muc"}-${i}`;
}

export default function NewsDetailClient({ article, related }: { article: NewsArticle; related: NewsArticle[] }) {
  const blocks = article.content.split("\n\n");
  const headings = blocks
    .map((b, i) => ({ text: b.replace(/^##\s+/, ""), raw: b, i }))
    .filter((b) => b.raw.startsWith("## "))
    .map((b) => ({ text: b.text, id: slugifyHeading(b.text, b.i) }));

  return (
    <>
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11] to-[#121214]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E50914]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-[#A1A1AA]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E50914] transition-colors">Trang chủ</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <Link href="/news" className="hover:text-[#E50914] transition-colors">Tin tức</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <span className="text-[#E50914]">Bài viết chi tiết</span>
          </nav>
          <Link href="/news" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#E50914] transition-colors mb-6">
            <ArrowLeft size={16} /> Quay lại tin tức
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E50914]/20 text-[#E50914] text-sm">
                <Tag size={12} /> {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[#A1A1AA] text-sm">
                <Calendar size={14} /> {new Date(article.date).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{article.title}</h1>
            <p className="text-lg text-[#A1A1AA] mt-4 max-w-3xl">{article.description}</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <img src={article.thumbnail} alt={article.title} className="w-full rounded-2xl mb-10 border border-[#27272A]" />
          </motion.div>

          {/* Mục lục nội dung */}
          {headings.length > 1 && (
            <nav aria-label="Mục lục" className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 mb-10">
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Mục lục nội dung</h2>
              <ol className="space-y-2">
                {headings.map((h, i) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-[#A1A1AA] text-sm hover:text-[#E50914] transition-colors">
                      {i + 1}. {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="prose max-w-none">
            {blocks.map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                const text = paragraph.replace(/^##\s+/, "");
                return (
                  <h2 key={i} id={slugifyHeading(text, i)} className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">
                    {text}
                  </h2>
                );
              }
              return <p key={i} className="text-[#A1A1AA] leading-relaxed mb-4">{paragraph}</p>;
            })}
          </div>

          {/* Meta cuối bài */}
          <div className="mt-10 pt-6 border-t border-[#27272A] flex flex-wrap items-center gap-2">
            <span className="text-[#A1A1AA] text-sm">Từ khoá:</span>
            <span className="px-3 py-1 rounded-full bg-[#E50914]/10 text-[#E50914] text-xs">{article.category}</span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-[#A1A1AA] text-xs">CD Media</span>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-[#121214]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a, i) => (
                <NewsCard key={a.slug} article={a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
