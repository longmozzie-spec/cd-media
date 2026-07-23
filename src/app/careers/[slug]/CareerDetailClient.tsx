"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { contactsService } from "@/services/contacts.service";
import { Career } from "@/data/careers";

const schema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().min(8, "Số điện thoại không hợp lệ").regex(/^[0-9+\s().-]+$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  portfolio: z.string().url("Link không hợp lệ").optional().or(z.literal("")),
  intro: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const jdSections = (career: Career) => [
  { title: "1. Mô tả công việc", items: career.responsibilities },
  { title: "2. Yêu cầu ứng viên", items: career.requirements },
  { title: "3. Quyền lợi", items: career.benefits },
];

export default function CareerDetailClient({ career }: { career: Career }) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    try {
      // TODO: Client content required — kết nối API/email tuyển dụng thật (data@cdmedia.vn).
      await contactsService.create({
        name: values.name,
        phone: values.phone,
        email: values.email,
        need: `Ứng tuyển: ${career.title}`,
        content: `Portfolio: ${values.portfolio || "—"}\n${values.intro || ""}`,
        status: "new",
      });
    } catch {
      setSubmitError("Không thể gửi hồ sơ lúc này. Vui lòng gửi email tới data@cdmedia.vn.");
    }
  };

  const inputCls = "w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-[#E50914] focus:outline-none transition-colors";
  const labelCls = "block text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA]/40 mb-1.5";

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32">
        <nav className="flex items-center gap-2 text-xs text-[#A1A1AA]/40 tracking-wider" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
          <span className="text-[#27272A]">›</span>
          <Link href="/careers" className="hover:text-white transition-colors">Tuyển Dụng</Link>
          <span className="text-[#27272A]">›</span>
          <span className="text-[#E50914]">{career.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
        {/* JD body */}
        <div>
          <Link href="/careers" className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#E50914] transition-colors mb-6 text-sm">
            <ArrowLeft size={15} /> Quay lại tuyển dụng
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">{career.title}</h1>
          <div className="flex flex-wrap gap-2 mb-5">
            {[career.type, career.location, career.department, `Hạn nộp: ${new Date(career.deadline).toLocaleDateString("vi-VN")}`].map((b) => (
              <span key={b} className="px-3 py-1.5 rounded-md bg-[#1A1A1E] border border-[#27272A] text-[#A1A1AA] text-xs font-mono">{b}</span>
            ))}
          </div>
          <div className="text-[#E50914] font-bold text-lg mb-10">{career.salary} VNĐ/tháng</div>

          <p className="text-[#A1A1AA] leading-relaxed mb-10">{career.description}</p>

          {jdSections(career).map((sec) => (
            <div key={sec.title} className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4">{sec.title}</h2>
              <ul className="space-y-2.5">
                {sec.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[#A1A1AA] leading-relaxed">
                    <span className="text-[#E50914] shrink-0 mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="mb-4">
            <h2 className="text-xl font-bold text-white mb-4">4. Cách ứng tuyển</h2>
            <ul className="space-y-2.5">
              <li className="flex gap-3 text-[#A1A1AA] leading-relaxed">
                <span className="text-[#E50914] shrink-0 mt-0.5">→</span>
                <span>Gửi CV + Portfolio (nếu có) về email: <strong className="text-white">data@cdmedia.vn</strong></span>
              </li>
              <li className="flex gap-3 text-[#A1A1AA] leading-relaxed">
                <span className="text-[#E50914] shrink-0 mt-0.5">→</span>
                <span>CD Media sẽ liên hệ phỏng vấn trong vòng 48 giờ với hồ sơ phù hợp.</span>
              </li>
              <li className="flex gap-3 text-[#A1A1AA] leading-relaxed">
                <span className="text-[#E50914] shrink-0 mt-0.5">→</span>
                <span>Quy trình: Sàng lọc CV → Phỏng vấn online → Bài test thực tế → Offer.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Apply sidebar sticky */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-[#1A1A1E] border border-[#27272A] p-6">
            <h3 className="text-white font-bold text-lg mb-1">Ứng tuyển ngay</h3>
            <p className="text-[#A1A1AA]/60 text-xs mb-4">Nhanh tay — CD Media đang cần người sớm</p>
            <div className="rounded-lg bg-[#E50914]/[0.08] border border-[#E50914]/20 px-4 py-2.5 mb-5 text-sm">
              <span className="text-[#A1A1AA]">Hạn nộp hồ sơ </span>
              <strong className="text-white">{new Date(career.deadline).toLocaleDateString("vi-VN")}</strong>
            </div>

            {isSubmitSuccessful && !submitError ? (
              <div className="text-center py-6">
                <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-1">Đã nhận hồ sơ!</h4>
                <p className="text-[#A1A1AA] text-sm">CD Media sẽ phản hồi trong 48 giờ.</p>
                <button onClick={() => reset()} className="mt-4 text-[#E50914] text-sm hover:underline">Nộp hồ sơ khác</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
                <div>
                  <label className={labelCls}>Họ &amp; Tên</label>
                  <input type="text" {...register("name")} className={inputCls} placeholder="Nguyễn Văn A" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className={labelCls}>Số điện thoại</label>
                  <input type="tel" {...register("phone")} className={inputCls} placeholder="09xx xxx xxx" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" {...register("email")} className={inputCls} placeholder="email@gmail.com" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className={labelCls}>Link CV / Portfolio</label>
                  <input type="url" {...register("portfolio")} className={inputCls} placeholder="https://drive.google.com/..." />
                  {errors.portfolio && <p className="text-red-400 text-xs mt-1">{errors.portfolio.message}</p>}
                </div>
                <div>
                  <label className={labelCls}>Giới thiệu ngắn</label>
                  <textarea rows={3} {...register("intro")} className={`${inputCls} resize-none`} placeholder="Lý do bạn phù hợp với vị trí này..." />
                </div>
                {submitError && (
                  <div className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/30 p-2.5 text-red-400 text-xs">
                    <AlertCircle size={15} className="shrink-0 mt-0.5" /><span>{submitError}</span>
                  </div>
                )}
                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-[#E50914] text-white font-semibold py-3 rounded-lg hover:opacity-85 disabled:opacity-60 transition-opacity">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  {isSubmitting ? "Đang gửi..." : "Nộp hồ sơ ứng tuyển"}
                </button>
                <p className="text-[10px] text-[#A1A1AA]/30 text-center leading-relaxed">Hoặc gửi thẳng về data@cdmedia.vn</p>
              </form>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
