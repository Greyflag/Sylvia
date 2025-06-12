"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, MoreVertical, Trash2 } from "lucide-react"
import { useProject } from "@/components/project-context"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ArchivedProjectsPage() {
  const { getArchivedProjects, deleteProject } = useProject()
  const [archivedProjects, setArchivedProjects] = useState<ReturnType<typeof getArchivedProjects>>([])
  const [isClient, setIsClient] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
    setArchivedProjects(getArchivedProjects())
  }, [getArchivedProjects])

  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(projectId)
  }

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete)
      setProjectToDelete(null)
      // Refresh the archived projects list
      setArchivedProjects(getArchivedProjects())
    }
  }

  const projectToDeleteData = projectToDelete
    ? archivedProjects.find((p) => p.id === projectToDelete)
    : null

  if (!isClient) {
    return null // or a loading state
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {projectToDeleteData?.name}? This action cannot be undone and all project data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Archived Projects</h1>
          <p className="text-muted-foreground mt-1">View and manage your archived projects</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      {archivedProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No archived projects found</p>
            <Button asChild>
              <Link href="/">View Active Projects</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {archivedProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex justify-between items-start pb-2">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Project menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${project.id}`}>View Project</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      project.status === "active"
                        ? "bg-green-100 text-green-800"
                        : project.status === "draft"
                          ? "bg-gray-100 text-gray-800"
                          : project.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 