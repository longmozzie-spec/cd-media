"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";
import ContactForm from "@/components/ui/ContactForm";
import { servicePillars } from "@/data/services";

export default function ServicesClient() {
  return (
    <>
      <HeroSection
        title="Sản xuất media, tư vấn chiến lược & thực thi Marketing"
        subtitle="Hệ giải pháp truyền thông tích hợp toàn diện — từ ý tưởng đến đo lường hiệu quả."
        compact
      />

      {/* Menu 4 nhóm giải pháp (anchor) + Tải HSNL */}
      <section className="py-6 border-b border-[#27272A] sticky top-16 lg:top-20 z-30 bg-[#0F0F11]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-2">
            {servicePillars.map((p) => (
              <a
                key={p.key}
                href={`#${p.key}`}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1A1A1E] border border-[#27272A] text-[#A1A1AA] hover:text-white hover:border-[#E50914]/30 transition-all"
              >
                {p.title}
              </a>
            ))}
          </nav>
          {/* TODO: Client content required — thay bằng file HSNL thật tại /public/hsnl/ho-so-nang-luc.pdf */}
          <a
            href="/hsnl/ho-so-nang-luc.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#E50914] text-white hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20"
          >
            <Download size={16} /> Tải xuống HSNL (PDF)
          </a>
        </div>
      </section>

      {/* 4 trụ cột giải pháp */}
      {servicePillars.map((pillar, idx) => (
        <section
          key={pillar.key}
          id={pillar.key}
          className={`py-20 scroll-mt-32 ${idx % 2 === 1 ? "bg-[#121214]" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle label={pillar.tagline} title={pillar.title} description={pillar.description} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillar.items.map((item, i) => (
                <ServiceCard key={item.title} {...item} index={i} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={pillar.primaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20"
              >
                {pillar.primaryCta.label} <ArrowRight size={18} />
              </Link>
              {pillar.secondaryCta && (
                <Link
                  href={pillar.secondaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-[#27272A] text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {pillar.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Liên hệ nhanh */}
      <section className="py-20 border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <SectionTitle label="Liên hệ nhanh" title="Nhận tư vấn giải pháp" description="Để lại thông tin, CD Media sẽ liên hệ bạn trong 24 giờ." />
            <ContactForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
