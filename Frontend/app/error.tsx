"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  const handleReset = () => {
    if (typeof reset === "function") {
      reset()
    } else {
      console.error("Reset function is not available")
      // Fallback behavior: reload the page
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-Artintelllms-primary flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-Artintelllms-secondary mb-4">500</h1>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Something went wrong!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          We apologize for the inconvenience. You can try refreshing the page or contact our support team if the problem
          persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleReset} className="bg-Artintelllms-secondary hover:bg-Artintelllms-secondary/90">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/contact">
            <Button variant="outline">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

