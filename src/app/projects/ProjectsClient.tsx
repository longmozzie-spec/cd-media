"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard";
import FilterTabs from "@/components/ui/FilterTabs";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { projects, projectCategories } from "@/data/projects";
import { testimonials } from "@/data/common";

const partners = [
  { name: "VTV", logo: "/partners/vtv.png" },
  { name: "Viettel", logo: "/partners/viettel.png" },
  { name: "Sun Group", logo: "/partners/sun group.png" },
  { name: "Eurowindow", logo: "/partners/Euro Window.png" },
  { name: "AZ Vietnam", logo: "/partners/AZ.png" },
  { name: "30Shine", logo: "/partners/30shine.png" },
  { name: "Helios", logo: "/partners/helios.png" },
  { name: "Dolphin Media", logo: "/partners/Dolphin media.png" },
  { name: "ELSA", logo: "/partners/elsa.png" },
  { name: "Kiên Giang", logo: "/partners/kiengiang.png" },
];

function PartnerLogo({ name, logo }: { name: string; logo: string }) {
  const [status, setStatus] = useState<"loading" | "ok" | "failed">("loading");
  useEffect(() => {
    const img = new Image();
    img.onload = () => setStatus(img.naturalWidth > 0 ? "ok" : "failed");
    img.onerror = () => setStatus("failed");
    img.src = logo;
  }, [logo]);
  if (status === "loading" || status === "failed") {
    return <span className="text-sm font-semibold text-slate-700">{name}</span>;
  }
  return <img src={logo} alt={name} className="max-h-12 max-w-full object-contain" />;
}

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filtered = activeFilter === "Tất cả"
    ? projects
    : projects.filter((p) => p.clientType === activeFilter);

  // Dự án nổi bật đầu tiên = featured (khung featured 2 cột theo HTML)
  const featured = activeFilter === "Tất cả" ? filtered.find((p) => p.featured) : undefined;
  const rest = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  return (
    <>
      {/* Breadcrumb + Page hero */}
      <section className="pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#A1A1AA]/40 tracking-wider mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="text-[#27272A]">›</span>
            <span className="text-[#E50914]">Dự Án</span>
          </nav>
          <div className="text-[#E50914] text-xs font-medium uppercase tracking-[0.16em] mb-5 flex items-center gap-2.5 before:content-[''] before:w-6 before:h-0.5 before:bg-[#E50914]">
            Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            Mỗi dự án là một <span className="text-[#E50914]">câu chuyện</span><br />được kể bằng hình ảnh
          </h1>
          <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-xl">
            Đối tác từ Tập đoàn, Cơ quan Nhà nước đến Startup và Doanh nghiệp vừa và nhỏ.
          </p>
        </div>
      </section>

      {/* Filter + Featured + Grid */}
      <section className="py-16 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <FilterTabs categories={projectCategories} active={activeFilter} onChange={setActiveFilter} />
          </div>

          {/* Featured project — 2 cột */}
          {featured && (
            <Link href={`/projects/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden border border-[#27272A] hover:border-[#E50914]/40 transition-colors mb-6">
              <div className="aspect-video overflow-hidden bg-[#1A1A1E]">
                <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="bg-[#1A1A1E] p-8 lg:p-10 flex flex-col justify-center gap-4">
                <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-sm bg-[#E50914]/[0.12] text-[#E50914] text-[10px] font-mono uppercase tracking-[0.12em]">
                  {featured.clientType}
                </span>
                <h3 className="text-white font-bold text-xl lg:text-2xl leading-snug">{featured.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{featured.description}</p>
                {featured.results[0] && (
                  <div className="flex items-center gap-2 text-[#E50914] font-mono text-xs before:content-['↑']">{featured.results[0]}</div>
                )}
              </div>
            </Link>
          )}

          {/* Grid 3 cột */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-[#A1A1AA] py-12">Chưa có dự án trong danh mục này.</p>
          )}
        </div>
      </section>

      {/* Feedback */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[#A1A1AA] text-xs font-medium uppercase tracking-[0.16em] mb-8 after:content-[''] after:flex-1 after:h-px after:bg-[#27272A]">
            Feedback
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
            Khách hàng nói gì về <span className="text-[#E50914]">CD Media</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners — hairline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[#A1A1AA] text-xs font-medium uppercase tracking-[0.16em] mb-8 after:content-[''] after:flex-1 after:h-px after:bg-[#27272A]">
            Khách hàng &amp; Đối tác
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-center h-24 rounded-xl bg-white border border-[#27272A] p-4 hover:border-[#E50914]/30 transition-all"
              >
                <PartnerLogo name={partner.name} logo={partner.logo} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA cuối */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Dự án tiếp theo của bạn<br />là <span className="text-[#E50914]">câu chuyện thành công</span>
          </h2>
          <p className="text-[#A1A1AA] max-w-md mx-auto mb-8">
            Hãy để CD Media biến ý tưởng của bạn thành nội dung có tác động thực tế.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E50914] text-white font-semibold rounded-lg hover:opacity-85 transition-opacity">
            Bắt đầu dự án của bạn <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
