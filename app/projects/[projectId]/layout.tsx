"use client"

import { useParams } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { useProject } from "@/components/project-context"
import { useEffect, useState } from "react"

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { projectId } = useParams()
  const { allProjects, setCurrentProject } = useProject()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (allProjects.length > 0) {
      const project = allProjects.find((p) => p.id === projectId)
      if (project) {
        setCurrentProject(project)
      }
      setIsLoading(false)
    }
  }, [allProjects, projectId, setCurrentProject])

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
