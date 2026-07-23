"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
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
  const readMins = Math.max(3, Math.round(article.content.length / 900));

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32">
        <nav className="flex items-center gap-2 text-xs text-[#A1A1AA]/40 tracking-wider" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
          <span className="text-[#27272A]">›</span>
          <Link href="/news" className="hover:text-white transition-colors">Tin Tức</Link>
          <span className="text-[#27272A]">›</span>
          <span className="text-[#E50914]">Bài Viết Chi Tiết</span>
        </nav>
      </div>

      {/* Article layout: main + sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        {/* Main */}
        <article>
          <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
            <span className="px-2.5 py-1 rounded-sm bg-[#A78BFA]/10 text-[#A78BFA] font-mono uppercase tracking-[0.12em]">{article.category}</span>
            <span className="flex items-center gap-1.5 text-[#A1A1AA]"><Calendar size={13} /> {new Date(article.date).toLocaleDateString("vi-VN")}</span>
            <span className="flex items-center gap-1.5 text-[#A1A1AA]"><Clock size={13} /> Đọc trong {readMins} phút</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5">{article.title}</h1>
          <p className="text-lg text-[#A1A1AA] leading-relaxed mb-8">{article.description}</p>

          <motion.img
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            src={article.thumbnail} alt={article.title}
            className="w-full rounded-xl mb-10 border border-[#27272A]"
          />

          <div className="prose max-w-none">
            {blocks.map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                const text = paragraph.replace(/^##\s+/, "");
                return <h2 key={i} id={slugifyHeading(text, i)} className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24">{text}</h2>;
              }
              if (paragraph.startsWith("> ")) {
                return <blockquote key={i} className="border-l-[3px] border-[#E50914] bg-[#E50914]/[0.06] pl-5 py-3 my-6 text-white/90 italic">{paragraph.replace(/^>\s+/, "")}</blockquote>;
              }
              return <p key={i} className="text-[#A1A1AA] leading-relaxed mb-4">{paragraph}</p>;
            })}
          </div>

          {/* Author bar */}
          <div className="flex items-center gap-4 p-5 mt-9 rounded-xl bg-[#1A1A1E] border border-[#27272A]">
            <div className="w-11 h-11 rounded-full bg-[#27272A] flex items-center justify-center shrink-0">
              <User size={18} className="text-[#A1A1AA]" />
            </div>
            <div>
              <h5 className="text-white font-semibold text-sm">CD Media Editorial Team</h5>
              <p className="text-[#A1A1AA]/70 text-xs">Phân tích chuyên sâu về kinh tế, truyền thông và chiến lược thương hiệu</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="text-[#A1A1AA] text-sm">Từ khóa:</span>
            <span className="px-3 py-1 rounded-full bg-[#A78BFA]/10 text-[#A78BFA] text-xs">{article.category}</span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-[#A1A1AA] text-xs">CD Media</span>
          </div>
        </article>

        {/* Sidebar sticky */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
          {headings.length > 1 && (
            <nav aria-label="Mục lục" className="rounded-xl bg-[#1A1A1E] border border-[#27272A] p-5">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Mục lục nội dung</h4>
              <ul className="space-y-2">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-[#A1A1AA] text-sm hover:text-[#E50914] transition-colors">{h.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="rounded-xl bg-[#E50914]/[0.08] border border-[#E50914]/20 p-6 text-center">
            <strong className="block text-white font-semibold mb-2">Cần tư vấn chiến lược?</strong>
            <p className="text-[#A1A1AA] text-sm mb-4">Đội ngũ CD Media sẵn sàng hỗ trợ doanh nghiệp của bạn.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E50914] text-white text-sm font-semibold rounded-lg hover:opacity-85 transition-opacity">
              Liên hệ ngay <ArrowRight size={14} />
            </Link>
          </div>
        </aside>
      </div>

      {/* Bài viết liên quan */}
      {related.length > 0 && (
        <section className="py-14 bg-[#121214] border-t border-[#27272A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-[#A1A1AA] text-xs font-medium uppercase tracking-[0.16em] mb-8 after:content-[''] after:flex-1 after:h-px after:bg-[#27272A]">
              Bài viết liên quan
            </div>
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
