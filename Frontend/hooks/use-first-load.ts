"use client"

import { useState, useEffect } from "react"

export function useFirstLoad() {
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    // After first render, set isFirstLoad to false
    setIsFirstLoad(false)
  }, [])

  return isFirstLoad
}

