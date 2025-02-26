"use client"

import { useState, useCallback } from "react"

interface OptimisticUpdateOptions<T> {
  onUpdate: (data: T) => Promise<T>
  onError?: (error: Error) => void
}

export function useOptimisticUpdate<T>({ onUpdate, onError }: OptimisticUpdateOptions<T>) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [optimisticData, setOptimisticData] = useState<T | null>(null)

  const update = useCallback(
    async (newData: T) => {
      setIsUpdating(true)
      setOptimisticData(newData)

      try {
        const result = await onUpdate(newData)
        setOptimisticData(null)
        return result
      } catch (error) {
        setOptimisticData(null)
        if (error instanceof Error && onError) {
          onError(error)
        }
        throw error
      } finally {
        setIsUpdating(false)
      }
    },
    [onUpdate, onError],
  )

  return {
    isUpdating,
    optimisticData,
    update,
  }
}

