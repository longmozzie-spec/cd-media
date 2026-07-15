"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import FilterTabs from "@/components/ui/FilterTabs";
import { news, newsCategories } from "@/data/news";

export default function NewsClient() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filtered = activeFilter === "Tất cả"
    ? news
    : news.filter((n) => n.category === activeFilter);

  // Bài nổi bật đầu tiên hiển thị dạng featured 2 cột (theo HTML)
  const featured = activeFilter === "Tất cả" ? filtered.find((n) => n.featured) : undefined;
  const rest = featured ? filtered.filter((n) => n.slug !== featured.slug) : filtered;

  return (
    <>
      {/* Breadcrumb + Page hero */}
      <section className="pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#A1A1AA]/40 tracking-wider mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="text-[#27272A]">›</span>
            <span className="text-[#E50914]">Tin Tức</span>
          </nav>
          <div className="text-[#E50914] text-xs font-medium uppercase tracking-[0.16em] mb-5 flex items-center gap-2.5 before:content-[''] before:w-6 before:h-0.5 before:bg-[#E50914]">
            Tin Tức &amp; Nội Dung Số
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            Góc nhìn <span className="text-[#E50914]">CD Media</span>
          </h1>
          <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-xl">
            Phân tích chuyên sâu · Góc nhìn đa chiều trung lập · Chia sẻ giá trị cộng đồng.
          </p>
        </div>
      </section>

      {/* Filter + Featured + Grid */}
      <section className="py-16 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <FilterTabs categories={newsCategories} active={activeFilter} onChange={setActiveFilter} />
          </div>

          {/* Featured article — 2 cột */}
          {featured && (
            <Link href={`/news/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden border border-[#27272A] hover:border-[#E50914]/40 transition-colors mb-6">
              <div className="aspect-video overflow-hidden bg-[#1A1A1E]">
                <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="bg-[#1A1A1E] p-8 lg:p-10 flex flex-col justify-center gap-3">
                <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-sm bg-[#E50914]/[0.12] text-[#E50914] text-[10px] font-mono uppercase tracking-[0.12em]">
                  {featured.category}
                </span>
                <span className="flex items-center gap-1.5 text-[#A1A1AA] text-xs">
                  <Calendar size={12} /> {new Date(featured.date).toLocaleDateString("vi-VN")}
                </span>
                <h3 className="text-white font-bold text-xl lg:text-2xl leading-snug">{featured.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{featured.description}</p>
                <span className="inline-flex items-center gap-1.5 text-[#E50914] text-sm font-medium">
                  Đọc bài viết <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          )}

          {/* Grid 4 cột */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rest.map((article, i) => (
              <NewsCard key={article.slug} article={article} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-[#A1A1AA] py-12">Chưa có bài viết trong danh mục này.</p>
          )}
        </div>
      </section>
    </>
  );
}
