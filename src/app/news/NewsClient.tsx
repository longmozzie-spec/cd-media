"use client";

import { useState } from "react";
import HeroSection from "@/components/ui/HeroSection";
import NewsCard from "@/components/ui/NewsCard";
import FilterTabs from "@/components/ui/FilterTabs";
import { news, newsCategories } from "@/data/news";

export default function NewsClient() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filtered = activeFilter === "Tất cả"
    ? news
    : news.filter((n) => n.category === activeFilter);

  return (
    <>
      <HeroSection
        title="Tin tức & Nội dung số"
        subtitle="Phân tích chuyên sâu · Góc nhìn đa chiều trung lập · Chia sẻ giá trị cộng đồng."
        compact
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterTabs categories={newsCategories} active={activeFilter} onChange={setActiveFilter} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((article, i) => (
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