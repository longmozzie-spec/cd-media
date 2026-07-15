"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clapperboard, Rocket, Globe, ArrowRight } from "lucide-react";
import { careers } from "@/data/careers";

// "Tại sao chọn CD Media" — khung + nội dung theo tuyen-dung.html
const whyItems = [
  { icon: Clapperboard, title: "Dự án tầm vóc thực tế", desc: "Làm việc trực tiếp trên dự án với Tập đoàn, Nhà nước và doanh nghiệp lớn — không phải dự án giả lập." },
  { icon: Rocket, title: "Lộ trình thăng tiến rõ ràng", desc: "Đánh giá 6 tháng/lần với tiêu chí minh bạch — không phải lời hứa mơ hồ về “cơ hội thăng tiến”." },
  { icon: Globe, title: "Hệ sinh thái media mạnh", desc: "Tiếp cận hệ sinh thái 2.6M+ followers và mạng lưới đối tác truyền thông rộng khắp — lợi thế hiếm có." },
];

export default function CareersClient() {
  return (
    <>
      {/* Breadcrumb + Page hero */}
      <section className="pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#A1A1AA]/40 tracking-wider mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="text-[#27272A]">›</span>
            <span className="text-[#E50914]">Tuyển Dụng</span>
          </nav>
          <div className="text-[#E50914] text-xs font-medium uppercase tracking-[0.16em] mb-5 flex items-center gap-2.5 before:content-[''] before:w-6 before:h-0.5 before:bg-[#E50914]">
            Gia nhập đội ngũ
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            Kiến tạo giá trị,<br /><span className="text-[#E50914]">Dẫn dắt xu hướng</span>
          </h1>
          <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-xl">
            Chúng tôi đang tìm kiếm những mảnh ghép đam mê nội dung giá trị, tạo ra sức ảnh hưởng
            bền vững cho cộng đồng.
          </p>
        </div>
      </section>

      {/* Tại sao chọn CD Media — 2 cột */}
      <section className="py-20 mt-8 border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[#A1A1AA] text-xs font-medium uppercase tracking-[0.16em] mb-10 after:content-[''] after:flex-1 after:h-px after:bg-[#27272A]">
            Tại sao CD Media?
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Ảnh — TODO: Client content required (ảnh văn hóa/đội ngũ), đặt tại /public/team/ */}
            <div className="aspect-[4/3] rounded-xl border border-[#27272A] bg-gradient-to-br from-[#1A1A1E] to-[#27272A] flex items-center justify-center">
              <span className="text-[#A1A1AA]/40 text-xs uppercase tracking-widest font-mono">[ Ảnh văn hóa / đội ngũ ]</span>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-8">
                Tại sao nên lựa chọn <span className="text-[#E50914]">CD Media?</span>
              </h2>
              <div className="space-y-6">
                {whyItems.map((w, i) => (
                  <motion.div
                    key={w.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#E50914]/10 flex items-center justify-center shrink-0">
                      <w.icon size={22} className="text-[#E50914]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1.5">{w.title}</h4>
                      <p className="text-[#A1A1AA] text-sm leading-relaxed">{w.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gia nhập đội ngũ — job grid card ngang */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
            Gia nhập đội ngũ <span className="text-[#E50914]">CD Media</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careers.map((career, i) => (
              <motion.div
                key={career.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/careers/${career.slug}`} className="group flex items-stretch rounded-xl bg-[#1A1A1E] border border-[#27272A] overflow-hidden hover:border-[#E50914]/30 hover:-translate-y-0.5 transition-all min-h-[140px]">
                  {/* Trái */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-[#E50914] transition-colors">{career.title}</h3>
                      <div className="mt-3">
                        <div className="text-[#A1A1AA]/60 text-[10px] uppercase tracking-wider font-mono mb-1">Mức thu nhập</div>
                        <div className="text-white text-sm font-medium">{career.salary}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[#E50914] text-xs font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      Xem chi tiết <ArrowRight size={12} />
                    </span>
                  </div>
                  {/* Divider */}
                  <div className="w-px bg-white/[0.08]" />
                  {/* Phải */}
                  <div className="w-[120px] p-5 flex flex-col justify-center">
                    <div className="text-[#A1A1AA]/60 text-[10px] uppercase tracking-wider font-mono mb-1">Hạn nộp đơn</div>
                    <div className="text-white text-sm">{new Date(career.deadline).toLocaleDateString("vi-VN")}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
