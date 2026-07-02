"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { careersService } from "@/services/careers.service";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFormField from "@/components/admin/AdminFormField";
import AdminRichEditor from "@/components/admin/AdminRichEditor";
import { useToast } from "@/hooks/useToast";

const departments = ["Creative Team", "Production Team", "Marketing Team", "Account Team", "Post-production Team"];
const jobTypes = ["Full-time", "Part-time", "Intern", "Freelance"] as const;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminCareersCreatePage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    department: "Creative Team",
    type: "Full-time" as typeof jobTypes[number],
    location: "Hồ Chí Minh",
    salary: "",
    description: "",
    responsibilities: "",
    requirements: [""],
    benefits: [""],
    deadline: "",
    status: "draft" as "open" | "closed" | "draft",
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

  const updateArrayItem = (field: "requirements" | "benefits", index: number, value: string) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: "requirements" | "benefits") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field: "requirements" | "benefits", index: number) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      await careersService.create({
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        department: form.department,
        type: form.type,
        location: form.location,
        salary: form.salary || undefined,
        description: form.description,
        responsibilities: form.responsibilities.split("\n").filter(Boolean),
        requirements: form.requirements.filter((r) => r.trim()),
        benefits: form.benefits.filter((b) => b.trim()),
        deadline: form.deadline || undefined,
        status: form.status,
        seoTitle: form.seoTitle || undefined,
        seoDescription: form.seoDescription || undefined,
      });
      addToast("Tạo vị trí tuyển dụng thành công", "success");
      router.push("/admin/careers");
    } catch {
      addToast("Có lỗi xảy ra", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Thêm vị trí mới"
        breadcrumbs={[
          { label: "Tuyển dụng", href: "/admin/careers" },
          { label: "Tạo mới" },
        ]}
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <AdminFormField label="Tên vị trí" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="VD: Senior Video Editor"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </AdminFormField>

          <AdminFormField label="Slug" description="URL-friendly tự động tạo từ tên vị trí">
            <input
              type="text"
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="senior-video-editor"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </AdminFormField>

          <AdminFormField label="Mô tả ngắn">
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Mô tả ngắn về vị trí..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
          </AdminFormField>

          <AdminFormField label="Mô tả công việc">
            <AdminRichEditor
              value={form.responsibilities}
              onChange={(val) => updateField("responsibilities", val)}
              placeholder="Chi tiết mô tả công việc..."
            />
          </AdminFormField>

          <AdminFormField label="Yêu cầu">
            <div className="space-y-2">
              {form.requirements.map((req, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateArrayItem("requirements", i, e.target.value)}
                    placeholder={`Yêu cầu ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {form.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("requirements", i)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("requirements")}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" /> Thêm yêu cầu
              </button>
            </div>
          </AdminFormField>

          <AdminFormField label="Quyền lợi">
            <div className="space-y-2">
              {form.benefits.map((ben, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={ben}
                    onChange={(e) => updateArrayItem("benefits", i, e.target.value)}
                    placeholder={`Quyền lợi ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {form.benefits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("benefits", i)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("benefits")}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" /> Thêm quyền lợi
              </button>
            </div>
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
            <AdminFormField label="Phòng ban">
              <select
                value={form.department}
                onChange={(e) => updateField("department", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </AdminFormField>

            <AdminFormField label="Loại hình">
              <select
                value={form.type}
                onChange={(e) => updateField("type", e.target.value as typeof jobTypes[number])}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </AdminFormField>

            <AdminFormField label="Trạng thái">
              <select
                value={form.status}
                onChange={(e) => updateField("status", e.target.value as "open" | "closed" | "draft")}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Bản nháp</option>
                <option value="open">Mở tuyển</option>
                <option value="closed">Đóng</option>
              </select>
            </AdminFormField>

            <AdminFormField label="Địa điểm">
              <input
                type="text"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="VD: Hồ Chí Minh"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </AdminFormField>

            <AdminFormField label="Mức lương">
              <input
                type="text"
                value={form.salary}
                onChange={(e) => updateField("salary", e.target.value)}
                placeholder="VD: Thỏa thuận"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </AdminFormField>

            <AdminFormField label="Hạn ứng tuyển">
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => updateField("deadline", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </AdminFormField>
          </div>

          <button
            type="submit"
            disabled={submitting || !form.title.trim()}
            className={cn(
              "w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors shadow-sm",
              "bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {submitting ? "Đang tạo..." : "Tạo vị trí"}
          </button>
        </div>
      </form>
    </div>
  );
}
