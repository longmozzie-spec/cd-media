"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-[#1A1A1E] border border-green-500/30 p-8 text-center"
      >
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-white font-semibold text-xl mb-2">Gửi thành công!</h3>
        <p className="text-[#A1A1AA]">Chúng tôi sẽ liên hệ bạn trong 24 giờ tới.</p>
      </motion.div>
    );
  }

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-[#27272A] border border-[#27272A] text-white placeholder:text-[#A1A1AA]/50 focus:border-[#E50914] focus:outline-none focus:ring-1 focus:ring-[#E50914]/25 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
        <div>
          <label className="block text-[#A1A1AA] text-sm mb-1.5">Họ tên *</label>
          <input type="text" required className={inputClasses} placeholder="Nguyễn Văn A" />
        </div>
        <div>
          <label className="block text-[#A1A1AA] text-sm mb-1.5">Số điện thoại *</label>
          <input type="tel" required className={inputClasses} placeholder="0901 234 567" />
        </div>
      </div>
      {!compact && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#A1A1AA] text-sm mb-1.5">Email</label>
            <input type="email" className={inputClasses} placeholder="email@company.com" />
          </div>
          <div>
            <label className="block text-[#A1A1AA] text-sm mb-1.5">Công ty</label>
            <input type="text" className={inputClasses} placeholder="Tên công ty" />
          </div>
        </div>
      )}
      <div>
        <label className="block text-[#A1A1AA] text-sm mb-1.5">Nhu cầu *</label>
        <select required className={inputClasses}>
          <option value="">Chọn nhu cầu của bạn</option>
          <option value="video">Sản xuất video</option>
          <option value="social">Quản lý social media</option>
          <option value="marketing">Digital marketing</option>
          <option value="branding">Truyền thông thương hiệu</option>
          <option value="event">Quay sự kiện</option>
          <option value="other">Khác</option>
        </select>
      </div>
      {!compact && (
        <div>
          <label className="block text-[#A1A1AA] text-sm mb-1.5">Ngân sách dự kiến</label>
          <select className={inputClasses}>
            <option value="">Chọn ngân sách</option>
            <option value="10-30">10 - 30 triệu</option>
            <option value="30-50">30 - 50 triệu</option>
            <option value="50-100">50 - 100 triệu</option>
            <option value="100+">Trên 100 triệu</option>
          </select>
        </div>
      )}
      {!compact && (
        <div>
          <label className="block text-[#A1A1AA] text-sm mb-1.5">Nội dung cần tư vấn</label>
          <textarea
            rows={4}
            className={`${inputClasses} resize-none`}
            placeholder="Mô tả ngắn về dự án hoặc nhu cầu của bạn..."
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20"
      >
        <Send size={18} />
        {compact ? "Nhận tư vấn giải pháp" : "Gửi yêu cầu tư vấn"}
      </button>
    </form>
  );
}