"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { newsService } from "@/services/news.service";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFormField from "@/components/admin/AdminFormField";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminRichEditor from "@/components/admin/AdminRichEditor";
import { useToast } from "@/hooks/useToast";

const categories = ["Marketing", "Truyền thông", "Khám phá", "Travel", "Sự kiện", "Why"];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminNewsCreatePage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Marketing",
    thumbnail: "",
    description: "",
    content: "",
    author: "CD Media Team",
    date: new Date().toISOString().split("T")[0],
    featured: false,
    status: "draft" as "draft" | "published",
    seoTitle: "",
    seoDescription: "",
  });

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title") {
        next.slug = generateSlug(value as string);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      await newsService.create({
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        category: form.category,
        thumbnail: form.thumbnail,
        description: form.description,
        content: form.content,
        author: form.author,
        date: form.date,
        featured: form.featured,
        status: form.status,
        seoTitle: form.seoTitle || undefined,
        seoDescription: form.seoDescription || undefined,
      });
      addToast("Tạo bài viết thành công", "success");
      router.push("/admin/news");
    } catch {
      addToast("Có lỗi xảy ra", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Viết bài mới"
        breadcrumbs={[
          { label: "Tin tức", href: "/admin/news" },
          { label: "Tạo mới" },
        ]}
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <AdminFormField label="Tiêu đề" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Nhập tiêu đề bài viết..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </AdminFormField>

          <AdminFormField label="Slug" description="URL-friendly tự động tạo từ tiêu đề">
            <input
              type="text"
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="slug-bai-viet"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </AdminFormField>

          <AdminFormField label="Mô tả ngắn">
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Mô tả ngắn gọn về bài viết..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
          </AdminFormField>

          <AdminFormField label="Nội dung bài viết">
            <AdminRichEditor
              value={form.content}
              onChange={(val) => updateField("content", val)}
              placeholder="Viết nội dung bài viết..."
            />
          </AdminFormField>

          <div className="border-t border-slate-200 pt-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-700">SEO</h3>
            <AdminFormField label="SEO Title">
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => updateField("seoTitle", e.target.value)}
                placeholder="Tiêu đề SEO..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </AdminFormField>
            <AdminFormField label="SEO Description">
              <textarea
                value={form.seoDescription}
                onChange={(e) => updateField("seoDescription", e.target.value)}
                placeholder="Mô tả SEO..."
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              />
            </AdminFormField>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
            <AdminFormField label="Danh mục">
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </AdminFormField>

            <AdminFormField label="Trạng thái">
              <select
                value={form.status}
                onChange={(e) => updateField("status", e.target.value as "draft" | "published")}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Bản nháp</option>
                <option value="published">Xuất bản</option>
              </select>
            </AdminFormField>

            <AdminFormField label="Tác giả">
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </AdminFormField>

            <AdminFormField label="Ngày đăng">
              <input
                type="date"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </AdminFormField>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="featured" className="text-sm text-slate-700">
                Bài viết nổi bật
              </label>
            </div>
          </div>

          <AdminImageUpload
            value={form.thumbnail}
            onChange={(url) => updateField("thumbnail", url)}
            label="Ảnh cover"
          />

          <button
            type="submit"
            disabled={submitting || !form.title.trim()}
            className={cn(
              "w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors shadow-sm",
              "bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {submitting ? "Đang tạo..." : "Tạo bài viết"}
          </button>
        </div>
      </form>
    </div>
  );
}
