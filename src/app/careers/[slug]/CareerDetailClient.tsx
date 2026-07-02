"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Building2, CheckCircle, Gift, Send } from "lucide-react";
import { Career } from "@/data/careers";

export default function CareerDetailClient({ career }: { career: Career }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-[#27272A] border border-[#27272A] text-white placeholder:text-[#A1A1AA]/50 focus:border-[#E50914] focus:outline-none transition-all";

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F11] to-[#121214]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E50914]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/careers" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#E50914] transition-colors mb-8">
            <ArrowLeft size={16} /> Quay lại tuyển dụng
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{career.title}</h1>
            <div className="flex flex-wrap gap-4 text-[#A1A1AA]">
              <span className="flex items-center gap-2"><Building2 size={16} /> {career.department}</span>
              <span className="flex items-center gap-2"><MapPin size={16} /> {career.location}</span>
              <span className="flex items-center gap-2"><Clock size={16} /> {career.type}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4">Mô tả công việc</h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-6">{career.description}</p>
            <h3 className="text-lg font-semibold text-white mb-3">Nhiệm vụ chính:</h3>
            <ul className="space-y-2">
              {career.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[#A1A1AA]">
                  <CheckCircle size={18} className="text-[#E50914] shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4">Yêu cầu</h2>
            <ul className="space-y-2">
              {career.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[#A1A1AA]">
                  <CheckCircle size={18} className="text-[#E50914] shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-4">Quyền lợi</h2>
            <ul className="space-y-2">
              {career.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[#A1A1AA]">
                  <Gift size={18} className="text-green-500 shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="rounded-2xl bg-[#1A1A1E] border border-[#27272A] p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Ứng tuyển ngay</h2>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-white font-semibold text-xl mb-2">Đã gửi thành công!</h3>
                  <p className="text-[#A1A1AA]">Chúng tôi sẽ phản hồi bạn trong 3 ngày làm việc.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#A1A1AA] text-sm mb-1.5">Họ tên *</label>
                      <input type="text" required className={inputClasses} />
                    </div>
                    <div>
                      <label className="block text-[#A1A1AA] text-sm mb-1.5">Email *</label>
                      <input type="email" required className={inputClasses} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-1.5">Số điện thoại *</label>
                    <input type="tel" required className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-1.5">Link portfolio / CV</label>
                    <input type="url" className={inputClasses} placeholder="https://" />
                  </div>
                  <div>
                    <label className="block text-[#A1A1AA] text-sm mb-1.5">Giới thiệu ngắn về bản thân</label>
                    <textarea rows={4} className={`${inputClasses} resize-none`} />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20">
                    <Send size={18} /> Gửi đơn ứng tuyển
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}