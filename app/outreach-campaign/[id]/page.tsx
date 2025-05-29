"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Share2,
  Star,
  User,
  UserCircle,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

// Sample data for the responders
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
    phone: "+1 (555) 123-4567",
    demographics: {
      companySize: "201-500 employees",
      industry: "Technology",
      role: "C-Level Executive",
    },
    answers: [
      {
        questionId: "q1",
        section: "Demographics",
        question: "How many employees does your company have?",
        answer: "201-500 employees",
        type: "multiple-choice",
      },
      {
        questionId: "q2",
        section: "Demographics",
        question: "Which industry best describes your business?",
        answer: "Technology",
        type: "multiple-choice",
      },
      {
        questionId: "q3",
        section: "Demographics",
        question: "What is your role in the organization?",
        answer: "C-Level Executive",
        type: "multiple-choice",
      },
      {
        questionId: "q4",
        section: "Usage",
        question: "How frequently do you use our product?",
        answer: "Daily",
        type: "multiple-choice",
      },
      {
        questionId: "q5",
        section: "Usage",
        question: "Which features do you use most often?",
        answer: ["Analytics Dashboard", "API Integration", "Team Collaboration"],
        type: "checkbox",
      },
      {
        questionId: "q6",
        section: "Satisfaction",
        question: "How would you rate your overall satisfaction with our product?",
        answer: 4,
        type: "rating",
        scale: 5,
      },
      {
        questionId: "q7",
        section: "Satisfaction",
        question: "How likely are you to recommend our product to a colleague or friend?",
        answer: 9,
        type: "nps",
        scale: 10,
      },
      {
        questionId: "q8",
        section: "Satisfaction",
        question: "What aspect of our product do you find most valuable?",
        answer:
          "The analytics dashboard provides us with critical insights for our business operations. The visualizations are intuitive and make it easy to communicate data to stakeholders.",
        type: "open-ended",
      },
      {
        questionId: "q9",
        section: "Future Needs",
        question: "Which feature would you like to see improved in future updates?",
        answer: "API Documentation",
        type: "multiple-choice",
      },
      {
        questionId: "q10",
        section: "Future Needs",
        question: "Please share any additional feedback or suggestions for improvement.",
        answer:
          "I would appreciate more in-depth tutorials on using advanced features. Also, it would be great to have more customization options for the dashboards. Overall, a solid product that has become essential to our workflow.",
        type: "open-ended",
      },
    ],
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
    phone: "+1 (555) 987-6543",
    demographics: {
      companySize: "501-1000 employees",
      industry: "Finance",
      role: "Director",
    },
    answers: [
      {
        questionId: "q1",
        section: "Demographics",
        question: "How many employees does your company have?",
        answer: "501-1000 employees",
        type: "multiple-choice",
      },
      {
        questionId: "q2",
        section: "Demographics",
        question: "Which industry best describes your business?",
        answer: "Finance",
        type: "multiple-choice",
      },
      {
        questionId: "q3",
        section: "Demographics",
        question: "What is your role in the organization?",
        answer: "Director",
        type: "multiple-choice",
      },
      {
        questionId: "q4",
        section: "Usage",
        question: "How frequently do you use our product?",
        answer: "Several times a week",
        type: "multiple-choice",
      },
      {
        questionId: "q5",
        section: "Usage",
        question: "Which features do you use most often?",
        answer: ["Reporting", "Security Controls", "User Management"],
        type: "checkbox",
      },
      {
        questionId: "q6",
        section: "Satisfaction",
        question: "How would you rate your overall satisfaction with our product?",
        answer: 3,
        type: "rating",
        scale: 5,
      },
      {
        questionId: "q7",
        section: "Satisfaction",
        question: "How likely are you to recommend our product to a colleague or friend?",
        answer: 7,
        type: "nps",
        scale: 10,
      },
      {
        questionId: "q8",
        section: "Satisfaction",
        question: "What aspect of our product do you find most valuable?",
        answer:
          "The security features and compliance reporting are essential for our financial organization. These features have helped us maintain regulatory compliance with minimal effort.",
        type: "open-ended",
      },
      {
        questionId: "q9",
        section: "Future Needs",
        question: "Which feature would you like to see improved in future updates?",
        answer: "User Interface",
        type: "multiple-choice",
      },
      {
        questionId: "q10",
        section: "Future Needs",
        question: "Please share any additional feedback or suggestions for improvement.",
        answer:
          "The user interface could be more intuitive. Our new team members often require significant training to understand how to navigate the system efficiently. More tooltips or a guided tour would be helpful.",
        type: "open-ended",
      },
    ],
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
    phone: "+1 (555) 234-5678",
    demographics: {
      companySize: "51-200 employees",
      industry: "Technology",
      role: "Manager",
    },
    answers: [
      {
        questionId: "q1",
        section: "Demographics",
        question: "How many employees does your company have?",
        answer: "51-200 employees",
        type: "multiple-choice",
      },
      {
        questionId: "q2",
        section: "Demographics",
        question: "Which industry best describes your business?",
        answer: "Technology",
        type: "multiple-choice",
      },
      {
        questionId: "q3",
        section: "Demographics",
        question: "What is your role in the organization?",
        answer: "Manager",
        type: "multiple-choice",
      },
      {
        questionId: "q4",
        section: "Usage",
        question: "How frequently do you use our product?",
        answer: "Daily",
        type: "multiple-choice",
      },
      {
        questionId: "q5",
        section: "Usage",
        question: "Which features do you use most often?",
        answer: ["Team Collaboration", "Mobile App", "Integrations"],
        type: "checkbox",
      },
      {
        questionId: "q6",
        section: "Satisfaction",
        question: "How would you rate your overall satisfaction with our product?",
        answer: 4,
        type: "rating",
        scale: 5,
      },
      // In progress, no more answers
    ],
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
    phone: "+1 (555) 345-6789",
    demographics: {},
    answers: [], // No answers yet
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
    phone: "+1 (555) 456-7890",
    demographics: {
      companySize: "1000+ employees",
      industry: "Manufacturing",
      role: "C-Level Executive",
    },
    answers: [
      {
        questionId: "q1",
        section: "Demographics",
        question: "How many employees does your company have?",
        answer: "1000+ employees",
        type: "multiple-choice",
      },
      {
        questionId: "q2",
        section: "Demographics",
        question: "Which industry best describes your business?",
        answer: "Manufacturing",
        type: "multiple-choice",
      },
      {
        questionId: "q3",
        section: "Demographics",
        question: "What is your role in the organization?",
        answer: "C-Level Executive",
        type: "multiple-choice",
      },
      {
        questionId: "q4",
        section: "Usage",
        question: "How frequently do you use our product?",
        answer: "Several times a month",
        type: "multiple-choice",
      },
      {
        questionId: "q5",
        section: "Usage",
        question: "Which features do you use most often?",
        answer: ["Executive Dashboard", "Strategic Planning", "Performance Analytics"],
        type: "checkbox",
      },
      {
        questionId: "q6",
        section: "Satisfaction",
        question: "How would you rate your overall satisfaction with our product?",
        answer: 5,
        type: "rating",
        scale: 5,
      },
      {
        questionId: "q7",
        section: "Satisfaction",
        question: "How likely are you to recommend our product to a colleague or friend?",
        answer: 10,
        type: "nps",
        scale: 10,
      },
      {
        questionId: "q8",
        section: "Satisfaction",
        question: "What aspect of our product do you find most valuable?",
        answer:
          "The executive dashboard provides me with an at-a-glance view of our entire operation. The strategic planning tools have been instrumental in helping us chart our growth for the next five years.",
        type: "open-ended",
      },
      {
        questionId: "q9",
        section: "Future Needs",
        question: "Which feature would you like to see improved in future updates?",
        answer: "Mobile Experience",
        type: "multiple-choice",
      },
      {
        questionId: "q10",
        section: "Future Needs",
        question: "Please share any additional feedback or suggestions for improvement.",
        answer:
          "As I travel frequently, I'd appreciate a more robust mobile experience. Currently, some of the advanced features are only available on desktop. Overall, your product has become an essential tool for our executive team.",
        type: "open-ended",
      },
    ],
  },
]

// Component to render different types of answers
const AnswerDisplay = ({ answer, type, scale }: { answer: any; type: string; scale?: number }) => {
  if (type === "multiple-choice") {
    return <p>{answer}</p>
  }

  if (type === "checkbox" && Array.isArray(answer)) {
    return (
      <ul className="list-disc pl-5 space-y-1">
        {answer.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )
  }

  if (type === "rating" && typeof answer === "number" && scale) {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: scale }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < answer ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
        <span className="ml-2 text-sm font-medium">
          {answer} of {scale}
        </span>
      </div>
    )
  }

  if (type === "nps" && typeof answer === "number" && scale) {
    const getColor = (score: number) => {
      if (score >= 9) return "text-green-600 bg-green-50 border-green-200"
      if (score >= 7) return "text-yellow-600 bg-yellow-50 border-yellow-200"
      return "text-red-600 bg-red-50 border-red-200"
    }

    return (
      <div className="flex items-center gap-2">
        <Badge className={`${getColor(answer)} font-bold text-base px-3 py-1`}>{answer}</Badge>
        <span className="text-sm">{answer >= 9 ? "Promoter" : answer >= 7 ? "Passive" : "Detractor"}</span>
      </div>
    )
  }

  if (type === "open-ended") {
    return <div className="bg-white/50 p-3 rounded-md border text-sm">{answer}</div>
  }

  return <p>{JSON.stringify(answer)}</p>
}

export default function ResponderDetailPage() {
  const params = useParams()
  const responderId = params.id as string

  // Find the responder by ID
  const responder = responders.find((r) => r.id === responderId)

  // If responder not found, show error
  if (!responder) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-bold text-gray-800">Responder Not Found</h1>
        <p className="text-gray-600 mt-2">The responder you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-4 bg-sylvia-600 hover:bg-sylvia-700">
          <Link href="/outreach-campaign">Return to Campaign</Link>
        </Button>
      </div>
    )
  }

  // Group answers by section
  const sectionAnswers: Record<string, any[]> = {}
  responder.answers.forEach((answer) => {
    if (!sectionAnswers[answer.section]) {
      sectionAnswers[answer.section] = []
    }
    sectionAnswers[answer.section].push(answer)
  })

  const sections = Object.keys(sectionAnswers)

  // For completed surveys, calculate custom metrics
  const metrics =
    responder.status === "completed"
      ? {
          completionTime: "7 minutes 14 seconds",
          npsScore: responder.answers.find((a) => a.type === "nps")?.answer || 0,
          satisfactionScore: responder.answers.find((a) => a.questionId === "q6")?.answer || 0,
          completionDate: new Date(responder.completedAt as string).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }
      : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/outreach-campaign">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Campaign
          </Link>
        </Button>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button className="bg-sylvia-600 hover:bg-sylvia-700">
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar with responder profile */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
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

                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {responder.completedAt
                    ? `Completed ${new Date(responder.completedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}`
                    : responder.status === "in-progress"
                      ? "Started"
                      : "Not started"}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarFallback className="text-xl bg-sylvia-100 text-sylvia-700">{responder.avatar}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{responder.name}</h2>
                <p className="text-gray-500">
                  {responder.role} at {responder.company}
                </p>

                <div className="w-full mt-4 pt-4 border-t space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <Mail className="h-4 w-4 text-sylvia-600 mt-0.5" />
                    <span className="text-left">{responder.email}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Phone className="h-4 w-4 text-sylvia-600 mt-0.5" />
                    <span className="text-left">{responder.phone}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Building className="h-4 w-4 text-sylvia-600 mt-0.5" />
                    <div className="text-left">
                      <div>{responder.company}</div>
                      {responder.demographics.companySize && (
                        <div className="text-xs text-gray-500">{responder.demographics.companySize}</div>
                      )}
                    </div>
                  </div>
                  {responder.demographics.industry && (
                    <div className="flex items-start gap-3 text-sm">
                      <FileText className="h-4 w-4 text-sylvia-600 mt-0.5" />
                      <span className="text-left">{responder.demographics.industry}</span>
                    </div>
                  )}
                  {responder.demographics.role && (
                    <div className="flex items-start gap-3 text-sm">
                      <UserCircle className="h-4 w-4 text-sylvia-600 mt-0.5" />
                      <span className="text-left">{responder.demographics.role}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {responder.status === "completed" && metrics && (
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-sylvia-600" />
                  Response Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Completion Time</div>
                  <div className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-sylvia-600" />
                    {metrics.completionTime}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-gray-500">NPS Score</div>
                  <div className="flex items-center">
                    <Badge
                      className={
                        metrics.npsScore >= 9
                          ? "bg-green-100 text-green-700 border-green-200"
                          : metrics.npsScore >= 7
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-red-100 text-red-700 border-red-200"
                      }
                    >
                      {metrics.npsScore}/10
                    </Badge>
                    <span className="text-xs ml-2">
                      {metrics.npsScore >= 9 ? "Promoter" : metrics.npsScore >= 7 ? "Passive" : "Detractor"}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Satisfaction Score</div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < metrics.satisfactionScore ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-xs ml-2">{metrics.satisfactionScore}/5</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Completed On</div>
                  <div className="text-sm">{metrics.completionDate}</div>
                </div>
              </CardContent>
            </Card>
          )}

          {responder.status === "in-progress" && (
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-sylvia-600" />
                  Completion Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{responder.progress}%</span>
                  </div>
                  <Progress value={responder.progress} className="h-2" indicatorClassName="bg-sylvia-600" />
                  <p className="text-xs text-muted-foreground">
                    Respondent has completed {responder.answers.length} of 10 questions
                  </p>
                  <div className="p-3 bg-yellow-50 text-yellow-800 text-sm rounded border border-yellow-200">
                    <p className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Survey in progress
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {responder.status === "sent" && (
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4 text-sylvia-600" />
                  Survey Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 text-center">
                  <Mail className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <h3 className="font-medium mb-1">Survey Sent</h3>
                  <p className="text-sm text-gray-500 mb-4">This participant has not yet started the survey</p>
                  <Button className="w-full bg-sylvia-600 hover:bg-sylvia-700">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main content with responses */}
        <div className="col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Survey Responses</CardTitle>
              <CardDescription>
                {responder.status === "completed"
                  ? "Complete response data for all questions"
                  : responder.status === "in-progress"
                    ? "Partial response data (survey in progress)"
                    : "No responses yet"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {responder.status === "sent" ? (
                <div className="p-8 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-medium mb-2">No Responses Yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    This participant has not yet started the survey. You can send a reminder to encourage them to
                    complete it.
                  </p>
                  <Button className="bg-sylvia-600 hover:bg-sylvia-700">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reminder
                  </Button>
                </div>
              ) : (
                <Tabs defaultValue={sections[0]} className="space-y-4">
                  <TabsList className="mb-4 flex flex-wrap">
                    {sections.map((section) => (
                      <TabsTrigger key={section} value={section}>
                        {section}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {sections.map((section) => (
                    <TabsContent key={section} value={section} className="space-y-4">
                      {sectionAnswers[section].map((answer, index) => (
                        <div key={answer.questionId} className="p-4 bg-white/80 rounded-lg border">
                          <div className="text-sm text-gray-500 mb-1">Question {answer.questionId}</div>
                          <h3 className="font-medium mb-3">{answer.question}</h3>
                          <AnswerDisplay answer={answer.answer} type={answer.type} scale={answer.scale} />
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </CardContent>
          </Card>

          {/* Additional actions or AI analysis */}
          {responder.status === "completed" && (
            <Card className="glass-card mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-sylvia-600" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-sylvia-50 rounded-lg border border-sylvia-200">
                  <h3 className="font-medium mb-3 text-sylvia-700">Key Insights from {responder.name}'s Responses</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="min-w-[20px] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-sylvia-600"></div>
                      </div>
                      <p className="text-sm">
                        High NPS score (9/10) indicates strong product satisfaction and likelihood to recommend.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <div className="min-w-[20px] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-sylvia-600"></div>
                      </div>
                      <p className="text-sm">
                        Values the analytics dashboard features most highly, particularly for business insights.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <div className="min-w-[20px] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-sylvia-600"></div>
                      </div>
                      <p className="text-sm">
                        Identified API documentation as an area for improvement, suggesting enhanced developer
                        resources.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <div className="min-w-[20px] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-sylvia-600"></div>
                      </div>
                      <p className="text-sm">
                        As a C-level executive at a mid-sized tech company, represents a key decision-maker demographic.
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h4 className="font-medium mb-2 text-sylvia-700">Recommended Follow-up Actions</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-sylvia-600 mt-0.5" />
                      <p className="text-sm">
                        Schedule a follow-up call to discuss API documentation improvements and gather more specific
                        feedback.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-sylvia-600 mt-0.5" />
                      <p className="text-sm">
                        Send a personalized thank you email acknowledging their detailed feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
