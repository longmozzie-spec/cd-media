"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, Save } from "lucide-react";
import { cn } from "@/lib/cn";
import { AboutContent } from "@/types/page";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFormField from "@/components/admin/AdminFormField";
import AdminRichEditor from "@/components/admin/AdminRichEditor";
import { useToast } from "@/hooks/useToast";

const STORAGE_KEY = "cdmedia_admin_about";

const defaultAbout: AboutContent = {
  heroTitle: "Về CD Media",
  heroSubtitle: "Đơn vị sản xuất nội dung số và phim tài liệu hàng đầu Việt Nam",
  story:
    "## Câu chuyện CD Media\n\nCD Media được thành lập với sứ mệnh kết nối tri thức và chia sẻ giá trị thông qua các sản phẩm truyền thông chất lượng cao.\n\nTừ những ngày đầu, chúng tôi đã kiên định với triết lý sáng tạo nội dung có chiều sâu, mang giá trị thực sự đến cộng đồng.",
  timeline: [
    { year: "2015", title: "Thành lập", description: "CD Media ra đời với đội ngũ 5 thành viên" },
    { year: "2018", title: "Mở rộng", description: "Phát triển mảng nội dung số và YouTube" },
    { year: "2021", title: "400 triệu views", description: "Cột mốc 400 triệu lượt xem trên YouTube" },
    { year: "2024", title: "Triển lãm ảo", description: "Ra mắt dịch vụ triển lãm ảo 3D" },
  ],
  culture:
    "Tại CD Media, chúng tôi xây dựng môi trường làm việc sáng tạo, cởi mở và đầy cảm hứng. Mỗi thành viên đều được khuyến khích thể hiện cá tính và đóng góp ý tưởng.",
  vision:
    "Trở thành đơn vị sản xuất nội dung số và truyền thông sáng tạo hàng đầu Đông Nam Á, kết nối tri thức qua mọi nền tảng.",
  mission:
    "Sáng tạo nội dung chất lượng cao, mang giá trị tri thức đến cộng đồng. Hỗ trợ doanh nghiệp xây dựng thương hiệu mạnh mẽ thông qua truyền thông sáng tạo.",
  coreValues: [
    { title: "Sáng tạo", description: "Luôn tìm kiếm góc nhìn mới và ý tưởng đột phá" },
    { title: "Chất lượng", description: "Cam kết chất lượng cao nhất trong mọi sản phẩm" },
    { title: "Trách nhiệm", description: "Có trách nhiệm với nội dung và cộng đồng" },
    { title: "Đồng đội", description: "Phối hợp chặt chẽ, tôn trọng và hỗ trợ lẫn nhau" },
  ],
  teamImages: [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600",
  ],
};

function getAbout(): AboutContent {
  if (typeof window === "undefined") return defaultAbout;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultAbout;
  return JSON.parse(raw);
}

function saveAbout(data: AboutContent) {
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
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">{children}</div>}
    </div>
  );
}

export default function AdminAboutPage() {
  const { addToast } = useToast();
  const [data, setData] = useState<AboutContent>(defaultAbout);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setData(getAbout());
  }, []);

  const handleSave = () => {
    setSaving(true);
    saveAbout(data);
    setTimeout(() => {
      setSaving(false);
      addToast("Đã lưu thay đổi trang Về CD Media", "success");
    }, 300);
  };

  const updateField = <K extends keyof AboutContent>(key: K, value: AboutContent[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quản lý trang Về CD Media"
        subtitle="Chỉnh sửa nội dung trang giới thiệu công ty"
      />

      {/* Hero */}
      <Section title="Hero">
        <AdminFormField label="Tiêu đề">
          <input
            type="text"
            value={data.heroTitle}
            onChange={(e) => updateField("heroTitle", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </AdminFormField>
        <AdminFormField label="Mô tả ngắn">
          <input
            type="text"
            value={data.heroSubtitle}
            onChange={(e) => updateField("heroSubtitle", e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </AdminFormField>
      </Section>

      {/* Story */}
      <Section title="Câu chuyện CD Media">
        <AdminRichEditor value={data.story} onChange={(v) => updateField("story", v)} />
      </Section>

      {/* Vision & Mission */}
      <Section title="Tầm nhìn & Sứ mệnh">
        <AdminFormField label="Tầm nhìn">
          <textarea
            value={data.vision}
            onChange={(e) => updateField("vision", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </AdminFormField>
        <AdminFormField label="Sứ mệnh">
          <textarea
            value={data.mission}
            onChange={(e) => updateField("mission", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </AdminFormField>
      </Section>

      {/* Core Values */}
      <Section title="Giá trị cốt lõi">
        <div className="space-y-3">
          {data.coreValues.map((item, idx) => (
            <div key={idx} className="flex items-end gap-3 p-3 rounded-lg bg-slate-50">
              <AdminFormField label="Tiêu đề" className="flex-1">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const newVals = [...data.coreValues];
                    newVals[idx] = { ...item, title: e.target.value };
                    updateField("coreValues", newVals);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </AdminFormField>
              <AdminFormField label="Mô tả" className="flex-[2]">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => {
                    const newVals = [...data.coreValues];
                    newVals[idx] = { ...item, description: e.target.value };
                    updateField("coreValues", newVals);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </AdminFormField>
              <button
                type="button"
                onClick={() => updateField("coreValues", data.coreValues.filter((_, i) => i !== idx))}
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
          onClick={() => updateField("coreValues", [...data.coreValues, { title: "", description: "" }])}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm giá trị
        </button>
      </Section>

      {/* Culture */}
      <Section title="Văn hóa công ty">
        <AdminFormField label="Mô tả văn hóa">
          <textarea
            value={data.culture}
            onChange={(e) => updateField("culture", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </AdminFormField>
      </Section>

      {/* Team Images */}
      <Section title="Ảnh đội ngũ">
        <div className="space-y-3">
          {data.teamImages.map((url, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              {url && (
                <img src={url} alt={`Team ${idx + 1}`} className="w-16 h-16 rounded-lg object-cover" />
              )}
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  const newImgs = [...data.teamImages];
                  newImgs[idx] = e.target.value;
                  updateField("teamImages", newImgs);
                }}
                placeholder="URL hình ảnh..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => updateField("teamImages", data.teamImages.filter((_, i) => i !== idx))}
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
          onClick={() => updateField("teamImages", [...data.teamImages, ""])}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm ảnh
        </button>
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
