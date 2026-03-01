import { cookies } from "next/headers";
import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { DataStreamProvider } from "@/components/data-stream-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getProjectsByUserId } from "@/lib/db/queries";
import { auth } from "../(auth)/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DataStreamProvider>
      <Suspense fallback={<div className="flex h-dvh" />}>
        <SidebarWrapper>{children}</SidebarWrapper>
      </Suspense>
    </DataStreamProvider>
  );
}

async function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  let activeProjects: Array<{ id: string; title: string }> = [];
  if (session?.user?.id) {
    const projects = await getProjectsByUserId({ userId: session.user.id });
    activeProjects = projects
      .filter((p) => p.status === "active" || p.status === "draft")
      .map((p) => ({ id: p.id, title: p.title }));
  }

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar activeProjects={activeProjects} user={session?.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
