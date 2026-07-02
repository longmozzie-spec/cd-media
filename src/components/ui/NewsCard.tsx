"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { NewsArticle } from "@/data/news";

export default function NewsCard({ article, index = 0 }: { article: NewsArticle; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/news/${article.slug}`} className="group block">
        <div className="rounded-2xl overflow-hidden bg-[#1A1A1E] border border-[#27272A] hover:border-[#E50914]/30 hover:shadow-lg hover:shadow-[#E50914]/5 transition-all duration-300">
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-[#E50914]/10 text-[#E50914] text-xs font-medium">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-[#A1A1AA] text-xs">
                <Calendar size={12} />
                {new Date(article.date).toLocaleDateString("vi-VN")}
              </span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#E50914] transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-[#A1A1AA] text-sm line-clamp-2 mb-4">{article.description}</p>
            <span className="inline-flex items-center gap-1 text-[#E50914] text-sm font-medium group-hover:gap-2 transition-all">
              Đọc thêm <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}