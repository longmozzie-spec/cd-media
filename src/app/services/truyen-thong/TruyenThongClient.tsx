"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FallbackImage from "@/components/ui/FallbackImage";

const serviceItems = [
  { num: "01", icon: "🎯", title: "Chiến lược thương hiệu", items: ["Định vị thương hiệu", "Xây dựng brand identity", "Messaging & tone of voice", "Brand guideline"] },
  { num: "02", icon: "📣", title: "Truyền thông tích hợp (IMC)", items: ["Kế hoạch truyền thông tổng thể", "Quản trị nội dung đa kênh", "Campaign 360°", "Đo lường hiệu quả"] },
  { num: "03", icon: "📰", title: "PR & Media Relations", items: ["Quan hệ báo chí", "Viết thông cáo báo chí", "Tổ chức sự kiện truyền thông", "Quản lý hình ảnh lãnh đạo"] },
  { num: "04", icon: "🛡️", title: "Xử lý khủng hoảng", items: ["Phát hiện & đánh giá rủi ro", "Kịch bản ứng phó", "Thông điệp xử lý khủng hoảng", "Phục hồi danh tiếng"] },
];

const steps = [
  { title: "Tiếp nhận & Nghiên cứu" },
  { title: "Chiến lược" },
  { title: "Sản xuất" },
  { title: "Triển khai" },
  { title: "Đo lường & Tối ưu" },
];

const channels = [
  { name: "CD Media Quân Sự", subs: "1.08M", url: "https://www.youtube.com/@CDMediaQuanSu" },
  { name: "CD Media Why?", subs: "495K", url: "https://www.youtube.com/@CDMediaWhy" },
  { name: "CD Media Khám Phá", subs: "664K", url: "https://www.youtube.com/@CDMediaKhamPha" },
];

export default function TruyenThongClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11] via-[#121214] to-[#0F0F11]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#E50914]/8 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-[#A1A1AA]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E50914] transition-colors">Trang chủ</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <Link href="/services" className="hover:text-[#E50914] transition-colors">Giải pháp</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <span className="text-[#E50914]">Truyền thông</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 text-[#E50914] text-xs font-mono uppercase tracking-[0.16em] mb-4">
                <span className="w-6 h-px bg-[#E50914]" /> Chiến lược tích hợp
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Giải Pháp <span className="text-[#E50914]">Truyền Thông</span> Toàn Diện
              </h1>
              <p className="text-lg text-[#A1A1AA] mb-8 leading-relaxed">
                Xây dựng, lan tỏa và bảo vệ hình ảnh thương hiệu bằng chiến lược tích hợp — từ định vị đến triển khai, từ nội dung đến đo lường kết quả thực tế.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20">
                  Liên hệ tư vấn <ArrowRight size={18} />
                </Link>
                <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-[#27272A] text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all">
                  Xem dự án thực tế
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="aspect-video rounded-2xl overflow-hidden border border-[#27272A]">
              <FallbackImage src="/services/giai-phap-truyen-thong.jpg" alt="Giải pháp Truyền thông CD Media" placeholder="[ Ảnh Giải pháp Truyền thông ] → /public/services/giai-phap-truyen-thong.jpg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 dịch vụ */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#A1A1AA] text-xs font-mono uppercase tracking-[0.16em] mb-3 block">Năng lực truyền thông</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Năng lực truyền thông chi tiết</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {serviceItems.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group rounded-xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#E50914] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#E50914] font-mono text-xs">{s.num}</span>
                  <span className="text-2xl">{s.icon}</span>
                  <h3 className="text-white font-semibold">{s.title}</h3>
                </div>
                <ul className="space-y-2">
                  {s.items.map(item => (
                    <li key={item} className="text-[#A1A1AA] text-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#E50914] shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lợi thế hệ sinh thái kênh */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="text-[#A1A1AA] text-xs font-mono uppercase tracking-[0.16em] mb-3 block">Lợi thế độc quyền</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Lợi thế hệ sinh thái: <span className="text-[#E50914]">2.6M người theo dõi</span>
              </h2>
              <p className="text-[#A1A1AA] leading-relaxed mb-6">
                CD Media sở hữu hệ thống kênh YouTube với 2.6M+ người theo dõi — giúp khuếch đại độ nhận biết thương hiệu ở tầng đại chúng mà không agency nào có được.
              </p>
              <p className="text-[#A1A1AA]/70 text-sm leading-relaxed border-l-2 border-[#E50914]/30 pl-4">
                Lưu ý: hệ sinh thái kênh phục vụ tệp khán giả đại chúng, phù hợp để tăng nhận biết thương hiệu — không phải kênh sinh lead B2B trực tiếp.
              </p>
            </motion.div>
            <div className="space-y-4">
              {channels.map((ch, i) => (
                <motion.a key={ch.name} href={ch.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between rounded-xl bg-[#1A1A1E] border border-[#27272A] p-4 hover:border-[#E50914]/30 transition-all">
                  <span className="text-white font-medium">{ch.name}</span>
                  <span className="text-[#E50914] font-mono text-sm font-bold">{ch.subs}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quy trình 5 bước */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Cách chúng tôi làm việc</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative text-center">
                {i < steps.length - 1 && <div className="hidden md:block absolute top-7 left-[60%] w-full h-px bg-[#27272A]" />}
                <div className="w-14 h-14 rounded-full bg-[#E50914]/10 border-2 border-[#E50914] flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-[#E50914] font-mono font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-white font-medium text-sm">{step.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#E50914]/30 bg-[#E50914]/[0.06] p-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sẵn sàng <span className="text-[#E50914]">bứt phá thương hiệu?</span>
            </h2>
            <p className="text-[#A1A1AA] mb-8 max-w-xl mx-auto">
              Đội ngũ CD Media sẵn sàng tư vấn chiến lược truyền thông phù hợp với mục tiêu và ngân sách của bạn.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20">
              Liên hệ tư vấn <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
