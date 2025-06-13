"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjectQuestionSet, createQuestion, updateProject } from "@/lib/data-service"
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
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Loader2,
  Globe,
  Search,
  Brain,
} from "lucide-react"
import Link from "next/link"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// Sortable table row component
function SortableTableRow({ question, index, onEdit, onDelete }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="w-[50px]">
        <div className="flex items-center gap-2">
          <button
            className="cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </button>
          <span>{index + 1}</span>
        </div>
      </TableCell>
      <TableCell>{question.text}</TableCell>
      <TableCell>
        <Badge variant="outline">
          {questionTypes.find((t) => t.id === question.type)?.name || question.type}
        </Badge>
      </TableCell>
      <TableCell>{question.section}</TableCell>
      <TableCell>{question.required ? "Yes" : "No"}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(question)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(question.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

// Ensure questionTypes is defined at the top-level scope
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

export default function QuestionSetPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const projectId = params.projectId as string
  const { currentProject, setCurrentProject } = useProject()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedQuestionType, setSelectedQuestionType] = useState("multiple-choice")
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditQuestionOpen, setIsEditQuestionOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "multiple-choice",
    section: "General",
    required: false,
    options: [""],
  })
  const [editingQuestion, setEditingQuestion] = useState<any>(null)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)

  // NEW: Local state for questions
  const [questions, setQuestions] = useState<any[]>([])

  // Add state for the auto-generate dialog
  const [isAutoGenerateOpen, setIsAutoGenerateOpen] = useState(false);
  const [autoGenerateInput, setAutoGenerateInput] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiLoadingStep, setAILoadingStep] = useState(0);

  // On mount, initialize questions from data-service
  useEffect(() => {
    const initial = getProjectQuestionSet(projectId)
    setQuestions(initial)
  }, [projectId])

  // Group questions by section
  const sections = [...new Set(questions.map((q) => q.section))]

  // Check if this is the completed project
  const isCompleted = currentProject?.status === "completed"

  const selectedType = questionTypes.find((type) => type.id === selectedQuestionType)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) {
      return // Don't add empty questions
    }
    const question = {
      id: `q${questions.length + 1}_${Date.now()}`,
      text: newQuestion.text,
      type: newQuestion.type,
      section: newQuestion.section,
      required: newQuestion.required,
      options: newQuestion.type === "open-ended" ? [] : newQuestion.options.filter(opt => opt.trim() !== ""),
    }
    setQuestions(prev => [...prev, question])
    // Optionally persist
    createQuestion(projectId, question)
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        questionSet: [...questions, question],
      }
      updateProject(projectId, updatedProject)
      setCurrentProject(updatedProject)
    }
    setIsAddQuestionOpen(false)
    setNewQuestion({
      text: "",
      type: "multiple-choice",
      section: "General",
      required: false,
      options: [""],
    })
  }

  const handleSaveDraft = () => {
    if (currentProject) {
      updateProject(projectId, {
        ...currentProject,
        questionSet: questions,
      })
    }
  }

  const handlePreviewSurvey = () => {
    setIsPreviewOpen(true)
  }

  const handleEditQuestion = (question: any) => {
    setEditingQuestion({
      ...question,
      options: question.options || [""]
    })
    setIsEditQuestionOpen(true)
  }

  const handleUpdateQuestion = () => {
    if (!editingQuestion.text.trim()) {
      return
    }
    const updatedQuestions = questions.map((q) =>
      q.id === editingQuestion.id
        ? {
            ...editingQuestion,
            options: editingQuestion.type === "open-ended" ? [] : editingQuestion.options.filter((opt: string) => opt.trim() !== ""),
          }
        : q
    )
    setQuestions(updatedQuestions)
    // Optionally persist
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        questionSet: updatedQuestions,
      }
      updateProject(projectId, updatedProject)
      setCurrentProject(updatedProject)
    }
    setIsEditQuestionOpen(false)
    setEditingQuestion(null)
  }

  const handleDeleteClick = (questionId: string) => {
    setQuestionToDelete(questionId)
    setIsDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (questionToDelete) {
      const updatedQuestions = questions.filter((q) => q.id !== questionToDelete)
      setQuestions(updatedQuestions)
      // Optionally persist
      if (currentProject) {
        const updatedProject = {
          ...currentProject,
          questionSet: updatedQuestions,
        }
        updateProject(projectId, updatedProject)
        setCurrentProject(updatedProject)
      }
      setIsDeleteConfirmOpen(false)
      setQuestionToDelete(null)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id)
      const newIndex = questions.findIndex((q) => q.id === over.id)
      const updatedQuestions = arrayMove(questions, oldIndex, newIndex)
      setQuestions(updatedQuestions)
      // Optionally persist
      if (currentProject) {
        const updatedProject = {
          ...currentProject,
          questionSet: updatedQuestions,
        }
        updateProject(projectId, updatedProject)
        setCurrentProject(updatedProject)
      }
    }
  }

  // Handler for AI Generate
  const handleAIGenerate = () => {
    setIsAutoGenerateOpen(false);
    setIsAILoading(true);
    setAILoadingStep(0);
    // Animation steps
    const steps = [
      "Scouring the web for the latest research...",
      "Analyzing articles and extracting insights...",
      "Synthesizing survey questions...",
      "Finalizing your custom question set..."
    ];
    let step = 0;
    const interval = setInterval(() => {
      setAILoadingStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
      }
    }, 2500);
    setTimeout(() => {
      setIsAILoading(false);
      setAILoadingStep(0);
      // Add the provided question objects
      setQuestions(prev => ([
        // --- BEGIN provided question objects ---
        {
          id: "intro-1",
          text: "Thank you for taking our survey! We are always looking to improve our customer experience in an effort to better support organizations like yours. To that end, we are hoping to collect feedback from former customers like you to help inform our approach. We expect this survey will take 10-15 minutes to complete. Please answer as candidly and transparently as possible—we want to hear the 'hard truth' so we can improve! (Incentive information will be provided at the end of the survey.) To begin, please enter the email address this survey invitation was sent to—this will help ensure you don't receive repeat requests to participate.",
          type: "open-ended",
          section: "Introduction + Screeners",
          required: true,
          options: [],
        },
        {
          id: "intro-2",
          text: "Which best describes your current title at your organization?",
          type: "multiple-choice",
          section: "Introduction + Screeners",
          required: true,
          options: [
            "Prospect Researcher (e.g. Research Analyst)",
            "Fundraiser (e.g. Major Gift Officer, Development Associate)",
            "Leadership (e.g. VP of Development, Executive Director, Director of Research)",
            "Grant Writer (e.g. Grant Proposal Manager, Grant Coordinator)",
            "Marketer/Communications (e.g. Marketing Associate, Communications Manager)",
            "IT / Database Management (e.g. Database Administrator)",
            "Other:"
          ],
        },
        {
          id: "intro-3",
          text: "What was your personal involvement / usage of [ClientCompany] when your organization was subscribed / using it? Please check all that apply.",
          type: "checkbox",
          section: "Introduction + Screeners",
          required: true,
          options: [
            '"Power" / frequent user (e.g., weekly or more)',
            '"Light" / occasional user (e.g., monthly or less)',
            'Budget holder/Manager',
            "Not involved—wasn't part of my role [exclusive]",
            "N/A—I wasn't at the organization at the time [exclusive]"
          ],
        },
        {
          id: "intro-4",
          text: "What was your involvement in decisions / evaluations around [ClientCompany]? (E.g., the initial evaluation and selection of [ClientCompany], renewal decisions, etc.)",
          type: "multiple-choice",
          section: "Introduction + Screeners",
          required: true,
          options: [
            "Final decision-maker",
            "Decision influencer",
            "Visibility (but no influence)",
            "Wasn't involved at the time, but would be involved today",
            "Wasn't involved at the time and wouldn't be today"
          ],
        },
        {
          id: "intro-5",
          text: "What was your organization's total contribution revenue / donation volume in 2024?",
          type: "multiple-choice",
          section: "Introduction + Screeners",
          required: true,
          options: [
            "Under $250K",
            "$250K-$499K",
            "$500K-$999K",
            "$1M-$1.4M",
            "$1.5M-$1.9M",
            "$2M - $2.9M",
            "$3M-$4.9M",
            "$5M-$9.9M",
            "$10M or more"
          ],
        },
        {
          id: "intro-6",
          text: "Please fill in the blank: 'Roughly speaking, our organization defines gifts of ______ or higher to be 'major gifts.'",
          type: "open-ended",
          section: "Introduction + Screeners",
          required: false,
          options: [],
        },
        {
          id: "churn-1",
          text: "When did your organization first start using [ClientCompany]?",
          type: "multiple-choice",
          section: "[ClientCompany] churn",
          required: true,
          options: [
            "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017 or earlier", "Uncertain"
          ],
        },
        {
          id: "churn-2",
          text: "When did your organization discontinue your [ClientCompany] subscription?",
          type: "open-ended",
          section: "[ClientCompany] churn",
          required: false,
          options: [],
        },
        {
          id: "churn-3",
          text: "Why did your organization discontinue your [ClientCompany] subscription? Please be as detailed and candid as you can. We really appreciate transparent feedback.",
          type: "open-ended",
          section: "[ClientCompany] churn",
          required: false,
          options: [],
        },
        {
          id: "churn-4",
          text: "Why did your organization discontinue your [ClientCompany] subscription? Please take your time and check all that apply.",
          type: "checkbox",
          section: "[ClientCompany] churn",
          required: false,
          options: [
            "Budget constraints – too expensive for our org.",
            "Value considerations – didn't think we were getting enough 'bang for the buck' to justify keeping it",
            "Dissatisfied – bad experience with the product and/or service",
            "Mismatch – realized our organization wasn't really the right fit/profile for [ClientCompany] or that [ClientCompany] wasn't quite what we thought",
            '"Failure to launch" – we never managed to fully implement the solution / our people never really adopted it or grooved in',
            "Key user / advocate of the solution left the org.",
            "New leadership of the solution left the org.",
            "Episodic demand – we needed [ClientCompany] for a specific period of time, but we just don't need that kind of solution anymore",
            "Found an alternative solution(s) we preferred",
            "Other: write-in",
            "Our organization stopped fundraising operations altogether"
          ],
        },
        {
          id: "winback-1",
          text: "What (if anything) could [ClientCompany] do to win back your business?",
          type: "open-ended",
          section: "Win-back potential",
          required: false,
          options: [],
        },
        {
          id: "winback-2",
          text: "How likely is your organization to subscribe to [ClientCompany] again in the future?",
          type: "multiple-choice",
          section: "Win-back potential",
          required: false,
          options: [
            "Very likely",
            "More likely than not",
            "50/50",
            "Unlikely",
            "Very unlikely",
            "Uncertain"
          ],
        },
      ]));
      setAutoGenerateInput("");
    }, 10000);
  };

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
            <h1 className="text-3xl font-bold">Question Set</h1>
            <p className="text-muted-foreground mt-1">Design and manage your survey questions</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-gradient-to-r from-[#f5eafe] to-[#e0cfff] text-purple-700 border border-purple-200 shadow-md hover:from-[#e0cfff] hover:to-[#f5eafe] hover:text-purple-800 hover:border-purple-300"
            size="sm"
            onClick={() => setIsAutoGenerateOpen(true)}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Auto-Generate
          </Button>
          <Button className="bg-sylvia-600 hover:bg-sylvia-700" size="sm" onClick={() => setIsAddQuestionOpen(true)}>
            + Add Question
          </Button>
          <Button variant="outline" size="sm" onClick={handlePreviewSurvey}>
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
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <span className="block text-4xl text-gray-300 mb-2">?</span>
                        <div className="font-medium text-gray-500">No questions added yet</div>
                        <div className="text-sm text-gray-400 mb-2">Get started by adding questions manually or using AI generation</div>
                        <div className="flex gap-2 justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-700"
                            onClick={() => setIsAutoGenerateOpen(true)}
                          >
                            <Sparkles className="mr-2 h-4 w-4" />
                            Auto-Generate
                          </Button>
                          <Button
                            size="sm"
                            className="bg-sylvia-600 hover:bg-sylvia-700 text-white"
                            onClick={() => setIsAddQuestionOpen(true)}
                          >
                            + Add Manually
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={questions.map((q) => q.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {questions.map((question, index) => (
                          <SortableTableRow
                            key={question.id}
                            question={question}
                            index={index}
                            onEdit={(q: any) => handleEditQuestion(q)}
                            onDelete={(id: string) => handleDeleteClick(id)}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
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

      <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Question Manually
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>
              Create a new question for your survey. Choose the type and provide the necessary details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="question-text">Question Text</Label>
              <Textarea
                id="question-text"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                placeholder="Enter your question here..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="question-type">Question Type</Label>
              <Select
                value={newQuestion.type}
                onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value })}
              >
                <SelectTrigger id="question-type">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="question-section">Section</Label>
              <Select
                value={newQuestion.section}
                onValueChange={(value) => setNewQuestion({ ...newQuestion, section: value })}
              >
                <SelectTrigger id="question-section">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(newQuestion.type === "multiple-choice" || newQuestion.type === "checkbox") && (
              <div className="space-y-2">
                <Label>Options</Label>
                {newQuestion.options.map((option: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options]
                        newOptions[index] = e.target.value
                        setNewQuestion({ ...newQuestion, options: newOptions })
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                    {index > 0 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newOptions = newQuestion.options.filter((_: string, i: number) => i !== index)
                          setNewQuestion({ ...newQuestion, options: newOptions })
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ""] })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Option
                </Button>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="required"
                checked={newQuestion.required}
                onChange={(e) => setNewQuestion({ ...newQuestion, required: e.target.checked })}
              />
              <Label htmlFor="required">Required Question</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddQuestionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddQuestion}>Add Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Preview Survey</DialogTitle>
            <DialogDescription>
              Review your survey questions and their flow
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 overflow-y-auto pr-4 max-h-[calc(90vh-200px)]">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">
                        {index + 1}.
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        {question.section}
                      </span>
                      {question.required && (
                        <span className="text-xs text-red-500">Required</span>
                      )}
                    </div>
                    <p className="text-base font-medium text-gray-900">
                      {question.text}
                    </p>
                    {question.type === "multiple-choice" && (
                      <div className="mt-2 space-y-2">
                        {question.options.map((option: string, optionIndex: number) => (
                          <div
                            key={optionIndex}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-4 h-4 border rounded-full" />
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.type === "checkbox" && (
                      <div className="mt-2 space-y-2">
                        {question.options.map((option: string, optionIndex: number) => (
                          <div
                            key={optionIndex}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div className="w-4 h-4 border rounded" />
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {question.type === "open-ended" && (
                      <div className="mt-2">
                        <div className="w-full h-20 border rounded-lg bg-gray-50" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditQuestionOpen} onOpenChange={setIsEditQuestionOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
            <DialogDescription>
              Modify the question details and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-question-text">Question Text</Label>
              <Textarea
                id="edit-question-text"
                value={editingQuestion?.text || ""}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                placeholder="Enter your question here..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-question-type">Question Type</Label>
              <Select
                value={editingQuestion?.type || "multiple-choice"}
                onValueChange={(value) => setEditingQuestion({ ...editingQuestion, type: value })}
              >
                <SelectTrigger id="edit-question-type">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-question-section">Section</Label>
              <Select
                value={editingQuestion?.section || "General"}
                onValueChange={(value) => setEditingQuestion({ ...editingQuestion, section: value })}
              >
                <SelectTrigger id="edit-question-section">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(editingQuestion?.type === "multiple-choice" || editingQuestion?.type === "checkbox") && (
              <div className="space-y-2">
                <Label>Options</Label>
                {editingQuestion?.options.map((option: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editingQuestion.options]
                        newOptions[index] = e.target.value
                        setEditingQuestion({ ...editingQuestion, options: newOptions })
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                    {index > 0 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newOptions = editingQuestion.options.filter((_: string, i: number) => i !== index)
                          setEditingQuestion({ ...editingQuestion, options: newOptions })
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setEditingQuestion({ ...editingQuestion, options: [...editingQuestion.options, ""] })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Option
                </Button>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-required"
                checked={editingQuestion?.required || false}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, required: e.target.checked })}
              />
              <Label htmlFor="edit-required">Required Question</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditQuestionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateQuestion}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Question</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAutoGenerateOpen} onOpenChange={setIsAutoGenerateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Auto-Generate Questions</DialogTitle>
            <DialogDescription>
              Enter keywords, ideas, or goals for the questions you want to generate. (e.g. onboarding, product feedback, customer satisfaction)
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={autoGenerateInput}
              onChange={e => setAutoGenerateInput(e.target.value)}
              placeholder="Type your keywords, ideas, or goals here..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAutoGenerateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAIGenerate}>
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isAILoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center gap-6 min-w-[340px] max-w-[90vw]">
            <div className="flex gap-4 text-sylvia-600 animate-pulse">
              <Globe className="h-8 w-8 animate-spin-slow" />
              <Search className="h-8 w-8 animate-bounce" />
              <FileText className="h-8 w-8 animate-pulse" />
              <Brain className="h-8 w-8 animate-spin" />
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
            <div className="text-lg font-semibold text-sylvia-700 text-center min-h-[48px]">
              {[
                "Scouring the web for the latest research...",
                "Analyzing articles and extracting insights...",
                "Synthesizing survey questions...",
                "Finalizing your custom question set..."
              ][aiLoadingStep]}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-sylvia-600 h-2 rounded-full transition-all duration-500" style={{ width: `${(aiLoadingStep + 1) * 25}%` }} />
            </div>
            <div className="text-xs text-gray-400 mt-2">Sylvia AI is researching and generating your questions...</div>
          </div>
        </div>
      )}
    </div>
  )
}
