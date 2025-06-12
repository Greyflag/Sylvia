"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight, FolderPlus, Layers, MoreVertical, Zap, Archive } from "lucide-react"
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
import { useRouter } from "next/navigation"
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
import { useState } from "react"

// Add date formatting utility
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default function ProjectsDashboard() {
  const { allProjects, archiveProject, duplicateProject } = useProject()
  const router = useRouter()
  const [projectToArchive, setProjectToArchive] = useState<string | null>(null)

  // Calculate summary statistics
  const completedProjects = allProjects.filter((p) => p.status === "completed").length
  const draftProjects = allProjects.filter((p) => p.status === "draft").length
  const totalProjects = allProjects.filter((p) => p.status !== "archived").length

  // Calculate average completion across all non-archived projects
  const averageCompletion =
    allProjects.filter((p) => p.status !== "archived").length > 0
      ? Math.round(
          allProjects
            .filter((p) => p.status !== "archived")
            .reduce((sum, project) => sum + project.progress, 0) /
            allProjects.filter((p) => p.status !== "archived").length
        )
      : 0

  const handleArchiveProject = (projectId: string) => {
    setProjectToArchive(projectId)
  }

  const confirmArchive = () => {
    if (projectToArchive) {
      archiveProject(projectToArchive)
      setProjectToArchive(null)
    }
  }

  const handleDuplicateProject = (projectId: string) => {
    duplicateProject(projectId)
  }

  const projectToArchiveData = projectToArchive
    ? allProjects.find((p) => p.id === projectToArchive)
    : null

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AlertDialog open={!!projectToArchive} onOpenChange={() => setProjectToArchive(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive {projectToArchiveData?.name}? This project will be moved to the archived projects section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmArchive} className="bg-red-600 hover:bg-red-700">
              Archive Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your Voice of Customer research projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/archived">
              <Archive className="mr-2 h-4 w-4" />
              View Archived Projects
            </Link>
          </Button>
          <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
            <Link href="/new-project">
              <FolderPlus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Project Summary Cards */}
        <Card className="bg-white glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Layers className="w-4 h-4 text-sylvia-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {completedProjects} completed, {draftProjects} draft
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Zap className="w-4 h-4 text-sylvia-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">Completed survey campaigns</p>
          </CardContent>
        </Card>

        <Card className="bg-white glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
            <ChevronRight className="w-4 h-4 text-sylvia-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCompletion}%</div>
            <p className="text-xs text-muted-foreground">Across all active projects</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allProjects
            .filter((project) => project.status !== "archived")
            .map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow flex flex-col">
                <CardHeader className="flex justify-between items-start pb-2">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last updated: {formatDate(project.updatedAt)}
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
                      <DropdownMenuItem onClick={() => handleDuplicateProject(project.id)}>
                        Duplicate Project
                      </DropdownMenuItem>
                      <DropdownMenuItem>Export Data</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleArchiveProject(project.id)}
                      >
                        Archive Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="pb-3 flex-grow">
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
                      Created: {formatDate(project.createdAt)}
                    </div>
                  </div>
                  <p className="text-sm mb-3 line-clamp-2 h-10">{project.description}</p>
                  <div className="space-y-1 mt-auto">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress
                      value={project.progress}
                      className="h-2"
                      indicatorClassName={`${
                        project.status === "active"
                          ? "bg-sylvia-600"
                          : project.status === "draft"
                            ? "bg-gray-400"
                            : project.status === "completed"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                      }`}
                    />
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {project.progress === 0 ? (
                    <Button 
                      className="w-full bg-sylvia-600 hover:bg-sylvia-700"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      Start Project
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      View Project
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
