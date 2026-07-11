import type { Metadata } from "next";
import { Geist, Syne } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "CD Media — Creative Digital Media Agency",
    template: "%s | CD Media",
  },
  description: "Giải pháp truyền thông, sản xuất nội dung và marketing tổng thể cho doanh nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${syne.variable} antialiased`}>
      <body className="min-h-screen bg-[#0F0F11] text-white">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
