import { ProgressTracker } from "@/components/progress-tracker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ClipboardList, Edit, Eye, MessageSquare, Plus, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function QuestionSetPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-4">
            <div className="bg-sylvia-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            Question Set Generation
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and edit survey questions with our collaborative text editor.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
            <Link href="/contacts">
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <ProgressTracker />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Question Overview */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-md flex items-center">
                <ClipboardList className="mr-2 h-4 w-4 text-sylvia-600" />
                Question Set
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Section 1: Demographics</h3>
                  <div className="pl-2 border-l-2 border-sylvia-600 bg-sylvia-50 p-2 mt-1 text-sm">
                    1.1 Customer Information
                  </div>
                  <div className="pl-4 text-sm py-1 hover:text-sylvia-600 cursor-pointer">1.1.1 Company Size</div>
                  <div className="pl-4 text-sm py-1 hover:text-sylvia-600 cursor-pointer">1.1.2 Industry</div>
                  <div className="pl-4 text-sm py-1 hover:text-sylvia-600 cursor-pointer">1.1.3 Role</div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Section 2: Usage</h3>
                  <div className="pl-4 text-sm py-1 hover:text-sylvia-600 cursor-pointer">2.1 Product Usage</div>
                  <div className="pl-4 text-sm py-1 hover:text-sylvia-600 cursor-pointer">2.2 Integration</div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Section 3: Satisfaction</h3>
                  <div className="pl-4 text-sm py-1 hover:text-sylvia-600 cursor-pointer">3.1 Overall Experience</div>
                  <div className="pl-4 text-sm py-1 hover:text-sylvia-600 cursor-pointer">3.2 Specific Features</div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Section 4: Future Needs</h3>
                  <div className="pl-4 text-sm py-1 hover:text-sylvia-600 cursor-pointer">4.1 Desired Features</div>
                  <div className="pl-4 text-sm py-1 hover:text-sylvia-600 cursor-pointer">4.2 Pain Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-md flex items-center">
                <ClipboardList className="mr-2 h-4 w-4 text-sylvia-600" />
                Selection Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-sylvia-600"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span className="ml-1">Linked Objective</span>
                  </div>
                  <div className="text-sm p-2 bg-white/50 rounded border mt-1">
                    Understanding customer demographics to segment analysis
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-sylvia-600"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                      <line x1="9" y1="12" x2="15" y2="12"></line>
                    </svg>
                    <span className="ml-1">Linked Template</span>
                  </div>
                  <div className="text-sm p-2 bg-white/50 rounded border mt-1">
                    Demographic Classification - Enterprise
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-sylvia-600"
                    >
                      <line x1="12" y1="20" x2="12" y2="10"></line>
                      <line x1="18" y1="20" x2="18" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="16"></line>
                    </svg>
                    <span className="ml-1">Linked KPI</span>
                  </div>
                  <div className="text-sm p-2 bg-sylvia-50 rounded border border-sylvia-200 text-sylvia-700 font-medium mt-1">
                    Customer profile completeness
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-sylvia-600"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span className="ml-1">Question Type</span>
                  </div>
                  <div className="text-sm p-2 bg-white/50 rounded border mt-1">Multiple choice</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 2: Survey Preview */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-md flex items-center">
              <Eye className="mr-2 h-4 w-4 text-sylvia-600" />
              Survey Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
            <div className="space-y-6">
              <div className="border rounded-md bg-white/80">
                <div className="bg-white p-3 font-medium flex justify-between items-center border-b">
                  <span>Section 1: Demographics</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
                <div className="p-4 space-y-6">
                  {/* Selected question with highlight */}
                  <div className="border-l-4 border-sylvia-600 bg-sylvia-50 p-4 rounded-r-md">
                    <div className="font-medium mb-3">1.1.1 How many employees does your company have?</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="company-size" id="size-1" className="text-sylvia-600" />
                        <label htmlFor="size-1">1-50 employees</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="company-size" id="size-2" className="text-sylvia-600" />
                        <label htmlFor="size-2">51-200 employees</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="company-size" id="size-3" className="text-sylvia-600" />
                        <label htmlFor="size-3">201-500 employees</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="company-size" id="size-4" className="text-sylvia-600" />
                        <label htmlFor="size-4">501-1000 employees</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="company-size" id="size-5" className="text-sylvia-600" />
                        <label htmlFor="size-5">1000+ employees</label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b">
                    <div className="font-medium mb-3">1.1.2 Which industry best describes your business?</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="industry" id="ind-1" className="text-sylvia-600" />
                        <label htmlFor="ind-1">Technology</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="industry" id="ind-2" className="text-sylvia-600" />
                        <label htmlFor="ind-2">Finance</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="industry" id="ind-3" className="text-sylvia-600" />
                        <label htmlFor="ind-3">Healthcare</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="industry" id="ind-4" className="text-sylvia-600" />
                        <label htmlFor="ind-4">Manufacturing</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="industry" id="ind-5" className="text-sylvia-600" />
                        <label htmlFor="ind-5">Other (please specify)</label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="font-medium mb-3">1.1.3 What is your role in the organization?</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="role" id="role-1" className="text-sylvia-600" />
                        <label htmlFor="role-1">C-Level Executive</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="role" id="role-2" className="text-sylvia-600" />
                        <label htmlFor="role-2">Director</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="role" id="role-3" className="text-sylvia-600" />
                        <label htmlFor="role-3">Manager</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="role" id="role-4" className="text-sylvia-600" />
                        <label htmlFor="role-4">Individual Contributor</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-md bg-white/80">
                <div className="bg-white p-3 font-medium flex justify-between items-center">
                  <span>Section 2: Usage</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              <div className="border rounded-md bg-white/80">
                <div className="bg-white p-3 font-medium flex justify-between items-center">
                  <span>Section 3: Satisfaction</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>

              <div className="border rounded-md bg-white/80">
                <div className="bg-white p-3 font-medium flex justify-between items-center">
                  <span>Section 4: Future Needs</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Assistant */}
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-md flex items-center">
              <MessageSquare className="mr-2 h-4 w-4 text-sylvia-600" />
              AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Ask for suggestions to improve this question, generate options, or optimize for better responses..."
              className="mb-3 bg-white/80"
              rows={4}
            />
            <Button className="w-full bg-sylvia-600 hover:bg-sylvia-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              Generate Suggestions
            </Button>
          </CardContent>
        </Card>

        {/* Question Editor */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-md flex items-center">
              <Edit className="mr-2 h-4 w-4 text-sylvia-600" />
              Question Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="logic">Logic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Question Text</label>
                  <Textarea defaultValue="How many employees does your company have?" className="mt-1 bg-white/80" />
                </div>

                <div>
                  <label className="text-sm font-medium">Question Type</label>
                  <Select defaultValue="multiple-choice">
                    <SelectTrigger className="mt-1 bg-white/80">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice (single answer)</SelectItem>
                      <SelectItem value="checkbox">Multiple Choice (multiple answers)</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                      <SelectItem value="rating">Rating Scale</SelectItem>
                      <SelectItem value="open">Open-ended</SelectItem>
                      <SelectItem value="matrix">Matrix</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Response Options</label>
                  <div className="space-y-2 mt-1">
                    <Input defaultValue="1-50 employees" className="bg-white/80" />
                    <Input defaultValue="51-200 employees" className="bg-white/80" />
                    <Input defaultValue="201-500 employees" className="bg-white/80" />
                    <Input defaultValue="501-1000 employees" className="bg-white/80" />
                    <Input defaultValue="1000+ employees" className="bg-white/80" />
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Option
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="required" defaultChecked className="rounded text-sylvia-600" />
                  <label htmlFor="required" className="text-sm">
                    Required question
                  </label>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button className="bg-sylvia-600 hover:bg-sylvia-700">Save</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </TabsContent>

              <TabsContent value="logic">
                <div className="p-4 text-center text-gray-500">
                  Logic settings allow you to create conditional questions based on previous answers.
                </div>
              </TabsContent>

              <TabsContent value="advanced">
                <div className="p-4 text-center text-gray-500">
                  Advanced settings include validation rules, scoring, and custom CSS.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/objectives">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Objectives
          </Link>
        </Button>
        <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
          <Link href="/contacts">
            Continue to Contacts
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
