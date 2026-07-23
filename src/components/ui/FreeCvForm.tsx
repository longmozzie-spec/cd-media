"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { contactsService } from "@/services/contacts.service";

const schema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .min(8, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+\s().-]+$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  position: z.string().optional(),
  portfolio: z.string().url("Link không hợp lệ").optional().or(z.literal("")),
});
type FormValues = z.infer<typeof schema>;

const inputCls =
  "w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:border-[#E50914] focus:outline-none transition-colors";

export default function FreeCvForm() {
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
      await contactsService.create({
        name: values.name,
        phone: values.phone,
        email: values.email,
        need: `Ứng tuyển tự do: ${values.position || "Chưa xác định vị trí"}`,
        content: `Portfolio/CV: ${values.portfolio || "—"}`,
        status: "new",
      });
      reset();
    } catch {
      setSubmitError("Không thể gửi hồ sơ lúc này. Vui lòng gửi email tới data@cdmedia.vn.");
    }
  };

  if (isSubmitSuccessful && !submitError) {
    return (
      <div className="rounded-xl bg-[#1A1A1E] border border-green-500/30 p-8 text-center">
        <CheckCircle size={36} className="text-green-500 mx-auto mb-3" />
        <h3 className="text-white font-semibold text-lg mb-1">Đã nhận hồ sơ của bạn</h3>
        <p className="text-[#A1A1AA] text-sm">CD Media sẽ liên hệ khi có vị trí phù hợp. Cảm ơn bạn!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl bg-[#1A1A1E] border border-[#27272A] p-6 md:p-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input {...register("name")} placeholder="Họ và tên *" className={inputCls} />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <input {...register("phone")} placeholder="Số điện thoại *" className={inputCls} />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <input {...register("email")} placeholder="Email *" className={inputCls} />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register("position")} placeholder="Vị trí quan tâm" className={inputCls} />
        </div>
      </div>
      <div>
        <input {...register("portfolio")} placeholder="Link CV / Portfolio (Drive, Behance...)" className={inputCls} />
        {errors.portfolio && <p className="text-red-400 text-xs mt-1">{errors.portfolio.message}</p>}
        <p className="text-[10px] text-[#A1A1AA]/40 mt-1.5">Hoặc gửi thẳng CV về email: data@cdmedia.vn</p>
      </div>
      {submitError && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle size={16} /> {submitError}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E50914] text-white font-semibold rounded-lg hover:bg-[#DC2626] transition-colors disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : null}
        Gửi CV
      </button>
    </form>
  );
}
