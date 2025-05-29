"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Project = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  progress: number
  status: "active" | "draft" | "completed" | "archived"
}

// Updated projects array with one completed project and one blank project
export const projects: Project[] = [
  {
    id: "enterprise-satisfaction",
    name: "Enterprise Customer Satisfaction",
    description:
      "Comprehensive survey of our enterprise customers to understand satisfaction levels and identify improvement areas",
    createdAt: "2023-10-15T09:00:00Z",
    updatedAt: "2023-11-20T14:30:00Z",
    progress: 100,
    status: "completed",
  },
  {
    id: "new-product-feedback",
    name: "New Product Feedback",
    description: "Gather initial feedback on our upcoming product release",
    createdAt: "2023-11-25T10:00:00Z",
    updatedAt: "2023-11-25T10:00:00Z",
    progress: 0,
    status: "draft",
  },
]

type ProjectContextType = {
  currentProject: Project | null
  setCurrentProject: (project: Project | null) => void
  allProjects: Project[]
  isValidProjectId: (id: string | undefined) => boolean
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null)

  // Function to check if a project ID is valid
  const isValidProjectId = (id: string | undefined): boolean => {
    if (!id || id === "undefined") return false
    return projects.some((project) => project.id === id)
  }

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        setCurrentProject,
        allProjects: projects,
        isValidProjectId,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider")
  }
  return context
}
