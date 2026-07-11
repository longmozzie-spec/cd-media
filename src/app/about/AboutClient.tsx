"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Target, Shield, Users, Lightbulb, Eye, Compass } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import CTASection from "@/components/ui/CTASection";

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
        title="Về CD Media"
        subtitle="Kết nối tri thức — Chia sẻ giá trị. Đơn vị truyền thông nội dung số hàng đầu Việt Nam."
      />

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#E50914]/10 text-[#E50914] text-sm font-medium mb-4">
                Câu chuyện
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Từ năng lực sản xuất phim chuẩn điện ảnh đến Agency truyền thông toàn diện
              </h2>
              <div className="space-y-4 text-[#A1A1AA] leading-relaxed">
                <p>
                  Bắt đầu từ năm 2013 với năng lực sản xuất phim chuyên nghiệp chuẩn điện ảnh, CD Media
                  từng bước xây dựng nền tảng nội dung chất lượng cao trên nhiều lĩnh vực.
                </p>
                <p>
                  Đến năm 2018, chúng tôi chinh phục công chúng trên hệ sinh thái số. Hiện nay CD Media
                  vận hành hệ thống kênh YouTube và Facebook với 2.6 triệu người theo dõi đa nền tảng và
                  hơn 1 tỷ lượt xem tích lũy.
                </p>
                <p>
                  Qua công ty thành viên Alva, CD Media còn sản xuất phim tài liệu chất lượng cao,
                  đã phát sóng trên VTV1, VTV4 và hợp tác với Viettel, Trung tâm Lưu trữ Quốc gia,
                  Euro Window và nhiều đối tác lớn khác.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#27272A]">
                <img
                  src="/gioithieu-cdmedia.png"
                  alt="CD Media team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-gradient-to-br from-[#E50914] to-[#DC2626] flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">2013</span>
                  <p className="text-white/80 text-xs">Khởi đầu hành trình</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Văn hóa" title="Giá trị cốt lõi" description="4 giá trị định hình cách chúng tôi làm việc mỗi ngày." />
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

      {/* Channels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Hệ thống kênh" title="Hệ sinh thái nội dung CD Media" description="4 kênh YouTube, 5 kênh Facebook — phủ sóng đa lĩnh vực kiến thức." />
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

      {/* Vision & Mission */}
      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
