import { ModelCardSkeleton } from "@/components/loading/ModelCardSkeleton"

export default function Loading() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse mt-2"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ModelCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

