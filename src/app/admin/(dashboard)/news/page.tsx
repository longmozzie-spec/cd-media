"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { newsService } from "@/services/news.service";
import { AdminNews } from "@/types/news";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminBadge from "@/components/admin/AdminBadge";
import AdminConfirmDialog from "@/components/admin/AdminConfirmDialog";
import { useToast } from "@/hooks/useToast";

const categories = ["Tất cả", "Marketing", "Truyền thông", "Khám phá", "Travel", "Sự kiện", "Why"];
const statuses = ["Tất cả", "published", "draft"];

export default function AdminNewsPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [data, setData] = useState<AdminNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [status, setStatus] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteTarget, setDeleteTarget] = useState<AdminNews | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await newsService.getAll({
        page,
        pageSize: 10,
        search: search || undefined,
        searchFields: ["title"],
        filters: {
          ...(category !== "Tất cả" && { category }),
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
  }, [page, search, category, status]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await newsService.delete(deleteTarget.id);
    addToast("Đã xóa bài viết thành công", "success");
    setDeleteTarget(null);
    fetchData();
  };

  const columns = [
    {
      header: "Ảnh",
      accessor: (item: AdminNews) => (
        <img
          src={item.thumbnail || "/placeholder.jpg"}
          alt={item.title}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
      className: "w-16",
    },
    {
      header: "Tiêu đề",
      accessor: (item: AdminNews) => (
        <span className="font-medium text-slate-900 line-clamp-1">{item.title}</span>
      ),
    },
    {
      header: "Danh mục",
      accessor: "category" as keyof AdminNews,
    },
    {
      header: "Tác giả",
      accessor: "author" as keyof AdminNews,
    },
    {
      header: "Trạng thái",
      accessor: (item: AdminNews) => <AdminBadge variant={item.status} />,
      className: "w-28",
    },
    {
      header: "Ngày đăng",
      accessor: (item: AdminNews) => (
        <span className="text-slate-500 text-xs">
          {item.date ? new Date(item.date).toLocaleDateString("vi-VN") : "—"}
        </span>
      ),
      className: "w-28",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Quản lý Tin tức"
        action={{ label: "Viết bài mới", href: "/admin/news/create" }}
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === "Tất cả" ? "Tất cả" : s === "published" ? "Published" : "Draft"}
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
          onEdit={(item) => router.push(`/admin/news/${item.id}/edit`)}
          onDelete={(item) => setDeleteTarget(item)}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          emptyMessage="Chưa có bài viết nào"
        />
      )}

      <AdminConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa bài viết"
        description={`Bạn có chắc muốn xóa bài viết "${deleteTarget?.title}"? Thao tác này không thể hoàn tác.`}
        onConfirm={handleDelete}
        variant="danger"
      />
    </div>
  );
}
