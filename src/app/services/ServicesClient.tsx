"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import ContactForm from "@/components/ui/ContactForm";
import FallbackImage from "@/components/ui/FallbackImage";
import { servicePillars } from "@/data/services";
import { NewsArticle } from "@/data/news";

const eyebrowCls = "flex items-center gap-3 text-[#A1A1AA] text-xs font-medium uppercase tracking-[0.16em] mb-8 after:content-[''] after:flex-1 after:h-px after:bg-[#27272A]";

function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] || Icons.Zap;
  return <C className={className} size={22} />;
}

export default function ServicesClient({ news }: { news: NewsArticle[] }) {
  const insights = news.slice(0, 3);

  return (
    <>
      {/* Breadcrumb + Page hero */}
      <section className="pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#A1A1AA]/40 tracking-wider mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="text-[#27272A]">›</span>
            <span className="text-[#E50914]">Giải Pháp</span>
          </nav>
          <div className="text-[#E50914] text-xs font-medium uppercase tracking-[0.16em] mb-5 flex items-center gap-2.5 before:content-[''] before:w-6 before:h-0.5 before:bg-[#E50914]">
            Hệ Sinh Thái Giải Pháp
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            Sản xuất media chuẩn điện ảnh,<br />tư vấn chiến lược &amp; <span className="text-[#E50914]">thực thi Marketing</span>
          </h1>
          <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-xl">
            Hệ giải pháp truyền thông tích hợp toàn diện — thiết kế riêng cho từng doanh nghiệp và tổ chức.
          </p>
        </div>
      </section>

      {/* HSNL bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="rounded-xl bg-[#1A1A1E] border border-[#E50914]/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[#A1A1AA] text-sm">
            <strong className="text-white font-semibold">Hồ sơ năng lực CD Media 2026</strong> — Tổng hợp đầy đủ dịch vụ, dự án tiêu biểu và quy trình làm việc.
          </p>
          {/* TODO: Client content required — file HSNL đặt tại /public/hsnl/ho-so-nang-luc.pdf */}
          <a href="/hsnl/ho-so-nang-luc.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-[#E50914] text-white text-sm font-semibold rounded-lg hover:opacity-85 transition-opacity shrink-0">
            <Download size={16} /> Tải HSNL (PDF)
          </a>
        </div>
      </div>

      {/* Tabs anchor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sticky top-16 lg:top-20 z-30 bg-[#0F0F11]/90 backdrop-blur-md py-4">
        <nav className="flex flex-wrap gap-2 border-b border-[#27272A] pb-4">
          {servicePillars.map((p, i) => (
            <a key={p.key} href={`#${p.key}`} className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1E] transition-all">
              <span className="text-[#E50914] font-mono text-xs mr-1.5">0{i + 1}</span>{p.title}
            </a>
          ))}
          <a href="#goc-nhin" className="px-3.5 py-2 rounded-lg text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1E] transition-all">
            <span className="text-[#E50914] font-mono text-xs mr-1.5">05</span>Góc nhìn Chuyên ngành
          </a>
        </nav>
      </div>
      {/* 4 khối trụ cột — header 2 cột xen kẽ + grid dịch vụ con */}
      {servicePillars.map((pillar, idx) => {
        const reversed = idx % 2 === 1;
        return (
          <section key={pillar.key} id={pillar.key} className={`py-20 scroll-mt-40 ${reversed ? "bg-[#121214]" : ""}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14">
                {/* Text */}
                <div className={reversed ? "lg:order-2" : ""}>
                  <div className="text-[#E50914] font-mono text-xs tracking-[0.12em] uppercase mb-3">Giải pháp 0{idx + 1}</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                    {pillar.title}
                  </h2>
                  <p className="text-[#A1A1AA] leading-relaxed mb-6 max-w-md">{pillar.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href={pillar.primaryCta.href} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E50914] text-white text-sm font-semibold rounded-lg hover:opacity-85 transition-opacity">
                      {pillar.primaryCta.label} <ArrowRight size={15} />
                    </Link>
                    {pillar.secondaryCta && (
                      <Link href={pillar.secondaryCta.href} className="inline-flex items-center gap-2 text-[#A1A1AA] text-sm font-medium border-b border-white/20 pb-0.5 hover:text-white transition-colors">
                        {pillar.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>
                {/* Ảnh minh hoạ — bỏ file vào /public/services/{key}.jpg */}
                <div className={`aspect-video rounded-xl border border-[#27272A] overflow-hidden ${reversed ? "lg:order-1" : ""}`}>
                  <FallbackImage src={pillar.image} alt={pillar.title} placeholder={`[ Ảnh ${pillar.title} ] → /public${pillar.image}`} />
                </div>
              </div>
              {/* Grid dịch vụ con */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pillar.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-4">
                      <Icon name={item.icon} className="text-[#E50914]" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* 05 Góc nhìn chuyên ngành */}
      <section id="goc-nhin" className="py-20 scroll-mt-40 border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[#E50914] font-mono text-xs tracking-[0.12em] uppercase mb-3">Giải pháp 05</div>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Góc nhìn <span className="text-[#E50914]">Chuyên ngành</span>
            </h2>
            <Link href="/news" className="inline-flex items-center gap-2 text-[#E50914] text-sm font-semibold border border-[#E50914]/30 rounded-lg px-4 py-2.5 hover:bg-[#E50914]/[0.08] transition-colors">
              Xem tất cả bài viết <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((article, i) => (
              <NewsCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Liên hệ nhanh */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className={eyebrowCls}>Liên hệ nhanh</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">Nhận tư vấn giải pháp</h2>
            <p className="text-[#A1A1AA] mb-8">Để lại thông tin, CD Media sẽ liên hệ bạn trong 24 giờ.</p>
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
