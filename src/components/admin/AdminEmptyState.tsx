"use client";

import Link from "next/link";
import { Inbox, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface AdminEmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  icon?: LucideIcon;
  className?: string;
}

export default function AdminEmptyState({
  title,
  description,
  action,
  icon: Icon = Inbox,
  className,
}: AdminEmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 mb-4">
        <Icon className="w-7 h-7 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm">{description}</p>
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className={cn(
              "mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
              "bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
            )}
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className={cn(
              "mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
              "bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
            )}
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
