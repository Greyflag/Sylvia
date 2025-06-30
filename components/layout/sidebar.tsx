"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, ClipboardList, FileText, Mail, Target, Users, Zap, CheckCircle } from "lucide-react"
import type { Project } from "@/components/project-context"
import { useProject } from "@/components/project-context"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId: string
  project: Project
}

export function Sidebar({ className, projectId, project }: SidebarProps) {
  const pathname = usePathname()
  const { isHydrated } = useProject()

  // Safety check
  if (!project || !projectId || projectId === "undefined" || !isHydrated) {
    return null
  }

  const routes = [
    {
      label: "Define Objectives",
      icon: Target,
      href: `/projects/${projectId}/objectives`,
      active: pathname === `/projects/${projectId}/objectives`,
      completed: project.progress >= 20,
    },
    {
      label: "Question Set",
      icon: ClipboardList,
      href: `/projects/${projectId}/question-set`,
      active: pathname === `/projects/${projectId}/question-set`,
      completed: project.progress >= 40,
    },
    {
      label: "Contact List",
      icon: Users,
      href: `/projects/${projectId}/contacts`,
      active: pathname === `/projects/${projectId}/contacts`,
      completed: project.progress >= 60,
    },
    {
      label: "Outreach Material",
      icon: FileText,
      href: `/projects/${projectId}/outreach-material`,
      active: pathname === `/projects/${projectId}/outreach-material`,
      completed: project.progress >= 80,
    },
    {
      label: "Outreach Campaign",
      icon: Mail,
      href: `/projects/${projectId}/outreach-campaign`,
      active: pathname.startsWith(`/projects/${projectId}/outreach-campaign`),
      completed: project.progress >= 90,
    },
    {
      label: "Analytics & Reporting",
      icon: BarChart3,
      href: `/projects/${projectId}/analytics`,
      active: pathname === `/projects/${projectId}/analytics`,
      completed: project.progress >= 100,
    },
  ]

  return (
    <div className={cn("w-60 min-h-screen pb-12 border-r bg-white/80 backdrop-blur-sm", className)}>
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

          {/* Modern Timeline Navigation */}
          <div className="space-y-1">
            {routes.map((route, index) => (
              <div key={route.href} className="relative">
                <Link href={route.href}>
                  <div className={cn(
                    "group relative flex items-center p-3 rounded-lg transition-all duration-200 cursor-pointer",
                    route.active 
                      ? "bg-sylvia-100 border border-sylvia-200 shadow-sm" 
                      : "hover:bg-gray-50 border border-transparent",
                    route.completed && !route.active && "bg-green-50 border-green-200"
                  )}>
                    {/* Step Number */}
                    <div className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium mr-3 transition-all duration-200",
                      route.completed 
                        ? "bg-green-500 text-white" 
                        : route.active 
                          ? "bg-sylvia-600 text-white"
                          : "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                    )}>
                      {route.completed ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <route.icon className={cn(
                          "h-4 w-4",
                          route.completed 
                            ? "text-green-600" 
                            : route.active 
                              ? "text-sylvia-600"
                              : "text-gray-500"
                        )} />
                        <span className={cn(
                          "text-sm font-medium truncate",
                          route.completed 
                            ? "text-green-800" 
                            : route.active 
                              ? "text-sylvia-800"
                              : "text-gray-700"
                        )}>
                          {route.label}
                        </span>
                      </div>
                      
                      {/* Status indicator */}
                      <div className="flex items-center gap-1 mt-1">
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          route.completed 
                            ? "bg-green-500" 
                            : route.active 
                              ? "bg-sylvia-500"
                              : "bg-gray-300"
                        )} />
                        <span className={cn(
                          "text-xs",
                          route.completed 
                            ? "text-green-600" 
                            : route.active 
                              ? "text-sylvia-600"
                              : "text-gray-500"
                        )}>
                          {route.completed ? "Completed" : route.active ? "Current" : "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Connecting line (except for last item) */}
                    {index < routes.length - 1 && (
                      <div className={cn(
                        "absolute left-9 top-12 w-0.5 h-8 transition-colors duration-200",
                        route.completed 
                          ? "bg-green-300" 
                          : "bg-gray-200"
                      )} />
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
