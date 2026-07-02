"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { cn } from "@/lib/cn";
import { settingsService } from "@/services/settings.service";
import { SiteSettings } from "@/types/settings";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFormField from "@/components/admin/AdminFormField";
import { useToast } from "@/hooks/useToast";

export default function AdminSettingsPage() {
  const { addToast } = useToast();
  const [data, setData] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    settingsService.get().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    await settingsService.save(data);
    setSaving(false);
    addToast("Đã lưu cài đặt website", "success");
  };

  const updateField = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateSocial = (key: keyof SiteSettings["social"], value: string) => {
    setData((prev) => (prev ? { ...prev, social: { ...prev.social, [key]: value } } : prev));
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Cài đặt Website"
        subtitle="Quản lý thông tin chung và cấu hình website"
      />

      {/* Thong tin chung */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">Thông tin chung</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminFormField label="Tên công ty">
            <input type="text" value={data.companyName} onChange={(e) => updateField("companyName", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Tên đầy đủ">
            <input type="text" value={data.fullName} onChange={(e) => updateField("fullName", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Tagline">
            <input type="text" value={data.tagline} onChange={(e) => updateField("tagline", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Mô tả ngắn">
            <input type="text" value={data.description} onChange={(e) => updateField("description", e.target.value)} className={inputClass} />
          </AdminFormField>
        </div>
      </div>

      {/* Lien he */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">Liên hệ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminFormField label="Email">
            <input type="email" value={data.email} onChange={(e) => updateField("email", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Điện thoại">
            <input type="text" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Địa chỉ" className="md:col-span-2">
            <input type="text" value={data.address} onChange={(e) => updateField("address", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Giờ làm việc" className="md:col-span-2">
            <input type="text" value={data.workingHours} onChange={(e) => updateField("workingHours", e.target.value)} className={inputClass} />
          </AdminFormField>
        </div>
      </div>

      {/* Mang xa hoi */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">Mạng xã hội</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminFormField label="Facebook">
            <input type="url" value={data.social.facebook} onChange={(e) => updateSocial("facebook", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="YouTube">
            <input type="url" value={data.social.youtube} onChange={(e) => updateSocial("youtube", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="TikTok">
            <input type="url" value={data.social.tiktok} onChange={(e) => updateSocial("tiktok", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="LinkedIn">
            <input type="url" value={data.social.linkedin || ""} onChange={(e) => updateSocial("linkedin", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Zalo">
            <input type="url" value={data.social.zalo || ""} onChange={(e) => updateSocial("zalo", e.target.value)} className={inputClass} />
          </AdminFormField>
        </div>
      </div>

      {/* Khac */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">Khác</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AdminFormField label="Logo URL">
            <input type="url" value={data.logo || ""} onChange={(e) => updateField("logo", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Favicon URL">
            <input type="url" value={data.favicon || ""} onChange={(e) => updateField("favicon", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Google Maps Embed" className="md:col-span-2">
            <input type="url" value={data.googleMapsEmbed || ""} onChange={(e) => updateField("googleMapsEmbed", e.target.value)} className={inputClass} />
          </AdminFormField>
          <AdminFormField label="Mô tả Footer" className="md:col-span-2">
            <textarea value={data.footerDescription} onChange={(e) => updateField("footerDescription", e.target.value)} rows={3} className={cn(inputClass, "resize-y")} />
          </AdminFormField>
        </div>
      </div>

      {/* Save */}
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
          {saving ? "Đang lưu..." : "Lưu cài đặt"}
        </button>
      </div>
    </div>
  );
}