"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Clapperboard, Megaphone, Target, GraduationCap } from "lucide-react";
import StatNumber from "@/components/ui/StatNumber";
import ProjectCard from "@/components/ui/ProjectCard";
import NewsCard from "@/components/ui/NewsCard";
import CTASection from "@/components/ui/CTASection";
import { stats } from "@/data/common";
import { projects } from "@/data/projects";
import { news } from "@/data/news";

// 4 trụ cột — hệ sinh thái giải pháp (khung theo cdmedia-homepage.html)
const solutions = [
  { num: "01", icon: Clapperboard, title: "Sản xuất Media", desc: "Phim tài liệu, TVC, nội dung YouTube, triển lãm ảo — chuẩn chất lượng điện ảnh.", href: "/services#san-xuat-media" },
  { num: "02", icon: Megaphone, title: "Giải pháp Truyền thông", desc: "Tư vấn chiến lược, xây dựng thương hiệu và triển khai truyền thông tích hợp đa kênh.", href: "/services#giai-phap-truyen-thong" },
  { num: "03", icon: Target, title: "Marketing Tổng thể", desc: "Dành cho SME & Startup muốn marketing tạo ra doanh thu thật — không phải báo cáo đẹp.", href: "/services/marketing-tong-the" },
  { num: "04", icon: GraduationCap, title: "Đào tạo & Chuyển giao", desc: "Sự kiện 300–500 người hoặc đào tạo chuyên sâu cá nhân và team in-house doanh nghiệp.", href: "/services#dao-tao-chuyen-giao" },
];

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
  const latestNews = news.slice(0, 4);
  const showreelId = featuredProjects[0]?.videoId;

  return (
    <>
      {/* ── HERO: 2 cột + showreel + stats bar đáy ── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F11]/95 via-[#0F0F11]/80 to-[#0F0F11]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11]/20 via-transparent to-[#0F0F11]/85" />
        </div>
        {/* đường đỏ dưới nav */}
        <div className="absolute top-16 lg:top-20 left-0 right-0 z-[2] h-0.5 bg-gradient-to-r from-[#E50914] via-[#E50914]/30 to-transparent" />

        <div className="relative z-[3] flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-14 items-center">
          {/* Trái */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2.5 text-[#E50914] text-xs font-medium uppercase tracking-[0.16em] mb-6 before:content-[''] before:w-6 before:h-0.5 before:bg-[#E50914]">
              CD Media — Agency Truyền Thông
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-5">
              Truyền thông chiến lược &amp; <br className="hidden md:block" />
              sản xuất media <span className="text-[#E50914]">thực chiến</span>
            </h1>
            <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-md mb-10">
              Đối tác truyền thông toàn diện của Doanh nghiệp và Tổ chức — từ chiến lược đến sản xuất,
              từ nội dung đến đo lường kết quả thực tế.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E50914] text-white font-semibold rounded-lg hover:opacity-85 transition-opacity">
                Xem Giải Pháp <ArrowRight size={16} />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-2 text-[#A1A1AA] font-medium border-b border-white/20 pb-0.5 hover:text-white hover:border-white/50 transition-all">
                Xem dự án thực tế
              </Link>
            </div>
          </motion.div>

          {/* Phải: Showreel */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
            <span className="absolute -top-3 left-5 z-10 bg-[#E50914] text-white text-[9.5px] font-medium uppercase tracking-[0.14em] px-3 py-1.5 rounded-sm">
              Showreel
            </span>
            <a
              href={showreelId ? `https://www.youtube.com/watch?v=${showreelId}` : "/projects"}
              target={showreelId ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative block aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#1A1A1E] shadow-2xl shadow-black/60"
            >
              {showreelId ? (
                <img src={`https://img.youtube.com/vi/${showreelId}/maxresdefault.jpg`} alt="CD Media Showreel" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0c1322] to-[#18213a]" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5">
                <div className="w-16 h-16 rounded-full bg-[#E50914]/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play size={26} className="text-white ml-1" fill="white" />
                </div>
                <span className="text-white/70 text-xs uppercase tracking-[0.14em]">Xem Showreel</span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Stats bar full-width đáy hero */}
        <div className="relative z-[3] border-t border-white/10 bg-[#0F0F11]/70 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {stats.map((stat, i) => (
              <div key={stat.label} className="py-7 text-center">
                <StatNumber {...stat} delay={i * 150} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── SOLUTIONS: hairline 4 cột ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#27272A]">
        <div className="flex items-center gap-4 text-[#A1A1AA] text-xs font-medium uppercase tracking-[0.16em] mb-10">
          Hệ sinh thái giải pháp
          <span className="flex-1 h-px bg-[#27272A]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
            Bứt phá thương hiệu bằng giải pháp truyền thông <span className="text-[#E50914]">toàn diện</span>
          </h2>
          <p className="text-[#A1A1AA] leading-relaxed">
            Quy trình thực thi khép kín từ chiến lược đến đo lường hiệu quả — thiết kế riêng cho từng doanh nghiệp và tổ chức.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#27272A] border border-[#27272A] rounded-xl overflow-hidden">
          {solutions.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={s.href} className="group relative block h-full bg-[#121214] hover:bg-[#1A1A1E] p-7 transition-colors overflow-hidden">
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-[#E50914] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <div className="text-[#E50914] font-mono text-[10px] tracking-[0.12em] uppercase mb-5">{s.num}</div>
                <div className="w-11 h-11 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-4 group-hover:bg-[#E50914]/20 transition-all">
                  <s.icon size={22} className="text-[#E50914]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2.5 leading-tight">{s.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed mb-5">{s.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[#A1A1AA]/50 text-[10px] uppercase tracking-[0.1em] group-hover:text-[#E50914] transition-colors">
                  Xem chi tiết <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS: featured + grid ── */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-[#A1A1AA] text-xs font-medium uppercase tracking-[0.16em] mb-8">
            Dự án thực chiến
            <span className="flex-1 h-px bg-[#27272A]" />
          </div>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              Tạo sức bật <span className="text-[#E50914]">thương hiệu</span>
            </h2>
            <Link href="/projects" className="hidden md:inline-flex items-center gap-2 text-[#E50914] font-medium border-b border-[#E50914]/30 pb-0.5 hover:border-[#E50914] transition-all">
              Xem toàn bộ dự án <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/projects" className="inline-flex items-center gap-2 text-[#E50914] font-medium">
              Xem tất cả dự án <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWS: 4 cột ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-4 text-[#A1A1AA] text-xs font-medium uppercase tracking-[0.16em] mb-8">
          Tin tức nổi bật
          <span className="flex-1 h-px bg-[#27272A]" />
        </div>
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
            Góc nhìn <span className="text-[#E50914]">CD Media</span>
          </h2>
          <Link href="/news" className="hidden md:inline-flex items-center gap-2 text-[#E50914] font-medium border-b border-[#E50914]/30 pb-0.5 hover:border-[#E50914] transition-all">
            Xem tất cả <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestNews.map((article, i) => (
            <NewsCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </section>

      <CTASection
        title="Bạn cần một đội ngũ media đồng hành cùng thương hiệu?"
        description="Hãy để CD Media giúp bạn kể câu chuyện của mình — bằng hình ảnh, âm thanh và chiến lược."
        buttonText="Liên hệ tư vấn"
        buttonHref="/contact"
      />
    </>
  );
}
