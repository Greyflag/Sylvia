"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useProject } from "@/components/project-context";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Target,
  Brain,
  FileText,
  Upload,
  CheckCircle,
  Sparkles,
  Loader2,
  Users,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Zap,
  ArrowRight,
  Clock,
  Search,
  Globe,
  Database,
  MessageSquare,
  Star,
  DollarSign,
  TrendingDown,
  Building,
  Plus,
  ClipboardList,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  kpis: string[];
  color: string;
}

interface CustomObjective {
  id: string;
  text: string;
  kpis: string[];
  linkedKpis: string[];
}

export default function ObjectivesPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const { currentProject, setCurrentProject, allProjects } = useProject();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customObjectives, setCustomObjectives] = useState<CustomObjective[]>(
    [],
  );
  const [additionalKpis, setAdditionalKpis] = useState<string[]>([]);
  const [companyContext, setCompanyContext] = useState({
    customerCount: "",
    companyDescription: "",
    economics: "",
  });
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<
    { name: string; size: number; type: string; uploadDate: string }[]
  >([
    {
      name: "Customer Feedback Analysis Q4 2024.pdf",
      size: 2.4,
      type: "PDF",
      uploadDate: "Dec 15, 2024",
    },
    {
      name: "Product Requirements Document.docx",
      size: 1.8,
      type: "DOCX",
      uploadDate: "Dec 14, 2024",
    },
    {
      name: "Market Research Data.xlsx",
      size: 3.2,
      type: "XLSX",
      uploadDate: "Dec 13, 2024",
    },
  ]);
  const [expandedInsights, setExpandedInsights] = useState<{
    [key: string]: boolean;
  }>({
    customerTrends: false,
    marketOpportunities: false,
    productGaps: false,
    competitiveAnalysis: false,
    riskFactors: false,
  });

  useEffect(() => {
    // Set current project based on projectId
    const project = allProjects.find((p) => p.id === projectId);
    if (project) {
      setCurrentProject(project);
    }
  }, [projectId, allProjects, setCurrentProject]);

  const templates: Template[] = [
    {
      id: "customer-feedback",
      name: "Customer Feedback",
      description:
        "Understand customer satisfaction and identify improvement areas",
      icon: MessageSquare,
      color: "bg-blue-500",
      kpis: [
        "Customer Satisfaction Score (CSAT)",
        "Net Promoter Score (NPS)",
        "Customer Effort Score (CES)",
        "Feature Usage Rate",
        "Support Ticket Volume",
      ],
    },
    {
      id: "new-product-testing",
      name: "New Product Testing",
      description: "Validate new features and gather user insights",
      icon: Sparkles,
      color: "bg-purple-500",
      kpis: [
        "Feature Adoption Rate",
        "User Engagement Score",
        "Time to Value",
        "Feature Satisfaction",
        "Recommendation Likelihood",
      ],
    },
    {
      id: "churn-reduction",
      name: "Churn Reduction",
      description: "Identify at-risk customers and reduce churn",
      icon: TrendingDown,
      color: "bg-red-500",
      kpis: [
        "Churn Risk Score",
        "Customer Lifetime Value (CLV)",
        "Retention Rate",
        "Engagement Score",
        "Support Interaction Frequency",
      ],
    },
  ];

  const predefinedObjectives = [
    "Not only customer feedback but also capture how that's changed over the past two years?",
    "Openness to price increase",
    "Product feature prioritization",
    "Customer journey pain points",
    "Competitive positioning insights",
  ];

  const additionalKpiOptions = [
    "NPS",
    "Cost-to-value",
    "Spend outlook (% change over the next three years)",
    "Customer Health Score",
    "Feature Request Frequency",
    "Onboarding Completion Rate",
  ];

  const aiSteps = [
    "Analyzing your selected template and objectives...",
    "Mapping custom objectives to relevant KPIs...",
    "Identifying correlations between objectives and metrics...",
    "Generating contextual insights...",
    "Creating personalized question recommendations...",
    "Finalizing your tailored survey framework...",
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleCustomObjectiveAdd = (objective: string) => {
    const newObjective: CustomObjective = {
      id: Date.now().toString(),
      text: objective,
      kpis: [],
      linkedKpis: [],
    };
    setCustomObjectives([...customObjectives, newObjective]);
  };

  const handleAIAnalysis = () => {
    setIsAIAnalyzing(true);
    setAiStep(0);

    const interval = setInterval(() => {
      setAiStep((prev) => {
        if (prev < aiSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 2000);

    setTimeout(() => {
      setIsAIAnalyzing(false);
      setCurrentStep(6);
    }, aiSteps.length * 2000);
  };

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
    }));
    setKnowledgeBase([...knowledgeBase, ...newFiles]);
  };

  if (!currentProject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-4">
          <div className="bg-sylvia-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
            <Target className="h-5 w-5" />
          </div>
          Define Objectives
        </h1>
        <p className="text-muted-foreground mt-2">
          Set clear goals and KPIs for your Voice of Customer survey
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Progress value={(currentStep / 6) * 100} className="h-2" />
        </div>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of 6
        </span>
      </div>

      {/* AI Analysis Overlay */}
      {isAIAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center gap-8 min-w-[400px] max-w-[90vw] border-2 border-sylvia-200">
            <div className="flex gap-4 text-sylvia-600">
              <Brain className="h-12 w-12 animate-pulse" />
              <Sparkles className="h-12 w-12 animate-bounce" />
              <Search className="h-12 w-12 animate-spin" />
            </div>
            <div className="text-xl font-semibold text-sylvia-700 text-center min-h-[48px]">
              {aiSteps[aiStep]}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-sylvia-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((aiStep + 1) / aiSteps.length) * 100}%` }}
              />
            </div>
            <div className="text-sm text-gray-500 text-center">
              Sylvia AI is analyzing your objectives and creating personalized
              insights...
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="space-y-6">
        {/* Step 1: Template Selection */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sylvia-600" />
                Choose Your Survey Template
              </CardTitle>
              <p className="text-muted-foreground">
                Select a template that best matches your primary goal. Each
                template comes with pre-defined KPIs and objectives.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={cn(
                      "p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md",
                      selectedTemplate === template.id
                        ? "border-sylvia-500 bg-sylvia-50"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn("p-2 rounded-lg", template.color)}>
                        <template.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold">{template.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Included KPIs:</h4>
                      <div className="flex flex-wrap gap-1">
                        {template.kpis.slice(0, 3).map((kpi) => (
                          <Badge
                            key={kpi}
                            variant="outline"
                            className="text-xs"
                          >
                            {kpi}
                          </Badge>
                        ))}
                        {template.kpis.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.kpis.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedTemplate}
                  className="bg-sylvia-600 hover:bg-sylvia-700"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Custom Objectives */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-sylvia-600" />
                Additional Objectives
              </CardTitle>
              <p className="text-muted-foreground">
                Select or add custom objectives specific to your business needs.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Pre-defined Objectives</h3>
                  <div className="space-y-2">
                    {predefinedObjectives.map((objective) => (
                      <div
                        key={objective}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={objective} />
                        <Label htmlFor={objective} className="text-sm">
                          {objective}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Add Custom Objectives</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter your custom objective..."
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (
                            e.key === "Enter" &&
                            e.currentTarget.value.trim()
                          ) {
                            handleCustomObjectiveAdd(
                              e.currentTarget.value.trim(),
                            );
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const input = e.currentTarget
                            .previousElementSibling as HTMLInputElement;
                          if (input.value.trim()) {
                            handleCustomObjectiveAdd(input.value.trim());
                            input.value = "";
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    {customObjectives.map((objective) => (
                      <div
                        key={objective.id}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <p className="text-sm">{objective.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="bg-sylvia-600 hover:bg-sylvia-700"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Additional KPIs */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-sylvia-600" />
                Additional KPIs
              </CardTitle>
              <p className="text-muted-foreground">
                Select additional KPIs that are relevant to your objectives.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {additionalKpiOptions.map((kpi) => (
                  <div key={kpi} className="flex items-center space-x-2">
                    <Checkbox
                      id={kpi}
                      checked={additionalKpis.includes(kpi)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setAdditionalKpis([...additionalKpis, kpi]);
                        } else {
                          setAdditionalKpis(
                            additionalKpis.filter((k) => k !== kpi),
                          );
                        }
                      }}
                    />
                    <Label htmlFor={kpi} className="text-sm">
                      {kpi}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(4)}
                  className="bg-sylvia-600 hover:bg-sylvia-700"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Company Context */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-sylvia-600" />
                Company Context
              </CardTitle>
              <p className="text-muted-foreground">
                Help Sylvia understand your business context for better question
                generation.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="customerCount">
                    How many customers do you have?
                  </Label>
                  <Input
                    id="customerCount"
                    placeholder="e.g., 1,000+ enterprise customers"
                    value={companyContext.customerCount}
                    onChange={(e) =>
                      setCompanyContext({
                        ...companyContext,
                        customerCount: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="companyDescription">
                    Tell me about your company and product
                  </Label>
                  <Textarea
                    id="companyDescription"
                    placeholder="Describe your offering, what it does, target market, etc."
                    value={companyContext.companyDescription}
                    onChange={(e) =>
                      setCompanyContext({
                        ...companyContext,
                        companyDescription: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="economics">
                    Tell me about your economics, growth, and trends
                  </Label>
                  <Textarea
                    id="economics"
                    placeholder="Describe your business model, growth patterns, market trends, etc."
                    value={companyContext.economics}
                    onChange={(e) =>
                      setCompanyContext({
                        ...companyContext,
                        economics: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={() => setCurrentStep(5)}
                  className="bg-sylvia-600 hover:bg-sylvia-700"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Knowledge Base */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-sylvia-600" />
                Knowledge Base
              </CardTitle>
              <p className="text-muted-foreground">
                Upload documents that could provide helpful context for
                generating questions.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload customer feedback, product documentation, or any
                    relevant files
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      e.target.files && handleFileUpload(e.target.files)
                    }
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild>
                    <label htmlFor="file-upload">Choose Files</label>
                  </Button>
                </div>

                {knowledgeBase.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Uploaded Files</h3>
                    <div className="space-y-2">
                      {knowledgeBase.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(4)}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleAIAnalysis}
                  className="bg-sylvia-600 hover:bg-sylvia-700"
                >
                  <Brain className="mr-2 h-4 w-4" />
                  Start AI Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Results */}
        {currentStep === 6 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Analysis Complete
              </CardTitle>
              <p className="text-muted-foreground">
                Sylvia has analyzed your objectives and created a tailored
                framework.
              </p>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  Great! Thanks for providing all this context. Sylvia will now
                  generate a tailored question set based on your objectives and
                  KPIs.
                </AlertDescription>
              </Alert>

              <div className="space-y-8">
                {/* Selected Template */}
                <div>
                  <h3 className="font-medium mb-3">Selected Template</h3>
                  <Badge className="bg-sylvia-100 text-sylvia-800">
                    {templates.find((t) => t.id === selectedTemplate)?.name}
                  </Badge>
                </div>

                {/* Selected Objectives with KPI Connections */}
                <div>
                  <h3 className="font-medium mb-4">
                    Your Objectives & KPI Connections
                  </h3>

                  {/* Objectives Section */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Objectives
                    </h4>
                    <div className="space-y-3">
                      {/* Pre-defined Objectives */}
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-900">
                              Customer feedback changes over past 2 years
                            </p>
                            <p className="text-xs text-blue-700 mt-1">
                              Linked KPIs: CSAT Trend Analysis, NPS Historical
                              Comparison, Customer Sentiment Evolution
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            Selected
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-900">
                              Openness to price increase
                            </p>
                            <p className="text-xs text-blue-700 mt-1">
                              Linked KPIs: Price Sensitivity Index, Value
                              Perception Score, Revenue Impact Potential
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            Selected
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-900">
                              Product feature prioritization
                            </p>
                            <p className="text-xs text-blue-700 mt-1">
                              Linked KPIs: Feature Request Frequency, Usage
                              Pattern Analysis, Development Priority Score
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            Selected
                          </Badge>
                        </div>
                      </div>

                      {/* Custom Objectives */}
                      {customObjectives.map((objective, index) => (
                        <div
                          key={objective.id}
                          className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-blue-900">
                                {objective.text}
                              </p>
                              <p className="text-xs text-blue-700 mt-1">
                                {objective.text
                                  .toLowerCase()
                                  .includes("customer") &&
                                  "Linked KPIs: Customer Lifetime Value (CLV), Customer Acquisition Cost (CAC), Customer Retention Rate"}
                                {objective.text
                                  .toLowerCase()
                                  .includes("product") &&
                                  "Linked KPIs: Product-Market Fit Score, Feature Adoption Rate, Product Satisfaction Index"}
                                {objective.text
                                  .toLowerCase()
                                  .includes("market") &&
                                  "Linked KPIs: Market Share Percentage, Competitive Positioning Score, Market Penetration Rate"}
                                {objective.text
                                  .toLowerCase()
                                  .includes("revenue") &&
                                  "Linked KPIs: Revenue Growth Rate, Average Revenue Per User (ARPU), Revenue Churn Rate"}
                                {objective.text
                                  .toLowerCase()
                                  .includes("support") &&
                                  "Linked KPIs: Support Ticket Resolution Time, Customer Support Satisfaction, First Contact Resolution Rate"}
                                {objective.text
                                  .toLowerCase()
                                  .includes("onboarding") &&
                                  "Linked KPIs: Onboarding Completion Rate, Time to First Value, Onboarding Satisfaction Score"}
                                {objective.text
                                  .toLowerCase()
                                  .includes("feature") &&
                                  "Linked KPIs: Feature Usage Rate, Feature Satisfaction Score, Feature Request Volume"}
                                {objective.text
                                  .toLowerCase()
                                  .includes("integration") &&
                                  "Linked KPIs: Integration Success Rate, API Usage Metrics, Third-party Tool Adoption"}
                                {objective.text
                                  .toLowerCase()
                                  .includes("security") &&
                                  "Linked KPIs: Security Incident Rate, Compliance Score, Data Protection Confidence"}
                                {objective.text
                                  .toLowerCase()
                                  .includes("performance") &&
                                  "Linked KPIs: System Uptime Percentage, Response Time Metrics, Performance Satisfaction"}
                                {index === 0 &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("customer") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("product") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("market") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("revenue") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("support") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("onboarding") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("feature") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("integration") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("security") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("performance") &&
                                  "Linked KPIs: Business Impact Score, Strategic Alignment Metric, ROI Measurement Index"}
                                {index === 1 &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("customer") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("product") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("market") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("revenue") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("support") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("onboarding") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("feature") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("integration") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("security") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("performance") &&
                                  "Linked KPIs: Operational Efficiency Score, Process Optimization Metric, Quality Assurance Index"}
                                {index > 1 &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("customer") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("product") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("market") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("revenue") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("support") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("onboarding") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("feature") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("integration") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("security") &&
                                  !objective.text
                                    .toLowerCase()
                                    .includes("performance") &&
                                  "Linked KPIs: Innovation Adoption Rate, Change Management Score, Transformation Success Metric"}
                              </p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              Custom
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KPIs Section */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-green-600" />
                      KPIs
                    </h4>
                    <div className="space-y-3">
                      {/* Template KPIs */}
                      {templates
                        .find((t) => t.id === selectedTemplate)
                        ?.kpis.map((kpi, index) => (
                          <div
                            key={kpi}
                            className="p-3 bg-green-50 border border-green-200 rounded-lg"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-green-900">
                                  {kpi}
                                </p>
                                <p className="text-xs text-green-700 mt-1">
                                  {index === 0 &&
                                    "Primary satisfaction metric for customer experience evaluation"}
                                  {index === 1 &&
                                    "Loyalty and recommendation likelihood indicator"}
                                  {index === 2 &&
                                    "Ease of use and friction measurement"}
                                  {index === 3 &&
                                    "Product adoption and engagement tracking"}
                                  {index === 4 &&
                                    "Support quality and issue frequency"}
                                </p>
                              </div>
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Template
                              </Badge>
                            </div>
                          </div>
                        ))}

                      {/* Additional KPIs */}
                      {additionalKpis.length > 0 && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-900">
                                Additional KPIs
                              </p>
                              <p className="text-xs text-green-700 mt-1">
                                {additionalKpis.join(", ")}
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Additional
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-gray-600" />
                      Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Total Objectives:</span>{" "}
                        {3 + customObjectives.length}
                      </div>
                      <div>
                        <span className="font-medium">Total KPIs:</span>{" "}
                        {templates.find((t) => t.id === selectedTemplate)?.kpis
                          .length + additionalKpis.length}
                      </div>
                      <div>
                        <span className="font-medium">Template KPIs:</span>{" "}
                        {
                          templates.find((t) => t.id === selectedTemplate)?.kpis
                            .length
                        }
                      </div>
                      <div>
                        <span className="font-medium">Custom Objectives:</span>{" "}
                        {customObjectives.length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Knowledge Base Documents */}
                <div>
                  <h3 className="font-medium mb-4">Knowledge Base Documents</h3>
                  <div className="space-y-3">
                    {uploadedDocuments.map((doc, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="h-4 w-4 text-gray-600" />
                              <p className="text-sm font-medium text-gray-900">
                                {doc.name}
                              </p>
                            </div>
                            <p className="text-xs text-gray-600">
                              {doc.size} • {doc.type}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Uploaded: {doc.uploadDate}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Uploaded
                          </Badge>
                        </div>
                      </div>
                    ))}

                    {/* Add More Documents Option */}
                    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Add more knowledge base documents
                        </p>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Upload Documents
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis Insights */}
                <div>
                  <h3 className="font-medium mb-4">AI Analysis Insights</h3>
                  <div className="space-y-3">
                    {/* Customer Trends */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          setExpandedInsights((prev) => ({
                            ...prev,
                            customerTrends: !prev.customerTrends,
                          }))
                        }
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Customer Trends & Patterns
                            </h4>
                            <p className="text-sm text-gray-600">
                              Analysis of customer behavior and feedback
                              patterns
                            </p>
                          </div>
                        </div>
                        {expandedInsights.customerTrends ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedInsights.customerTrends && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <div className="pt-4 space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium text-blue-900 mb-1">
                                📈 Satisfaction Decline Trend
                              </p>
                              <p className="text-xs text-blue-700">
                                Customer satisfaction has decreased by 12% over
                                the past 18 months, with the most significant
                                drop occurring in Q3 2024. This correlates with
                                the introduction of new pricing tiers.
                              </p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium text-blue-900 mb-1">
                                🎯 Feature Usage Patterns
                              </p>
                              <p className="text-xs text-blue-700">
                                Advanced features show 40% lower adoption rates
                                among new users compared to existing customers,
                                indicating potential onboarding friction.
                              </p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium text-blue-900 mb-1">
                                💬 Support Ticket Themes
                              </p>
                              <p className="text-xs text-blue-700">
                                Integration-related issues represent 35% of
                                support tickets, suggesting API documentation
                                and setup processes need improvement.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Market Opportunities */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          setExpandedInsights((prev) => ({
                            ...prev,
                            marketOpportunities: !prev.marketOpportunities,
                          }))
                        }
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Target className="h-5 w-5 text-green-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Market Opportunities
                            </h4>
                            <p className="text-sm text-gray-600">
                              Identified growth areas and untapped market
                              segments
                            </p>
                          </div>
                        </div>
                        {expandedInsights.marketOpportunities ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedInsights.marketOpportunities && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <div className="pt-4 space-y-3">
                            <div className="p-3 bg-green-50 rounded-lg">
                              <p className="text-sm font-medium text-green-900 mb-1">
                                🚀 Mid-Market Expansion
                              </p>
                              <p className="text-xs text-green-700">
                                Companies with 100-500 employees show 60% higher
                                feature adoption rates and 25% lower churn,
                                indicating strong product-market fit in this
                                segment.
                              </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <p className="text-sm font-medium text-green-900 mb-1">
                                🌍 International Markets
                              </p>
                              <p className="text-xs text-green-700">
                                European markets demonstrate 45% higher
                                willingness to pay premium pricing, with
                                particular strength in DACH and Nordic regions.
                              </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <p className="text-sm font-medium text-green-900 mb-1">
                                🔧 Industry Verticals
                              </p>
                              <p className="text-xs text-green-700">
                                Healthcare and financial services sectors show
                                80% higher engagement with compliance features,
                                representing a $2.3B addressable market.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Product Gaps */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          setExpandedInsights((prev) => ({
                            ...prev,
                            productGaps: !prev.productGaps,
                          }))
                        }
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-purple-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Product Gaps & Improvements
                            </h4>
                            <p className="text-sm text-gray-600">
                              Areas where product enhancements could drive value
                            </p>
                          </div>
                        </div>
                        {expandedInsights.productGaps ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedInsights.productGaps && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <div className="pt-4 space-y-3">
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <p className="text-sm font-medium text-purple-900 mb-1">
                                📊 Analytics Dashboard
                              </p>
                              <p className="text-xs text-purple-700">
                                78% of enterprise customers request advanced
                                analytics capabilities, with custom reporting
                                being the most frequently mentioned feature gap.
                              </p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <p className="text-sm font-medium text-purple-900 mb-1">
                                🔐 Security Enhancements
                              </p>
                              <p className="text-xs text-purple-700">
                                SSO integration and role-based access controls
                                are requested by 65% of customers, particularly
                                in regulated industries.
                              </p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <p className="text-sm font-medium text-purple-900 mb-1">
                                📱 Mobile Experience
                              </p>
                              <p className="text-xs text-purple-700">
                                Mobile app functionality is cited as a
                                limitation by 42% of users, with push
                                notifications and offline capabilities being top
                                priorities.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Competitive Analysis */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          setExpandedInsights((prev) => ({
                            ...prev,
                            competitiveAnalysis: !prev.competitiveAnalysis,
                          }))
                        }
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BarChart3 className="h-5 w-5 text-orange-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Competitive Analysis
                            </h4>
                            <p className="text-sm text-gray-600">
                              Market positioning and competitive landscape
                              insights
                            </p>
                          </div>
                        </div>
                        {expandedInsights.competitiveAnalysis ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedInsights.competitiveAnalysis && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <div className="pt-4 space-y-3">
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <p className="text-sm font-medium text-orange-900 mb-1">
                                🏆 Market Position
                              </p>
                              <p className="text-xs text-orange-700">
                                Currently ranked #3 in market share (18%) behind
                                Competitor A (32%) and Competitor B (25%), with
                                strongest differentiation in ease of use.
                              </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <p className="text-sm font-medium text-orange-900 mb-1">
                                💰 Pricing Strategy
                              </p>
                              <p className="text-xs text-orange-700">
                                Premium pricing is 15% higher than market
                                average, but customers report 30% better ROI,
                                justifying the price premium.
                              </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <p className="text-sm font-medium text-orange-900 mb-1">
                                🎯 Feature Comparison
                              </p>
                              <p className="text-xs text-orange-700">
                                Leading in API flexibility and third-party
                                integrations, but lagging in AI-powered
                                automation features compared to top competitors.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Risk Factors */}
                    <div className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          setExpandedInsights((prev) => ({
                            ...prev,
                            riskFactors: !prev.riskFactors,
                          }))
                        }
                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <TrendingDown className="h-5 w-5 text-red-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Risk Factors & Challenges
                            </h4>
                            <p className="text-sm text-gray-600">
                              Potential threats and areas requiring attention
                            </p>
                          </div>
                        </div>
                        {expandedInsights.riskFactors ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedInsights.riskFactors && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <div className="pt-4 space-y-3">
                            <div className="p-3 bg-red-50 rounded-lg">
                              <p className="text-sm font-medium text-red-900 mb-1">
                                ⚠️ Customer Churn Risk
                              </p>
                              <p className="text-xs text-red-700">
                                15% of enterprise customers show signs of
                                potential churn based on usage decline and
                                support ticket patterns over the last quarter.
                              </p>
                            </div>
                            <div className="p-3 bg-red-50 rounded-lg">
                              <p className="text-sm font-medium text-red-900 mb-1">
                                🔧 Technical Debt
                              </p>
                              <p className="text-xs text-red-700">
                                Legacy codebase components are causing 40% of
                                performance issues and limiting the ability to
                                implement new features quickly.
                              </p>
                            </div>
                            <div className="p-3 bg-red-50 rounded-lg">
                              <p className="text-sm font-medium text-red-900 mb-1">
                                👥 Talent Retention
                              </p>
                              <p className="text-xs text-red-700">
                                Key engineering team members show 25% higher
                                turnover risk compared to industry average,
                                potentially impacting product development
                                velocity.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Add More Objectives */}
                <div>
                  <h3 className="font-medium mb-4">Add More Objectives</h3>
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-3">
                      Want to add more specific objectives? You can continue to
                      refine your survey goals.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter additional objective..."
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (
                            e.key === "Enter" &&
                            e.currentTarget.value.trim()
                          ) {
                            handleCustomObjectiveAdd(
                              e.currentTarget.value.trim(),
                            );
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      <Button
                        onClick={(e) => {
                          const input = e.currentTarget
                            .previousElementSibling as HTMLInputElement;
                          if (input.value.trim()) {
                            handleCustomObjectiveAdd(input.value.trim());
                            input.value = "";
                          }
                        }}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button asChild className="bg-sylvia-600 hover:bg-sylvia-700">
                  <Link href={`/projects/${projectId}/question-set`}>
                    Generate Question Set
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
