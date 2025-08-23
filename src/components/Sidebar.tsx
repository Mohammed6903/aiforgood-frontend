"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Users,
  UserPlus,
  Home,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Activity,
  MapPin,
  Award,
  FileText,
  Truck,
  Phone,
  BarChart3,
} from "lucide-react"

interface DashboardSidebarProps {
  userType: "donor" | "patient" | "volunteer"
  userName: string
  userEmail: string
}

const sidebarConfig = {
  donor: {
    icon: Heart,
    title: "Donor Dashboard",
    color: "text-red-600",
    bgColor: "bg-red-100",
    menuItems: [
      { icon: Home, label: "Overview", href: "/dashboard/donor" },
      { icon: Calendar, label: "Donation History", href: "/dashboard/donor/history" },
      { icon: Bell, label: "Notifications", href: "/dashboard/donor/notifications" },
      { icon: Award, label: "Achievements", href: "/dashboard/donor/achievements" },
      { icon: MapPin, label: "Nearby Requests", href: "/dashboard/donor/requests" },
      { icon: Settings, label: "Settings", href: "/dashboard/donor/settings" },
    ],
  },
  patient: {
    icon: Users,
    title: "Patient Dashboard",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    menuItems: [
      { icon: Home, label: "Overview", href: "/dashboard/patient" },
      { icon: Activity, label: "Blood Requests", href: "/dashboard/patient/requests" },
      { icon: Bell, label: "Notifications", href: "/dashboard/patient/notifications" },
      { icon: FileText, label: "Medical History", href: "/dashboard/patient/history" },
      { icon: MapPin, label: "Find Donors", href: "/dashboard/patient/donors" },
      { icon: Settings, label: "Settings", href: "/dashboard/patient/settings" },
    ],
  },
  volunteer: {
    icon: UserPlus,
    title: "Volunteer Dashboard",
    color: "text-green-600",
    bgColor: "bg-green-100",
    menuItems: [
      { icon: Home, label: "Overview", href: "/dashboard/volunteer" },
      { icon: Truck, label: "Logistics", href: "/dashboard/volunteer/logistics" },
      { icon: Phone, label: "Coordination", href: "/dashboard/volunteer/coordination" },
      { icon: BarChart3, label: "Reports", href: "/dashboard/volunteer/reports" },
      { icon: Bell, label: "Notifications", href: "/dashboard/volunteer/notifications" },
      { icon: Settings, label: "Settings", href: "/dashboard/volunteer/settings" },
    ],
  },
}

export function DashboardSidebar({ userType, userName, userEmail }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const config = sidebarConfig[userType]
  const IconComponent = config.icon

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${config.bgColor}`}>
            <IconComponent className={`h-5 w-5 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sidebar-foreground truncate">{config.title}</h2>
            <p className="text-xs text-sidebar-foreground/70 truncate">BloodConnect Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-2 space-y-2">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className={`${config.bgColor} ${config.color} text-xs font-medium`}>
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">{userEmail}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
