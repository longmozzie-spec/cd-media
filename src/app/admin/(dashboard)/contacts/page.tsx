"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  X,
  Phone,
  Mail,
  Building2,
  Calendar,
  StickyNote,
  Trash2,
} from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { contactsService } from "@/services/contacts.service";
import { ContactSubmission } from "@/types/contact";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/cn";

const STATUS_FILTERS = [
  { value: "all", label: "Tất cả" },
  { value: "new", label: "Mới" },
  { value: "contacted", label: "Đã liên hệ" },
  { value: "converted", label: "Chuyển đổi" },
  { value: "rejected", label: "Từ chối" },
] as const;

const STATUS_OPTIONS: { value: ContactSubmission["status"]; label: string }[] = [
  { value: "new", label: "Mới" },
  { value: "contacted", label: "Đã liên hệ" },
  { value: "converted", label: "Chuyển đổi" },
  { value: "rejected", label: "Từ chối" },
];

const PAGE_SIZE = 8;

export default function ContactsPage() {
  const { addToast } = useToast();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [newCount, setNewCount] = useState(0);

  // Detail panel
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [detailNote, setDetailNote] = useState("");
  const [detailStatus, setDetailStatus] = useState<ContactSubmission["status"]>("new");
  const [saving, setSaving] = useState(false);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<ContactSubmission | null>(null);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await contactsService.getAll({
        page,
        pageSize: PAGE_SIZE,
        search: search || undefined,
        searchFields: ["name", "phone", "email"],
        filters: statusFilter !== "all" ? { status: statusFilter } : undefined,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      setContacts(result.data);
      setTotalPages(result.totalPages);

      const nc = await contactsService.count({ status: "new" });
      setNewCount(nc);
    } catch {
      addToast("Lỗi khi tải dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, addToast]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const openDetail = (contact: ContactSubmission) => {
    setSelected(contact);
    setDetailNote(contact.note || "");
    setDetailStatus(contact.status);
  };

  const closeDetail = () => {
    setSelected(null);
  };

  const handleSaveNote = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await contactsService.update(selected.id, {
        note: detailNote,
        status: detailStatus,
      } as Partial<ContactSubmission>);
      addToast("Đã lưu thay đổi", "success");
      setSelected((prev) =>
        prev ? { ...prev, note: detailNote, status: detailStatus } : null
      );
      loadContacts();
    } catch {
      addToast("Lỗi khi lưu", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await contactsService.delete(deleteTarget.id);
      addToast("Đã xóa liên hệ", "success");
      if (selected?.id === deleteTarget.id) closeDetail();
      setDeleteTarget(null);
      loadContacts();
    } catch {
      addToast("Lỗi khi xóa", "error");
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const columns = [
    { header: "Họ tên", accessor: (item: Record<string, unknown>) => (
      <span className="font-medium text-slate-900">{item.name as string}</span>
    )},
    { header: "SĐT", accessor: "phone" as keyof Record<string, unknown> },
    { header: "Email", accessor: (item: Record<string, unknown>) => (item.email as string) || "—", className: "hidden md:table-cell" },
    { header: "Nhu cầu", accessor: "need" as keyof Record<string, unknown> },
    { header: "Ngân sách", accessor: (item: Record<string, unknown>) => (item.budget as string) || "—", className: "hidden lg:table-cell" },
    { header: "Trạng thái", accessor: (item: Record<string, unknown>) => (
      <AdminBadge variant={item.status as "new" | "contacted" | "converted" | "rejected"} />
    )},
    { header: "Ngày gửi", accessor: (item: Record<string, unknown>) => formatDate(item.createdAt as string), className: "hidden lg:table-cell" },
  ];

  if (loading && contacts.length === 0) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Form liên hệ" subtitle="Đang tải..." />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Form liên hệ"
        subtitle={`${newCount} liên hệ mới chờ xử lý`}
      />

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, SĐT, email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => { setStatusFilter(f.value); setPage(1); }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                statusFilter === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table + Detail */}
      <div className="flex gap-6">
        {/* Table */}
        <div className={cn("flex-1 min-w-0", selected && "hidden lg:block lg:flex-[2]")}>
          <AdminTable
            columns={columns}
            data={contacts as any}
            keyField="id"
            onView={(item) => openDetail(item as any)}
            onDelete={(item) => setDeleteTarget(item as any)}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            emptyMessage="Không có liên hệ nào"
          />
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="flex-1 lg:flex-[1] min-w-[320px] bg-white rounded-xl border border-slate-200 p-5 space-y-5 max-h-[calc(100vh-220px)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Chi tiết</h3>
              <button
                onClick={closeDetail}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span className="font-medium text-slate-900">{selected.name}</span>
                {selected.company && (
                  <span className="text-slate-500">— {selected.company}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{selected.phone}</span>
              </div>
              {selected.email && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{selected.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{formatDate(selected.createdAt)}</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-4">
              <p className="text-sm font-medium text-slate-700">Nhu cầu</p>
              <p className="text-sm text-slate-600">{selected.need}</p>
              {selected.budget && (
                <>
                  <p className="text-sm font-medium text-slate-700 mt-3">Ngân sách</p>
                  <p className="text-sm text-slate-600">{selected.budget}</p>
                </>
              )}
              {selected.content && (
                <>
                  <p className="text-sm font-medium text-slate-700 mt-3">Nội dung</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">{selected.content}</p>
                </>
              )}
            </div>

            {/* Status change */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <label className="block text-sm font-medium text-slate-700">Trạng thái</label>
              <select
                value={detailStatus}
                onChange={(e) => setDetailStatus(e.target.value as ContactSubmission["status"])}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <StickyNote className="w-3.5 h-3.5" /> Ghi chú nội bộ
              </label>
              <textarea
                value={detailNote}
                onChange={(e) => setDetailNote(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                placeholder="Thêm ghi chú..."
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSaveNote}
                disabled={saving}
                className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
              <div className="flex gap-2">
                <a
                  href={`tel:${selected.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Gọi điện
                </a>
                {selected.email && (
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Gửi email
                  </a>
                )}
              </div>
              <button
                onClick={() => setDeleteTarget(selected)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa liên hệ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm delete */}
      <AdminConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa liên hệ"
        description={`Bạn có chắc muốn xóa liên hệ từ "${deleteTarget?.name}"? Thao tác này không thể hoàn tác.`}
        onConfirm={handleDelete}
        variant="danger"
      />
    </div>
  );
}
