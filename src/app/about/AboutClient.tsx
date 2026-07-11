"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Target, Shield, Users, Lightbulb, Eye, Compass, Sparkles } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import CTASection from "@/components/ui/CTASection";

// Timeline "Câu chuyện CD Media" — mốc thật từ tài liệu khách hàng (PDF Figma)
const timeline = [
  { year: "2013", title: "Khởi đầu", desc: "Bắt đầu với năng lực sản xuất phim chuyên nghiệp chuẩn điện ảnh." },
  { year: "2018", title: "Bứt phá số", desc: "Chinh phục công chúng trên hệ sinh thái số đạt 450M+ lượt xem." },
  { year: "Hiện tại", title: "Agency toàn diện", desc: "Trở thành Agency chiến lược & công nghệ truyền thông toàn diện." },
];

const values = [
  { icon: Lightbulb, title: "Kết nối tri thức", desc: "Mang kiến thức chuyên sâu đến gần hơn với công chúng qua nội dung số." },
  { icon: Zap, title: "Chất lượng cao", desc: "Mỗi thước phim, mỗi nội dung đều đạt chuẩn phát sóng truyền hình." },
  { icon: Shield, title: "Nhân văn", desc: "Truyền tải câu chuyện chân thực, giàu giá trị bền vững." },
  { icon: Target, title: "Hiệu quả", desc: "Hơn 1 tỷ lượt xem tích lũy — con số nói lên tất cả." },
];

const channels = [
  { icon: Shield, title: "CD Media - Quân Sự", subs: "1.08M", url: "https://www.youtube.com/@CDMediaQuanSu", desc: "Phân tích quân sự, quốc phòng, địa chính trị" },
  { icon: Lightbulb, title: "CD Media - Why?", subs: "495K", url: "https://www.youtube.com/@CDMediaWhy", desc: "Giải đáp câu hỏi kinh tế, xã hội, thế giới" },
  { icon: Eye, title: "CD Media - Khám Phá", subs: "664K", url: "https://www.youtube.com/@CDMediaKhamPha", desc: "Văn hóa, lịch sử, khoa học, du lịch Việt Nam" },
  { icon: Heart, title: "CD Media - DOC", subs: "23.5K", url: "https://www.youtube.com/@CDMedia-DOC", desc: "Phim tài liệu cho VTV1, VTV4 và đối tác" },
];

export default function AboutClient() {
  return (
    <>
      <HeroSection
        title="Mang câu chuyện thương hiệu chân thực, giàu giá trị"
        subtitle="CD Media — Agency truyền thông, sản xuất media đa nền tảng. Tạo ảnh hưởng bền vững cho cộng đồng và doanh nghiệp."
      />
      {/* Câu chuyện CD Media — Timeline dọc */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Hành trình" title="Câu chuyện CD Media" description="Hơn một thập kỷ từ xưởng phim đến Agency truyền thông toàn diện." />
          <div className="relative pl-8 md:pl-0">
            {/* đường timeline */}
            <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-[#27272A] md:-translate-x-1/2" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative md:w-1/2 ${i % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10"}`}
                >
                  {/* chấm mốc */}
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-[#E50914] border-4 border-[#0F0F11] -left-[26px] md:left-auto ${i % 2 === 0 ? "md:-right-2" : "md:-left-2"}`} />
                  <div className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 transition-all">
                    <span className="text-2xl font-bold text-[#E50914]">{item.year}</span>
                    <h3 className="text-white font-semibold text-lg mt-2 mb-2">{item.title}</h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Về con người & văn hóa */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Đội ngũ" title="Về con người & văn hóa" description="Những bước đi chiến lược và trái tim sáng tạo phía sau mỗi sản phẩm." />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-4">
                <Users size={28} className="text-[#E50914]" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Về con người</h3>
              {/* TODO: Client content required — nội dung giới thiệu đội ngũ CD Media. */}
              <p className="text-[#A1A1AA] leading-relaxed">
                Đội ngũ CD Media là những người trẻ đam mê nội dung giá trị — từ biên kịch, đạo diễn,
                quay phim đến dựng phim và chiến lược. Mỗi thành viên đều theo đuổi sự chỉn chu trong
                từng khung hình và câu chữ.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-4">
                <Sparkles size={28} className="text-[#E50914]" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Về văn hóa</h3>
              {/* TODO: Client content required — nội dung văn hóa làm việc CD Media. */}
              <p className="text-[#A1A1AA] leading-relaxed">
                Chúng tôi xây dựng môi trường làm việc mở, đề cao sáng tạo và tinh thần trách nhiệm.
                Ở CD Media, ý tưởng tốt được lắng nghe và mỗi dự án là một cơ hội để học hỏi, bứt phá.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hệ thống kênh */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Hệ thống kênh" title="Hệ sinh thái nội dung CD Media" description="Hệ thống kênh YouTube và Facebook phủ sóng đa lĩnh vực kiến thức." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {channels.map((dept, i) => (
              <motion.a
                key={dept.title}
                href={dept.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="block rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 hover:shadow-lg hover:shadow-[#E50914]/5 transition-all"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#E50914]/10 flex items-center justify-center">
                    <dept.icon size={24} className="text-[#E50914]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{dept.title}</h3>
                    <p className="text-[#E50914] text-sm font-medium">{dept.subs} subscribers</p>
                  </div>
                </div>
                <p className="text-[#A1A1AA] text-sm">{dept.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Tầm nhìn – Sứ mệnh & Giá trị */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Định hướng" title="Tầm nhìn – Sứ mệnh & Giá trị" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-gradient-to-br from-[#1A1A1E] to-[#27272A] border border-[#27272A] p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-4">
                <Eye size={28} className="text-[#E50914]" />
              </div>
              <h3 className="text-white font-bold text-2xl mb-4">Tầm nhìn</h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                Trở thành đơn vị sản xuất nội dung số và phim tài liệu hàng đầu Việt Nam —
                kết nối tri thức đa lĩnh vực đến hàng chục triệu người xem mỗi tháng.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-gradient-to-br from-[#1A1A1E] to-[#27272A] border border-[#27272A] p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-[#E50914]/10 flex items-center justify-center mb-4">
                <Compass size={28} className="text-[#E50914]" />
              </div>
              <h3 className="text-white font-bold text-2xl mb-4">Sứ mệnh</h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                Truyền tải những câu chuyện chân thực, giàu nhân văn qua những thước phim chất lượng cao.
                Chia sẻ kiến thức đa lĩnh vực qua nội dung video và bài viết — phục vụ cộng đồng và doanh nghiệp.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 text-center hover:border-[#E50914]/30 hover:shadow-lg hover:shadow-[#E50914]/5 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#E50914]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-[#E50914]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-[#A1A1AA] text-sm">{item.desc}</p>
              </motion.div>
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
