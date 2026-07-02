"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import AdminFormField from "@/components/admin/AdminFormField";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { servicesService } from "@/services/services.service";
import { AdminService } from "@/types/service";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/cn";

const GROUPS: { value: AdminService["group"]; label: string }[] = [
  { value: "media", label: "Sản xuất Media" },
  { value: "communication", label: "Giải pháp truyền thông" },
  { value: "marketing", label: "Marketing tổng thể" },
];

const INITIAL_FORM: Omit<AdminService, "id" | "createdAt" | "updatedAt"> = {
  slug: "",
  title: "",
  group: "media",
  shortDescription: "",
  description: "",
  icon: "Film",
  subItems: [],
  order: 1,
  visible: true,
  status: "draft",
};

export default function ServicesPage() {
  const { addToast } = useToast();
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  // Form modal
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [subItemInput, setSubItemInput] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<AdminService | null>(null);

  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const result = await servicesService.getAll({
        page: 1,
        pageSize: 100,
        sortBy: "order",
        sortOrder: "asc",
      });
      setServices(result.data);
    } catch {
      addToast("Lỗi khi tải dịch vụ", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...INITIAL_FORM, order: services.length + 1 });
    setSubItemInput("");
    setShowForm(true);
  };

  const openEditForm = (service: AdminService) => {
    setEditingId(service.id);
    setForm({
      slug: service.slug,
      title: service.title,
      group: service.group,
      shortDescription: service.shortDescription,
      description: service.description,
      icon: service.icon,
      thumbnail: service.thumbnail,
      subItems: service.subItems,
      order: service.order,
      visible: service.visible,
      status: service.status,
      seoTitle: service.seoTitle,
      seoDescription: service.seoDescription,
    });
    setSubItemInput("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      addToast("Vui lòng nhập tên dịch vụ", "error");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await servicesService.update(editingId, form as Partial<AdminService>);
        addToast("Đã cập nhật dịch vụ", "success");
      } else {
        await servicesService.create(form as Omit<AdminService, "id" | "createdAt" | "updatedAt">);
        addToast("Đã thêm dịch vụ mới", "success");
      }
      closeForm();
      loadServices();
    } catch {
      addToast("Lỗi khi lưu", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await servicesService.delete(deleteTarget.id);
      addToast("Đã xóa dịch vụ", "success");
      setDeleteTarget(null);
      loadServices();
    } catch {
      addToast("Lỗi khi xóa", "error");
    }
  };

  const handleToggleVisible = async (service: AdminService) => {
    try {
      await servicesService.update(service.id, { visible: !service.visible } as Partial<AdminService>);
      addToast(service.visible ? "Đã ẩn dịch vụ" : "Đã hiện dịch vụ", "success");
      loadServices();
    } catch {
      addToast("Lỗi khi cập nhật", "error");
    }
  };

  const handleOrderChange = async (service: AdminService, newOrder: number) => {
    try {
      await servicesService.update(service.id, { order: newOrder } as Partial<AdminService>);
      loadServices();
    } catch {
      addToast("Lỗi khi cập nhật thứ tự", "error");
    }
  };

  const addSubItem = () => {
    if (!subItemInput.trim()) return;
    setForm((prev) => ({ ...prev, subItems: [...prev.subItems, subItemInput.trim()] }));
    setSubItemInput("");
  };

  const removeSubItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      subItems: prev.subItems.filter((_, i) => i !== index),
    }));
  };

  const groupedServices = GROUPS.map((g) => ({
    ...g,
    items: services.filter((s) => s.group === g.value),
  }));

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Quản lý Dịch vụ" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quản lý Dịch vụ"
        subtitle={`${services.length} dịch vụ`}
        action={{ label: "Thêm dịch vụ", onClick: openAddForm }}
      />

      {services.length === 0 ? (
        <AdminEmptyState
          title="Chưa có dịch vụ"
          description="Thêm dịch vụ đầu tiên cho website của bạn."
          action={{ label: "Thêm dịch vụ", onClick: openAddForm }}
        />
      ) : (
        <div className="space-y-6">
          {groupedServices.map((group) => (
            <div key={group.value} className="space-y-3">
              <button
                onClick={() => toggleGroup(group.value)}
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                {collapsedGroups.has(group.value) ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {group.label}
                <span className="text-xs font-normal text-slate-400">
                  ({group.items.length})
                </span>
              </button>

              {!collapsedGroups.has(group.value) && (
                <div className="grid gap-3">
                  {group.items.map((service) => (
                    <div
                      key={service.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border bg-white transition-colors",
                        service.visible
                          ? "border-slate-200"
                          : "border-slate-200 bg-slate-50 opacity-60"
                      )}
                    >
                      <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0" />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-900 truncate">
                            {service.title}
                          </h4>
                          <AdminBadge variant={service.status} />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {service.shortDescription}
                        </p>
                        {service.subItems.length > 0 && (
                          <p className="text-xs text-slate-400 mt-1">
                            {service.subItems.join(" · ")}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <input
                          type="number"
                          value={service.order}
                          onChange={(e) => handleOrderChange(service, Number(e.target.value))}
                          className="w-14 px-2 py-1 rounded border border-slate-200 text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
                          min={1}
                          title="Thứ tự"
                        />
                        <button
                          onClick={() => handleToggleVisible(service)}
                          className={cn(
                            "p-1.5 rounded-md transition-colors",
                            service.visible
                              ? "text-green-600 hover:bg-green-50"
                              : "text-slate-400 hover:bg-slate-100"
                          )}
                          title={service.visible ? "Ẩn" : "Hiện"}
                        >
                          {service.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => openEditForm(service)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title="Sửa"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(service)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeForm}
          />
          <div className="relative w-full max-w-2xl max-h-[calc(100vh-80px)] overflow-y-auto bg-white rounded-xl shadow-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Sửa dịch vụ" : "Thêm dịch vụ mới"}
              </h2>
              <button
                onClick={closeForm}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminFormField label="Tên dịch vụ" required>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="VD: Phim tài liệu"
                />
              </AdminFormField>

              <AdminFormField label="Slug" required>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="phim-tai-lieu"
                />
              </AdminFormField>

              <AdminFormField label="Nhóm dịch vụ" required>
                <select
                  value={form.group}
                  onChange={(e) => setForm((p) => ({ ...p, group: e.target.value as AdminService["group"] }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  {GROUPS.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </AdminFormField>

              <AdminFormField label="Icon (Lucide)">
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Film"
                />
              </AdminFormField>

              <AdminFormField label="Thứ tự">
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  min={1}
                />
              </AdminFormField>

              <AdminFormField label="Trạng thái">
                <select
                  value={form.status}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as AdminService["status"] }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="draft">Bản nháp</option>
                  <option value="published">Đã xuất bản</option>
                </select>
              </AdminFormField>
            </div>

            <AdminFormField label="Mô tả ngắn">
              <input
                type="text"
                value={form.shortDescription}
                onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Mô tả ngắn gọn..."
              />
            </AdminFormField>

            <AdminFormField label="Mô tả chi tiết">
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                placeholder="Mô tả chi tiết dịch vụ..."
              />
            </AdminFormField>

            <AdminFormField label="Thumbnail URL">
              <input
                type="text"
                value={form.thumbnail || ""}
                onChange={(e) => setForm((p) => ({ ...p, thumbnail: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="https://..."
              />
            </AdminFormField>

            {/* Sub-items */}
            <AdminFormField label="Dịch vụ con">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={subItemInput}
                    onChange={(e) => setSubItemInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubItem())}
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Thêm dịch vụ con..."
                  />
                  <button
                    type="button"
                    onClick={addSubItem}
                    className="px-3 py-2 rounded-lg bg-slate-100 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {form.subItems.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.subItems.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-xs text-slate-700"
                      >
                        {item}
                        <button
                          onClick={() => removeSubItem(i)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </AdminFormField>

            {/* Visible toggle */}
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.visible}
                  onChange={(e) => setForm((p) => ({ ...p, visible: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
              </label>
              <span className="text-sm text-slate-700">Hiển thị trên website</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={closeForm}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                {saving ? "Đang lưu..." : editingId ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      <AdminConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa dịch vụ"
        description={`Bạn có chắc muốn xóa dịch vụ "${deleteTarget?.title}"? Thao tác này không thể hoàn tác.`}
        onConfirm={handleDelete}
        variant="danger"
      />
    </div>
  );
}