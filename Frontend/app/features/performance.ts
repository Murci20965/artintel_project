import { gsap } from "gsap"

// Utility to batch animations for better performance
export const batchAnimations = (animations: gsap.core.Timeline[]) => {
  return gsap.to(
    {},
    {
      duration: 0,
      onStart: () => {
        animations.forEach((animation) => animation.play())
      },
    },
  )
}

// Utility to pause animations when element is not in viewport
export const handleVisibility = (timeline: gsap.core.Timeline, element: Element) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        timeline.play()
      } else {
        timeline.pause()
      }
    },
    { threshold: 0 },
  )

  observer.observe(element)
  return () => observer.disconnect()
}

// Utility to optimize animations based on device performance
export const getOptimalSettings = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const isLowPowerMode = "connection" in navigator && (navigator as any).connection?.saveData

  return {
    reducedMotion: prefersReducedMotion,
    lowPower: isLowPowerMode,
    frameRate: prefersReducedMotion ? 30 : 60,
    batchSize: prefersReducedMotion ? 3 : 6,
  }
}

// Helper to debounce animation updates for better performance
export const debounceAnimation = (fn: Function, ms = 16) => {
  let timeoutId: number
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => fn.apply(null, args), ms)
  }
}

