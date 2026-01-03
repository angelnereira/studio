"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Briefcase,
  FileText,
  Home,
  LayoutDashboard,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import * as React from "react";
import { useLanguage } from "@/lib/language-context";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const menuItems = React.useMemo(() => [
    { href: "/admin", label: t('admin.dashboard'), icon: <LayoutDashboard /> },
    { href: "/admin/job-analysis", label: t('admin.job_analysis'), icon: <Briefcase /> },
    { href: "/admin/cover-letter", label: t('admin.cover_letters'), icon: <FileText /> },
  ], [t]);

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-theme(spacing.14))]">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <BarChart className="size-6 text-primary" />
              <h2 className="text-lg font-semibold">{t('admin.title')}</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton
                      className="w-full"
                      isActive={pathname === item.href}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Link href="/" className="w-full">
                  <SidebarMenuButton className="w-full">
                    <Home />
                    <span>{t('admin.back_to_site')}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="p-4 md:p-6 lg:p-8">
            <SidebarTrigger className="md:hidden mb-4" />
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
