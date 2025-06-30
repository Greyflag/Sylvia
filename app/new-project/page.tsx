"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useProject } from "@/components/project-context"
import { v4 as uuidv4 } from "uuid"

// Add date formatting utility
const formatDate = (date: Date) => {
  return date.toISOString()
}

export default function NewProjectPage() {
  const router = useRouter()
  const { addProject, setCurrentProject } = useProject()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create a new project with a unique ID
      const now = new Date()
      const newProject = {
        id: uuidv4(),
        name,
        description,
        createdAt: formatDate(now),
        updatedAt: formatDate(now),
        progress: 0,
        status: "draft" as const,
      }

      // Add the new project using the context function
      addProject(newProject)
      setCurrentProject(newProject)

      // Redirect to the objectives page to start the project
      router.push(`/projects/${newProject.id}/objectives`)
    } catch (error) {
      console.error('Error creating project:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>Set up a new Voice of Customer research project</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="e.g., Customer Satisfaction Survey"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose and goals of this project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-sylvia-600 hover:bg-sylvia-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Project...' : 'Create Project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 