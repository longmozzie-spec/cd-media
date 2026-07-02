"use client";

import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface AdminImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function AdminImageUpload({
  value,
  onChange,
  label = "Hình ảnh",
  className,
}: AdminImageUploadProps) {
  const [inputMode, setInputMode] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setInputMode(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">{label}</label>
      )}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-600 hover:bg-red-50 hover:text-red-600 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
            aria-label="Xóa ảnh"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : inputMode ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Nhập URL hình ảnh..."
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Lưu
          </button>
          <button
            type="button"
            onClick={() => setInputMode(false)}
            className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            Hủy
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setInputMode(true)}
          className="w-full h-48 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer"
        >
          <ImagePlus className="w-8 h-8 text-slate-300" />
          <span className="text-sm text-slate-400">Nhấn để thêm ảnh</span>
        </button>
      )}
    </div>
  );
}
