import Link from "next/link";
import { Globe, Play, MessageCircle, Music, MapPin, Phone, Mail } from "lucide-react";
import { companyInfo } from "@/data/common";

const linhVuc = [
  { label: "Sản xuất Media", href: "/services" },
  { label: "Giải pháp Truyền thông", href: "/services" },
  { label: "Marketing Tổng thể", href: "/services/marketing-tong-the" },
  { label: "Đào tạo & Chuyển giao", href: "/services" },
  { label: "Góc nhìn Chuyên ngành", href: "/news" },
];

const congTy = [
  { label: "Về CD Media", href: "/about" },
  { label: "Dự án", href: "/projects" },
  { label: "Tin tức", href: "/news" },
  { label: "Tuyển dụng", href: "/careers" },
  { label: "Liên hệ", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0C] border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          {/* Brand + contact */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="CD Media" className="h-9 w-auto" />
            </Link>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
              {companyInfo.description}
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3 text-[#A1A1AA] text-sm">
                <MapPin size={18} className="text-[#E50914] shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex gap-3 text-[#A1A1AA] text-sm">
                <Phone size={18} className="text-[#E50914] shrink-0" />
                <a href={`tel:${companyInfo.phone.replace(/\s/g, "")}`} className="hover:text-[#E50914] transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex gap-3 text-[#A1A1AA] text-sm">
                <Mail size={18} className="text-[#E50914] shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-[#E50914] transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="text-[#A1A1AA]/70 text-xs pl-[30px]">
                MST: {companyInfo.taxCode}
              </li>
            </ul>
          </div>

          {/* Lĩnh vực */}
          <div>
            <h4 className="text-white font-semibold mb-4">Lĩnh vực</h4>
            <ul className="space-y-2.5">
              {linhVuc.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#A1A1AA] text-sm hover:text-[#E50914] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kênh truyền thông */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kênh truyền thông</h4>
            <ul className="space-y-2.5">
              {companyInfo.youtubeChannels.map((ch) => (
                <li key={ch.url}>
                  <a href={ch.url} target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] text-sm hover:text-[#E50914] transition-colors">
                    {ch.name}
                  </a>
                </li>
              ))}
              <li>
                <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] text-sm hover:text-[#E50914] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href={companyInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] text-sm hover:text-[#E50914] transition-colors">
                  TikTok
                </a>
              </li>
            </ul>
          </div>

          {/* Công ty */}
          <div>
            <h4 className="text-white font-semibold mb-4">Công ty</h4>
            <ul className="space-y-2.5">
              {congTy.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#A1A1AA] text-sm hover:text-[#E50914] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#27272A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A1A1AA]/60 text-sm">
            &copy; 2026 CD Media Việt Nam. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#E50914] transition-all">
              <Globe size={18} />
            </a>
            <a href={companyInfo.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#E50914] transition-all">
              <Play size={18} />
            </a>
            <a href={companyInfo.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#E50914] transition-all">
              <Music size={18} />
            </a>
            <a href={companyInfo.social.zalo} target="_blank" rel="noopener noreferrer" aria-label="Zalo" className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#E50914] transition-all">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
