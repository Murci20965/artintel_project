import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Standardized scroll-triggered animations
export const createScrollAnimation = (
  element: string | Element,
  animation: {
    opacity?: number
    y?: number
    x?: number
    scale?: number
    rotation?: number
    duration?: number
    ease?: string
  },
  trigger?: {
    trigger?: string | Element
    start?: string
    end?: string
    scrub?: boolean | number
    markers?: boolean
  },
) => {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: trigger?.trigger || element,
      start: trigger?.start || "top center",
      end: trigger?.end || "bottom center",
      scrub: trigger?.scrub || false,
      markers: trigger?.markers || false,
    },
  })
}

// Standard animation presets
export const fadeInUp = (element: string | Element) => {
  return createScrollAnimation(
    element,
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    },
    {
      start: "top 80%",
    },
  )
}

export const scaleIn = (element: string | Element) => {
  return createScrollAnimation(
    element,
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
    },
    {
      start: "top 85%",
    },
  )
}

export const rotateIn = (element: string | Element) => {
  return createScrollAnimation(
    element,
    {
      opacity: 1,
      rotation: 0,
      duration: 1.2,
      ease: "power3.out",
    },
    {
      start: "top 75%",
    },
  )
}

// Interactive hover animations
export const createHoverAnimation = (element: Element) => {
  const tl = gsap.timeline({ paused: true })

  tl.to(element, {
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out",
  })

  element.addEventListener("mouseenter", () => tl.play())
  element.addEventListener("mouseleave", () => tl.reverse())

  return tl
}

// Glitch effect animation
export const createGlitchEffect = (element: Element) => {
  const tl = gsap.timeline({ repeat: -1 })

  tl.to(element, {
    skewX: 20,
    duration: 0.1,
    ease: "power4.inOut",
  })
    .to(element, {
      skewX: 0,
      duration: 0.1,
      ease: "power4.inOut",
    })
    .to(element, {
      opacity: 0.8,
      duration: 0.1,
    })
    .to(element, {
      opacity: 1,
      duration: 0.1,
    })

  return tl
}

