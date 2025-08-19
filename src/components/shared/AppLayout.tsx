"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  Stethoscope,
  Bot,
  UserCircle,
  LogOut,
  BriefcaseMedical
} from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { AppLogo } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/doctors' && pathname.startsWith('/doctors')) {
      return true;
    }
    return pathname === path;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <AppLogo className="w-8 h-8 text-primary" />
              <span className="text-lg font-semibold">HealthAssist AI</span>
            </div>
          </SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/dashboard/patient')}>
                <Link href="/dashboard/patient">
                  <LayoutDashboard />
                  Patient Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/doctor')}>
                    <Link href="/dashboard/doctor">
                    <BriefcaseMedical />
                    Doctor Dashboard
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/doctors')}>
                <Link href="/doctors">
                  <Stethoscope />
                  Find a Doctor
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/chatbot')}>
                <Link href="/chatbot">
                  <Bot />
                  AI Chatbot
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UserCircle />
                Profile
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <LogOut />
                  Logout
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
            <SidebarTrigger className="md:hidden"/>
            <div className="flex-1">
              <h1 className="text-lg font-semibold capitalize">
                {pathname.split('/').pop()?.replace('-', ' ')}
              </h1>
            </div>
            <div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
