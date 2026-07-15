"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Link2, BarChart3, Tv, Landmark, Clapperboard, Globe, Bot, GraduationCap, ArrowRight } from "lucide-react";
import CTASection from "@/components/ui/CTASection";

// Timeline "Câu chuyện CD Media" — khung + mốc theo ve-cd-media.html
const timeline = [
  { year: "2013", title: "Khởi đầu với điện ảnh", desc: "Thành lập với sứ mệnh sản xuất phim chuyên nghiệp chuẩn điện ảnh — đặt nền móng cho năng lực sản xuất media của CD Media." },
  { year: "2018", title: "Chinh phục đa nền tảng", desc: "Mở rộng sang hệ sinh thái số với các kênh YouTube chiến lược, đạt 450M+ lượt xem tích lũy." },
  { year: "2022", title: "Mở rộng giải pháp B2B", desc: "Phát triển mảng tư vấn chiến lược và marketing tổng thể dành riêng cho doanh nghiệp SME, Startup và Tập đoàn." },
  { year: "Hiện tại", title: "Agency chiến lược toàn diện", desc: "Trở thành Agency chiến lược & công nghệ truyền thông toàn diện — từ sản xuất đến đào tạo, từ nội dung đến đo lường kết quả." },
];

const values = [
  { icon: Target, title: "Thực chiến trước", desc: "Mọi chiến lược đều được kiểm nghiệm qua dự án thật, số liệu thật và kết quả đo lường được — không phải lý thuyết sách giáo khoa." },
  { icon: Link2, title: "Nhất quán xuyên suốt", desc: "Từ brief đến sản phẩm cuối, CD Media đảm bảo thông điệp thương hiệu nhất quán trên mọi kênh và mọi điểm chạm." },
  { icon: BarChart3, title: "Cam kết đo lường", desc: "100% chiến dịch có KPI rõ ràng từ trước. Báo cáo nói thật — kể cả khi kết quả chưa đạt kỳ vọng để cùng tối ưu." },
];

// TODO: Client content required — tên & ảnh thành viên thật. Ảnh đặt tại /public/team/.
const team = [
  { name: "Thành viên 1", role: "CEO & Founder" },
  { name: "Thành viên 2", role: "Production Director" },
  { name: "Thành viên 3", role: "Marketing Director" },
  { name: "Thành viên 4", role: "Content Strategist" },
];

const achievements = [
  { icon: Tv, title: "Phim tài liệu VTV", desc: "Hợp tác sản xuất phim tài liệu phủ sóng quốc gia trên các kênh VTV1, VTV2, VTV4." },
  { icon: Landmark, title: "Triển lãm 3D Côn Đảo", desc: "Số hóa di tích lịch sử Côn Đảo thành trải nghiệm triển lãm 3D tương tác quy mô quốc gia." },
  { icon: Clapperboard, title: "450M+ Lượt xem", desc: "Hệ sinh thái kênh YouTube với 2.6M+ người theo dõi và hơn 450 triệu lượt xem tích lũy." },
];

const partners = ["VTV", "Vingroup", "Viettel", "VNPT", "Sun Group", "Eurowindow"];

const visions = [
  { icon: Globe, title: "Vươn ra quốc tế", desc: "Đặt mục tiêu hiện diện tại Đông Nam Á với mô hình agency media xuyên biên giới." },
  { icon: Bot, title: "Tích hợp AI Production", desc: "Ứng dụng AI vào quy trình sản xuất để tăng tốc độ và tối ưu chi phí cho khách hàng." },
  { icon: GraduationCap, title: "Xây dựng cộng đồng", desc: "Đào tạo media creator Việt Nam có tư duy chiến lược và kỹ năng phân phối nội dung thực chiến." },
];

const eyebrowCls = "flex items-center gap-3 text-[#A1A1AA] text-xs font-medium uppercase tracking-[0.16em] mb-8 after:content-[''] after:flex-1 after:h-px after:bg-[#27272A]";

export default function AboutClient() {
  return (
    <>
      {/* Breadcrumb + Page hero */}
      <section className="pt-28 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#A1A1AA]/40 tracking-wider mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span className="text-[#27272A]">›</span>
            <span className="text-[#E50914]">Về CD Media</span>
          </nav>
          <div className="text-[#E50914] text-xs font-medium uppercase tracking-[0.16em] mb-5 flex items-center gap-2.5 before:content-[''] before:w-6 before:h-0.5 before:bg-[#E50914]">
            Về Chúng Tôi
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-4">
            13 năm kiến tạo<br />truyền thông <span className="text-[#E50914]">thực chiến</span>
          </h1>
          <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-xl">
            Mang đến câu chuyện thương hiệu chân thực, giàu giá trị và tạo ảnh hưởng bền vững cho
            doanh nghiệp và tổ chức tại Việt Nam.
          </p>
        </div>
      </section>

      {/* Câu chuyện — timeline 2 cột */}
      <section className="py-20 mt-8 border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={eyebrowCls}>Hành trình phát triển</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-9">
                Câu chuyện <span className="text-[#E50914]">CD Media</span>
              </h2>
              <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-[#27272A]">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative mb-10 last:mb-0 group"
                  >
                    <span className="absolute -left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-[#27272A] bg-[#121214] group-hover:border-[#E50914] transition-colors" />
                    <div className="text-[#E50914] font-mono text-xs tracking-[0.12em] mb-1.5">{item.year}</div>
                    <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Ảnh — TODO: Client content required, đặt tại /public/team/ */}
            <div className="aspect-[4/5] rounded-xl border border-[#27272A] overflow-hidden bg-gradient-to-br from-[#1A1A1E] to-[#27272A] flex items-center justify-center">
              <span className="text-[#A1A1AA]/40 text-xs uppercase tracking-widest font-mono">[ Ảnh đội ngũ / văn phòng ]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi — 3 cột hairline */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={eyebrowCls}>Giá trị cốt lõi</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-10">
            Những bộ óc chiến lược &amp; <span className="text-[#E50914]">trái tim sáng tạo</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#27272A] border border-[#27272A] rounded-xl overflow-hidden">
            {values.map((v) => (
              <div key={v.title} className="bg-[#0F0F11] hover:bg-[#1A1A1E] p-8 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-4">
                  <v.icon size={24} className="text-[#E50914]" />
                </div>
                <h4 className="text-white font-semibold text-lg mb-2.5">{v.title}</h4>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Con người & Văn hóa — team 4 cột */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={eyebrowCls}>Con người &amp; Văn hóa</div>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Đội ngũ <span className="text-[#E50914]">CD Media</span>
            </h2>
            <Link href="/careers" className="inline-flex items-center gap-2 text-[#E50914] text-sm font-semibold border border-[#E50914]/30 rounded-lg px-4 py-2.5 hover:bg-[#E50914]/[0.08] transition-colors">
              Gia nhập đội ngũ <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((m) => (
              <div key={m.role} className="rounded-xl border border-[#27272A] overflow-hidden text-center bg-[#1A1A1E]">
                <div className="aspect-square bg-gradient-to-br from-[#1A1A1E] to-[#27272A] flex items-center justify-center">
                  <span className="text-[#A1A1AA]/40 text-xs uppercase tracking-widest font-mono">Ảnh</span>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold">{m.name}</h4>
                  <p className="text-[#E50914] text-xs font-mono tracking-wider mt-1">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thành tựu — 3 card */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={eyebrowCls}>Thành tựu nổi bật</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
            Minh chứng bằng <span className="text-[#E50914]">kết quả</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((a) => (
              <div key={a.title} className="rounded-xl bg-[#1A1A1E] border border-[#27272A] p-7 flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E50914]/10 flex items-center justify-center shrink-0">
                  <a.icon size={22} className="text-[#E50914]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1.5">{a.title}</h4>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Đối tác — hairline 6 cột */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={eyebrowCls}>Khách hàng &amp; Đối tác</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
            Tin tưởng bởi các <span className="text-[#E50914]">tổ chức lớn</span>
          </h2>
          {/* TODO: Client content required — logo đối tác đặt tại /public/partners/ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#27272A] border border-[#27272A] rounded-lg overflow-hidden">
            {partners.map((p) => (
              <div key={p} className="bg-[#121214] hover:bg-[#1A1A1E] h-20 flex items-center justify-center transition-colors">
                <span className="text-[#A1A1AA]/60 text-xs uppercase tracking-wider font-mono">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tầm nhìn & Sứ mệnh — 2 cột */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className={eyebrowCls}>Tầm nhìn &amp; Sứ mệnh</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-5">
              <span className="text-[#E50914]">Dẫn dắt</span> xu hướng<br />truyền thông Việt Nam
            </h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-7 max-w-md">
              Trở thành agency truyền thông chiến lược hàng đầu Việt Nam — nơi công nghệ, sáng tạo
              và dữ liệu hội tụ để tạo ra giá trị thực cho doanh nghiệp.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#E50914] text-white font-semibold rounded-lg hover:opacity-85 transition-opacity">
              Hợp tác với CD Media <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-xl bg-[#1A1A1E] border border-[#27272A] p-8 divide-y divide-[#27272A]">
            {visions.map((v) => (
              <div key={v.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg bg-[#E50914]/10 flex items-center justify-center shrink-0">
                  <v.icon size={20} className="text-[#E50914]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">{v.title}</h4>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Muốn trở thành một phần của CD Media?"
        description="Chúng tôi luôn tìm kiếm những người tài năng và đam mê."
        buttonText="Xem vị trí tuyển dụng"
        buttonHref="/careers"
      />
    </>
  );
}
