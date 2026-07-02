"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import { NewsArticle } from "@/data/news";

export default function NewsDetailClient({ article, related }: { article: NewsArticle; related: NewsArticle[] }) {
  return (
    <>
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11] to-[#121214]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E50914]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#E50914] transition-colors mb-8">
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
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <img src={article.thumbnail} alt={article.title} className="w-full rounded-2xl mb-10 border border-[#27272A]" />
          </motion.div>

          <div className="prose max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{paragraph.replace("## ", "")}</h2>;
              }
              return <p key={i} className="text-[#A1A1AA] leading-relaxed mb-4">{paragraph}</p>;
            })}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-[#121214]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Bài viết liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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