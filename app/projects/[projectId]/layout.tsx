"use client"

import type React from "react"
import { useEffect } from "react"
import { useParams } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { useProject, projects } from "@/components/project-context"
import { notFound, redirect } from "next/navigation"

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const projectId = params.projectId as string
  const { setCurrentProject, currentProject } = useProject()

  // Check if projectId is undefined or invalid
  if (!projectId || projectId === "undefined") {
    redirect("/")
  }

  // Find the project by ID
  const project = projects.find((p) => p.id === projectId)

  useEffect(() => {
    if (project) {
      setCurrentProject(project)
    }
  }, [project, setCurrentProject])

  // If project not found, show 404
  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-1">
      <Sidebar className="hidden md:block w-64" projectId={projectId} project={project} />
      <div className="flex-1 p-6 bg-background">{children}</div>
    </div>
  )
}
