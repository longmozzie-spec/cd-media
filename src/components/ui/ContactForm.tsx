"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { contactsService } from "@/services/contacts.service";

interface ContactFormProps {
  compact?: boolean;
}

const schema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .min(8, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+\s().-]+$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  company: z.string().optional(),
  need: z.string().min(1, "Vui lòng chọn nhu cầu"),
  budget: z.string().optional(),
  content: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm({ compact }: ContactFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      // TODO: Client content required — kết nối API/email service thật.
      // Hiện lưu vào localStorage (admin đọc được ở /admin/contacts).
      await contactsService.create({
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
        company: values.company || undefined,
        need: values.need,
        budget: values.budget || undefined,
        content: values.content || undefined,
        status: "new",
      });
    } catch {
      setSubmitError("Không thể gửi yêu cầu lúc này. Vui lòng thử lại hoặc gọi hotline.");
    }
  };

  if (isSubmitSuccessful && !submitError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-[#1A1A1E] border border-green-500/30 p-8 text-center"
      >
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-white font-semibold text-xl mb-2">Đã ghi nhận yêu cầu!</h3>
        <p className="text-[#A1A1AA]">Chúng tôi sẽ liên hệ bạn trong 24 giờ làm việc.</p>
        <button
          onClick={() => reset()}
          className="mt-6 text-[#E50914] text-sm font-medium hover:underline"
        >
          Gửi yêu cầu khác
        </button>
      </motion.div>
    );
  }

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-[#27272A] border border-[#27272A] text-white placeholder:text-[#A1A1AA]/50 focus:border-[#E50914] focus:outline-none focus:ring-1 focus:ring-[#E50914]/25 transition-all";
  const errClasses = "border-red-500/60 focus:border-red-500 focus:ring-red-500/25";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
        <div>
          <label htmlFor="cf-name" className="block text-[#A1A1AA] text-sm mb-1.5">Họ tên *</label>
          <input id="cf-name" type="text" {...register("name")} aria-invalid={!!errors.name} className={`${inputClasses} ${errors.name ? errClasses : ""}`} placeholder="Nguyễn Văn A" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-[#A1A1AA] text-sm mb-1.5">Số điện thoại *</label>
          <input id="cf-phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} className={`${inputClasses} ${errors.phone ? errClasses : ""}`} placeholder="0901 234 567" />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      {!compact && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cf-email" className="block text-[#A1A1AA] text-sm mb-1.5">Email</label>
            <input id="cf-email" type="email" {...register("email")} aria-invalid={!!errors.email} className={`${inputClasses} ${errors.email ? errClasses : ""}`} placeholder="email@company.com" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="cf-company" className="block text-[#A1A1AA] text-sm mb-1.5">Công ty</label>
            <input id="cf-company" type="text" {...register("company")} className={inputClasses} placeholder="Tên công ty" />
          </div>
        </div>
      )}
      <div>
        <label htmlFor="cf-need" className="block text-[#A1A1AA] text-sm mb-1.5">Nhu cầu *</label>
        <select id="cf-need" {...register("need")} aria-invalid={!!errors.need} className={`${inputClasses} ${errors.need ? errClasses : ""}`}>
          <option value="">Chọn nhu cầu của bạn</option>
          <option value="Sản xuất Media">Sản xuất Media (phim, TVC, video)</option>
          <option value="Giải pháp truyền thông">Giải pháp truyền thông</option>
          <option value="Marketing tổng thể">Marketing tổng thể</option>
          <option value="Đào tạo & Chuyển giao">Đào tạo & Chuyển giao</option>
          <option value="Khác">Khác</option>
        </select>
        {errors.need && <p className="text-red-400 text-xs mt-1">{errors.need.message}</p>}
      </div>
      {!compact && (
        <>
          <div>
            <label htmlFor="cf-budget" className="block text-[#A1A1AA] text-sm mb-1.5">Ngân sách dự kiến</label>
            <select id="cf-budget" {...register("budget")} className={inputClasses}>
              <option value="">Chọn ngân sách</option>
              <option value="10 - 30 triệu">10 - 30 triệu</option>
              <option value="30 - 50 triệu">30 - 50 triệu</option>
              <option value="50 - 100 triệu">50 - 100 triệu</option>
              <option value="Trên 100 triệu">Trên 100 triệu</option>
            </select>
          </div>
          <div>
            <label htmlFor="cf-content" className="block text-[#A1A1AA] text-sm mb-1.5">Nội dung cần tư vấn</label>
            <textarea id="cf-content" rows={4} {...register("content")} className={`${inputClasses} resize-none`} placeholder="Mô tả ngắn về dự án hoặc nhu cầu của bạn..." />
          </div>
        </>
      )}
      {submitError && (
        <div className="flex items-start gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-red-400 text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#E50914] text-white font-semibold rounded-xl hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        {isSubmitting ? "Đang gửi..." : compact ? "Nhận tư vấn giải pháp" : "Gửi yêu cầu tư vấn"}
      </button>
    </form>
  );
}
