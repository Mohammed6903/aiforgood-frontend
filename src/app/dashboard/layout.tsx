"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { DashboardSidebar } from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Determine user type from pathname
  const userType = pathname.includes("/donor") ? "donor" : pathname.includes("/patient") ? "patient" : "volunteer"

  // Mock user data - in real app, this would come from authentication
  const userData = {
    donor: { name: "John Smith", email: "john.smith@email.com" },
    patient: { name: "Sarah Johnson", email: "sarah.johnson@email.com" },
    volunteer: { name: "Mike Wilson", email: "mike.wilson@email.com" },
  }

  return (
    <SidebarProvider>
      <DashboardSidebar userType={userType} userName={userData[userType].name} userEmail={userData[userType].email} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1" />
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
