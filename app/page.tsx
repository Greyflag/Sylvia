"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight, FolderPlus, Layers, MoreVertical, Zap } from "lucide-react"
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

export default function ProjectsDashboard() {
  const { allProjects } = useProject()

  // Calculate summary statistics
  const completedProjects = allProjects.filter((p) => p.status === "completed").length
  const draftProjects = allProjects.filter((p) => p.status === "draft").length
  const totalProjects = allProjects.length

  // Calculate average completion across all projects
  const averageCompletion =
    allProjects.length > 0
      ? Math.round(allProjects.reduce((sum, project) => sum + project.progress, 0) / allProjects.length)
      : 0

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your Voice of Customer research projects</p>
        </div>
        <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
          <Link href="/new-project">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
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
            <Zap className="w-4 h-4 text-sylvia-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageCompletion}%</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-8">Your Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project) => (
          <Card key={project.id} className="glass-card hover:shadow-md transition-shadow">
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
                  <DropdownMenuItem>Duplicate Project</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Archive Project</DropdownMenuItem>
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
              <p className="text-sm mb-3">{project.description}</p>
              <div className="space-y-1">
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
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={project.id ? `/projects/${project.id}` : "/"}>
                  {project.status === "draft" ? "Start Project" : "View Project"}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
