import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { MutableRefObject } from "react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export const initFeatureAnimations = (
  containerRef: MutableRefObject<HTMLElement | null>,
  featureRefs: MutableRefObject<(HTMLElement | null)[]>,
) => {
  if (!containerRef.current || !featureRefs.current.length) return

  featureRefs.current.forEach((featureEl, index) => {
    if (!featureEl) return

    gsap.fromTo(
      featureEl,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featureEl,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  })
}

export const initComparisonAnimation = (
  containerRef: MutableRefObject<HTMLElement | null>,
  tableRef: MutableRefObject<HTMLElement | null>,
) => {
  if (!containerRef.current || !tableRef.current) return

  gsap.fromTo(
    tableRef.current,
    {
      opacity: 0,
      scale: 0.95,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: tableRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
      },
    },
  )
}

export const initParallaxEffects = (
  containerRef: MutableRefObject<HTMLElement | null>,
  parallaxElements: MutableRefObject<(HTMLElement | null)[]>,
) => {
  if (!containerRef.current || !parallaxElements.current.length) return

  parallaxElements.current.forEach((el) => {
    if (!el) return

    gsap.to(el, {
      y: "-30%",
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    })
  })
}

