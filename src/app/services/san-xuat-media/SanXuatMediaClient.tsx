"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import FallbackImage from "@/components/ui/FallbackImage";
import ContactForm from "@/components/ui/ContactForm";

const services = [
  { icon: "🎬", title: "Phim tài liệu", desc: "Sản xuất phim tài liệu chất lượng cao, giàu tính nhân văn — đã phát sóng trên VTV1, VTV4." },
  { icon: "📺", title: "TVC & Quảng cáo", desc: "Sản xuất TVC chuyên nghiệp từ concept, kịch bản đến hậu kỳ hoàn chỉnh." },
  { icon: "🏛️", title: "Phim diễn họa lịch sử", desc: "Phim tái hiện, minh họa lịch sử kết hợp kỹ xảo và nghiên cứu chuyên sâu." },
  { icon: "▶️", title: "Nội dung YouTube", desc: "Sản xuất video chuyên đề: quân sự, khoa học, khám phá — hơn 1 tỷ lượt xem tích lũy." },
  { icon: "📱", title: "Content đa nền tảng", desc: "Sáng tạo nội dung cho YouTube, Facebook, TikTok theo chiến lược và xu hướng." },
  { icon: "🌐", title: "Triển lãm ảo 3D", desc: "Thiết kế và sản xuất triển lãm ảo tương tác, trải nghiệm 360° đa giác quan." },
];

const steps = [
  { num: "01", title: "Tiếp nhận & Brief", time: "1–2 ngày" },
  { num: "02", title: "Kịch bản & Storyboard", time: "3–7 ngày" },
  { num: "03", title: "Tiền kỳ (Pre-production)", time: "3–7 ngày" },
  { num: "04", title: "Quay dựng (Production)", time: "1–5 ngày" },
  { num: "05", title: "Hậu kỳ & Bàn giao", time: "5–14 ngày" },
];

export default function SanXuatMediaClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11] via-[#121214] to-[#0F0F11]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#E50914]/8 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-[#A1A1AA]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E50914] transition-colors">Trang chủ</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <Link href="/services" className="hover:text-[#E50914] transition-colors">Giải pháp</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <span className="text-[#E50914]">Sản xuất Media</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 text-[#E50914] text-xs font-mono uppercase tracking-[0.16em] mb-4">
                <span className="w-6 h-px bg-[#E50914]" /> 13 năm kinh nghiệm
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Sản Xuất Media <span className="text-[#E50914]">Chuẩn Điện Ảnh</span>
              </h1>
              <p className="text-lg text-[#A1A1AA] mb-4 leading-relaxed">
                13 năm sản xuất phim — từ kịch bản đến hậu kỳ, khép kín trong một mái nhà. CD Media đồng hành cùng doanh nghiệp, tập đoàn và cơ quan nhà nước trong từng khung hình.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20">
                  Nhận báo giá <ArrowRight size={18} />
                </Link>
                <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-[#27272A] text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all">
                  Xem dự án thực tế
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="aspect-video rounded-2xl overflow-hidden border border-[#27272A]">
              <FallbackImage src="/services/san-xuat-media.jpg" alt="Sản xuất Media CD Media" placeholder="[ Ảnh Sản xuất Media ] → /public/services/san-xuat-media.jpg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6 dịch vụ sản xuất */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#A1A1AA] text-xs font-mono uppercase tracking-[0.16em] mb-3 block">Năng lực sản xuất</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Chúng tôi sản xuất gì</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group rounded-xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#E50914] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/projects" className="inline-flex items-center gap-2 text-[#E50914] font-medium hover:gap-3 transition-all">
              Xem dự án thực tế <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Quy trình 5 bước */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#A1A1AA] text-xs font-mono uppercase tracking-[0.16em] mb-3 block">Quy trình làm việc</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Quy trình khép kín 5 bước</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-full h-px bg-[#27272A]" />
                )}
                <div className="w-14 h-14 rounded-full bg-[#E50914]/10 border-2 border-[#E50914] flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-[#E50914] font-mono font-bold text-sm">{step.num}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-[#A1A1AA] text-xs font-mono">{step.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Báo giá */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#E50914]/30 bg-[#E50914]/[0.06] p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bắt đầu dự án sản xuất <span className="text-[#E50914]">của bạn</span>
            </h2>
            <p className="text-[#A1A1AA] mb-8 leading-relaxed max-w-xl mx-auto">
              Gửi brief hoặc liên hệ trực tiếp — CD Media sẽ phản hồi trong 24 giờ làm việc với đề xuất cụ thể.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20">
              Nhận báo giá sản xuất <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
