"use client";

import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/hooks/useToast";

export default function AdminToastProvider() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const Icon =
          toast.type === "success"
            ? CheckCircle
            : toast.type === "error"
              ? AlertCircle
              : Info;

        return (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in slide-in-from-right duration-200",
              toast.type === "success" && "bg-green-50 border-green-200 text-green-800",
              toast.type === "error" && "bg-red-50 border-red-200 text-red-800",
              toast.type === "info" && "bg-blue-50 border-blue-200 text-blue-800"
            )}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-0.5 rounded hover:bg-black/5 transition-colors"
              aria-label="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
