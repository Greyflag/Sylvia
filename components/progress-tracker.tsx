"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ProgressTrackerProps {
  projectId: string
}

export function ProgressTracker({ projectId }: ProgressTrackerProps) {
  const pathname = usePathname()

  const steps = [
    {
      name: "Define Objectives",
      href: `/projects/${projectId}/objectives`,
      active: pathname === `/projects/${projectId}/objectives`,
      completed: true,
    },
    {
      name: "Question Set",
      href: `/projects/${projectId}/question-set`,
      active: pathname === `/projects/${projectId}/question-set`,
      completed: true,
    },
    {
      name: "Contact List",
      href: `/projects/${projectId}/contacts`,
      active: pathname === `/projects/${projectId}/contacts`,
      completed: true,
    },
    {
      name: "Outreach Material",
      href: `/projects/${projectId}/outreach-material`,
      active: pathname === `/projects/${projectId}/outreach-material`,
      completed: true,
    },
    {
      name: "Outreach Campaign",
      href: `/projects/${projectId}/outreach-campaign`,
      active: pathname.startsWith(`/projects/${projectId}/outreach-campaign`),
      completed: true,
    },
    {
      name: "Analytics & Reporting",
      href: `/projects/${projectId}/analytics`,
      active: pathname === `/projects/${projectId}/analytics`,
      completed: false,
    },
  ]

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step.name} className="flex items-center flex-1 relative">
              <Link
                href={step.href}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium z-10",
                  step.active
                    ? "bg-sylvia-600 text-white"
                    : step.completed
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-500 border border-gray-200",
                )}
              >
                {index + 1}
              </Link>
              <div className={cn("h-0.5 w-full", step.completed ? "bg-green-200" : "bg-gray-200")} />
              <div className="absolute top-10 left-0 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                {step.name}
              </div>
              {index === steps.length - 1 && (
                <div
                  className={cn(
                    "absolute right-0 top-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10",
                    step.active
                      ? "bg-sylvia-600 text-white"
                      : step.completed
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-500 border border-gray-200",
                  )}
                >
                  {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
