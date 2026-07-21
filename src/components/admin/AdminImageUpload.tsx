"use client";

import { useState, useRef } from "react";
import { ImagePlus, X, Link2, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { getSupabaseBrowser } from "@/lib/supabase/client";

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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setInputMode(false);
    }
  };

  const handleRemove = () => onChange("");

  const handleFile = async (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Chỉ chấp nhận file ảnh");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ảnh tối đa 5MB");
      return;
    }
    setUploading(true);
    try {
      const supabase = getSupabaseBrowser();
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("media")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload thất bại");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700">{label}</label>
      )}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-200">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
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
            placeholder="Dán URL hình ảnh..."
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
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
        <div className="space-y-2">
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !uploading && fileRef.current?.click()}
            className="w-full h-48 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer"
          >
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                <span className="text-sm text-slate-400">Đang tải ảnh lên...</span>
              </>
            ) : (
              <>
                <ImagePlus className="w-8 h-8 text-slate-300" />
                <span className="text-sm text-slate-400">Kéo-thả hoặc nhấn để chọn ảnh</span>
                <span className="text-xs text-slate-300">PNG, JPG, WEBP · tối đa 5MB</span>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => setInputMode(true)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
          >
            <Link2 className="w-3.5 h-3.5" /> Hoặc dán URL ảnh
          </button>
        </div>
      )}

      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
