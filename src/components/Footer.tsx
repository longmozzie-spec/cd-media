import Link from "next/link";
import { Globe, Play, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { companyInfo } from "@/data/common";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0C] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="CD Media" className="h-9 w-auto" />
            </Link>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
              {companyInfo.description}
            </p>
            <div className="flex gap-3">
              <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#E50914] hover:bg-[#E50914]/10 transition-all">
                <Globe size={18} />
              </a>
              <a href={companyInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#E50914] hover:bg-[#E50914]/10 transition-all">
                <Play size={18} />
              </a>
              <a href={companyInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-[#E50914] hover:bg-[#E50914]/10 transition-all">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2.5">
              {[
                "Nội dung số đa nền tảng",
                "Sản xuất phim tài liệu",
                "Sản xuất TVC",
                "Triển lãm ảo",
                "Sáng tạo nội dung YouTube",
                "Content Facebook/TikTok",
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-[#A1A1AA] text-sm hover:text-[#E50914] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-[#A1A1AA] text-sm">
                <MapPin size={18} className="text-[#E50914] shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex gap-3 text-[#A1A1AA] text-sm">
                <Phone size={18} className="text-[#E50914] shrink-0" />
                <span>{companyInfo.phone}</span>
              </li>
              <li className="flex gap-3 text-[#A1A1AA] text-sm">
                <Mail size={18} className="text-[#E50914] shrink-0" />
                <span>{companyInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A1A1AA]/60 text-sm">
            &copy; 2024-2026 CD Media Việt Nam. All rights reserved.
          </p>
          <p className="text-[#A1A1AA]/60 text-sm">
            Kết nối tri thức - Chia sẻ giá trị
          </p>
        </div>
      </div>
    </footer>
  );
}
