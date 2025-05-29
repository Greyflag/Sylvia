import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function QuestionSetNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="bg-sylvia-50 p-4 rounded-full mb-6">
        <FileQuestion className="h-12 w-12 text-sylvia-600" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Question Set Not Found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        The question set you're looking for doesn't exist or you don't have access to it.
      </p>
      <Button asChild>
        <Link href="/">Return to Dashboard</Link>
      </Button>
    </div>
  )
}
