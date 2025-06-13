"use client"

import { ProgressTracker } from "@/components/progress-tracker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  AlertCircle,
  BarChart3,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  Users,
  Zap,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { useParams } from "next/navigation"
import { useProject } from "@/components/project-context"
import { getProjectResponses } from "@/lib/data-service"
import { useState, useEffect } from "react"

export default function OutreachCampaignPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { currentProject } = useProject()
  const [responders, setResponders] = useState<any[]>([])

  useEffect(() => {
    // Load responses for the current project
    if (projectId) {
      const projectResponses = getProjectResponses(projectId)
      setResponders(projectResponses)
    }
  }, [projectId])

  // If current project isn't loaded yet, show a loading state
  if (!currentProject) {
    return <div>Loading project...</div>
  }

  // Add after the loading check
  const isCampaignLaunched = projectId === "enterprise-satisfaction"
  const campaignStatus = isCampaignLaunched ? "active" : "draft"

  // Calculate campaign stats
  const completedResponses = responders.filter((r) => r.status === "completed").length
  const inProgressResponses = responders.filter((r) => r.status === "in-progress").length
  const sentResponses = responders.filter((r) => r.status === "sent").length
  const responseRate = responders.length > 0 ? Math.round((completedResponses / responders.length) * 100) : 0
  const openRate =
    responders.length > 0 ? Math.round(((completedResponses + inProgressResponses) / responders.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/projects/${projectId}`}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-4">
              <div className="bg-sylvia-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              Outreach Campaign
            </h1>
            <p className="text-muted-foreground mt-2">Schedule, launch and monitor your survey outreach campaign.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
            <Link href={`/projects/${projectId}/analytics`}>
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <ProgressTracker />

      <Tabs defaultValue="campaign" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaign">Campaign Setup</TabsTrigger>
          <TabsTrigger value="respondents">Respondents</TabsTrigger>
          <TabsTrigger value="analytics">Live Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaign">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-sylvia-600" />
                  Campaign Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input type="date" id="start-date" className="mt-1 bg-white/80" defaultValue="2023-11-10" />
                  </div>
                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input type="time" id="start-time" className="mt-1 bg-white/80" defaultValue="09:00" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Send Options</Label>
                  <RadioGroup defaultValue="scheduled" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="immediate" id="immediate" />
                      <Label htmlFor="immediate">Send immediately</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduled" id="scheduled" />
                      <Label htmlFor="scheduled">Send at scheduled time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="staggered" id="staggered" />
                      <Label htmlFor="staggered">Send in batches (recommended for large lists)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-sylvia-600" />
                  Campaign Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/50 rounded-lg">
                      <div className="text-sm text-gray-500">Total Contacts</div>
                      <div className="text-2xl font-bold">{responders.length}</div>
                    </div>
                    <div className="p-4 bg-white/50 rounded-lg">
                      <div className="text-sm text-gray-500">Estimated Completion</div>
                      <div className="text-2xl font-bold">2-3 days</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-white/50">
                    <h3 className="font-medium mb-2">Campaign Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Survey Name:</span>
                        <span>{currentProject.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email Subject:</span>
                        <span>We value your opinion - {currentProject.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Questions:</span>
                        <span>10 questions in 4 sections</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Time to Complete:</span>
                        <span>5-10 minutes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-sylvia-600" />
                Campaign Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isCampaignLaunched ? (
                  <>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-3">
                      <Check className="h-5 w-5" />
                      <div>
                        <h3 className="font-medium">Campaign Active</h3>
                        <p className="text-sm text-green-600">
                          Your campaign was launched on November 10, 2023 at 9:00 AM
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">Response Rate</div>
                          <Badge className="bg-sylvia-600">{responseRate}%</Badge>
                        </div>
                        <Progress value={responseRate} className="mt-2 h-2" indicatorClassName="bg-sylvia-600" />
                        <p className="text-xs text-gray-500 mt-1">
                          {completedResponses} of {responders.length} respondents
                        </p>
                      </div>

                      <div className="p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">Open Rate</div>
                          <Badge className="bg-sylvia-600">{openRate}%</Badge>
                        </div>
                        <Progress value={openRate} className="mt-2 h-2" indicatorClassName="bg-sylvia-600" />
                        <p className="text-xs text-gray-500 mt-1">
                          {completedResponses + inProgressResponses} of {responders.length} opened emails
                        </p>
                      </div>

                      <div className="p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">Average Time to Complete</div>
                          <Badge className="bg-sylvia-600">7m 21s</Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4 text-sylvia-600" />
                          <span>Within expected range</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 flex items-center gap-3">
                      <Clock className="h-5 w-5" />
                      <div>
                        <h3 className="font-medium">Campaign Ready to Launch</h3>
                        <p className="text-sm text-blue-600">Complete your setup and launch when ready</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">Contacts Ready</div>
                          <Badge className="bg-sylvia-600">{responders.length || 0}</Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                          <Users className="h-4 w-4 text-sylvia-600" />
                          <span>Contacts imported and validated</span>
                        </div>
                      </div>

                      <div className="p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">Estimated Duration</div>
                          <Badge className="bg-sylvia-600">2-3 days</Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 text-sylvia-600" />
                          <span>Based on contact list size</span>
                        </div>
                      </div>

                      <div className="p-4 bg-white/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">Launch Status</div>
                          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Ready</Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                          <Zap className="h-4 w-4 text-sylvia-600" />
                          <span>All prerequisites completed</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button size="lg" className="bg-sylvia-600 hover:bg-sylvia-700">
                        <Zap className="mr-2 h-4 w-4" />
                        Launch Campaign Now
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="respondents">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-sylvia-600" />
                  {isCampaignLaunched ? "Respondents" : "Contact List"}
                </div>
                <Input placeholder="Search contacts..." className="max-w-xs bg-white/80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isCampaignLaunched ? (
                // Existing respondents table code
                <div className="rounded-md border overflow-hidden bg-white/80">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Respondent</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {responders.map((responder) => (
                        <TableRow key={responder.id} className="hover:bg-sylvia-50/50">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="bg-sylvia-100 text-sylvia-700">
                                  {responder.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{responder.name}</div>
                                <div className="text-xs text-muted-foreground">{responder.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{responder.company}</TableCell>
                          <TableCell>{responder.role}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                responder.status === "completed"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : responder.status === "in-progress"
                                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                    : "bg-gray-100 text-gray-700 border-gray-200"
                              }
                            >
                              {responder.status === "completed"
                                ? "Completed"
                                : responder.status === "in-progress"
                                  ? "In Progress"
                                  : "Sent"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={responder.progress}
                                className="h-2 w-24"
                                indicatorClassName={
                                  responder.status === "completed"
                                    ? "bg-green-500"
                                    : responder.status === "in-progress"
                                      ? "bg-yellow-500"
                                      : "bg-gray-300"
                                }
                              />
                              <span className="text-xs">{responder.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {responder.completedAt
                              ? new Date(responder.completedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-sylvia-600 hover:text-sylvia-700 hover:bg-sylvia-50"
                              asChild
                            >
                              <Link href={`/projects/${projectId}/outreach-campaign/${responder.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Campaign Not Launched</h3>
                  <p className="text-gray-500 mb-4">
                    Launch your campaign to start tracking respondent progress and responses.
                  </p>
                  <Button className="bg-sylvia-600 hover:bg-sylvia-700">
                    <Zap className="mr-2 h-4 w-4" />
                    Launch Campaign
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          {isCampaignLaunched ? (
            <>
              <Alert className="bg-white/80 border">
                <AlertCircle className="h-4 w-4 text-sylvia-600" />
                <AlertTitle>Live Analytics</AlertTitle>
                <AlertDescription>
                  Track real-time statistics as your respondents complete the survey. For more comprehensive analytics,
                  visit the Analytics & Reporting section after campaign completion.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{responseRate}%</div>
                    <div className="flex justify-between items-center mt-2">
                      <Progress value={responseRate} className="h-2 flex-1 mr-4" indicatorClassName="bg-sylvia-600" />
                      <span className="text-xs text-muted-foreground">
                        {completedResponses} of {responders.length}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7.3 minutes</div>
                    <p className="text-xs text-muted-foreground mt-2">Within expected range (5-10 min)</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Net Promoter Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+42</div>
                    <div className="text-xs text-green-600 flex items-center mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>8 points above industry average</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <>
              <Alert className="bg-white/80 border">
                <AlertCircle className="h-4 w-4 text-sylvia-600" />
                <AlertTitle>Analytics Preview</AlertTitle>
                <AlertDescription>
                  Analytics will be available once your campaign is launched. Preview the metrics you'll be able to
                  track.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card className="glass-card opacity-60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-400">—</div>
                    <p className="text-xs text-muted-foreground mt-2">Available after launch</p>
                  </CardContent>
                </Card>

                <Card className="glass-card opacity-60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-400">—</div>
                    <p className="text-xs text-muted-foreground mt-2">Available after launch</p>
                  </CardContent>
                </Card>

                <Card className="glass-card opacity-60">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Net Promoter Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-400">—</div>
                    <p className="text-xs text-muted-foreground mt-2">Available after launch</p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/projects/${projectId}/outreach-material`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Outreach Material
          </Link>
        </Button>
        <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
          <Link href={`/projects/${projectId}/analytics`}>
            Continue to Analytics
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
