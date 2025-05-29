import { ProgressTracker } from "@/components/progress-tracker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronLeft, ChevronRight, FileText, Mail } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export default function OutreachMaterialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-4">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center">4</div>
            Outreach Material
          </h1>
          <p className="text-gray-500 mt-2">Create email templates and outreach materials for your survey.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button asChild>
            <Link href="/outreach-campaign">
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <ProgressTracker />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Template
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email Subject</label>
            <Input
              placeholder="e.g., Your feedback is important to us"
              defaultValue="We value your opinion - Enterprise Customer Satisfaction Survey"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email Body</label>
            <Textarea
              rows={10}
              className="mt-1"
              defaultValue={`Dear [Contact Name],

We hope this email finds you well. At [Company Name], we are committed to continuously improving our products and services to better serve your needs.

We would greatly appreciate your feedback on your experience with our enterprise solution. Your insights will help us understand what we're doing well and where we can improve.

The survey should take approximately 5-10 minutes to complete. Please click the button below to start:

[SURVEY LINK]

Thank you for your time and valuable feedback.

Best regards,
The [Company Name] Team`}
            />
          </div>

          <div className="flex gap-2">
            <Button>Preview</Button>
            <Button variant="outline">Test Send</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Additional Materials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">
              Upload additional materials such as PDFs, images, or other resources to include in your outreach.
            </p>
            <Button variant="outline">Upload Files</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/contacts">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Contacts
          </Link>
        </Button>
        <Button asChild>
          <Link href="/outreach-campaign">
            Continue to Outreach Campaign
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
