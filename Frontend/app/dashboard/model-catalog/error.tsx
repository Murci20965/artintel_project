"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Model catalog error:", error)
  }, [error])

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[50vh]">
      <Alert variant="destructive" className="mb-6 max-w-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was a problem loading the model catalog. Please try again or contact support if the issue persists.
        </AlertDescription>
      </Alert>
      <div className="flex gap-4">
        <Button onClick={reset} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  )
}

