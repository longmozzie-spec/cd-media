import type { FaqItem } from "@/data/schema";

// Section FAQ hiển thị (heading dạng câu hỏi + trả lời tự chứa) — hỗ trợ GEO.
// Dùng thẻ ngữ nghĩa: h2 tiêu đề, h3 cho từng câu hỏi.
export default function FaqSection({
  items,
  title = "Câu hỏi thường gặp",
  className = "",
}: {
  items: FaqItem[];
  title?: string;
  className?: string;
}) {
  if (!items?.length) return null;
  return (
    <section className={`py-16 border-t border-[#27272A] ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-8">
          {title}
        </h2>
        <div className="divide-y divide-[#27272A]">
          {items.map((it) => (
            <details key={it.q} className="group py-4">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                  {it.q}
                </h3>
                <span className="text-[#E50914] text-xl leading-none shrink-0 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-[#A1A1AA] text-sm md:text-base leading-relaxed mt-3">
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
