"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Box,
  Database,
  Wrench,
  Cloud,
  BarChart3,
  Settings,
  Users,
  CreditCard,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: { title: string; href: string }[]
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Models",
      href: "/dashboard/model-catalog",
      icon: <Box className="h-5 w-5" />,
    },
    {
      title: "Data",
      href: "/dashboard/data-integration",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Fine-tuning",
      href: "/dashboard/fine-tuning",
      icon: <Wrench className="h-5 w-5" />,
    },
    {
      title: "Deployments",
      href: "/dashboard/deployment",
      icon: <Cloud className="h-5 w-5" />,
    },
    {
      title: "Monitoring",
      href: "/dashboard/monitoring",
      icon: <BarChart3 className="h-5 w-5" />,
      submenu: [
        { title: "Overview", href: "/dashboard/monitoring" },
        { title: "Enhanced", href: "/dashboard/monitoring/enhanced" },
      ],
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">ArtIntel Dashboard</h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <div key={item.title}>
                {item.submenu ? (
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "w-full flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(item.href) && "bg-accent text-accent-foreground",
                    )}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </div>
                    {openSubmenu === item.title ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href && "bg-accent text-accent-foreground",
                    )}
                  >
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                  </Link>
                )}
                {item.submenu && openSubmenu === item.title && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.title}
                        href={subitem.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                          pathname === subitem.href && "bg-accent text-accent-foreground",
                        )}
                      >
                        <span>{subitem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

