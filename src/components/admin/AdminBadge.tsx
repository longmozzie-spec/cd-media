import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        published: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
        draft: "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20",
        open: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
        closed: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
        new: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
        contacted: "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20",
        converted: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20",
        rejected: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
      },
    },
    defaultVariants: {
      variant: "draft",
    },
  }
);

const variantLabels: Record<string, string> = {
  published: "Đã xuất bản",
  draft: "Bản nháp",
  open: "Mở",
  closed: "Đóng",
  new: "Mới",
  contacted: "Đã liên hệ",
  converted: "Chuyển đổi",
  rejected: "Từ chối",
};

interface AdminBadgeProps extends VariantProps<typeof badgeVariants> {
  variant: "published" | "draft" | "open" | "closed" | "new" | "contacted" | "converted" | "rejected";
  label?: string;
  className?: string;
}

export default function AdminBadge({ variant, label, className }: AdminBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {label || variantLabels[variant] || variant}
    </span>
  );
}
