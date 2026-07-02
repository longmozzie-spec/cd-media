import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export default function AdminStatsCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: AdminStatsCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 shadow-sm p-5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="mt-0.5 text-sm text-slate-500">{title}</p>
      </div>
    </div>
  );
}
