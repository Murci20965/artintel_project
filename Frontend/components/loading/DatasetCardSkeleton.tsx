import { Skeleton } from "@/components/ui/skeleton"

export function DatasetCardSkeleton() {
  return (
    <div className="p-4 rounded-lg border bg-background/50">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-8 w-8" />
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-6 w-20" />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

