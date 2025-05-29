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
  Download,
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

// Demo data for responders
const responders = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    company: "Acme Inc.",
    role: "CTO",
    status: "completed",
    completedAt: "2023-11-12T14:32:00",
    progress: 100,
    avatar: "JS",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.co",
    company: "XYZ Corp",
    role: "Director",
    status: "completed",
    completedAt: "2023-11-13T09:45:00",
    progress: 100,
    avatar: "SJ",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@tech.io",
    company: "Tech Solutions",
    role: "Manager",
    status: "in-progress",
    progress: 60,
    avatar: "MB",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@globalservices.com",
    company: "Global Services",
    role: "VP",
    status: "sent",
    progress: 0,
    avatar: "ED",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "rwilson@enterprise.com",
    company: "Enterprise Inc.",
    role: "CEO",
    status: "completed",
    completedAt: "2023-11-14T16:20:00",
    progress: 100,
    avatar: "RW",
  },
]

export default function OutreachCampaignPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-4">
            <div className="bg-sylvia-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            Outreach Campaign
          </h1>
          <p className="text-muted-foreground mt-2">Schedule, launch and monitor your survey outreach campaign.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
            <Link href="/analytics">
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
                      <div className="text-2xl font-bold">5</div>
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
                        <span>Enterprise Customer Satisfaction Survey</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email Subject:</span>
                        <span>We value your opinion - Enterprise Customer Satisfaction Survey</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Questions:</span>
                        <span>12 questions in 4 sections</span>
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
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-3">
                  <Check className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">Campaign Active</h3>
                    <p className="text-sm text-green-600">Your campaign was launched on November 10, 2023 at 9:00 AM</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Response Rate</div>
                      <Badge className="bg-sylvia-600">60%</Badge>
                    </div>
                    <Progress value={60} className="mt-2 h-2" indicatorClassName="bg-sylvia-600" />
                    <p className="text-xs text-gray-500 mt-1">3 of 5 respondents</p>
                  </div>

                  <div className="p-4 bg-white/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Completion Rate</div>
                      <Badge className="bg-sylvia-600">80%</Badge>
                    </div>
                    <Progress value={80} className="mt-2 h-2" indicatorClassName="bg-sylvia-600" />
                    <p className="text-xs text-gray-500 mt-1">4 of 5 opened emails</p>
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
                  Respondents
                </div>
                <Input placeholder="Search respondents..." className="max-w-xs bg-white/80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                            <Link href={`/outreach-campaign/${responder.id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">Showing 5 of 5 respondents</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm" className="bg-sylvia-600 hover:bg-sylvia-700">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
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
                <div className="text-2xl font-bold">60%</div>
                <div className="flex justify-between items-center mt-2">
                  <Progress value={60} className="h-2 flex-1 mr-4" indicatorClassName="bg-sylvia-600" />
                  <span className="text-xs text-muted-foreground">3 of 5</span>
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
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/outreach-material">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Outreach Material
          </Link>
        </Button>
        <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
          <Link href="/analytics">
            Continue to Analytics
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
