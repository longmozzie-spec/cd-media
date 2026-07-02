"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminFormField from "@/components/admin/AdminFormField";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminRichEditor from "@/components/admin/AdminRichEditor";
import { projectsService } from "@/services/projects.service";
import { useToast } from "@/hooks/useToast";

const projectSchema = z.object({
  title: z.string().min(1, "Tên dự án là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc"),
  client: z.string().min(1, "Khách hàng là bắt buộc"),
  industry: z.string().optional(),
  category: z.string().optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  videoId: z.string().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function CreateProjectPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<string[]>([""]);
  const [services, setServices] = useState<string[]>([""]);
  const [solution, setSolution] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      client: "",
      industry: "",
      category: "Video nổi bật",
      thumbnail: "",
      description: "",
      challenge: "",
      solution: "",
      videoId: "",
      featured: false,
      status: "draft",
      seoTitle: "",
      seoDescription: "",
    },
  });

  const title = watch("title");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("title", value);
    setValue("slug", generateSlug(value));
  };

  const addArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const updateArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const onSubmit = async (data: ProjectFormData) => {
    setSubmitting(true);
    try {
      await projectsService.create({
        ...data,
        thumbnail: thumbnail || "",
        solution: solution || "",
        results: results.filter((r) => r.trim() !== ""),
        services: services.filter((s) => s.trim() !== ""),
        images: [],
        industry: data.industry || "",
        category: data.category || "Video nổi bật",
        description: data.description || "",
        challenge: data.challenge || "",
        videoId: data.videoId || undefined,
        featured: data.featured || false,
        banner: "",
      });
      addToast("Tạo dự án thành công", "success");
      router.push("/admin/projects");
    } catch (error) {
      addToast("Không thể tạo dự án", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Thêm dự án mới"
        breadcrumbs={[
          { label: "Dự án", href: "/admin/projects" },
          { label: "Thêm mới" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-slate-900">Thông tin cơ bản</h2>

          <AdminFormField label="Tên dự án" required error={errors.title?.message}>
            <input
              {...register("title")}
              onChange={handleTitleChange}
              placeholder="Nhập tên dự án"
              className={inputClasses}
            />
          </AdminFormField>

          <AdminFormField label="Slug" required error={errors.slug?.message}>
            <input
              {...register("slug")}
              placeholder="tu-dong-tao-tu-ten"
              className={inputClasses}
            />
          </AdminFormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminFormField label="Khách hàng" required error={errors.client?.message}>
              <input
                {...register("client")}
                placeholder="Tên khách hàng"
                className={inputClasses}
              />
            </AdminFormField>

            <AdminFormField label="Ngành hàng">
              <input
                {...register("industry")}
                placeholder="VD: F&B, Technology..."
                className={inputClasses}
              />
            </AdminFormField>
          </div>

          <AdminFormField label="Loại dịch vụ">
            <select {...register("category")} className={inputClasses}>
              <option value="Video nổi bật">Video nổi bật</option>
            </select>
          </AdminFormField>

          <AdminFormField label="Thumbnail">
            <AdminImageUpload
              value={thumbnail}
              onChange={(url) => {
                setThumbnail(url);
                setValue("thumbnail", url);
              }}
              label=""
            />
          </AdminFormField>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-slate-900">Nội dung</h2>

          <AdminFormField label="Mô tả ngắn">
            <textarea
              {...register("description")}
              rows={3}
              placeholder="Mô tả ngắn về dự án..."
              className={inputClasses + " resize-y"}
            />
          </AdminFormField>

          <AdminFormField label="Bài toán">
            <textarea
              {...register("challenge")}
              rows={3}
              placeholder="Thách thức / bài toán cần giải quyết..."
              className={inputClasses + " resize-y"}
            />
          </AdminFormField>

          <AdminFormField label="Giải pháp">
            <AdminRichEditor
              value={solution}
              onChange={(val) => {
                setSolution(val);
                setValue("solution", val);
              }}
              placeholder="Mô tả giải pháp thực hiện..."
            />
          </AdminFormField>

          {/* Results array */}
          <AdminFormField label="Kết quả đạt được">
            <div className="space-y-2">
              {results.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    value={item}
                    onChange={(e) => updateArrayItem(setResults, index, e.target.value)}
                    placeholder={`Kết quả ${index + 1}`}
                    className={inputClasses}
                  />
                  {results.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(setResults, index)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem(setResults)}
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm kết quả
              </button>
            </div>
          </AdminFormField>

          {/* Services array */}
          <AdminFormField label="Dịch vụ triển khai">
            <div className="space-y-2">
              {services.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    value={item}
                    onChange={(e) => updateArrayItem(setServices, index, e.target.value)}
                    placeholder={`Dịch vụ ${index + 1}`}
                    className={inputClasses}
                  />
                  {services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(setServices, index)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem(setServices)}
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm dịch vụ
              </button>
            </div>
          </AdminFormField>

          <AdminFormField label="Video ID YouTube" description="ID của video YouTube (phần sau v=)">
            <input
              {...register("videoId")}
              placeholder="VD: dQw4w9WgXcQ"
              className={inputClasses}
            />
          </AdminFormField>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-slate-900">Cài đặt</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminFormField label="Trạng thái">
              <select {...register("status")} className={inputClasses}>
                <option value="draft">Bản nháp</option>
                <option value="published">Xuất bản</option>
              </select>
            </AdminFormField>

            <AdminFormField label="Dự án nổi bật">
              <label className="flex items-center gap-3 mt-1 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("featured")}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600">Hiển thị ở trang chủ</span>
              </label>
            </AdminFormField>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-semibold text-slate-900">SEO</h2>

          <AdminFormField label="SEO Title">
            <input
              {...register("seoTitle")}
              placeholder="Tiêu đề trang (hiển thị trên Google)"
              className={inputClasses}
            />
          </AdminFormField>

          <AdminFormField label="SEO Description">
            <textarea
              {...register("seoDescription")}
              rows={2}
              placeholder="Mô tả trang (hiển thị trên Google)"
              className={inputClasses + " resize-y"}
            />
          </AdminFormField>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {submitting ? "Đang lưu..." : "Lưu dự án"}
          </button>
        </div>
      </form>
    </div>
  );
}
