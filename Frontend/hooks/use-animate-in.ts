"use client"

import { useEffect, type RefObject } from "react"
import gsap from "gsap"

export function useAnimateIn(ref: RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.from(element, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay,
      ease: "power2.out",
    })
  }, [ref, delay])
}

