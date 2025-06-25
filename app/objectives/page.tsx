
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ChevronRight, FileText, Target } from "lucide-react"

export default function ObjectivesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-4">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center">1</div>
            Define Objectives
          </h1>
          <p className="text-gray-500 mt-2">Define your survey objectives and key performance indicators.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button asChild>
            <Link href="/question-set">
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>


      <Tabs defaultValue="objectives" className="space-y-4">
        <TabsList>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="knowledge-base">Knowledge Base</TabsTrigger>
        </TabsList>
        <TabsContent value="objectives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Primary Objective
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Objective Title</label>
                <Input placeholder="e.g., Understand customer satisfaction with our enterprise solution" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe the main goal of this survey..." />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Secondary Objectives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Objective 1</label>
                <Input placeholder="e.g., Identify most used features" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Objective 2</label>
                <Input placeholder="e.g., Understand pain points in the user experience" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Objective 3</label>
                <Input placeholder="e.g., Gather feedback on recent updates" />
              </div>
              <Button variant="outline" size="sm">
                + Add Another Objective
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Key Performance Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">KPI 1</label>
                <Input placeholder="e.g., Net Promoter Score (NPS)" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">KPI 2</label>
                <Input placeholder="e.g., Customer Satisfaction Score (CSAT)" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">KPI 3</label>
                <Input placeholder="e.g., Customer Effort Score (CES)" />
              </div>
              <Button variant="outline" size="sm">
                + Add Another KPI
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="knowledge-base">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Net Promoter Score (NPS)</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    NPS measures customer loyalty by asking customers how likely they are to recommend your product or
                    service to others on a scale of 0-10.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Customer Satisfaction Score (CSAT)</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    CSAT measures customer satisfaction with a product, service, or experience by asking customers to
                    rate their satisfaction on a scale.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Customer Effort Score (CES)</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    CES measures how much effort a customer has to exert to get an issue resolved, a request fulfilled,
                    or a product purchased.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
