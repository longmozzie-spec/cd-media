"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Play, Music2, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import { companyInfo } from "@/data/common";

export default function ContactClient() {
  return (
    <>
      {/* Breadcrumb + Page hero */}
      <section className="pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#A1A1AA]/40 tracking-wider mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="text-[#27272A]">›</span>
            <span className="text-[#E50914]">Liên Hệ</span>
          </nav>
          <div className="text-[#E50914] text-xs font-medium uppercase tracking-[0.16em] mb-5 flex items-center gap-2.5 before:content-[''] before:w-6 before:h-0.5 before:bg-[#E50914]">
            Liên Hệ
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            Liên Hệ CD Media – Bắt Đầu <span className="text-[#E50914]">Dự Án Của Bạn</span>
          </h1>
          <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-xl">
            Để lại thông tin — đội ngũ CD Media sẽ liên hệ tư vấn giải pháp truyền thông phù hợp
            nhất với thương hiệu của bạn trong vòng 24 giờ.
          </p>
        </div>
      </section>

      {/* 2 cột: info + form */}
      <section className="py-16 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Trái: thông tin liên hệ */}
          <div className="space-y-5">
            {[
              { icon: Phone, label: "Hotline", value: companyInfo.phone, href: `tel:${companyInfo.phone.replace(/\s/g, "")}` },
              { icon: Mail, label: "Email", value: companyInfo.email, href: `mailto:${companyInfo.email}` },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 rounded-xl bg-[#1A1A1E] border border-[#27272A] p-5">
                <div className="w-11 h-11 rounded-xl bg-[#E50914]/10 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-[#E50914]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-0.5">{item.label}</h4>
                  <a href={item.href} className="text-[#A1A1AA] hover:text-[#E50914] transition-colors">{item.value}</a>
                </div>
              </div>
            ))}
            <div className="flex gap-4 rounded-xl bg-[#1A1A1E] border border-[#27272A] p-5">
              <div className="w-11 h-11 rounded-xl bg-[#E50914]/10 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-[#E50914]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-0.5">Địa chỉ</h4>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{companyInfo.address}</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl bg-[#1A1A1E] border border-[#27272A] p-5">
              <div className="w-11 h-11 rounded-xl bg-[#E50914]/10 flex items-center justify-center shrink-0">
                <Globe size={20} className="text-[#E50914]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-3">Kết nối với chúng tôi</h4>
                <div className="flex flex-wrap gap-2">
                  <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:bg-[#E50914] hover:text-white transition-all"><Globe size={17} /></a>
                  <a href={companyInfo.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:bg-[#E50914] hover:text-white transition-all"><Play size={17} /></a>
                  <a href={companyInfo.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:bg-[#E50914] hover:text-white transition-all"><Music2 size={17} /></a>
                  <a href={companyInfo.social.zalo} target="_blank" rel="noopener noreferrer" aria-label="Zalo" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:bg-[#E50914] hover:text-white transition-all"><MessageCircle size={17} /></a>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-[#27272A] aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5!2d105.800!3d20.995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS2h14bqldCBEdXkgVGnhур!5e0!3m2!1svi!2svn!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CD Media - Khuất Duy Tiến, Hà Nội"
              />
            </div>
          </div>

          {/* Phải: form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl bg-[#1A1A1E] border border-[#27272A] p-6 lg:p-8"
            >
              <h3 className="text-white font-bold text-xl mb-1">Gửi Yêu Cầu Tư Vấn</h3>
              <p className="text-[#A1A1AA]/60 text-sm mb-6">Miễn phí · Phản hồi trong 24 giờ làm việc</p>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
