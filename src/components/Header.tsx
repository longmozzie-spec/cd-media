"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Về CD Media", href: "/about" },
  {
    label: "Giải pháp", href: "/services",
    children: [
      { label: "Sản xuất Media", href: "/services/san-xuat-media" },
      { label: "Giải pháp Truyền thông", href: "/services/truyen-thong" },
      { label: "Marketing Tổng thể", href: "/services/marketing-tong-the" },
    ],
  },
  { label: "Dự án", href: "/projects" },
  { label: "Tin tức", href: "/news" },
  { label: "Tuyển dụng", href: "/careers" },
  { label: "Liên hệ", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/10 border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="CD Media" className="h-12 w-auto brightness-110" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => (
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? "text-[#E50914] bg-[#E50914]/10"
                        : isScrolled
                          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${openDropdown === item.href ? "rotate-180" : ""}`}
                      role="button"
                      aria-label="Mở danh sách giải pháp"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === item.href ? null : item.href);
                      }}
                    />
                  </Link>
                  <AnimatePresence>
                    {openDropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 pt-2 w-52"
                      >
                        <div className="rounded-xl bg-[#0F0F11] border border-[#27272A] shadow-xl shadow-black/40 overflow-hidden py-1.5">
                          <Link href={item.href} className="block px-4 py-2.5 text-sm text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors border-b border-[#27272A]">
                            Tất cả giải pháp
                          </Link>
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href} className={`block px-4 py-2.5 text-sm transition-colors ${
                              pathname === child.href ? "text-[#E50914] bg-[#E50914]/10" : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                            }`}>
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? "text-[#E50914] bg-[#E50914]/10"
                      : isScrolled
                        ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  : "text-[#A1A1AA] hover:text-white hover:bg-white/10"
              }`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[#E50914] text-white text-sm font-semibold rounded-lg hover:bg-[#DC2626] transition-all shadow-lg shadow-[#E50914]/25"
            >
              Liên hệ ngay
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {/* Theme toggle mobile */}
            <button
              onClick={toggle}
              aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
              className={`p-2 rounded-lg transition-all ${isScrolled ? "text-gray-600" : "text-[#A1A1AA]"}`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`p-2 ${isScrolled ? "text-gray-900" : "text-white"}`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0F0F11]/98 backdrop-blur-md border-t border-[#27272A]"
          >
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.href) ? "text-[#E50914] bg-[#E50914]/10" : "text-[#A1A1AA] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className={`block px-4 py-2 rounded-lg text-xs transition-all ${
                          pathname === child.href ? "text-[#E50914] bg-[#E50914]/10" : "text-[#A1A1AA]/70 hover:text-white hover:bg-white/5"
                        }`}>
                          ↳ {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/contact" className="block mt-4 px-4 py-3 bg-[#E50914] text-white text-sm font-semibold rounded-lg text-center">
                Liên hệ ngay
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
