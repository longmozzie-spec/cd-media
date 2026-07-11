"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";
import ContactForm from "@/components/ui/ContactForm";
import { services } from "@/data/services";

export default function ServicesClient() {
  return (
    <>
      <HeroSection
        title="Giải pháp & Dịch vụ"
        subtitle="Từ ý tưởng đến thực thi — CD Media đồng hành cùng thương hiệu trên mọi mặt trận truyền thông."
        compact
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Sản xuất" title={services.media.title} description={services.media.description} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.media.items.map((item, i) => (
              <ServiceCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Truyền thông" title={services.communication.title} description={services.communication.description} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.communication.items.map((item, i) => (
              <ServiceCard key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Marketing" title={services.marketing.title} description={services.marketing.description} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.marketing.items.map((item, i) => (
              <ServiceCard key={item.title} {...item} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/services/marketing-tong-the"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20"
            >
              Xem chi tiết Marketing tổng thể <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#121214]">
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