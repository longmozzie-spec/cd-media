"use client";

import { Pencil, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import AdminEmptyState from "./AdminEmptyState";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  keyField?: keyof T;
  emptyMessage?: string;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AdminTable<T = any>({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  keyField,
  emptyMessage = "Không có dữ liệu",
  page = 1,
  totalPages = 1,
  onPageChange,
}: AdminTableProps<T>) {
  const hasActions = onEdit || onDelete || onView;

  if (data.length === 0) {
    return (
      <AdminEmptyState
        title={emptyMessage}
        description="Chưa có mục nào trong danh sách này."
      />
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Thao tác
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, rowIdx) => {
              const key = keyField ? String(item[keyField]) : rowIdx;
              return (
                <tr
                  key={key}
                  className={cn(
                    "transition-colors hover:bg-slate-50",
                    rowIdx % 2 === 1 && "bg-slate-25"
                  )}
                >
                  {columns.map((col, colIdx) => {
                    const content =
                      typeof col.accessor === "function"
                        ? col.accessor(item)
                        : (item[col.accessor] as React.ReactNode);
                    return (
                      <td key={colIdx} className={cn("px-4 py-3 text-slate-700", col.className)}>
                        {content}
                      </td>
                    );
                  })}
                  {hasActions && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onView && (
                          <button
                            onClick={() => onView(item)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            aria-label="Xem"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            aria-label="Sửa"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            aria-label="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between mt-4 px-1">
          <p className="text-sm text-slate-500">
            Trang {page} / {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Trang sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
