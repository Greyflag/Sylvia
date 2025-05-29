import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileSearch } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="bg-sylvia-50 p-4 rounded-full mb-6">
        <FileSearch className="h-12 w-12 text-sylvia-600" />
      </div>
      <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return to Dashboard</Link>
      </Button>
    </div>
  )
}
