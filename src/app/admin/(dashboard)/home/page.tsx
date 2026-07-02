"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, Save } from "lucide-react";
import { cn } from "@/lib/cn";
import { HomepageContent } from "@/types/page";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFormField from "@/components/admin/AdminFormField";
import { useToast } from "@/hooks/useToast";

const STORAGE_KEY = "cdmedia_admin_homepage";

const defaultHomepage: HomepageContent = {
  heroTitle: "Kết nối tri thức Chia sẻ giá trị",
  heroSubtitle:
    "CD Media — đơn vị sản xuất nội dung số, phim tài liệu và triển lãm ảo hàng đầu Việt Nam. Chúng tôi kết nối tri thức và chia sẻ giá trị qua từng sản phẩm truyền thông.",
  ctaPrimary: { text: "Khám phá dịch vụ", href: "/services" },
  ctaSecondary: { text: "Xem dự án", href: "/projects" },
  aboutShort:
    "CD Media là đơn vị tiên phong trong lĩnh vực sản xuất nội dung số và phim tài liệu tại Việt Nam. Với đội ngũ sáng tạo giàu kinh nghiệm, chúng tôi mang đến những sản phẩm truyền thông chất lượng cao.",
  stats: [
    { value: 400, suffix: " triệu", label: "Lượt xem YouTube" },
    { value: 50, suffix: "+", label: "Dự án hoàn thành" },
    { value: 10, suffix: "+", label: "Năm kinh nghiệm" },
    { value: 100, suffix: "+", label: "Đối tác tin cậy" },
  ],
  ecosystem: [
    { title: "Sản xuất phim", description: "Phim tài liệu, phóng sự, TVC chất lượng cao", icon: "Film" },
    { title: "Nội dung số", description: "YouTube, TikTok, Social Media Content", icon: "Smartphone" },
    { title: "Triển lãm ảo", description: "Virtual exhibition & 3D experience", icon: "Globe" },
    { title: "Marketing", description: "Digital marketing & brand strategy", icon: "TrendingUp" },
  ],
  ctaBottom: {
    title: "Sẵn sàng bắt đầu dự án tiếp theo?",
    description: "Liên hệ ngay để nhận tư vấn miễn phí từ đội ngũ chuyên gia CD Media.",
    buttonText: "Liên hệ ngay",
    buttonHref: "/contact",
  },
};

function getHomepage(): HomepageContent {
  if (typeof window === "undefined") return defaultHomepage;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultHomepage;
  return JSON.parse(raw);
}

function saveHomepage(data: HomepageContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">{children}</div>}
    </div>
  );
}

export default function AdminHomePage() {
  const { addToast } = useToast();
  const [data, setData] = useState<HomepageContent>(defaultHomepage);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setData(getHomepage());
  }, []);

  const handleSave = () => {
    setSaving(true);
    saveHomepage(data);
    setTimeout(() => {
      setSaving(false);
      addToast("Đã lưu thay đổi trang chủ", "success");
    }, 300);
  };

  const updateField = <K extends keyof HomepageContent>(key: K, value: HomepageContent[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quản lý Trang chủ"
        subtitle="Chỉnh sửa nội dung hiển thị trên trang chủ website"
      />

      {/* Hero Section */}
      <Section title="Hero Banner">
        <AdminFormField label="Tiêu đề Hero">
          <input
            type="text"
            value={data.heroTitle}
            onChange={(e) => updateField("heroTitle", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </AdminFormField>
        <AdminFormField label="Mô tả Hero">
          <textarea
            value={data.heroSubtitle}
            onChange={(e) => updateField("heroSubtitle", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </AdminFormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminFormField label="CTA chính — Text">
            <input
              type="text"
              value={data.ctaPrimary.text}
              onChange={(e) => updateField("ctaPrimary", { ...data.ctaPrimary, text: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </AdminFormField>
          <AdminFormField label="CTA chính — Link">
            <input
              type="text"
              value={data.ctaPrimary.href}
              onChange={(e) => updateField("ctaPrimary", { ...data.ctaPrimary, href: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </AdminFormField>
          <AdminFormField label="CTA phụ — Text">
            <input
              type="text"
              value={data.ctaSecondary.text}
              onChange={(e) => updateField("ctaSecondary", { ...data.ctaSecondary, text: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </AdminFormField>
          <AdminFormField label="CTA phụ — Link">
            <input
              type="text"
              value={data.ctaSecondary.href}
              onChange={(e) => updateField("ctaSecondary", { ...data.ctaSecondary, href: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </AdminFormField>
        </div>
      </Section>

      {/* About Short */}
      <Section title="Giới thiệu ngắn">
        <AdminFormField label="Nội dung giới thiệu">
          <textarea
            value={data.aboutShort}
            onChange={(e) => updateField("aboutShort", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </AdminFormField>
      </Section>

      {/* Impact Numbers */}
      <Section title="Impact Numbers">
        <div className="space-y-3">
          {data.stats.map((stat, idx) => (
            <div key={idx} className="flex items-end gap-3 p-3 rounded-lg bg-slate-50">
              <AdminFormField label="Giá trị" className="flex-1">
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[idx] = { ...stat, value: Number(e.target.value) };
                    updateField("stats", newStats);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </AdminFormField>
              <AdminFormField label="Hậu tố" className="w-24">
                <input
                  type="text"
                  value={stat.suffix}
                  onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[idx] = { ...stat, suffix: e.target.value };
                    updateField("stats", newStats);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </AdminFormField>
              <AdminFormField label="Nhãn" className="flex-1">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...data.stats];
                    newStats[idx] = { ...stat, label: e.target.value };
                    updateField("stats", newStats);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </AdminFormField>
              <button
                type="button"
                onClick={() => updateField("stats", data.stats.filter((_, i) => i !== idx))}
                className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => updateField("stats", [...data.stats, { value: 0, suffix: "", label: "" }])}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm số liệu
        </button>
      </Section>

      {/* Ecosystem */}
      <Section title="Hệ sinh thái">
        <div className="space-y-3">
          {data.ecosystem.map((item, idx) => (
            <div key={idx} className="flex items-end gap-3 p-3 rounded-lg bg-slate-50">
              <AdminFormField label="Tiêu đề" className="flex-1">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const newEco = [...data.ecosystem];
                    newEco[idx] = { ...item, title: e.target.value };
                    updateField("ecosystem", newEco);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </AdminFormField>
              <AdminFormField label="Mô tả" className="flex-1">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => {
                    const newEco = [...data.ecosystem];
                    newEco[idx] = { ...item, description: e.target.value };
                    updateField("ecosystem", newEco);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </AdminFormField>
              <AdminFormField label="Icon" className="w-32">
                <input
                  type="text"
                  value={item.icon}
                  onChange={(e) => {
                    const newEco = [...data.ecosystem];
                    newEco[idx] = { ...item, icon: e.target.value };
                    updateField("ecosystem", newEco);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </AdminFormField>
              <button
                type="button"
                onClick={() => updateField("ecosystem", data.ecosystem.filter((_, i) => i !== idx))}
                className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => updateField("ecosystem", [...data.ecosystem, { title: "", description: "", icon: "" }])}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm mục
        </button>
      </Section>

      {/* CTA Bottom */}
      <Section title="CTA cuối trang">
        <AdminFormField label="Tiêu đề">
          <input
            type="text"
            value={data.ctaBottom.title}
            onChange={(e) => updateField("ctaBottom", { ...data.ctaBottom, title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </AdminFormField>
        <AdminFormField label="Mô tả">
          <textarea
            value={data.ctaBottom.description}
            onChange={(e) => updateField("ctaBottom", { ...data.ctaBottom, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </AdminFormField>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminFormField label="Text nút">
            <input
              type="text"
              value={data.ctaBottom.buttonText}
              onChange={(e) => updateField("ctaBottom", { ...data.ctaBottom, buttonText: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </AdminFormField>
          <AdminFormField label="Link nút">
            <input
              type="text"
              value={data.ctaBottom.buttonHref}
              onChange={(e) => updateField("ctaBottom", { ...data.ctaBottom, buttonHref: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </AdminFormField>
        </div>
      </Section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors",
            "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          )}
        >
          <Save className="w-4 h-4" />
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
}
