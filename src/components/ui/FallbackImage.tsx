"use client";

import { useEffect, useState } from "react";

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Nhãn hiển thị khi chưa có ảnh */
  placeholder?: string;
}

/**
 * Hiển thị ảnh nếu file tồn tại; nếu chưa có (khách chưa bỏ ảnh vào) thì
 * hiển thị khung placeholder gradient + nhãn. Bỏ ảnh đúng đường dẫn là tự hiện.
 */
export default function FallbackImage({ src, alt, className = "", placeholder }: FallbackImageProps) {
  const [status, setStatus] = useState<"loading" | "ok" | "failed">("loading");

  useEffect(() => {
    const img = new Image();
    img.onload = () => setStatus(img.naturalWidth > 0 ? "ok" : "failed");
    img.onerror = () => setStatus("failed");
    img.src = src;
  }, [src]);

  if (status === "ok") {
    return <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />;
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br from-[#1A1A1E] to-[#27272A] flex items-center justify-center ${className}`}>
      <span className="text-[#A1A1AA]/40 text-xs uppercase tracking-widest font-mono px-4 text-center">
        {placeholder || alt}
      </span>
    </div>
  );
}
