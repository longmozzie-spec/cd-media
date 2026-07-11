"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import CTASection from "@/components/ui/CTASection";
import { Project } from "@/data/projects";

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11] to-[#121214]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E50914]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-[#A1A1AA]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#E50914] transition-colors">Trang chủ</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <Link href="/projects" className="hover:text-[#E50914] transition-colors">Dự án</Link>
            <span className="mx-2 text-[#27272A]">/</span>
            <span className="text-[#E50914]">Dự án chi tiết</span>
          </nav>
          <Link href="/projects" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#E50914] transition-colors mb-8">
            <ArrowLeft size={16} /> Quay lại dự án
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#E50914]/20 text-[#E50914] text-sm">{project.clientType}</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#A1A1AA] text-sm">{project.industry}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-xl text-[#A1A1AA] max-w-2xl">{project.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                {project.videoId ? (
                  <div className="aspect-video rounded-2xl overflow-hidden border border-[#27272A]">
                    <iframe
                      src={`https://www.youtube.com/embed/${project.videoId}`}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <img src={project.thumbnail} alt={project.title} className="w-full rounded-2xl border border-[#27272A]" />
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-white mb-4">Bài toán</h2>
                <p className="text-[#A1A1AA] leading-relaxed">{project.challenge}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-white mb-4">Giải pháp CD Media</h2>
                <p className="text-[#A1A1AA] leading-relaxed">{project.solution}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-white mb-4">Kết quả đạt được</h2>
                <ul className="space-y-3">
                  {project.results.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-[#A1A1AA]">
                      <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {project.images.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-bold text-white mb-4">Hình ảnh dự án</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((img, i) => (
                      <img key={i} src={img} alt={`${project.title} ${i + 1}`} className="rounded-xl w-full border border-[#27272A]" />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-6 space-y-6">
                  <div>
                    <h4 className="text-[#A1A1AA] text-sm mb-1">Khách hàng</h4>
                    <p className="text-white font-medium">{project.client}</p>
                  </div>
                  <div>
                    <h4 className="text-[#A1A1AA] text-sm mb-1">Ngành</h4>
                    <p className="text-white font-medium">{project.industry}</p>
                  </div>
                  <div>
                    <h4 className="text-[#A1A1AA] text-sm mb-2">Dịch vụ triển khai</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((s) => (
                        <span key={s} className="px-3 py-1 rounded-full bg-[#E50914]/10 text-[#E50914] text-xs">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all"
                  >
                    Liên hệ triển khai
                  </Link>
                </div>

                {/* Box Đặt lịch tư vấn */}
                <div className="rounded-2xl bg-[#E50914]/[0.08] border border-[#E50914]/30 p-6">
                  <h4 className="text-white font-semibold text-lg mb-1">Đặt lịch tư vấn</h4>
                  <p className="text-[#A1A1AA] text-sm mb-4">Miễn phí · 45 phút · Không áp lực</p>
                  <Link
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-white/5 border border-[#27272A] text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    Đặt lịch ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Bạn muốn có một dự án tương tự?"
        description="Hãy liên hệ CD Media để nhận tư vấn giải pháp phù hợp."
        buttonText="Tư vấn ngay"
        buttonHref="/contact"
      />
    </>
  );
}