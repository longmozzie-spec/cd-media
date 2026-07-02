"use client";

import { useState } from "react";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectCard from "@/components/ui/ProjectCard";
import FilterTabs from "@/components/ui/FilterTabs";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { projects, projectCategories } from "@/data/projects";
import { testimonials } from "@/data/common";

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
    </>
  );
}