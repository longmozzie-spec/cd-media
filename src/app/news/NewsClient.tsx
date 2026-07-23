"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import FilterTabs from "@/components/ui/FilterTabs";
import { newsCategories, NewsArticle } from "@/data/news";

const PAGE_SIZE = 8;

export default function NewsClient({ news }: { news: NewsArticle[] }) {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = activeFilter === "Tất cả"
    ? news
    : news.filter((n) => n.category === activeFilter);

  // Bài nổi bật đầu tiên hiển thị dạng featured 2 cột (theo HTML)
  const featured = activeFilter === "Tất cả" ? filtered.find((n) => n.featured) : undefined;
  const rest = featured ? filtered.filter((n) => n.slug !== featured.slug) : filtered;
  const shown = rest.slice(0, visible);

  // Đổi danh mục → reset về trang đầu
  const handleFilter = (cat: string) => {
    setActiveFilter(cat);
    setVisible(PAGE_SIZE);
  };

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
            Kiến Thức, Góc Nhìn &amp; <span className="text-[#E50914]">Câu Chuyện</span>
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
            <FilterTabs categories={newsCategories} active={activeFilter} onChange={handleFilter} />
          </div>

          {/* Featured article — 2 cột */}
          {featured && (
            <Link href={`/news/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden border border-[#27272A] hover:border-[#E50914]/40 transition-colors mb-6">
              <div className="aspect-video overflow-hidden bg-[#1A1A1E]">
                <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="bg-[#1A1A1E] p-8 lg:p-10 flex flex-col justify-center gap-3">
                <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-sm bg-[#A78BFA]/[0.12] text-[#A78BFA] text-[10px] font-mono uppercase tracking-[0.12em]">
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
            {shown.map((article, i) => (
              <NewsCard key={article.slug} article={article} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-[#A1A1AA] py-12">Chưa có bài viết trong danh mục này.</p>
          )}

          {/* Nút tải thêm bài viết */}
          {visible < rest.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#E50914]/40 text-[#E50914] text-sm font-semibold hover:bg-[#E50914]/[0.08] transition-colors"
              >
                Xem thêm bài viết <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
