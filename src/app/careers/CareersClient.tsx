"use client";

import { motion } from "framer-motion";
import { Sparkles, BookOpen, Rocket, Users } from "lucide-react";
import HeroSection from "@/components/ui/HeroSection";
import SectionTitle from "@/components/ui/SectionTitle";
import CareerCard from "@/components/ui/CareerCard";
import { careers, departments } from "@/data/careers";

const reasons = [
  { icon: Sparkles, title: "Môi trường sáng tạo", desc: "Không gian làm việc mở, tự do thể hiện ý tưởng." },
  { icon: BookOpen, title: "Cơ hội học hỏi", desc: "Training nội bộ, workshop, và mentor từ senior." },
  { icon: Rocket, title: "Làm dự án thật", desc: "Từ ngày đầu bạn đã tham gia dự án với khách hàng thực." },
  { icon: Users, title: "Đội ngũ trẻ, năng động", desc: "Đồng nghiệp Gen Z, vui vẻ và luôn hỗ trợ nhau." },
];

export default function CareersClient() {
  return (
    <>
      <HeroSection
        title="Tuyển dụng"
        subtitle="Gia nhập đội ngũ CD Media — nơi sáng tạo gặp gỡ cơ hội phát triển."
        compact
      />

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
          <SectionTitle label="Vị trí" title="Các vị trí đang tuyển" description="Tìm vị trí phù hợp với bạn và ứng tuyển ngay hôm nay." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careers.map((career, i) => (
              <CareerCard key={career.slug} career={career} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
