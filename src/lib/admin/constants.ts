import {
  LayoutDashboard,
  Home,
  Info,
  Briefcase,
  FolderOpen,
  Newspaper,
  Users,
  Mail,
  Image,
  Search,
  Settings,
} from "lucide-react";

export const SIDEBAR_NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Trang chủ", href: "/admin/home", icon: Home },
  { label: "Về CD Media", href: "/admin/about", icon: Info },
  { label: "Dịch vụ", href: "/admin/services", icon: Briefcase },
  { label: "Dự án", href: "/admin/projects", icon: FolderOpen },
  { label: "Tin tức", href: "/admin/news", icon: Newspaper },
  { label: "Tuyển dụng", href: "/admin/careers", icon: Users },
  { label: "Form liên hệ", href: "/admin/contacts", icon: Mail },
  { label: "Media Library", href: "/admin/media", icon: Image },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Cài đặt", href: "/admin/settings", icon: Settings },
];
