"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { projectsService } from "@/services/projects.service";
import { useToast } from "@/hooks/useToast";
import { AdminProject } from "@/types/project";

export default function ProjectsListPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deleteTarget, setDeleteTarget] = useState<AdminProject | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const filters: Record<string, string> = {};
      if (statusFilter !== "all") {
        filters.status = statusFilter;
      }
      const result = await projectsService.getAll({
        page,
        pageSize: 10,
        search: search || undefined,
        searchFields: ["title", "client", "industry"],
        filters: Object.keys(filters).length > 0 ? filters : undefined,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      setProjects(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await projectsService.delete(deleteTarget.id);
      addToast("Đã xóa dự án thành công", "success");
      setDeleteTarget(null);
      loadProjects();
    } catch (error) {
      addToast("Không thể xóa dự án", "error");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const columns = [
    {
      header: "Thumbnail",
      accessor: (item: AdminProject) => (
        <div className="w-16 h-10 rounded-md overflow-hidden bg-slate-100">
          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ),
      className: "w-20",
    },
    {
      header: "Tên dự án",
      accessor: (item: AdminProject) => (
        <span className="font-medium text-slate-900">{item.title}</span>
      ),
    },
    {
      header: "Khách hàng",
      accessor: "client" as keyof AdminProject,
    },
    {
      header: "Ngành",
      accessor: "industry" as keyof AdminProject,
    },
    {
      header: "Trạng thái",
      accessor: (item: AdminProject) => (
        <AdminBadge variant={item.status} />
      ),
      className: "w-28",
    },
    {
      header: "Ngày tạo",
      accessor: (item: AdminProject) => formatDate(item.createdAt),
      className: "w-28",
    },
  ];

  const statusTabs = [
    { label: "Tất cả", value: "all" },
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quản lý Dự án"
        action={{ label: "Thêm dự án", href: "/admin/projects/create" }}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Tìm kiếm dự án..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleStatusFilter(tab.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                statusFilter === tab.value
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 rounded-lg bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <AdminTable
          columns={columns}
          data={projects}
          keyField="id"
          onEdit={(item) => router.push(`/admin/projects/${item.id}/edit`)}
          onDelete={(item) => setDeleteTarget(item)}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          emptyMessage="Không tìm thấy dự án nào"
        />
      )}

      {/* Delete Dialog */}
      <AdminConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa dự án"
        description={`Bạn có chắc muốn xóa dự án "${deleteTarget?.title}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDelete}
        variant="danger"
      />
    </div>
  );
}
