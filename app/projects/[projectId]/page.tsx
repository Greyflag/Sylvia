"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  ChevronRight,
  CheckCircle,
  Clock,
  Target,
  Users,
  FileText,
  Mail,
  BarChart3,
  Zap,
  Database,
  Upload,
} from "lucide-react"
import { useProject } from "@/components/project-context"
import {
  getProjectAnalytics,
  getProjectContacts,
  getProjectQuestionSet,
  getProjectObjectives,
} from "@/lib/data-service"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProjectDashboard() {
  const params = useParams()
  const projectId = params.projectId as string
  const { currentProject, setCurrentProject } = useProject()
  const [isLoading, setIsLoading] = useState(true)
  const [projectData, setProjectData] = useState({
    analytics: null,
    contacts: [],
    questions: [],
    objectives: []
  })

  useEffect(() => {
    // Fetch project data
    const analytics = getProjectAnalytics(projectId)
    const contacts = getProjectContacts(projectId)
    const questions = getProjectQuestionSet(projectId)
    const objectives = getProjectObjectives(projectId)

    setProjectData({
      analytics,
      contacts,
      questions,
      objectives
    })
    setIsLoading(false)
  }, [projectId])

  // Check if this is the completed project
  const isCompleted = currentProject?.status === "completed"

  if (!currentProject || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sylvia-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    )
  }

  const { analytics, contacts, questions, objectives } = projectData

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{currentProject.name}</h1>
          <p className="text-muted-foreground mt-1">{currentProject.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={
              currentProject.status === "completed"
                ? "bg-green-100 text-green-800"
                : currentProject.status === "active"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
            }
          >
            {currentProject.status.charAt(0).toUpperCase() + currentProject.status.slice(1)}
          </Badge>
          <div className="text-sm text-muted-foreground">Progress: {currentProject.progress}%</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-sylvia-50 to-sylvia-100 border-sylvia-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5 text-sylvia-600" />
              Knowledge Base
            </CardTitle>
            <CardDescription>Access client data and upload documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link href={`/projects/${projectId}/objectives?tab=knowledge-base`}>View Knowledge Base</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-sylvia-600 hover:bg-sylvia-700">
                    <Upload className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                      Add documents to your project's knowledge base for better context and insights.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="document-type">Document Type</Label>
                      <Select>
                        <SelectTrigger id="document-type">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kickoff-transcript">Kickoff Call Transcript</SelectItem>
                          <SelectItem value="company-report">Company Report</SelectItem>
                          <SelectItem value="product-spec">Product Specification</SelectItem>
                          <SelectItem value="customer-feedback">Customer Feedback</SelectItem>
                          <SelectItem value="market-research">Market Research</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document-title">Document Title</Label>
                      <Input id="document-title" placeholder="Enter document title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="document-description">Description (Optional)</Label>
                      <Textarea id="document-description" placeholder="Brief description of the document" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file-upload">Upload File</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                        <Input id="file-upload" type="file" className="hidden" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700">
                      Upload Document
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-blue-600" />
              AI Assistant
            </CardTitle>
            <CardDescription>Get AI-powered insights and suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate Questions</Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Quick Stats
            </CardTitle>
            <CardDescription>Project overview at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Objectives:</span>
                <span className="ml-1 font-medium">{objectives.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Questions:</span>
                <span className="ml-1 font-medium">{questions.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Contacts:</span>
                <span className="ml-1 font-medium">{contacts.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Responses:</span>
                <span className="ml-1 font-medium">{analytics.totalResponses}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isCompleted ? (
        <Card className="bg-white/50 border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <CheckCircle className="h-5 w-5" />
              <h2 className="text-lg font-medium">Project Complete</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              This Voice of Customer project has been completed successfully. All survey responses have been collected
              and analyzed.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Total Responses:</span>
                <span className="ml-1 font-medium">{analytics.totalResponses}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Response Rate:</span>
                <span className="ml-1 font-medium">{analytics.responseRate}%</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">NPS Score:</span>
                <span className="ml-1 font-medium">{analytics.npsScore}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Avg Satisfaction:</span>
                <span className="ml-1 font-medium">{analytics.averageSatisfaction}/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/50 border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Clock className="h-5 w-5" />
              <h2 className="text-lg font-medium">Project Setup</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              This project is in draft status. Complete the setup steps below to launch your Voice of Customer survey.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Objectives:</span>
                <span className="ml-1 font-medium">{objectives.length}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Questions:</span>
                <span className="ml-1 font-medium">{questions.length}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Contacts:</span>
                <span className="ml-1 font-medium">{contacts.length}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Progress:</span>
                <span className="ml-1 font-medium">{currentProject.progress}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-sylvia-600" />
              Define Objectives
            </CardTitle>
            <CardDescription>Set clear research goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Objectives</span>
              <span className="font-medium">{objectives.length}</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/projects/${projectId}/objectives`}>
                {isCompleted ? "View Objectives" : "Define Objectives"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-sylvia-600" />
              Question Set
            </CardTitle>
            <CardDescription>Design survey questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Questions</span>
              <span className="font-medium">{questions.length}</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/projects/${projectId}/question-set`}>
                {isCompleted ? "View Questions" : "Create Questions"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-sylvia-600" />
              Contact List
            </CardTitle>
            <CardDescription>Manage survey recipients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Contacts</span>
              <span className="font-medium">{contacts.length}</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/projects/${projectId}/contacts`}>
                {isCompleted ? "View Contacts" : "Add Contacts"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5 text-sylvia-600" />
              Outreach Material
            </CardTitle>
            <CardDescription>Create email templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Templates</span>
              <span className="font-medium">{isCompleted ? "2" : "0"}</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/projects/${projectId}/outreach-material`}>
                {isCompleted ? "View Templates" : "Create Templates"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-sylvia-600" />
              Outreach Campaign
            </CardTitle>
            <CardDescription>Launch and monitor campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Responses</span>
              <span className="font-medium">{analytics.totalResponses}</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/projects/${projectId}/outreach-campaign`}>
                {isCompleted ? "View Campaign" : "Launch Campaign"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-sylvia-600" />
              Analytics & Reporting
            </CardTitle>
            <CardDescription>View insights and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Insights</span>
              <span className="font-medium">{isCompleted ? "Available" : "Pending"}</span>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/projects/${projectId}/analytics`}>
                {isCompleted ? "View Analytics" : "Setup Analytics"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {!isCompleted && (
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Follow these steps to set up your Voice of Customer project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Project Setup Progress</span>
                <span className="text-sm text-muted-foreground">{currentProject.progress}%</span>
              </div>
              <Progress value={currentProject.progress} className="h-2" />

              <div className="grid gap-4 mt-6">
                <div className="flex items-start gap-3 p-3 rounded-lg border bg-white/50">
                  <div className="bg-sylvia-100 text-sylvia-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Define Your Objectives</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start by clearly defining what you want to learn from your customers
                    </p>
                    <Button asChild size="sm" className="mt-2 bg-sylvia-600 hover:bg-sylvia-700">
                      <Link href={`/projects/${projectId}/objectives`}>
                        Get Started
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                  <div className="bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-medium">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-600">Create Survey Questions</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Design questions that will help you achieve your objectives
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                  <div className="bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-medium">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-600">Add Your Contacts</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Import or manually add the customers you want to survey
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                  <div className="bg-gray-200 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-medium">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-600">Launch Your Campaign</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Send your survey and start collecting valuable feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isCompleted && (
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Overview of completed project milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{currentProject.progress}%</span>
              </div>
              <Progress value={currentProject.progress} className="h-2" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Objectives Defined</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Questions Created</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Contacts Added</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Templates Created</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Campaign Launched</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Data Collected</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
