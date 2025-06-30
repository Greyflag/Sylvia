"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProject } from "@/components/project-context"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Copy, Edit, FileText, Mail, MessageSquare, Save, Zap, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function OutreachMaterialPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const { currentProject } = useProject()
  const [isCompleted, setIsCompleted] = useState(currentProject?.status === "completed")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("initial")
  const [emailContent, setEmailContent] = useState({
    initial: "",
    reminder: "",
    thankYou: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const loadingSteps = [
    "Analyzing your requirements...",
    "Researching best practices...",
    "Crafting personalized content...",
    "Optimizing for engagement...",
    "Finalizing templates...",
  ]

  const handleGenerate = async () => {
    setIsDialogOpen(false)
    setIsGenerating(true)
    
    // Simulate AI generation with steps
    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(i)
      await new Promise((resolve) => setTimeout(resolve, 1600)) // 8 seconds total (5 steps * 1.6 seconds)
    }

    // Generate content based on selected categories
    const tone = (document.getElementById("tone") as HTMLSelectElement)?.value || "professional"
    const audience = (document.getElementById("audience") as HTMLSelectElement)?.value || "enterprise"
    const surveyLength = (document.getElementById("survey-length") as HTMLSelectElement)?.value || "medium"
    const incentive = (document.getElementById("incentive") as HTMLSelectElement)?.value || "none"

    // Generate content for each email type
    const initialContent = generateInitialEmail(tone, audience, surveyLength, incentive)
    const reminderContent = generateReminderEmail(tone, audience, surveyLength, incentive)
    const thankYouContent = generateThankYouEmail(tone, audience, incentive)

    setEmailContent({
      initial: initialContent,
      reminder: reminderContent,
      thankYou: thankYouContent,
    })

    setIsGenerating(false)
    setLoadingStep(0)
  }

  const generateInitialEmail = (tone: string, audience: string, surveyLength: string, incentive: string) => {
    const timeEstimate = surveyLength === "short" ? "2-3 minutes" : surveyLength === "medium" ? "5-7 minutes" : "10-15 minutes"
    const incentiveText = incentive === "none" ? "" : `\n\nAs a token of our appreciation, we're offering ${getIncentiveText(incentive)}.`

    return `Dear [Name],

I hope this email finds you well. I'm reaching out because we value your feedback as a ${getAudienceText(audience)}.

We're conducting a survey to better understand your experience with our product/service, and your insights would be incredibly valuable. The survey will take approximately ${timeEstimate} to complete.${incentiveText}

[Survey Link]

Your feedback will help us improve our offerings and better serve your needs. Thank you for your time and consideration.

Best regards,
[Your Name]`
  }

  const generateReminderEmail = (tone: string, audience: string, surveyLength: string, incentive: string) => {
    const incentiveText = incentive === "none" ? "" : `\n\nRemember, as a token of our appreciation, we're offering ${getIncentiveText(incentive)}.`

    return `Dear [Name],

I wanted to follow up on our previous email regarding the survey. Your feedback is important to us, and we'd greatly appreciate your participation.${incentiveText}

[Survey Link]

If you've already completed the survey, please disregard this email. Thank you for your time.

Best regards,
[Your Name]`
  }

  const generateThankYouEmail = (tone: string, audience: string, incentive: string) => {
    const incentiveText = incentive === "none" ? "" : `\n\nWe'll be in touch shortly with ${getIncentiveText(incentive)}.`

    return `Dear [Name],

Thank you for taking the time to complete our survey. Your feedback is invaluable and will help us improve our products and services.${incentiveText}

If you have any additional thoughts or suggestions, please don't hesitate to reach out.

Best regards,
[Your Name]`
  }

  const getAudienceText = (audience: string) => {
    switch (audience) {
      case "enterprise":
        return "valued enterprise customer"
      case "smb":
        return "valued small business customer"
      case "technical":
        return "technical user"
      case "executives":
        return "executive leader"
      case "managers":
        return "department manager"
      case "end-users":
        return "end user"
      default:
        return "valued customer"
    }
  }

  const getIncentiveText = (incentive: string) => {
    switch (incentive) {
      case "report":
        return "an executive summary report of the survey results"
      case "gift-card":
        return "a gift card as a token of appreciation"
      case "donation":
        return "to make a donation to a charity of your choice"
      case "early-access":
        return "early access to the survey results"
      case "consultation":
        return "a free consultation session"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Outreach Material</h1>
          <p className="text-muted-foreground mt-1">Create and customize your survey invitation emails</p>
        </div>
        <div className="flex gap-2">
          {!isCompleted && (
            <>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-purple-200"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Sylvia Generated
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Generate Email Templates</DialogTitle>
                    <DialogDescription>
                      Let Sylvia help you create professional email templates based on your preferences.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Communication Tone</Label>
                      <Select defaultValue="professional">
                        <SelectTrigger id="tone">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select defaultValue="enterprise">
                        <SelectTrigger id="audience">
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enterprise">Enterprise Customers</SelectItem>
                          <SelectItem value="smb">Small-Medium Business</SelectItem>
                          <SelectItem value="technical">Technical Users</SelectItem>
                          <SelectItem value="executives">C-Level Executives</SelectItem>
                          <SelectItem value="managers">Department Managers</SelectItem>
                          <SelectItem value="end-users">End Users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="survey-length">Survey Length</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="survey-length">
                          <SelectValue placeholder="Select survey length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short (2-3 minutes)</SelectItem>
                          <SelectItem value="medium">Medium (5-7 minutes)</SelectItem>
                          <SelectItem value="long">Long (10-15 minutes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incentive">Incentive Offered</Label>
                      <Select defaultValue="none">
                        <SelectTrigger id="incentive">
                          <SelectValue placeholder="Select incentive" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Incentive</SelectItem>
                          <SelectItem value="report">Executive Summary Report</SelectItem>
                          <SelectItem value="gift-card">Gift Card</SelectItem>
                          <SelectItem value="donation">Charity Donation</SelectItem>
                          <SelectItem value="early-access">Early Access to Results</SelectItem>
                          <SelectItem value="consultation">Free Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      className="w-full bg-sylvia-600 hover:bg-sylvia-700"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with Sylvia
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button className="bg-sylvia-600 hover:bg-sylvia-700">
                <Save className="mr-2 h-4 w-4" />
                Save Templates
              </Button>
            </>
          )}
          <Button variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Copy Templates
          </Button>
          {!isCompleted && (
            <>
              <div className="flex gap-2">
                <Button variant="outline">Save Draft</Button>
              </div>
            </>
          )}
        </div>
      </div>

      {isCompleted ? (
        <Card className="bg-white/50 border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <CheckCircle className="h-5 w-5" />
              <h2 className="text-lg font-medium">Outreach Material Complete</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Email templates have been finalized and used in the survey campaign. View the templates below.
            </p>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Templates Created:</span>
                <span className="ml-1 font-medium">2</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Emails Sent:</span>
                <span className="ml-1 font-medium">10</span>
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
              Create compelling email templates to invite participants to your survey. Good outreach materials increase
              response rates and engagement.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-white">
                Initial Invitation
              </Badge>
              <Badge variant="outline" className="bg-white">
                Reminder Email
              </Badge>
              <Badge variant="outline" className="bg-white">
                Thank You Message
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="initial" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="initial">Initial Invitation</TabsTrigger>
          <TabsTrigger value="reminder">Reminder Email</TabsTrigger>
          <TabsTrigger value="thank-you">Thank You Message</TabsTrigger>
        </TabsList>

        <TabsContent value="initial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-sylvia-600" />
                Initial Invitation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="initial-subject">Email Subject</Label>
                <Input
                    id="initial-subject"
                  placeholder="Enter email subject"
                    className="mt-1 bg-white/80"
                  disabled={isCompleted}
                />
              </div>
                <div>
                  <Label htmlFor="initial-content">Email Content</Label>
                <Textarea
                    id="initial-content"
                    value={emailContent.initial}
                    onChange={(e) => setEmailContent({ ...emailContent, initial: e.target.value })}
                  placeholder="Enter email content"
                  rows={12}
                  disabled={isCompleted}
                />
              </div>
              {!isCompleted && (
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Sylvia Suggestions
                  </Button>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </div>
              )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminder" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-sylvia-600" />
                Reminder Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reminder-subject">Email Subject</Label>
                <Input
                  id="reminder-subject"
                    placeholder="Enter email subject"
                    className="mt-1 bg-white/80"
                  disabled={isCompleted}
                />
              </div>
                <div>
                  <Label htmlFor="reminder-content">Email Content</Label>
                <Textarea
                    id="reminder-content"
                    value={emailContent.reminder}
                    onChange={(e) => setEmailContent({ ...emailContent, reminder: e.target.value })}
                    placeholder="Enter reminder email content"
                    rows={12}
                  disabled={isCompleted}
                />
              </div>
              {!isCompleted && (
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Sylvia Suggestions
                  </Button>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </div>
              )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thank-you" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-sylvia-600" />
                Thank You Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="thank-you-subject">Email Subject</Label>
                <Input
                    id="thank-you-subject"
                    placeholder="Enter email subject"
                    className="mt-1 bg-white/80"
                  disabled={isCompleted}
                />
              </div>
                <div>
                  <Label htmlFor="thank-you-content">Email Content</Label>
                <Textarea
                    id="thank-you-content"
                    value={emailContent.thankYou}
                    onChange={(e) => setEmailContent({ ...emailContent, thankYou: e.target.value })}
                  placeholder="Enter thank you message"
                  rows={8}
                  disabled={isCompleted}
                />
              </div>
              {!isCompleted && (
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Sylvia Suggestions
                  </Button>
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </div>
              )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-sylvia-600" />
            Email Variables
          </CardTitle>
          <CardDescription>Use these variables in your email templates for personalization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <code className="text-sm font-mono">[Name]</code>
              <p className="text-xs text-muted-foreground mt-1">Contact's name</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <code className="text-sm font-mono">[Company]</code>
              <p className="text-xs text-muted-foreground mt-1">Company name</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <code className="text-sm font-mono">[Survey Link]</code>
              <p className="text-xs text-muted-foreground mt-1">Unique survey URL</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <code className="text-sm font-mono">[Unsubscribe]</code>
              <p className="text-xs text-muted-foreground mt-1">Unsubscribe link</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isGenerating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-sylvia-600 border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-sylvia-600" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Sylvia is working her magic</h3>
                <p className="text-muted-foreground">{loadingSteps[loadingStep]}</p>
              </div>
              <div className="w-full space-y-2">
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sylvia-600 transition-all duration-500"
                    style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Step {loadingStep + 1} of {loadingSteps.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
