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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockPatient } from "@/lib/mock-data"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const patient = mockPatient;

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  }

  const getPageTitle = () => {
    if (isActive('/dashboard/patient/profile', true)) return 'Patient Profile';
    if (isActive('/dashboard/patient', true)) return 'Patient Dashboard';
    if (isActive('/dashboard/doctor', true)) return 'Doctor Dashboard';
    if (isActive('/doctors', false)) return 'Find a Doctor';
    if (isActive('/chatbot', true)) return 'AI Chatbot';
    return "Dashboard";
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
              <SidebarMenuButton asChild isActive={isActive('/dashboard/patient', true)}>
                <Link href="/dashboard/patient">
                  <LayoutDashboard />
                  Patient Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('/dashboard/doctor', true)}>
                    <Link href="/dashboard/doctor">
                    <BriefcaseMedical />
                    Doctor Dashboard
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/doctors', false)}>
                <Link href="/doctors">
                  <Stethoscope />
                  Find a Doctor
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive('/chatbot', true)}>
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
              <SidebarMenuButton asChild isActive={isActive('/dashboard/patient/profile', true)}>
                <Link href="/dashboard/patient/profile">
                  <UserCircle />
                  Profile
                </Link>
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
                {getPageTitle()}
              </h1>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={patient.avatarUrl} />
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/patient/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href="/">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
