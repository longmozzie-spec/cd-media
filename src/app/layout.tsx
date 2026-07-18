import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CD Media – Agency Truyền Thông & Sản Xuất Media Từ 2013",
    template: "%s | CD Media",
  },
  description:
    "CD Media – 13 năm sản xuất phim chuẩn điện ảnh, hệ sinh thái 2.6M theo dõi. Đối tác truyền thông toàn diện: chiến lược, sản xuất, đo lường. Nhận tư vấn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Sync apply theme TRƯỚC khi React hydrate — tránh flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var t = localStorage.getItem('cdmedia-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
    if (t === 'light') {
      document.documentElement.style.backgroundColor = '#F8F8FA';
      document.documentElement.style.setProperty('--runtime-bg', '#F8F8FA');
    }
  } catch(e) {}
})();
            `.trim(),
          }}
        />
      </head>
      <body className="min-h-screen text-white">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
