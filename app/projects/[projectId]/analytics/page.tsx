"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { getProjectAnalytics, getProjectResponses } from "@/lib/data-service"
import { useProject } from "@/components/project-context"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  MessageSquareQuote,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Star,
  ThumbsDown,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Brain,
  Target,
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function AnalyticsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { currentProject } = useProject()
  const [openInsight, setOpenInsight] = useState<string | null>("satisfaction")
  const [selectedObjective, setSelectedObjective] = useState<string>("all")
  const [showFakeAnalysis, setShowFakeAnalysis] = useState(false)
  const [isAILoading, setIsAILoading] = useState(false)
  const [aiLoadingStep, setAILoadingStep] = useState(0)
  const [fakeAnalytics, setFakeAnalytics] = useState<any | null>(null)
  const analyticsRef = useRef<any>(null)

  // Get analytics data for this project
  const analytics = fakeAnalytics || getProjectAnalytics(projectId)
  const responses = getProjectResponses(projectId)

  // Check if this is the completed project
  const isCompleted = currentProject?.status === "completed"

  // Enhanced trend data
  const satisfactionTrendData = [
    { month: "Jan", satisfaction: 3.6 },
    { month: "Feb", satisfaction: 3.7 },
    { month: "Mar", satisfaction: 3.9 },
    { month: "Apr", satisfaction: 4.1 },
    { month: "May", satisfaction: 4.0 },
    { month: "Jun", satisfaction: 3.8 },
    { month: "Jul", satisfaction: 3.9 },
    { month: "Aug", satisfaction: 4.2 },
    { month: "Sep", satisfaction: 4.3 },
    { month: "Oct", satisfaction: 4.1 },
    { month: "Nov", satisfaction: 4.4 },
    { month: "Dec", satisfaction: 4.3 },
  ]

  const npsTrendData = [
    { month: "Jan", nps: 60 },
    { month: "Feb", nps: 62 },
    { month: "Mar", nps: 65 },
    { month: "Apr", nps: 67 },
    { month: "May", nps: 66 },
    { month: "Jun", nps: 68 },
    { month: "Jul", nps: 70 },
    { month: "Aug", nps: 72 },
    { month: "Sep", nps: 74 },
    { month: "Oct", nps: 73 },
    { month: "Nov", nps: 75 },
    { month: "Dec", nps: 77 },
  ]

  const featureUsageData = [
    { name: "API Integration", usage: 85 },
    { name: "Dashboard", usage: 92 },
    { name: "Reporting", usage: 78 },
    { name: "User Management", usage: 62 },
    { name: "Analytics", usage: 74 },
  ]

  const satisfactionByRoleData = [
    { name: "C-Suite", satisfaction: 4.5 },
    { name: "Management", satisfaction: 4.2 },
    { name: "Technical", satisfaction: 3.8 },
    { name: "End Users", satisfaction: 3.9 },
  ]

  const npsBreakdownData = [
    { name: "Promoters", value: 65, color: "#22c55e" },
    { name: "Passives", value: 25, color: "#f59e0b" },
    { name: "Detractors", value: 10, color: "#ef4444" },
  ]

  const sentimentByFeatureData = [
    { name: "API", positive: 75, negative: 25 },
    { name: "UI", positive: 82, negative: 18 },
    { name: "Support", positive: 90, negative: 10 },
    { name: "Pricing", positive: 60, negative: 40 },
    { name: "Docs", positive: 65, negative: 35 },
  ]

  // Churn analysis data
  const churnData = [
    { month: "Jul", churnRate: 8.2, newChurns: 12 },
    { month: "Aug", churnRate: 7.8, newChurns: 11 },
    { month: "Sep", churnRate: 9.1, newChurns: 15 },
    { month: "Oct", churnRate: 6.5, newChurns: 9 },
    { month: "Nov", churnRate: 5.2, newChurns: 7 },
  ]

  const churnReasonData = [
    { reason: "Pricing Concerns", count: 18, percentage: 35 },
    { reason: "Feature Limitations", count: 12, percentage: 23 },
    { reason: "Poor Support Experience", count: 8, percentage: 15 },
    { reason: "Competitor Switch", count: 7, percentage: 14 },
    { reason: "Technical Issues", count: 4, percentage: 8 },
    { reason: "Other", count: 3, percentage: 6 },
  ]

  const churnBySegmentData = [
    { segment: "Small Business", churnRate: 12.5, avgTenure: 8 },
    { segment: "Mid-Market", churnRate: 6.8, avgTenure: 14 },
    { segment: "Enterprise", churnRate: 3.2, avgTenure: 24 },
  ]

  const churnedCustomerQuotes = [
    {
      id: 1,
      text: "The pricing became too expensive for our small team. We needed a more cost-effective solution as we scaled down during the economic downturn.",
      author: "Jennifer Walsh",
      role: "Operations Manager",
      company: "StartupTech Inc",
      churnReason: "Pricing Concerns",
      tenure: "6 months",
      churnDate: "2024-10-15",
    },
    {
      id: 2,
      text: "We loved the core features, but the lack of advanced reporting capabilities forced us to look elsewhere. Our data analysis needs grew beyond what the platform could offer.",
      author: "Robert Chen",
      role: "Data Director",
      company: "Analytics Pro",
      churnReason: "Feature Limitations",
      tenure: "18 months",
      churnDate: "2024-09-22",
    },
    {
      id: 3,
      text: "Support response times were consistently slow. When we had critical issues, waiting 24+ hours for responses wasn't acceptable for our business operations.",
      author: "Maria Rodriguez",
      role: "IT Manager",
      company: "FastTrack Solutions",
      churnReason: "Poor Support Experience",
      tenure: "12 months",
      churnDate: "2024-11-03",
    },
  ]

  // Customer quotes
  const customerQuotes = [
    {
      id: 1,
      text: "The API documentation could be more comprehensive. We spent too much time figuring out the integration points.",
      author: "David Kim",
      role: "Senior Developer",
      company: "CloudTech Systems",
      sentiment: "negative",
      topic: "Documentation",
    },
    {
      id: 2,
      text: "Your product has transformed our workflow. The dashboard is intuitive and the reporting features are exactly what we needed.",
      author: "Sarah Johnson",
      role: "CTO",
      company: "TechCorp Solutions",
      sentiment: "positive",
      topic: "UI/UX",
    },
    {
      id: 3,
      text: "We love the analytics capabilities, but would appreciate more customization options for the reports.",
      author: "Michael Chen",
      role: "Product Manager",
      company: "InnovateTech",
      sentiment: "mixed",
      topic: "Analytics",
    },
    {
      id: 4,
      text: "The mobile app is a game-changer for our field teams. Being able to access data on the go has improved our response times significantly.",
      author: "Lisa Thompson",
      role: "Head of Operations",
      company: "Scale Solutions",
      sentiment: "positive",
      topic: "Mobile",
    },
  ]

  // Sylvia insights
  const sylviaInsights = [
    {
      id: "satisfaction",
      title: "Satisfaction Drivers",
      icon: <Star className="h-5 w-5 text-amber-500" />,
      summary: "Technical users report lower satisfaction scores than management and executives.",
      details:
        "There's a 0.7 point gap between C-Suite satisfaction (4.5/5) and Technical users (3.8/5). This suggests the product may be meeting executive needs but causing friction for technical implementers. The primary pain points mentioned by technical users relate to API documentation and integration complexity.",
      recommendations: [
        "Improve API documentation with more code examples and use cases",
        "Create dedicated technical onboarding resources",
        "Consider a technical user advisory group to gather ongoing feedback",
      ],
      severity: "medium",
      objectives: ["obj1", "obj4"], // Associated objectives
    },
    {
      id: "detractors",
      title: "Detractor Analysis",
      icon: <ThumbsDown className="h-5 w-5 text-red-500" />,
      summary: "10% of respondents are detractors, primarily citing documentation and pricing concerns.",
      details:
        "Analysis of detractor responses reveals two main themes: documentation quality (mentioned by 65% of detractors) and pricing structure (mentioned by 40% of detractors). Specifically, detractors find the pricing tiers confusing and feel the documentation lacks depth for advanced use cases.",
      recommendations: [
        "Revise pricing page to clarify value at each tier",
        "Develop advanced documentation sections for power users",
        "Create a feedback mechanism specifically for documentation improvements",
      ],
      severity: "high",
      objectives: ["obj2", "obj1"], // Associated objectives
    },
    {
      id: "feature",
      title: "Feature Opportunity",
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
      summary: "Team collaboration features are the most requested enhancement across all segments.",
      details:
        "35% of all respondents mentioned team collaboration features in their open-ended feedback. This was consistent across company sizes and roles, indicating a universal need. Current workarounds mentioned include using third-party tools alongside your product, creating friction in the workflow.",
      recommendations: [
        "Prioritize team collaboration features in the product roadmap",
        "Consider interim integrations with popular collaboration tools",
        "Engage with customers already using workarounds for deeper insights",
      ],
      severity: "medium",
      objectives: ["obj3", "obj4"], // Associated objectives
    },
    {
      id: "competitive",
      title: "Competitive Position",
      icon: <Target className="h-5 w-5 text-blue-500" />,
      summary: "Your NPS of 78 is significantly above the industry average of 32 for B2B SaaS.",
      details:
        "Your Net Promoter Score of 78 places you in the top 5% of B2B SaaS companies. This is a strong competitive advantage, particularly in enterprise sales cycles where reference customers are crucial. The high proportion of promoters (65%) provides an opportunity for case studies and testimonials.",
      recommendations: [
        "Develop a formal customer advocacy program",
        "Create case studies featuring your most enthusiastic promoters",
        "Leverage high NPS in marketing materials and sales presentations",
      ],
      severity: "low",
      objectives: ["obj1", "obj2"], // Associated with churn reduction and satisfaction
    },
    {
      id: "churn",
      title: "Churn Risk Analysis",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      summary: "Pricing concerns and feature limitations are driving 58% of customer churn.",
      details:
        "Analysis of churned customers reveals that 35% cited pricing concerns and 23% mentioned feature limitations as primary reasons for leaving. Small businesses show the highest churn rate at 12.5%, with an average tenure of only 8 months. The pattern suggests that customers churn when their needs outgrow the current feature set or when budget constraints become critical.",
      recommendations: [
        "Develop a more flexible pricing tier for small businesses and startups",
        "Create a feature roadmap communication strategy to retain customers waiting for specific capabilities",
        "Implement proactive customer success outreach for accounts showing usage decline",
        "Establish an early warning system based on support ticket patterns and feature requests",
      ],
      severity: "high",
      objectives: ["obj2", "obj1"], // Associated with churn reduction and satisfaction
    },
  ]

  const objectives = [
    { id: "all", name: "All Objectives" },
    { id: "obj1", name: "Improve Customer Satisfaction" },
    { id: "obj2", name: "Reduce Churn Rate" },
    { id: "obj3", name: "Enhance Product Features" },
    { id: "obj4", name: "Optimize User Experience" },
  ]

  const filteredInsights =
    selectedObjective === "all"
      ? sylviaInsights
      : sylviaInsights.filter((insight) => insight.objectives.includes(selectedObjective))

  // Handler for test AI analysis
  const handleTestAIAnalysis = () => {
    setIsAILoading(true)
    setShowFakeAnalysis(false)
    setAILoadingStep(0)
    // Save original analytics for restoration
    if (!analyticsRef.current) {
      analyticsRef.current = getProjectAnalytics(projectId)
    }
    const steps = [
      "Connecting to Sylvia AI...",
      "Aggregating and normalizing survey data...",
      "Detecting advanced patterns and correlations...",
      "Performing sentiment and topic analysis...",
      "Synthesizing actionable recommendations...",
      "Finalizing your AI-powered analytics report..."
    ]
    let step = 0
    const interval = setInterval(() => {
      setAILoadingStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1
        }
        return prev
      })
      step++
      if (step >= steps.length) {
        clearInterval(interval)
      }
    }, 1300)
    setTimeout(() => {
      setIsAILoading(false)
      setShowFakeAnalysis(true)
      setAILoadingStep(0)
      // Set fake analytics data
      setFakeAnalytics({
        ...analyticsRef.current,
        totalResponses: 12,
        averageSatisfaction: 4.3,
        npsScore: 67,
        completionRate: 91,
        responseRate: 80,
      })
    }, 7800)
  }

  // Restore analytics on unmount or when fake analysis is dismissed
  useEffect(() => {
    return () => {
      setFakeAnalytics(null)
      analyticsRef.current = null
    }
  }, [])

  // Optionally, add a button to dismiss fake analysis and restore original analytics
  const handleDismissFakeAnalysis = () => {
    setShowFakeAnalysis(false)
    setFakeAnalytics(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/projects/${projectId}`}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
            <p className="text-muted-foreground mt-1">View and analyze your survey results</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-sylvia-300 text-sylvia-700" onClick={handleTestAIAnalysis}>
            <Brain className="mr-2 h-4 w-4 animate-pulse" />
            Test AI Analysis
          </Button>
          {showFakeAnalysis && (
            <Button variant="ghost" className="text-sylvia-600 underline" onClick={handleDismissFakeAnalysis}>
              Dismiss Test Analysis
            </Button>
          )}
          {!isCompleted && !showFakeAnalysis && (
            <>
              <Button variant="outline">Save Draft</Button>
              <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
                <Link href={`/projects/${projectId}`}>
                  Back to Project
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* AI Analysis Loading Animation */}
      {isAILoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center gap-8 min-w-[340px] max-w-[90vw] border-2 border-sylvia-200">
            <div className="flex gap-6 text-sylvia-600 animate-pulse">
              <Brain className="h-10 w-10 animate-spin" />
              <BarChart3 className="h-10 w-10 animate-bounce" />
              <Search className="h-10 w-10 animate-pulse" />
              <Sparkles className="h-10 w-10 animate-spin-slow" />
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>
            <div className="text-xl font-semibold text-sylvia-700 text-center min-h-[48px]">
              {[
                "Connecting to Sylvia AI...",
                "Aggregating and normalizing survey data...",
                "Detecting advanced patterns and correlations...",
                "Performing sentiment and topic analysis...",
                "Synthesizing actionable recommendations...",
                "Finalizing your AI-powered analytics report..."
              ][aiLoadingStep]}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-sylvia-600 h-3 rounded-full transition-all duration-500" style={{ width: `${(aiLoadingStep + 1) * 16.66}%` }} />
            </div>
            <div className="text-xs text-gray-400 mt-2">Sylvia AI is analyzing your data and generating insights...</div>
          </div>
        </div>
      )}

      {/* Fake AI Analysis Card */}
      {showFakeAnalysis && (
        <Card className="border-2 border-sylvia-300 shadow-lg bg-gradient-to-br from-purple-50 to-sylvia-50 animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Brain className="h-7 w-7 text-sylvia-600 animate-pulse" />
            <CardTitle className="text-2xl text-sylvia-900">Sylvia AI Deep Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="text-lg font-semibold text-sylvia-700">Key Findings</div>
            <ul className="list-disc pl-6 space-y-2 text-sylvia-800">
              <li><b>Hidden Churn Risk:</b> Advanced pattern detection identified a 17% churn risk among mid-market customers, primarily driven by delayed feature adoption and low engagement in the first 60 days.</li>
              <li><b>Sentiment Hotspots:</b> Sentiment analysis revealed that "support" and "integration" are the most polarizing topics, with 68% positive and 32% negative sentiment split. Negative comments cluster around onboarding complexity and response times.</li>
              <li><b>Feature Impact:</b> Customers who used the new dashboard feature at least 3 times per week reported a 1.2-point higher satisfaction score and were 2.5x more likely to recommend the product.</li>
              <li><b>Predictive NPS:</b> AI regression modeling predicts a 9-point NPS increase if documentation and onboarding are improved, with the largest impact among technical users.</li>
              <li><b>Engagement Drop-off:</b> 24% of users show a sharp engagement drop after the first month, correlating with a lack of personalized follow-up and unclear value communication.</li>
            </ul>
            <div className="text-lg font-semibold text-sylvia-700 mt-6">AI Recommendations</div>
            <ol className="list-decimal pl-6 space-y-2 text-sylvia-800">
              <li>Launch a targeted onboarding campaign for new users, focusing on integration and support resources.</li>
              <li>Develop a "quick wins" dashboard tour to drive early feature adoption and reduce first-month churn.</li>
              <li>Expand documentation with technical deep-dives and real-world use cases, prioritizing feedback from detractors.</li>
              <li>Implement proactive support check-ins for accounts with low engagement in the first 30 days.</li>
              <li>Leverage promoters for testimonials and peer-led webinars to amplify positive sentiment and NPS.</li>
            </ol>
            <div className="text-xs text-gray-500 mt-4">This analysis is for demonstration purposes and does not affect your real analytics data.</div>
          </CardContent>
        </Card>
      )}

      {/* Only show No Data Available if not completed and not showing fake analysis */}
      {!isCompleted && !showFakeAnalysis ? (
        <Card className="bg-white/50 border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Zap className="h-5 w-5" />
              <h2 className="text-lg font-medium">No Data Available</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Analytics will be available once you've collected survey responses. Complete your survey setup and launch
              your campaign to start seeing insights here.
            </p>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Current Responses:</span>
                <span className="ml-1 font-medium">{analytics.totalResponses}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Target:</span>
                <span className="ml-1 font-medium">10+ responses</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Sylvia Insights Banner */}
          <Card className="bg-gradient-to-r from-sylvia-50 to-purple-50 border-sylvia-100">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-sylvia-600 to-purple-600 rounded-full p-1.5">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-sylvia-900">Sylvia Insights</CardTitle>
                </div>
                <Select value={selectedObjective} onValueChange={setSelectedObjective}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by objective" />
                  </SelectTrigger>
                  <SelectContent>
                    {objectives.map((objective) => (
                      <SelectItem key={objective.id} value={objective.id}>
                        {objective.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                AI-powered analysis of your survey data with personalized recommendations
                {selectedObjective !== "all" && (
                  <span className="ml-2 text-sylvia-600">
                    • Filtered by {objectives.find((obj) => obj.id === selectedObjective)?.name}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredInsights.map((insight) => (
                <Collapsible
                  key={insight.id}
                  open={openInsight === insight.id}
                  onOpenChange={() => setOpenInsight(openInsight === insight.id ? null : insight.id)}
                  className="border rounded-lg bg-white"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                    <div className="flex items-center gap-3">
                      {insight.icon}
                      <div>
                        <h3 className="font-medium">{insight.title}</h3>
                        <p className="text-sm text-muted-foreground">{insight.summary}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          insight.severity === "high"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : insight.severity === "medium"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-green-50 text-green-700 border-green-200"
                        }
                      `}
                    >
                      {insight.severity === "high"
                        ? "High Priority"
                        : insight.severity === "medium"
                          ? "Medium Priority"
                          : "Low Priority"}
                    </Badge>
                    {openInsight === insight.id ? (
                      <ChevronUp className="h-4 w-4 ml-2 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-2 flex-shrink-0" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 pt-0 border-t">
                    <div className="mt-3 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Analysis</h4>
                        <p>{insight.details}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Sylvia's Recommendations</h4>
                        <ul className="space-y-2">
                          {insight.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-sylvia-600 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full border-sylvia-200 text-sylvia-700 hover:bg-sylvia-50">
                <Brain className="mr-2 h-4 w-4" />
                Generate More Insights
              </Button>
            </CardFooter>
          </Card>

          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalResponses}</div>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-100 text-green-800 border-0">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    25% increase
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">vs. previous month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Satisfaction</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.averageSatisfaction}/5</div>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-100 text-green-800 border-0">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    0.3 points
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">vs. previous month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.npsScore}</div>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-100 text-green-800 border-0">
                    <ArrowUpRight className="h-3 w-3 mr-1" />8 points
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">vs. previous month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.completionRate}%</div>
                <div className="flex items-center mt-1">
                  <Badge className="bg-amber-100 text-amber-800 border-0">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    2%
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">vs. previous month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different analytics views */}
          <Tabs defaultValue="trends">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="segments">Segments</TabsTrigger>
              <TabsTrigger value="feedback">Verbatim Feedback</TabsTrigger>
              <TabsTrigger value="features">Feature Analysis</TabsTrigger>
              <TabsTrigger value="churn">Churn Analysis</TabsTrigger>
            </TabsList>

            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Satisfaction Trend</CardTitle>
                    <CardDescription>Average satisfaction score over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[340px] overflow-x-auto">
                    <ChartContainer
                      config={{
                        satisfaction: {
                          label: "Satisfaction",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-full min-w-[340px]"
                    >
                      <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={satisfactionTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[3.5, 4.5]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="satisfaction"
                            stroke="#7c3aed"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>NPS Trend</CardTitle>
                    <CardDescription>Net Promoter Score over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[340px] overflow-x-auto">
                    <ChartContainer
                      config={{
                        nps: {
                          label: "NPS",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-full min-w-[340px]"
                    >
                      <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={npsTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[55, 80]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="nps"
                            stroke="#06b6d4"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="h-full min-h-[340px]">
                <CardHeader>
                  <CardTitle>NPS Breakdown</CardTitle>
                  <CardDescription>Distribution of promoters, passives, and detractors</CardDescription>
                </CardHeader>
                <CardContent className="h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={npsBreakdownData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        label
                      >
                        {npsBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Segments Tab */}
            <TabsContent value="segments" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Satisfaction by Role</CardTitle>
                    <CardDescription>How different roles rate their satisfaction</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={satisfactionByRoleData}
                          dataKey="satisfaction"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          label
                        >
                          {satisfactionByRoleData.map((entry, index) => (
                            <Cell key={`cell-role-${index}`} fill={["#7c3aed", "#06b6d4", "#f59e42", "#a3e635"][index % 4]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Response Distribution</CardTitle>
                    <CardDescription>Breakdown of responses by company size</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>200+ employees</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>51-200 employees</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>11-50 employees</span>
                        <span>20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Tenure</CardTitle>
                  <CardDescription>How long customers have been using the product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>1-2 years</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>More than 2 years</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>6-12 months</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Less than 6 months</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Verbatim Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Quotes</CardTitle>
                  <CardDescription>Direct feedback from survey respondents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {customerQuotes.map((quote) => (
                    <div key={quote.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <MessageSquareQuote
                            className={`h-5 w-5 ${
                              quote.sentiment === "positive"
                                ? "text-green-500"
                                : quote.sentiment === "negative"
                                  ? "text-red-500"
                                  : "text-amber-500"
                            }`}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="italic">&ldquo;{quote.text}&rdquo;</p>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {quote.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="font-medium">{quote.author}</span>
                              <span className="text-muted-foreground">
                                {" "}
                                · {quote.role}, {quote.company}
                              </span>
                            </div>
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {quote.topic}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Responses
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                  <CardDescription>AI-powered analysis of open-ended responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Overall Sentiment</h3>
                        <Badge className="bg-green-100 text-green-800 border-0">78% Positive</Badge>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 w-[78%]" />
                        <div className="bg-amber-500 w-[12%]" />
                        <div className="bg-red-500 w-[10%]" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Positive (78%)</span>
                        <span>Neutral (12%)</span>
                        <span>Negative (10%)</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-3">Sentiment by Feature</h3>
                      <ChartContainer
                        config={{
                          positive: {
                            label: "Positive",
                            color: "hsl(142.1 76.2% 36.3%)",
                          },
                          negative: {
                            label: "Negative",
                            color: "hsl(0 84.2% 60.2%)",
                          },
                        }}
                        className="h-[250px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={sentimentByFeatureData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis dataKey="name" type="category" width={80} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="positive" stackId="a" fill="var(--color-positive)" />
                            <Bar dataKey="negative" stackId="a" fill="var(--color-negative)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feature Analysis Tab */}
            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage</CardTitle>
                  <CardDescription>Most used features based on survey responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      usage: {
                        label: "Usage %",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={featureUsageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="usage" fill="var(--color-usage)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Feature Requests</CardTitle>
                  <CardDescription>Most requested features from survey responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topFeatureRequests.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{feature}</span>
                        <Badge variant="outline">
                          {5 - index} mention{index < 4 ? "s" : ""}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Feature Gap Analysis</CardTitle>
                  <CardDescription>Comparing feature importance vs. satisfaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 mb-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-amber-800">Opportunity Alert</h4>
                        <p className="text-sm text-amber-700">
                          API Documentation has high importance (85%) but low satisfaction (65%). This represents a key
                          improvement opportunity.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Churn Analysis Tab */}
            <TabsContent value="churn" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="h-full min-h-[340px]">
                  <CardHeader>
                    <CardTitle>Churn Reasons</CardTitle>
                    <CardDescription>Top reasons for customer churn</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={churnReasonData}
                          dataKey="percentage"
                          nameKey="reason"
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          label
                        >
                          {churnReasonData.map((entry, index) => (
                            <Cell key={`cell-churn-${index}`} fill={["#f59e42", "#ef4444", "#06b6d4", "#7c3aed", "#a3e635", "#fbbf24"][index % 6]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Churn by Segment</CardTitle>
                    <CardDescription>Churn rate and average tenure by segment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={churnBySegmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="segment" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="churnRate" fill="#ef4444" name="Churn Rate (%)" />
                        <Bar dataKey="avgTenure" fill="#06b6d4" name="Avg Tenure (months)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Churned Customer Quotes</CardTitle>
                  <CardDescription>Direct feedback from churned customers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {churnedCustomerQuotes.map((quote) => (
                    <div key={quote.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <MessageSquareQuote
                            className={`h-5 w-5 ${
                              quote.sentiment === "positive"
                                ? "text-green-500"
                                : quote.sentiment === "negative"
                                  ? "text-red-500"
                                  : "text-amber-500"
                            }`}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="italic">&ldquo;{quote.text}&rdquo;</p>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {quote.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <span className="font-medium">{quote.author}</span>
                              <span className="text-muted-foreground">
                                {" "}
                                · {quote.role}, {quote.company}
                              </span>
                            </div>
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs">
                              {quote.churnReason}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Churned Responses
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
