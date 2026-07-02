"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface AdminRichEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function renderMarkdown(text: string): string {
  return text
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("## ")) {
        return `<h2 class="text-lg font-semibold text-slate-900 mt-4 mb-2">${block.slice(3)}</h2>`;
      }
      if (block.startsWith("# ")) {
        return `<h1 class="text-xl font-bold text-slate-900 mt-4 mb-2">${block.slice(2)}</h1>`;
      }
      const formatted = block
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br />");
      return `<p class="text-sm text-slate-700 leading-relaxed mb-2">${formatted}</p>`;
    })
    .join("");
}

export default function AdminRichEditor({
  value,
  onChange,
  placeholder = "Viết nội dung...",
  className,
}: AdminRichEditorProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <div className={cn("rounded-xl border border-slate-200 overflow-hidden bg-white", className)}>
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setTab("edit")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            tab === "edit"
              ? "text-blue-600 border-b-2 border-blue-600 bg-white"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          Viết
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            tab === "preview"
              ? "text-blue-600 border-b-2 border-blue-600 bg-white"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          Xem trước
        </button>
      </div>

      {tab === "edit" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[200px] px-4 py-3 text-sm text-slate-700 resize-y focus:outline-none placeholder:text-slate-300"
        />
      ) : (
        <div
          className="min-h-[200px] px-4 py-3 prose prose-sm"
          dangerouslySetInnerHTML={{
            __html: value ? renderMarkdown(value) : '<p class="text-sm text-slate-300 italic">Chưa có nội dung</p>',
          }}
        />
      )}
    </div>
  );
}
