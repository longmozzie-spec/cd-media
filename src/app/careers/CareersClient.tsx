"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import CareerCard from "@/components/ui/CareerCard";
import { careers, departments } from "@/data/careers";

// Timeline thật từ tài liệu khách hàng (PDF Figma — trang Tuyển dụng)
const milestones = [
  { year: "2013", title: "Khởi đầu", desc: "Bắt đầu với năng lực sản xuất phim chuyên nghiệp chuẩn điện ảnh." },
  { year: "2018", title: "Bứt phá số", desc: "Chinh phục công chúng trên hệ sinh thái số đạt 450M+ lượt xem." },
  { year: "Hiện tại", title: "Agency toàn diện", desc: "Trở thành Agency chiến lược & công nghệ truyền thông toàn diện." },
];

export default function CareersClient() {
  return (
    <>
      <HeroSection
        title="Gia Nhập Đội Ngũ CD Media"
        subtitle="Chúng tôi đang tìm kiếm những mảnh ghép đam mê nội dung giá trị, tạo ra sức ảnh hưởng bền vững cho cộng đồng."
        compact
      />

      {/* Tại sao nên lựa chọn CD Media? */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Hành trình" title="Tại sao nên lựa chọn CD Media?" description="Hơn một thập kỷ kiến tạo giá trị và dẫn dắt xu hướng nội dung." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 hover:border-[#E50914]/30 transition-all"
              >
                <span className="text-3xl font-bold text-[#E50914]">{m.year}</span>
                <h3 className="text-white font-semibold text-lg mt-3 mb-2">{m.title}</h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Phòng ban" title="Hệ thống nhân sự" description="CD Media có 5 phòng ban chuyên môn, phối hợp nhịp nhàng trong mỗi dự án." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-xl bg-[#1A1A1E] border border-[#27272A] p-4"
              >
                <div className="w-12 h-12 rounded-lg bg-[#E50914]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#E50914] font-bold text-lg">{dept.count}</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">{dept.name}</h4>
                  <p className="text-[#A1A1AA] text-sm">{dept.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle label="Vị trí" title="Gia nhập đội ngũ CD Media" description="Tìm vị trí phù hợp với bạn và ứng tuyển ngay hôm nay." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career, i) => (
              <CareerCard key={career.slug} career={career} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
