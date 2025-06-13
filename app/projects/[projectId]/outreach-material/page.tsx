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

  // Check if this is the completed project
  const isCompleted = currentProject?.status === "completed"

  const [emailSubject, setEmailSubject] = useState(
    isCompleted
      ? "Your feedback matters - Enterprise Customer Satisfaction Survey"
      : "Help us improve - Product Feedback Survey",
  )
  const [emailBody, setEmailBody] = useState(
    isCompleted
      ? `Dear [Name],

We value your partnership and would love to hear about your experience with our platform. Your feedback helps us continue to improve and better serve customers like you.

This brief survey will take approximately 5-7 minutes to complete and covers:
• Your overall satisfaction with our product
• Features you find most valuable
• Areas where we can improve
• Your future needs and requirements

Your responses will be kept confidential and used solely to enhance our product and services.

[Survey Link]

Thank you for your time and continued partnership.

Best regards,
The Customer Success Team`
      : "",
  )

  const [reminderSubject, setReminderSubject] = useState(isCompleted ? "Reminder: Share your feedback with us" : "")
  const [reminderBody, setReminderBody] = useState(
    isCompleted
      ? `Hi [Name],

We recently sent you a survey about your experience with our platform. If you haven't had a chance to complete it yet, we'd really appreciate your feedback.

The survey takes just 5-7 minutes and your insights are invaluable in helping us improve.

[Survey Link]

Thank you!

Best regards,
The Customer Success Team`
      : "",
  )

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
            <h1 className="text-3xl font-bold">Outreach Material</h1>
            <p className="text-muted-foreground mt-1">Create and customize your survey invitation emails</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isCompleted && (
            <>
              <Dialog>
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
                    <DialogTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      Sylvia AI Email Generation
                    </DialogTitle>
                    <DialogDescription>
                      Let Sylvia create personalized outreach emails based on your project context, target audience, and
                      communication goals.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-type">Email Type</Label>
                      <Select defaultValue="invitation">
                        <SelectTrigger id="email-type">
                          <SelectValue placeholder="Select email type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="invitation">Initial Invitation</SelectItem>
                          <SelectItem value="reminder">Reminder Email</SelectItem>
                          <SelectItem value="thankyou">Thank You Message</SelectItem>
                          <SelectItem value="all">All Templates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
                    <div className="space-y-2">
                      <Label htmlFor="additional-context">Additional Context (Optional)</Label>
                      <Textarea
                        id="additional-context"
                        placeholder="Provide any specific messaging requirements, company culture notes, or relationship context..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with Sylvia
                    </Button>
                  </DialogFooter>
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
                <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
                  <Link href={`/projects/${projectId}/outreach-campaign`}>
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
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

      <Tabs defaultValue="invitation" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="invitation">Initial Invitation</TabsTrigger>
          <TabsTrigger value="reminder">Reminder</TabsTrigger>
          <TabsTrigger value="thankyou">Thank You</TabsTrigger>
        </TabsList>

        <TabsContent value="invitation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-sylvia-600" />
                Initial Invitation Email
              </CardTitle>
              <CardDescription>The first email sent to invite participants to your survey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject Line</Label>
                <Input
                  id="email-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject"
                  disabled={isCompleted}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-body">Email Body</Label>
                <Textarea
                  id="email-body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
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
              <CardDescription>Follow-up email for participants who haven't responded yet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-subject">Subject Line</Label>
                <Input
                  id="reminder-subject"
                  value={reminderSubject}
                  onChange={(e) => setReminderSubject(e.target.value)}
                  placeholder="Enter reminder subject"
                  disabled={isCompleted}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-body">Email Body</Label>
                <Textarea
                  id="reminder-body"
                  value={reminderBody}
                  onChange={(e) => setReminderBody(e.target.value)}
                  placeholder="Enter reminder content"
                  rows={10}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thankyou" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-sylvia-600" />
                Thank You Message
              </CardTitle>
              <CardDescription>Message shown after participants complete the survey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thankyou-title">Page Title</Label>
                <Input
                  id="thankyou-title"
                  defaultValue={isCompleted ? "Thank you for your feedback!" : ""}
                  placeholder="Enter thank you page title"
                  disabled={isCompleted}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thankyou-message">Thank You Message</Label>
                <Textarea
                  id="thankyou-message"
                  defaultValue={
                    isCompleted
                      ? `Thank you for taking the time to complete our survey. Your feedback is invaluable in helping us improve our product and services.

We'll review all responses carefully and use your insights to enhance your experience with our platform.

If you have any additional questions or feedback, please don't hesitate to reach out to our team.

Best regards,
The Customer Success Team`
                      : ""
                  }
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
    </div>
  )
}
