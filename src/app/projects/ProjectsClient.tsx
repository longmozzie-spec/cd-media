"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
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
    : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <HeroSection
        title="Dự án"
        subtitle="Mỗi dự án là một câu chuyện — được kể bằng hình ảnh, chiến lược và sự tận tâm."
        compact
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterTabs categories={projectCategories} active={activeFilter} onChange={setActiveFilter} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-[#A1A1AA] py-12">Chưa có dự án trong danh mục này.</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Feedback" title="Khách hàng nói gì về CD Media" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="Đối tác"
            title="Khách hàng & Đối tác"
            description="Những thương hiệu đã tin tưởng đồng hành cùng CD Media."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-center h-24 rounded-xl bg-white border border-[#27272A] p-4 hover:border-[#E50914]/30 hover:shadow-lg hover:shadow-[#E50914]/5 transition-all"
              >
                <PartnerLogo name={partner.name} logo={partner.logo} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}