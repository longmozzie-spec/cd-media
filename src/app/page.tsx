"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Camera, TrendingUp, Share2, Monitor, Layers, Shield } from "lucide-react";
import StatNumber from "@/components/ui/StatNumber";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";
import NewsCard from "@/components/ui/NewsCard";
import CTASection from "@/components/ui/CTASection";
import { stats } from "@/data/common";
import { projects } from "@/data/projects";
import { news } from "@/data/news";

const ecosystem = [
  { icon: Camera, title: "Sản xuất Phim", desc: "Phim tài liệu, TVC, phim diễn hoạ lịch sử chất lượng cao" },
  { icon: Monitor, title: "Nội dung số", desc: "YouTube, Facebook, TikTok — 400 triệu views" },
  { icon: Shield, title: "Quân sự & Kiến thức", desc: "Nội dung chuyên sâu đa lĩnh vực hàng đầu" },
  { icon: Share2, title: "Triển lãm ảo", desc: "Virtual exhibition, trải nghiệm 360° tương tác" },
];

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F11] via-[#0F0F11]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-transparent to-[#0F0F11]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-sm font-medium mb-6">
                <Layers size={16} />
                Creative Digital Media Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Kết nối{" "}
              <span className="bg-gradient-to-r from-[#E50914] via-[#FF6B6B] to-[#E50914] bg-clip-text text-transparent">
                tri thức
              </span>
              <br />
              Chia sẻ giá trị
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-[#A1A1AA] max-w-2xl mb-10 leading-relaxed"
            >
              CD Media — đơn vị sản xuất nội dung số và phim tài liệu hàng đầu Việt Nam.
              400 triệu lượt xem YouTube. 2 triệu người theo dõi. Đối tác của VTV, Viettel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20"
              >
                Tư vấn ngay
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-[#27272A] text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Play size={18} />
                Xem dự án
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle
              label="Về CD Media"
              title="Chia sẻ kiến thức đa lĩnh vực qua nội dung video chất lượng cao"
              description="Thành lập năm 2021, CD Media đã trở thành đơn vị truyền thông nội dung số hàng đầu với hệ thống kênh YouTube và Facebook thu hút hàng trăm triệu lượt xem."
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatNumber key={stat.label} {...stat} delay={i * 200} />
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Hệ sinh thái"
            title="Giải pháp truyền thông toàn diện"
            description="4 trụ cột dịch vụ phủ kín mọi nhu cầu truyền thông của doanh nghiệp."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystem.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 hover:shadow-lg hover:shadow-[#E50914]/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-4 group-hover:bg-[#E50914]/20 transition-all">
                  <item.icon size={28} className="text-[#E50914]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-[#A1A1AA] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionTitle label="Dự án tiêu biểu" title="Những câu chuyện chúng tôi đã kể" align="left" />
            <Link href="/projects" className="hidden md:inline-flex items-center gap-2 text-[#E50914] font-medium hover:gap-3 transition-all">
              Xem tất cả <ArrowRight size={16} />
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

      {/* Latest News */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <SectionTitle label="Tin tức" title="Kiến thức & xu hướng" align="left" />
            <Link href="/news" className="hidden md:inline-flex items-center gap-2 text-[#E50914] font-medium hover:gap-3 transition-all">
              Xem tất cả <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article, i) => (
              <NewsCard key={article.slug} article={article} index={i} />
            ))}
          </div>
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