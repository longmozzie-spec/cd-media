"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { careersService } from "@/services/careers.service";
import { AdminCareer } from "@/types/career";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { useToast } from "@/hooks/useToast";

const departments = ["Tất cả", "Creative Team", "Production Team", "Marketing Team", "Account Team", "Post-production Team"];
const statuses = ["Tất cả", "open", "closed", "draft"];

export default function AdminCareersPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [data, setData] = useState<AdminCareer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("Tất cả");
  const [status, setStatus] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteTarget, setDeleteTarget] = useState<AdminCareer | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await careersService.getAll({
        page,
        pageSize: 10,
        search: search || undefined,
        searchFields: ["title"],
        filters: {
          ...(department !== "Tất cả" && { department }),
          ...(status !== "Tất cả" && { status }),
        },
      });
      setData(res.data);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, department, status]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await careersService.delete(deleteTarget.id);
    addToast("Đã xóa vị trí tuyển dụng", "success");
    setDeleteTarget(null);
    fetchData();
  };

  const columns = [
    {
      header: "Tên vị trí",
      accessor: (item: AdminCareer) => (
        <span className="font-medium text-slate-900 line-clamp-1">{item.title}</span>
      ),
    },
    {
      header: "Phòng ban",
      accessor: "department" as keyof AdminCareer,
    },
    {
      header: "Loại hình",
      accessor: "type" as keyof AdminCareer,
    },
    {
      header: "Địa điểm",
      accessor: "location" as keyof AdminCareer,
    },
    {
      header: "Trạng thái",
      accessor: (item: AdminCareer) => <AdminBadge variant={item.status} />,
      className: "w-24",
    },
    {
      header: "Hạn nộp",
      accessor: (item: AdminCareer) => (
        <span className="text-slate-500 text-xs">
          {item.deadline ? new Date(item.deadline).toLocaleDateString("vi-VN") : "—"}
        </span>
      ),
      className: "w-28",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quản lý Tuyển dụng"
        action={{ label: "Thêm vị trí", href: "/admin/careers/create" }}
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm vị trí..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={department}
          onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === "Tất cả" ? "Tất cả" : s === "open" ? "Open" : s === "closed" ? "Closed" : "Draft"}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={data}
          keyField="id"
          onEdit={(item) => router.push(`/admin/careers/${item.id}/edit`)}
          onDelete={(item) => setDeleteTarget(item)}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          emptyMessage="Chưa có vị trí tuyển dụng nào"
        />
      )}

      <AdminConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa vị trí tuyển dụng"
        description={`Bạn có chắc muốn xóa vị trí "${deleteTarget?.title}"? Thao tác này không thể hoàn tác.`}
        onConfirm={handleDelete}
        variant="danger"
      />
    </div>
  );
}
