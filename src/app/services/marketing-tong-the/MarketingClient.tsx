"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Target, Clapperboard, LineChart, Search } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

// Số liệu từ tài liệu khách hàng (PDF Figma — trang MKT tổng thể)
// TODO: Client content required — xác nhận lại các chỉ số này trước khi go-live.
const stats = [
  { value: "13+", label: "Năm thực chiến với doanh nghiệp" },
  { value: "1B", label: "Lượt xem trên hệ sinh thái media" },
  { value: "3M+", label: "Lượt theo dõi trên các nền tảng social" },
  { value: "72H", label: "Từ brief đến kịch bản đầu tiên" },
];

const problems = [
  {
    title: "Chi nhiều — không đo được?",
    desc: "Agency có chạy ads, làm content, báo cáo đủ impressions — nhưng không ai nói rõ bao nhiêu đồng tạo ra một khách hàng thật sự.",
  },
  {
    title: "Nội dung nhiều — nhưng không ai mua",
    desc: "Sản xuất đều đặn mà chuyển đổi vẫn thấp, vì nội dung không gắn với hành trình ra quyết định của khách hàng.",
  },
  {
    title: "Mỗi agency một hướng — không nhất quán",
    desc: "Nhiều bên cùng làm nhưng thiếu một chiến lược tổng thể, khiến thông điệp thương hiệu rời rạc.",
  },
];

const principles = ["Chiến lược trước", "Sản xuất sau", "Đo lường xuyên suốt"];

const steps = [
  {
    icon: Search,
    title: "Chẩn đoán thương hiệu",
    desc: "Phân tích positioning hiện tại, audit kênh, phỏng vấn khách hàng thật. Không dùng template — dùng dữ liệu thực tế của bạn.",
  },
  {
    icon: Target,
    title: "Chiến lược & định vị",
    desc: "Xác định tệp khách hàng, thông điệp cốt lõi và kênh phân phối phù hợp với mục tiêu doanh thu.",
  },
  {
    icon: Clapperboard,
    title: "Sản xuất nội dung",
    desc: "Triển khai nội dung chuẩn chỉnh theo chiến lược — từ video, hình ảnh đến bài viết đa nền tảng.",
  },
  {
    icon: LineChart,
    title: "Đo lường & tối ưu",
    desc: "Theo dõi số liệu thực tế, báo cáo minh bạch và tối ưu liên tục theo kết quả kinh doanh.",
  },
];

export default function MarketingClient() {
  return (
    <>
      {/* Hero 2 cột */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11] via-[#121214] to-[#0F0F11]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E50914]/8 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 text-sm text-[#A1A1AA]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E50914] transition-colors">Trang chủ</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <Link href="/services" className="hover:text-[#E50914] transition-colors">Giải pháp</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <span className="text-[#E50914]">Marketing tổng thể</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#E50914]/10 text-[#E50914] text-sm font-medium mb-4">
                Marketing tổng thể
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Marketing tạo ra <span className="text-[#E50914]">doanh thu thật</span>
              </h1>
              <p className="text-lg text-[#A1A1AA] mb-8 leading-relaxed">
                Dành cho doanh nghiệp SME &amp; Startup muốn marketing tạo ra doanh thu thật — không phải
                báo cáo đẹp. CD Media thiết kế chiến lược, sản xuất nội dung và đo kết quả bằng số liệu thực tế.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20">
                  Nhận tư vấn miễn phí <ArrowRight size={18} />
                </Link>
                <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-[#27272A] text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all">
                  Xem dự án thực tế
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6">
                  <div className="text-3xl md:text-4xl font-bold text-[#E50914] mb-2">{s.value}</div>
                  <p className="text-[#A1A1AA] text-sm">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vấn đề */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#E50914] text-sm font-medium uppercase tracking-wider">Vấn đề thường gặp</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
              Bạn có đang gặp những vấn đề này?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 transition-all"
              >
                <div className="text-[#E50914] text-sm font-bold mb-3">Vấn đề {i + 1}</div>
                <h3 className="text-white font-semibold text-lg mb-3">{p.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cách CD Media làm */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#E50914] text-sm font-medium uppercase tracking-wider">Cách CD Media làm</span>
            <div className="flex flex-wrap justify-center gap-3 mt-4 mb-6">
              {principles.map((pr) => (
                <span key={pr} className="px-4 py-2 rounded-full bg-[#E50914]/10 text-[#E50914] text-sm font-medium">
                  {pr}
                </span>
              ))}
            </div>
            <p className="text-[#A1A1AA] leading-relaxed">
              Hầu hết agency bắt đầu bằng câu hỏi &ldquo;làm gì?&rdquo;. CD Media bắt đầu bằng câu hỏi
              &ldquo;tại sao khách hàng hiện tại chọn bạn — và làm thế nào để nhân rộng điều đó&rdquo;.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#E50914]/10 flex items-center justify-center">
                    <step.icon size={22} className="text-[#E50914]" />
                  </div>
                  <span className="text-[#E50914]/40 font-bold text-2xl">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA cuối + form */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Hãy để dự án tiếp theo của bạn là một <span className="text-[#E50914]">câu chuyện thành công</span>
              </h2>
              <p className="text-[#A1A1AA] leading-relaxed mb-6">
                Buổi tư vấn đầu tiên miễn phí — 45 phút. CD Media sẽ phân tích tình trạng marketing hiện tại
                và đề xuất hướng đi cụ thể, không bán gói dịch vụ ngay buổi đầu.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Không cần chuẩn bị tài liệu trước",
                  "Phản hồi xác nhận lịch trong 24 giờ",
                  "Online hoặc gặp trực tiếp tại Hà Nội",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#A1A1AA]">
                    <Check size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <span className="inline-block px-4 py-2 rounded-full bg-[#E50914]/10 text-[#E50914] text-sm font-medium">
                Miễn phí · 45 phút · Không áp lực
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Đặt lịch tư vấn</h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
