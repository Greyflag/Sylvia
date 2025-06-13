// Sample data for the completed project (enterprise-satisfaction)
const enterpriseContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    company: "TechCorp Solutions",
    role: "CTO",
    phone: "+1 (555) 123-4567",
    status: "valid",
    tags: ["enterprise", "tech", "decision-maker"],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@innovatetech.com",
    company: "InnovateTech",
    role: "Product Manager",
    phone: "+1 (555) 234-5678",
    status: "valid",
    tags: ["product", "innovation", "manager"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@dataflow.com",
    company: "DataFlow Inc",
    role: "VP Engineering",
    phone: "+1 (555) 345-6789",
    status: "valid",
    tags: ["engineering", "data", "leadership"],
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@cloudtech.com",
    company: "CloudTech Systems",
    role: "Senior Developer",
    phone: "+1 (555) 456-7890",
    status: "valid",
    tags: ["developer", "cloud", "senior"],
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.t@scalesolutions.com",
    company: "Scale Solutions",
    role: "Head of Operations",
    phone: "+1 (555) 567-8901",
    status: "valid",
    tags: ["operations", "scale", "head"],
  },
]

const enterpriseQuestions = [
  {
    id: "Q1",
    question: "What is your company size?",
    type: "multiple-choice",
    section: "Demographics",
    subSection: "Company Information",
    required: true,
    options: ["1-10 employees", "11-50 employees", "51-200 employees", "200+ employees"],
    objective: "Understand customer demographics",
    kpi: "Company Size Distribution",
  },
  {
    id: "Q2",
    question: "How long have you been using our product?",
    type: "multiple-choice",
    section: "Usage",
    subSection: "Product Usage",
    required: true,
    options: ["Less than 6 months", "6-12 months", "1-2 years", "More than 2 years"],
    objective: "Understand usage patterns",
    kpi: "Customer Tenure",
  },
  {
    id: "Q3",
    question: "How satisfied are you with our product overall?",
    type: "rating",
    section: "Satisfaction",
    subSection: "Overall Satisfaction",
    required: true,
    scale: 5,
    objective: "Measure customer satisfaction",
    kpi: "Overall Satisfaction Score",
  },
  {
    id: "Q4",
    question: "How likely are you to recommend our product to others?",
    type: "nps",
    section: "Satisfaction",
    subSection: "Net Promoter Score",
    required: true,
    scale: 10,
    objective: "Measure customer loyalty",
    kpi: "Net Promoter Score",
  },
  {
    id: "Q5",
    question: "What features would you like to see in future updates?",
    type: "open-ended",
    section: "Future Needs",
    subSection: "Feature Requests",
    required: false,
    objective: "Identify future product needs",
    kpi: "Feature Request Volume",
  },
]

const enterpriseResponses = [
  {
    id: "R1",
    contactId: "1",
    contactName: "Sarah Johnson",
    company: "TechCorp Solutions",
    submittedAt: "2023-11-15T10:30:00Z",
    status: "completed",
    responses: {
      Q1: "200+ employees",
      Q2: "1-2 years",
      Q3: "4",
      Q4: "9",
      Q5: "Better API documentation and more integrations with third-party tools",
    },
  },
  {
    id: "R2",
    contactId: "2",
    contactName: "Michael Chen",
    company: "InnovateTech",
    submittedAt: "2023-11-16T14:20:00Z",
    status: "completed",
    responses: {
      Q1: "51-200 employees",
      Q2: "6-12 months",
      Q3: "5",
      Q4: "8",
      Q5: "Mobile app and better reporting features",
    },
  },
  {
    id: "R3",
    contactId: "3",
    contactName: "Emily Rodriguez",
    company: "DataFlow Inc",
    submittedAt: "2023-11-17T09:15:00Z",
    status: "completed",
    responses: {
      Q1: "51-200 employees",
      Q2: "More than 2 years",
      Q3: "4",
      Q4: "7",
      Q5: "Advanced analytics and data export capabilities",
    },
  },
  {
    id: "R4",
    contactId: "4",
    contactName: "David Kim",
    company: "CloudTech Systems",
    submittedAt: "2023-11-18T16:45:00Z",
    status: "completed",
    responses: {
      Q1: "11-50 employees",
      Q2: "Less than 6 months",
      Q3: "3",
      Q4: "6",
      Q5: "Better onboarding process and more tutorials",
    },
  },
  {
    id: "R5",
    contactId: "5",
    contactName: "Lisa Thompson",
    company: "Scale Solutions",
    submittedAt: "2023-11-19T11:30:00Z",
    status: "completed",
    responses: {
      Q1: "200+ employees",
      Q2: "1-2 years",
      Q3: "5",
      Q4: "9",
      Q5: "Bulk operations and team collaboration features",
    },
  },
]

// Empty data for draft projects
const emptyContacts: any[] = []
const emptyQuestions: any[] = []
const emptyResponses: any[] = []

// Store for draft project questions
let draftQuestions: any[] = []

export function getProjectContacts(projectId: string) {
  if (projectId === "enterprise-satisfaction") {
    return enterpriseContacts
  }
  return emptyContacts
}

export function getProjectQuestionSet(projectId: string) {
  return draftQuestions;
}

export function getProjectResponses(projectId: string) {
  if (projectId === "enterprise-satisfaction") {
    return enterpriseResponses
  }
  return emptyResponses
}

export function getProjectObjectives(projectId: string) {
  if (projectId === "enterprise-satisfaction") {
    return [
      {
        id: "1",
        title: "Understand Customer Satisfaction",
        description: "Measure overall satisfaction levels with our product and services",
        status: "completed",
        priority: "high",
        dueDate: "2023-11-01",
      },
      {
        id: "2",
        title: "Identify Feature Gaps",
        description: "Discover what features customers need that we don't currently offer",
        status: "completed",
        priority: "medium",
        dueDate: "2023-11-05",
      },
      {
        id: "3",
        title: "Measure Customer Loyalty",
        description: "Assess likelihood of customers to recommend our product",
        status: "completed",
        priority: "high",
        dueDate: "2023-11-10",
      },
    ]
  }
  return []
}

export function getProjectAnalytics(projectId: string) {
  if (projectId === "enterprise-satisfaction") {
    return {
      totalResponses: 5,
      responseRate: 100,
      averageSatisfaction: 4.2,
      npsScore: 78,
      completionRate: 100,
      topFeatureRequests: [
        "API documentation",
        "Mobile app",
        "Advanced analytics",
        "Better onboarding",
        "Team collaboration",
      ],
    }
  }
  return {
    totalResponses: 0,
    responseRate: 0,
    averageSatisfaction: 0,
    npsScore: 0,
    completionRate: 0,
    topFeatureRequests: [],
  }
}

export function getResponseById(projectId: string, responseId: string) {
  const responses = getProjectResponses(projectId)
  return responses.find((response) => response.id === responseId)
}

export function createQuestion(projectId: string, question: any) {
  if (projectId === "enterprise-satisfaction") {
    return // Don't modify the completed project
  }
  draftQuestions.push(question)
  return question
}

export function updateProject(projectId: string, project: any) {
  if (projectId === "enterprise-satisfaction") {
    return // Don't modify the completed project
  }
  // In a real app, this would update the project in the database
  return project
}
