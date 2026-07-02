"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen, Newspaper, Briefcase, Mail, Users, Plus, Home } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import AdminBadge from "@/components/admin/AdminBadge";
import { projectsService } from "@/services/projects.service";
import { newsService } from "@/services/news.service";
import { contactsService } from "@/services/contacts.service";
import { careersService } from "@/services/careers.service";
import { servicesService } from "@/services/services.service";
import { ContactSubmission } from "@/types/contact";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    news: 0,
    services: 0,
    contacts: 0,
    careers: 0,
  });
  const [latestContacts, setLatestContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [projectsCount, newsCount, servicesCount, contactsCount, careersCount, contactsResult] =
          await Promise.all([
            projectsService.count(),
            newsService.count(),
            servicesService.count(),
            contactsService.count(),
            careersService.count(),
            contactsService.getAll({ page: 1, pageSize: 5, sortBy: "createdAt", sortOrder: "desc" }),
          ]);

        setStats({
          projects: projectsCount,
          news: newsCount,
          services: servicesCount,
          contacts: contactsCount,
          careers: careersCount,
        });
        setLatestContacts(contactsResult.data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminPageHeader
          title="Dashboard"
          subtitle="Tổng quan hệ thống quản trị CD Media"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
        <div className="h-64 rounded-xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  const statsCards = [
    { title: "Tổng dự án", value: stats.projects, icon: FolderOpen },
    { title: "Tin tức", value: stats.news, icon: Newspaper },
    { title: "Dịch vụ", value: stats.services, icon: Briefcase },
    { title: "Liên hệ", value: stats.contacts, icon: Mail },
    { title: "Tuyển dụng", value: stats.careers, icon: Users },
  ];

  const quickActions = [
    { label: "Thêm dự án", href: "/admin/projects/create", icon: Plus },
    { label: "Thêm tin tức", href: "/admin/news/create", icon: Plus },
    { label: "Thêm tuyển dụng", href: "/admin/careers/create", icon: Plus },
    { label: "Quản lý trang chủ", href: "/admin/home", icon: Home },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        subtitle="Tổng quan hệ thống quản trị CD Media"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statsCards.map((card) => (
          <AdminStatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Contacts */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Liên hệ mới nhất</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500">Tên</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500">SĐT</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500">Nhu cầu</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500">Ngày</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {latestContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-slate-900">{contact.name}</td>
                    <td className="px-4 py-2.5 text-slate-600">{contact.phone}</td>
                    <td className="px-4 py-2.5 text-slate-600">{contact.need}</td>
                    <td className="px-4 py-2.5 text-slate-500">{formatDate(contact.createdAt)}</td>
                    <td className="px-4 py-2.5">
                      <AdminBadge variant={contact.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Quick actions</h2>
          </div>
          <div className="p-4 space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
