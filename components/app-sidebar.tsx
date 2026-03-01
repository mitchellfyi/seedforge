"use client";

import { FolderOpen, LayoutDashboard, Plus, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "next-auth";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/garden", label: "Garden", icon: Sprout },
];

export function AppSidebar({
  user,
  activeProjects,
}: {
  user: User | undefined;
  activeProjects?: Array<{ id: string; title: string }>;
}) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  // Hide sidebar on /start (full-screen start page)
  if (pathname === "/start") {
    return null;
  }

  return (
    <Sidebar className="group-data-[side=left]:border-r-0">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="Seedforge">
              <Link href="/" onClick={() => setOpenMobile(false)}>
                <Image
                  alt="Seedforge"
                  className="shrink-0"
                  height={32}
                  src="/brand/seedforge.png"
                  width={32}
                />
                <span className="font-semibold text-lg">Seedforge</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Nav group */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* New Project CTA */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="bg-primary/10 hover:bg-primary/20 text-primary"
                  tooltip="New Project"
                >
                  <Link href="/start" onClick={() => setOpenMobile(false)}>
                    <Plus />
                    <span className="font-medium">New Project</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Active projects */}
        {activeProjects && activeProjects.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Active Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {activeProjects.map((project) => (
                    <SidebarMenuItem key={project.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/project/${project.id}`}
                        tooltip={project.title}
                      >
                        <Link
                          href={`/project/${project.id}`}
                          onClick={() => setOpenMobile(false)}
                        >
                          <FolderOpen />
                          <span className="truncate">{project.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>{user && <SidebarUserNav user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
