"use client"

import { useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjectQuestionSet } from "@/lib/data-service"
import { useProject } from "@/components/project-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Edit,
  FileText,
  Plus,
  Trash2,
  Zap,
  Sparkles,
  HelpCircle,
  Star,
  BarChart3,
  MessageSquare,
  CheckSquare,
  List,
} from "lucide-react"

export default function QuestionSetPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const projectId = params.projectId as string
  const { currentProject } = useProject()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedQuestionType, setSelectedQuestionType] = useState("multiple-choice")

  // Get questions for this project
  const questions = getProjectQuestionSet(projectId)

  // Group questions by section
  const sections = [...new Set(questions.map((q) => q.section))]

  // Check if this is the completed project
  const isCompleted = currentProject?.status === "completed"

  // Question type configurations
  const questionTypes = [
    {
      id: "multiple-choice",
      name: "Multiple Choice",
      icon: List,
      description: "Single selection from predefined options",
      example: "What is your company size?",
      options: ["1-50 employees", "51-200 employees", "200+ employees"],
      useCase: "Demographic data, categorization, simple preferences",
    },
    {
      id: "checkbox",
      name: "Multiple Select",
      icon: CheckSquare,
      description: "Multiple selections from predefined options",
      example: "Which features do you use most often?",
      options: ["Analytics", "Reporting", "API Integration", "Mobile App"],
      useCase: "Feature usage, multiple preferences, behavior tracking",
    },
    {
      id: "rating",
      name: "Rating Scale",
      icon: Star,
      description: "Numerical rating scale (1-5 or 1-10)",
      example: "How satisfied are you with our product?",
      scale: 5,
      useCase: "Satisfaction measurement, quality assessment, performance rating",
    },
    {
      id: "nps",
      name: "Net Promoter Score",
      icon: BarChart3,
      description: "0-10 scale for measuring customer loyalty",
      example: "How likely are you to recommend our product?",
      scale: 10,
      useCase: "Customer loyalty, recommendation likelihood, brand advocacy",
    },
    {
      id: "open-ended",
      name: "Open-Ended",
      icon: MessageSquare,
      description: "Free text response for detailed feedback",
      example: "What improvements would you like to see?",
      useCase: "Detailed feedback, suggestions, qualitative insights",
    },
  ]

  const selectedType = questionTypes.find((type) => type.id === selectedQuestionType)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Question Set</h1>
          <p className="text-muted-foreground mt-1">Design and manage your survey questions</p>
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
                    Auto-Generate Questions
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      AI Question Generation
                    </DialogTitle>
                    <DialogDescription>
                      Let our AI generate survey questions based on your project objectives and industry best practices.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="focus-area">Focus Area</Label>
                      <Select defaultValue="satisfaction">
                        <SelectTrigger id="focus-area">
                          <SelectValue placeholder="Select focus area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satisfaction">Customer Satisfaction</SelectItem>
                          <SelectItem value="product-feedback">Product Feedback</SelectItem>
                          <SelectItem value="feature-requests">Feature Requests</SelectItem>
                          <SelectItem value="user-experience">User Experience</SelectItem>
                          <SelectItem value="market-research">Market Research</SelectItem>
                          <SelectItem value="competitive-analysis">Competitive Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry Context</Label>
                      <Select defaultValue="technology">
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="question-count">Number of Questions</Label>
                      <Select defaultValue="10">
                        <SelectTrigger id="question-count">
                          <SelectValue placeholder="Select number of questions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 questions</SelectItem>
                          <SelectItem value="10">10 questions</SelectItem>
                          <SelectItem value="15">15 questions</SelectItem>
                          <SelectItem value="20">20 questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additional-context">Additional Context (Optional)</Label>
                      <Textarea
                        id="additional-context"
                        placeholder="Provide any specific requirements or context for question generation..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Questions
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-sylvia-600 hover:bg-sylvia-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Question</DialogTitle>
                    <DialogDescription>
                      Create a new question for your survey. Choose the question type and configure the details.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    {/* Question Type Selection */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Question Type</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {questionTypes.map((type) => (
                          <div
                            key={type.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedQuestionType === type.id
                                ? "border-sylvia-600 bg-sylvia-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedQuestionType(type.id)}
                          >
                            <div className="flex items-start gap-3">
                              <type.icon
                                className={`h-5 w-5 mt-0.5 ${
                                  selectedQuestionType === type.id ? "text-sylvia-600" : "text-gray-400"
                                }`}
                              />
                              <div className="flex-1">
                                <h3 className="font-medium text-sm">{type.name}</h3>
                                <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Question Type Preview */}
                    {selectedType && (
                      <div className="space-y-3">
                        <Label className="text-base font-medium">Preview & Use Case</Label>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-3 mb-3">
                            <selectedType.icon className="h-5 w-5 text-sylvia-600 mt-0.5" />
                            <div>
                              <h3 className="font-medium">{selectedType.name}</h3>
                              <p className="text-sm text-muted-foreground">{selectedType.useCase}</p>
                            </div>
                          </div>
                          <div className="border-l-2 border-sylvia-200 pl-4">
                            <p className="font-medium text-sm mb-2">{selectedType.example}</p>
                            {selectedType.options && (
                              <div className="space-y-1">
                                {selectedType.options.map((option, index) => (
                                  <div key={index} className="flex items-center gap-2 text-sm">
                                    <input
                                      type={selectedType.id === "checkbox" ? "checkbox" : "radio"}
                                      disabled
                                      className="text-sylvia-600"
                                    />
                                    <span>{option}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {selectedType.scale && (
                              <div className="flex items-center gap-2">
                                {Array.from({ length: selectedType.scale }).map((_, index) => (
                                  <div key={index} className="flex flex-col items-center">
                                    <input type="radio" disabled className="text-sylvia-600" />
                                    <span className="text-xs mt-1">{index + 1}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {selectedType.id === "open-ended" && (
                              <Textarea placeholder="Type your answer here..." disabled rows={2} />
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Question Configuration */}
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="section">Section</Label>
                          <Select defaultValue="demographics">
                            <SelectTrigger id="section">
                              <SelectValue placeholder="Select section" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="demographics">Demographics</SelectItem>
                              <SelectItem value="usage">Usage</SelectItem>
                              <SelectItem value="satisfaction">Satisfaction</SelectItem>
                              <SelectItem value="future-needs">Future Needs</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subsection">Subsection</Label>
                          <Input id="subsection" placeholder="E.g., Customer Information" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="question">Question Text</Label>
                        <Textarea id="question" placeholder="Enter your question here" />
                      </div>

                      {/* Dynamic fields based on question type */}
                      {(selectedQuestionType === "multiple-choice" || selectedQuestionType === "checkbox") && (
                        <div className="space-y-2">
                          <Label>Answer Options</Label>
                          <div className="space-y-2">
                            <Input placeholder="Option 1" />
                            <Input placeholder="Option 2" />
                            <Input placeholder="Option 3" />
                            <Button variant="outline" size="sm" className="w-full">
                              <Plus className="h-4 w-4 mr-1" />
                              Add Option
                            </Button>
                          </div>
                        </div>
                      )}

                      {(selectedQuestionType === "rating" || selectedQuestionType === "nps") && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="scale">Scale</Label>
                            <Select defaultValue={selectedQuestionType === "nps" ? "10" : "5"}>
                              <SelectTrigger id="scale">
                                <SelectValue placeholder="Select scale" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3">1-3</SelectItem>
                                <SelectItem value="5">1-5</SelectItem>
                                <SelectItem value="7">1-7</SelectItem>
                                <SelectItem value="10">1-10</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="labels">Scale Labels</Label>
                            <Select defaultValue="standard">
                              <SelectTrigger id="labels">
                                <SelectValue placeholder="Select labels" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">Standard (1, 2, 3...)</SelectItem>
                                <SelectItem value="satisfaction">Satisfaction (Poor to Excellent)</SelectItem>
                                <SelectItem value="agreement">Agreement (Disagree to Agree)</SelectItem>
                                <SelectItem value="likelihood">Likelihood (Unlikely to Likely)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="required">Required</Label>
                          <Select defaultValue="yes">
                            <SelectTrigger id="required">
                              <SelectValue placeholder="Is this required?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="objective">Related Objective</Label>
                          <Input id="objective" placeholder="E.g., Understand customer satisfaction" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700">
                      Save Question
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Preview Survey
          </Button>
        </div>
      </div>

      {isCompleted ? (
        <Card className="bg-white/50 border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <CheckCircle className="h-5 w-5" />
              <h2 className="text-lg font-medium">Question Set Complete</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              This question set has been finalized and used in the survey. You can view the questions below.
            </p>
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
              Create your survey questions based on your research objectives. You can add different question types and
              organize them into sections.
            </p>
            <div className="flex flex-wrap gap-2">
              {questionTypes.map((type) => (
                <Badge key={type.id} variant="outline" className="bg-white">
                  {type.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="all">All Questions</TabsTrigger>
          {sections.map((section) => (
            <TabsTrigger key={section} value={section.toLowerCase()}>
              {section}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Questions ({questions.length})</CardTitle>
              <CardDescription>View and manage all questions in your survey</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Required</TableHead>
                    {!isCompleted && <TableHead className="text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.length > 0 ? (
                    questions.map((question, index) => (
                      <TableRow key={question.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{question.question}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {question.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{question.section}</TableCell>
                        <TableCell>{question.required ? "Yes" : "No"}</TableCell>
                        {!isCompleted && (
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={isCompleted ? 5 : 6} className="text-center py-6 text-muted-foreground">
                        <div className="flex flex-col items-center gap-3">
                          <HelpCircle className="h-12 w-12 text-gray-300" />
                          <div>
                            <h3 className="font-medium mb-1">No questions added yet</h3>
                            <p className="text-sm">Get started by adding questions manually or using AI generation</p>
                          </div>
                          {!isCompleted && (
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Auto-Generate
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <Sparkles className="h-5 w-5 text-purple-600" />
                                      AI Question Generation
                                    </DialogTitle>
                                    <DialogDescription>
                                      Let our AI generate survey questions based on your project objectives and industry
                                      best practices.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="focus-area">Focus Area</Label>
                                      <Select defaultValue="satisfaction">
                                        <SelectTrigger id="focus-area">
                                          <SelectValue placeholder="Select focus area" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="satisfaction">Customer Satisfaction</SelectItem>
                                          <SelectItem value="product-feedback">Product Feedback</SelectItem>
                                          <SelectItem value="feature-requests">Feature Requests</SelectItem>
                                          <SelectItem value="user-experience">User Experience</SelectItem>
                                          <SelectItem value="market-research">Market Research</SelectItem>
                                          <SelectItem value="competitive-analysis">Competitive Analysis</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="industry">Industry Context</Label>
                                      <Select defaultValue="technology">
                                        <SelectTrigger id="industry">
                                          <SelectValue placeholder="Select industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="technology">Technology</SelectItem>
                                          <SelectItem value="finance">Finance</SelectItem>
                                          <SelectItem value="healthcare">Healthcare</SelectItem>
                                          <SelectItem value="retail">Retail</SelectItem>
                                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                          <SelectItem value="education">Education</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="question-count">Number of Questions</Label>
                                      <Select defaultValue="10">
                                        <SelectTrigger id="question-count">
                                          <SelectValue placeholder="Select number of questions" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="5">5 questions</SelectItem>
                                          <SelectItem value="10">10 questions</SelectItem>
                                          <SelectItem value="15">15 questions</SelectItem>
                                          <SelectItem value="20">20 questions</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                                      <Sparkles className="mr-2 h-4 w-4" />
                                      Generate Questions
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" className="bg-sylvia-600 hover:bg-sylvia-700">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Manually
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Add New Question</DialogTitle>
                                    <DialogDescription>
                                      Create a new question for your survey. Choose the question type and configure the
                                      details.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-6 py-4">
                                    {/* Question Type Selection */}
                                    <div className="space-y-3">
                                      <Label className="text-base font-medium">Question Type</Label>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {questionTypes.map((type) => (
                                          <div
                                            key={type.id}
                                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                              selectedQuestionType === type.id
                                                ? "border-sylvia-600 bg-sylvia-50"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                            onClick={() => setSelectedQuestionType(type.id)}
                                          >
                                            <div className="flex items-start gap-3">
                                              <type.icon
                                                className={`h-5 w-5 mt-0.5 ${
                                                  selectedQuestionType === type.id ? "text-sylvia-600" : "text-gray-400"
                                                }`}
                                              />
                                              <div className="flex-1">
                                                <h3 className="font-medium text-sm">{type.name}</h3>
                                                <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <Separator />

                                    {/* Question Configuration */}
                                    <div className="grid gap-4">
                                      <div className="space-y-2">
                                        <Label htmlFor="question">Question Text</Label>
                                        <Textarea id="question" placeholder="Enter your question here" />
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit" className="bg-sylvia-600 hover:bg-sylvia-700">
                                      Save Question
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {sections.map((section) => (
          <TabsContent key={section} value={section.toLowerCase()} className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>
                  {section} Questions ({questions.filter((q) => q.section === section).length})
                </CardTitle>
                <CardDescription>Questions related to {section.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subsection</TableHead>
                      <TableHead>Required</TableHead>
                      {!isCompleted && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {questions
                      .filter((q) => q.section === section)
                      .map((question, index) => (
                        <TableRow key={question.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{question.question}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {question.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{question.subSection}</TableCell>
                          <TableCell>{question.required ? "Yes" : "No"}</TableCell>
                          {!isCompleted && (
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
