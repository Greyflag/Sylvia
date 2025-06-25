import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { AlertCircle, BarChart3, ChevronLeft, Download, PieChart } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-4">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center">6</div>
            Analytics & Reporting
          </h1>
          <p className="text-gray-500 mt-2">Analyze survey responses and generate insights.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>Share Results</Button>
        </div>
      </div>

      <Alert variant="warning">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          This stage requires active campaigns with responses. Analytics will be available once responses start coming
          in.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">60%</div>
                <p className="text-xs text-gray-500">3 out of 5 contacts</p>
                <div className="mt-4 h-2 bg-gray-100 rounded-full">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Average Completion Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.5 minutes</div>
                <p className="text-xs text-gray-500">Within expected range</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Net Promoter Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+42</div>
                <p className="text-xs text-gray-500">Good (25-50 is average)</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Response Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border">
                  <div className="text-center p-4">
                    <PieChart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Placeholder for response trend visualization</p>
                    <p className="text-sm text-gray-400 mt-2">Custom visualization will be implemented here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="p-2 bg-green-50 rounded-md text-green-800">
                    92% of respondents rated our customer service as "Good" or "Excellent"
                  </li>
                  <li className="p-2 bg-yellow-50 rounded-md text-yellow-800">
                    Feature X was identified as needing improvement by 45% of users
                  </li>
                  <li className="p-2 bg-blue-50 rounded-md text-blue-800">
                    Enterprise customers (1000+ employees) showed higher satisfaction overall
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="p-2 border rounded-md">
                    <strong>Improve Feature X</strong>
                    <p className="text-gray-500 mt-1">Based on feedback from 45% of respondents</p>
                  </li>
                  <li className="p-2 border rounded-md">
                    <strong>Expand Enterprise Support Team</strong>
                    <p className="text-gray-500 mt-1">To maintain high satisfaction among key accounts</p>
                  </li>
                  <li className="p-2 border rounded-md">
                    <strong>Follow up with non-respondents</strong>
                    <p className="text-gray-500 mt-1">To increase response rate from current 60%</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="responses">
          <Card>
            <CardContent className="p-6">
              <div className="text-center p-8">
                <BarChart3 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Detailed Response Data</h3>
                <p className="text-gray-500 mb-4">
                  View individual responses and analyze patterns across different segments.
                </p>
                <Button>View All Responses</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardContent className="p-6">
              <div className="text-center p-8">
                <PieChart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">AI-Generated Insights</h3>
                <p className="text-gray-500 mb-4">Our AI analyzes response patterns to generate actionable insights.</p>
                <Button>Generate Insights</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardContent className="p-6">
              <div className="text-center p-8">
                <Download className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Export Options</h3>
                <p className="text-gray-500 mb-4">Export your data and reports in various formats.</p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline">Export as CSV</Button>
                  <Button variant="outline">Export as PDF</Button>
                  <Button variant="outline">Export as PPTX</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/outreach-campaign">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Outreach Campaign
          </Link>
        </Button>
        <Button asChild>
          <Link href="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
