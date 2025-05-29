"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, ClipboardList, FileText, Home, Mail, Target, Users, Zap } from "lucide-react"
import type { Project } from "@/components/project-context"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId: string
  project: Project
}

export function Sidebar({ className, projectId, project }: SidebarProps) {
  const pathname = usePathname()

  // Safety check
  if (!project || !projectId || projectId === "undefined") {
    return null
  }

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: `/projects/${projectId}`,
      active: pathname === `/projects/${projectId}`,
    },
    {
      label: "Define Objectives",
      icon: Target,
      href: `/projects/${projectId}/objectives`,
      active: pathname === `/projects/${projectId}/objectives`,
    },
    {
      label: "Question Set",
      icon: ClipboardList,
      href: `/projects/${projectId}/question-set`,
      active: pathname === `/projects/${projectId}/question-set`,
    },
    {
      label: "Contact List",
      icon: Users,
      href: `/projects/${projectId}/contacts`,
      active: pathname === `/projects/${projectId}/contacts`,
    },
    {
      label: "Outreach Material",
      icon: FileText,
      href: `/projects/${projectId}/outreach-material`,
      active: pathname === `/projects/${projectId}/outreach-material`,
    },
    {
      label: "Outreach Campaign",
      icon: Mail,
      href: `/projects/${projectId}/outreach-campaign`,
      active: pathname.startsWith(`/projects/${projectId}/outreach-campaign`),
    },
    {
      label: "Analytics & Reporting",
      icon: BarChart3,
      href: `/projects/${projectId}/analytics`,
      active: pathname === `/projects/${projectId}/analytics`,
    },
  ]

  return (
    <div className={cn("pb-12 border-r bg-white/80 backdrop-blur-sm", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link href="/" className="flex items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-sylvia-600 text-white p-1.5 rounded-md">
                <Zap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Sylvia<span className="text-sylvia-600">VOC</span>
              </span>
            </div>
          </Link>

          <div className="mb-6 px-3 py-2 bg-sylvia-50 rounded-md border border-sylvia-100">
            <h3 className="font-medium text-sylvia-800 truncate">{project.name}</h3>
            <div className="text-xs text-sylvia-600 mt-1">Progress: {project.progress}%</div>
          </div>

          <div className="space-y-1">
            {routes.map((route) => (
              <Link href={route.href} key={route.href}>
                <Button
                  variant={route.active ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-start",
                    route.active && "bg-sylvia-50 text-sylvia-700 hover:bg-sylvia-100 hover:text-sylvia-800",
                  )}
                >
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
