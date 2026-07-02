"use client";

import { useEffect, useState } from "react";
import { Copy, Trash2, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFormField from "@/components/admin/AdminFormField";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { useToast } from "@/hooks/useToast";

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  category: string;
  createdAt: string;
}

const STORAGE_KEY = "cdmedia_admin_media";

const categories = ["Tất cả", "Banner", "Project", "News", "Team", "Other"];

const seedMedia: MediaItem[] = [
  { id: "m1", url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600", filename: "banner-home.jpg", category: "Banner", createdAt: "2025-01-15T10:00:00Z" },
  { id: "m2", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600", filename: "office-team.jpg", category: "Team", createdAt: "2025-01-14T09:00:00Z" },
  { id: "m3", url: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600", filename: "project-film.jpg", category: "Project", createdAt: "2025-01-13T08:00:00Z" },
  { id: "m4", url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600", filename: "project-doc.jpg", category: "Project", createdAt: "2025-01-12T12:00:00Z" },
  { id: "m5", url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600", filename: "team-meeting.jpg", category: "Team", createdAt: "2025-01-11T11:00:00Z" },
  { id: "m6", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600", filename: "news-marketing.jpg", category: "News", createdAt: "2025-01-10T10:00:00Z" },
  { id: "m7", url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600", filename: "team-work.jpg", category: "Team", createdAt: "2025-01-09T09:00:00Z" },
  { id: "m8", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600", filename: "banner-services.jpg", category: "Banner", createdAt: "2025-01-08T08:00:00Z" },
  { id: "m9", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600", filename: "news-event.jpg", category: "News", createdAt: "2025-01-07T07:00:00Z" },
  { id: "m10", url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600", filename: "project-tvc.jpg", category: "Project", createdAt: "2025-01-06T06:00:00Z" },
  { id: "m11", url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600", filename: "misc-creative.jpg", category: "Other", createdAt: "2025-01-05T05:00:00Z" },
  { id: "m12", url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600", filename: "banner-about.jpg", category: "Banner", createdAt: "2025-01-04T04:00:00Z" },
];

function getMedia(): MediaItem[] {
  if (typeof window === "undefined") return seedMedia;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedMedia));
    return seedMedia;
  }
  return JSON.parse(raw);
}

function saveMedia(items: MediaItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function AdminMediaPage() {
  const { addToast } = useToast();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadFilename, setUploadFilename] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Other");
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);

  useEffect(() => {
    setItems(getMedia());
  }, []);

  const filtered = activeCategory === "Tất cả"
    ? items
    : items.filter((i) => i.category === activeCategory);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    addToast("Đã copy URL", "success");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const updated = items.filter((i) => i.id !== deleteTarget.id);
    setItems(updated);
    saveMedia(updated);
    setDeleteTarget(null);
    addToast("Đã xóa file", "success");
  };

  const handleUpload = () => {
    if (!uploadUrl.trim()) return;
    const newItem: MediaItem = {
      id: `m-${Date.now()}`,
      url: uploadUrl.trim(),
      filename: uploadFilename.trim() || "untitled.jpg",
      category: uploadCategory,
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...items];
    setItems(updated);
    saveMedia(updated);
    setUploadUrl("");
    setUploadFilename("");
    setUploadCategory("Other");
    setShowUpload(false);
    addToast("Đã thêm media mới", "success");
  };

  const categoryBadgeVariant = (cat: string) => {
    switch (cat) {
      case "Banner": return "published";
      case "Project": return "new";
      case "News": return "contacted";
      case "Team": return "open";
      default: return "draft";
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Media Library"
        subtitle={`${items.length} files`}
        action={{ label: "Upload", onClick: () => setShowUpload(true) }}
      />

      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-video bg-slate-100">
              <img
                src={item.url}
                alt={item.filename}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => handleCopyUrl(item.url)}
                  className="p-2 rounded-lg bg-white/90 text-slate-700 hover:bg-white transition-colors"
                  aria-label="Copy URL"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="p-2 rounded-lg bg-white/90 text-red-600 hover:bg-white transition-colors"
                  aria-label="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-3 space-y-1.5">
              <p className="text-xs font-medium text-slate-700 truncate">{item.filename}</p>
              <AdminBadge variant={categoryBadgeVariant(item.category) as "published" | "new" | "contacted" | "open" | "draft"} label={item.category} />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <ImageIcon className="w-12 h-12 mb-3" />
          <p className="text-sm">Không có media nào trong danh mục này</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Thêm Media</h3>
              <button onClick={() => setShowUpload(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <AdminFormField label="URL hình ảnh" required>
              <input
                type="url"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </AdminFormField>
            <AdminFormField label="Tên file">
              <input
                type="text"
                value={uploadFilename}
                onChange={(e) => setUploadFilename(e.target.value)}
                placeholder="image.jpg"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </AdminFormField>
            <AdminFormField label="Danh mục">
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.filter((c) => c !== "Tất cả").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </AdminFormField>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowUpload(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleUpload}
                disabled={!uploadUrl.trim()}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      <AdminConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        title="Xóa media"
        description={`Bạn có chắc muốn xóa "${deleteTarget?.filename}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDelete}
        variant="danger"
      />
    </div>
  );
}
