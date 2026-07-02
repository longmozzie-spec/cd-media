"use client";

import { useEffect, useState } from "react";
import { Save, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { seoService } from "@/services/seo.service";
import { PageSEO } from "@/types/seo";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFormField from "@/components/admin/AdminFormField";
import { useToast } from "@/hooks/useToast";

export default function AdminSEOPage() {
  const { addToast } = useToast();
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<PageSEO>>({});
  const [saving, setSaving] = useState(false);

  const fetchPages = async () => {
    setLoading(true);
    const res = await seoService.getAll({ pageSize: 50 });
    setPages(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleExpand = (item: PageSEO) => {
    if (expandedId === item.id) {
      setExpandedId(null);
      setEditData({});
    } else {
      setExpandedId(item.id);
      setEditData({ ...item });
    }
  };

  const handleSave = async () => {
    if (!expandedId || !editData) return;
    setSaving(true);
    await seoService.update(expandedId, editData);
    await fetchPages();
    setSaving(false);
    addToast("Đã cập nhật SEO thành công", "success");
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Quản lý SEO" subtitle="Tối ưu SEO cho từng trang trên website" />
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Quản lý SEO" subtitle="Tối ưu SEO cho từng trang trên website" />

      <div className="space-y-2">
        {pages.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => handleExpand(item)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{item.page}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{item.metaTitle}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">
                    {item.metaDescription ? `${item.metaDescription.length}/160` : "0/160"}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">
                  <AdminFormField label="Meta Title" description="Tối ưu 50-60 ký tự">
                    <input
                      type="text"
                      value={editData.metaTitle || ""}
                      onChange={(e) => setEditData({ ...editData, metaTitle: e.target.value })}
                      className={inputClass}
                    />
                    <p className="text-xs text-slate-400 mt-1">{(editData.metaTitle || "").length}/60 ký tự</p>
                  </AdminFormField>
                  <AdminFormField label="Meta Description" description="Tối ưu 150-160 ký tự">
                    <textarea
                      value={editData.metaDescription || ""}
                      onChange={(e) => setEditData({ ...editData, metaDescription: e.target.value })}
                      rows={3}
                      className={cn(inputClass, "resize-y")}
                    />
                    <p className="text-xs text-slate-400 mt-1">{(editData.metaDescription || "").length}/160 ký tự</p>
                  </AdminFormField>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AdminFormField label="OG Image URL">
                      <input
                        type="url"
                        value={editData.ogImage || ""}
                        onChange={(e) => setEditData({ ...editData, ogImage: e.target.value })}
                        className={inputClass}
                      />
                    </AdminFormField>
                    <AdminFormField label="Canonical URL">
                      <input
                        type="url"
                        value={editData.canonicalUrl || ""}
                        onChange={(e) => setEditData({ ...editData, canonicalUrl: e.target.value })}
                        className={inputClass}
                      />
                    </AdminFormField>
                  </div>
                  <AdminFormField label="Keywords" description="Phân cách bằng dấu phẩy">
                    <input
                      type="text"
                      value={editData.keywords || ""}
                      onChange={(e) => setEditData({ ...editData, keywords: e.target.value })}
                      className={inputClass}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </AdminFormField>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors",
                        "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                      )}
                    >
                      <Save className="w-4 h-4" />
                      {saving ? "Đang lưu..." : "Lưu SEO"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
