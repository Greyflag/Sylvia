"use client"
import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjectObjectives } from "@/lib/data-service"
import { useProject } from "@/components/project-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  CheckCircle,
  Database,
  Edit,
  FileText,
  Globe,
  Info,
  Layers,
  Plus,
  Target,
  Trash2,
  Users,
  Zap,
  Upload,
  Mic,
} from "lucide-react"

export default function ObjectivesPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const projectId = params.projectId as string
  const { currentProject } = useProject()
  const [activeTab, setActiveTab] = useState("objectives")

  // Check for tab parameter from URL
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "knowledge-base") {
      setActiveTab("knowledge-base")
    }
  }, [searchParams])

  // Get objectives for this project
  const objectives = getProjectObjectives(projectId)

  // Check if this is the completed project
  const isCompleted = currentProject?.status === "completed"

  // Sample client data for the Knowledge Base
  const clientData = {
    companyInfo: {
      name: "TechNova Solutions",
      industry: "Software & Technology",
      founded: "2005",
      headquarters: "San Francisco, CA",
      employees: "1,200+",
      revenue: "$250M annually",
      website: "www.technovasolutions.com",
    },
    products: [
      {
        name: "CloudSync Pro",
        description: "Enterprise cloud storage and synchronization platform",
        launchDate: "2018",
        userBase: "500,000+",
        pricing: "Enterprise pricing, starts at $15/user/month",
      },
      {
        name: "DataGuard",
        description: "Data security and compliance management solution",
        launchDate: "2020",
        userBase: "250,000+",
        pricing: "Enterprise pricing, starts at $20/user/month",
      },
    ],
    marketPosition: {
      competitors: ["CloudSphere", "DataVault", "SecureSync"],
      marketShare: "15% in enterprise cloud storage segment",
      growth: "22% YoY growth in the last fiscal year",
      targetMarkets: ["Financial Services", "Healthcare", "Government", "Education"],
    },
    customerInsights: {
      primaryPersonas: ["IT Managers", "CIOs", "Security Officers", "Department Heads"],
      painPoints: [
        "Complex data migration processes",
        "Security compliance concerns",
        "Integration with legacy systems",
        "User adoption challenges",
      ],
      satisfactionScore: "NPS of 42 (industry average: 31)",
    },
  }

  // Sample documents with kickoff transcript
  const documents = [
    {
      id: "1",
      name: "Project Kickoff Call Transcript",
      type: "Kickoff Transcript",
      date: "Nov 20, 2023",
      size: "2.3 MB",
      description: "Complete transcript from the initial project kickoff call with stakeholders",
      badge: "transcript",
      icon: Mic,
    },
    {
      id: "2",
      name: "Annual Report 2023",
      type: "Company Report",
      date: "Mar 15, 2023",
      size: "5.2 MB",
      description: "Financial performance and highlights",
      badge: "pdf",
      icon: FileText,
    },
    {
      id: "3",
      name: "Product Roadmap",
      type: "Product Specification",
      date: "Jan 5, 2023",
      size: "1.8 MB",
      description: "Upcoming features and development plans",
      badge: "xlsx",
      icon: FileText,
    },
    {
      id: "4",
      name: "Previous Customer Survey",
      type: "Customer Feedback",
      date: "Nov 12, 2022",
      size: "3.1 MB",
      description: "Results from last year's customer feedback",
      badge: "pptx",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Define Objectives</h1>
          <p className="text-muted-foreground mt-1">Set clear research goals for your VOC project</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting with Consultant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule a Consultation</DialogTitle>
                <DialogDescription>
                  Book a meeting with our VOC consultant to help define your research objectives.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="10am">10:00 AM</SelectItem>
                      <SelectItem value="11am">11:00 AM</SelectItem>
                      <SelectItem value="1pm">1:00 PM</SelectItem>
                      <SelectItem value="2pm">2:00 PM</SelectItem>
                      <SelectItem value="3pm">3:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any specific topics you'd like to discuss?" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700">
                  Schedule Meeting
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {!isCompleted && activeTab === "objectives" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-sylvia-600 hover:bg-sylvia-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Objective
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Objective</DialogTitle>
                  <DialogDescription>Define a clear research objective for your VOC project.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Objective Title</Label>
                    <Input id="title" placeholder="e.g., Understand Customer Satisfaction" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe what you want to achieve..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input id="dueDate" type="date" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700">
                    Save Objective
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Tabs defaultValue="objectives" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="objectives" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Research Objectives
          </TabsTrigger>
          <TabsTrigger value="knowledge-base" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Knowledge Base
          </TabsTrigger>
        </TabsList>

        <TabsContent value="objectives" className="space-y-4 mt-4">
          {isCompleted ? (
            <Card className="bg-white/50 border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <h2 className="text-lg font-medium">Objectives Complete</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  All research objectives have been defined and achieved. View the results below.
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Total Objectives:</span>
                    <span className="ml-1 font-medium">{objectives.length}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Completed:</span>
                    <span className="ml-1 font-medium">
                      {objectives.filter((o) => o.status === "completed").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/50 border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <Zap className="h-5 w-5" />
                  <h2 className="text-lg font-medium">Getting Started</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Define clear research objectives to guide your Voice of Customer project. Good objectives are
                  specific, measurable, and aligned with your business goals.
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Current Objectives:</span>
                    <span className="ml-1 font-medium">{objectives.length}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Recommended:</span>
                    <span className="ml-1 font-medium">3-5 objectives</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-sylvia-600" />
                Research Objectives ({objectives.length})
              </CardTitle>
              <CardDescription>Track your research goals and their completion status</CardDescription>
            </CardHeader>
            <CardContent>
              {objectives.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Objective</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      {!isCompleted && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {objectives.map((objective) => (
                      <TableRow key={objective.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{objective.title}</div>
                            <div className="text-sm text-muted-foreground">{objective.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              objective.priority === "high"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : objective.priority === "medium"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                            }
                          >
                            {objective.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(objective.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              objective.status === "completed"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                            }
                          >
                            {objective.status}
                          </Badge>
                        </TableCell>
                        {!isCompleted && (
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No objectives defined yet</h3>
                  <p className="mb-4">Start by defining your research objectives to guide your VOC project.</p>
                  {!isCompleted && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-sylvia-600 hover:bg-sylvia-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Your First Objective
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Add New Objective</DialogTitle>
                          <DialogDescription>Define a clear research objective for your VOC project.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Objective Title</Label>
                            <Input id="title" placeholder="e.g., Understand Customer Satisfaction" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe what you want to achieve..." />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="priority">Priority</Label>
                              <Select defaultValue="medium">
                                <SelectTrigger id="priority">
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="dueDate">Due Date</Label>
                              <Input id="dueDate" type="date" />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700">
                            Save Objective
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge-base" className="space-y-4 mt-4">
          <Card className="bg-white/50 border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Database className="h-5 w-5" />
                  <h2 className="text-lg font-medium">Client Knowledge Base</h2>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-sylvia-600 hover:bg-sylvia-700">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
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
              <p className="text-muted-foreground mb-4">
                Access comprehensive information about your client to inform your VOC strategy. This data is
                automatically gathered from various internal sources.
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Data Sources:</span>
                  <span className="ml-1 font-medium">4 connected</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Last Updated:</span>
                  <span className="ml-1 font-medium">Today, 9:45 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Section with Kickoff Transcript */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-sylvia-600" />
                Project Documents
              </CardTitle>
              <CardDescription>Access to relevant client documents and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <doc.icon className="h-4 w-4 text-sylvia-600" />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-muted-foreground">{doc.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            doc.badge === "transcript"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : doc.badge === "pdf"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : doc.badge === "xlsx"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {doc.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-sylvia-600" />
                  Company Information
                </CardTitle>
                <CardDescription>Basic details about the client organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(clientData.companyInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2 last:border-0">
                      <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className="text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-sylvia-600" />
                  Products & Services
                </CardTitle>
                <CardDescription>Key offerings from the client</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientData.products.map((product, index) => (
                    <div key={index} className={index > 0 ? "pt-3 border-t" : ""}>
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="space-y-2 text-sm">
                        <p>{product.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-muted-foreground">Launch:</span> {product.launchDate}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Users:</span> {product.userBase}
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Pricing:</span> {product.pricing}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-sylvia-600" />
                  Market Position
                </CardTitle>
                <CardDescription>Competitive landscape and market presence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Competitors</h3>
                    <div className="flex flex-wrap gap-2">
                      {clientData.marketPosition.competitors.map((competitor, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          {competitor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <h3 className="text-sm font-medium mb-1">Target Markets</h3>
                    <div className="flex flex-wrap gap-2">
                      {clientData.marketPosition.targetMarkets.map((market, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {market}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <h3 className="text-sm font-medium">Market Share</h3>
                        <p className="text-sm">{clientData.marketPosition.marketShare}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Growth</h3>
                        <p className="text-sm">{clientData.marketPosition.growth}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-sylvia-600" />
                  Customer Insights
                </CardTitle>
                <CardDescription>Key customer data and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Primary Personas</h3>
                    <div className="flex flex-wrap gap-2">
                      {clientData.customerInsights.primaryPersonas.map((persona, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {persona}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <h3 className="text-sm font-medium mb-1">Common Pain Points</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {clientData.customerInsights.painPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t pt-3">
                    <h3 className="text-sm font-medium">Satisfaction Score</h3>
                    <p className="text-sm">{clientData.customerInsights.satisfactionScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
