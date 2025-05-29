"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useParams } from "next/navigation"
import Link from "next/link"
import { Bell, Menu, Settings, Zap } from "lucide-react"
import { useProject } from "@/components/project-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

export function Header() {
  const pathname = usePathname()
  const params = useParams()
  const { currentProject } = useProject()
  const projectId = params.projectId as string

  // Determine if we're in a project view
  const isProjectView = !!projectId && !!currentProject

  // Define page titles based on pathname
  const getPageTitle = () => {
    if (!isProjectView) {
      return pathname === "/" ? "Projects Dashboard" : "Sylvia VOC Platform"
    }

    // Project specific paths
    if (pathname === `/projects/${projectId}`) return "Project Dashboard"
    if (pathname === `/projects/${projectId}/objectives`) return "Define Objectives"
    if (pathname === `/projects/${projectId}/question-set`) return "Question Set Generation"
    if (pathname === `/projects/${projectId}/contacts`) return "Contact List Management"
    if (pathname === `/projects/${projectId}/outreach-material`) return "Outreach Material"
    if (pathname.startsWith(`/projects/${projectId}/outreach-campaign`)) return "Outreach Campaign"
    if (pathname === `/projects/${projectId}/analytics`) return "Analytics & Reporting"

    return currentProject?.name || "Sylvia VOC Platform"
  }

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center px-6 border-b bg-white/80 backdrop-blur-sm">
      {isProjectView && (
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar className="w-full" />
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div className="flex items-center gap-4 lg:gap-6">
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="bg-sylvia-600 text-white p-1 rounded-md">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Sylvia<span className="text-sylvia-600">VOC</span>
            </span>
          </div>
        </Link>
      </div>

      <div className="hidden md:block ml-4">
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-sylvia-600 transition-colors">
            Projects
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-sylvia-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-sylvia-600 transition-colors">
            Contact
          </Link>
        </nav>

        <Button variant="ghost" size="icon" className="text-gray-500">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="text-gray-500">
          <Settings className="h-5 w-5" />
        </Button>

        <div className="h-8 w-8 rounded-full bg-sylvia-600 flex items-center justify-center text-white font-medium">
          JS
        </div>
      </div>
    </header>
  )
}
