import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import type { MutableRefObject } from "react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export const initHeroAnimation = (heroRef: MutableRefObject<HTMLElement | null>) => {
  if (!heroRef.current) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  })

  tl.to(".hero-text", {
    y: 100,
    opacity: 0,
  })
}

export const initHorizontalScroll = (containerRef: MutableRefObject<HTMLElement | null>, sections: HTMLElement[]) => {
  if (!containerRef.current || !sections.length) return

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: containerRef.current,
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + containerRef.current!.offsetWidth,
    },
  })
}

export const initPipelineAnimation = (
  containerRef: MutableRefObject<HTMLElement | null>,
  steps: HTMLElement[],
  lines: HTMLElement[],
) => {
  if (!containerRef.current) return

  steps.forEach((step, i) => {
    gsap.from(step, {
      opacity: 0,
      x: 50,
      duration: 1,
      scrollTrigger: {
        trigger: step,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    })
  })

  gsap.from(lines, {
    height: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
  })
}

export const initSecurityAnimation = (containerRef: MutableRefObject<HTMLElement | null>, hexagons: HTMLElement[]) => {
  if (!containerRef.current) return

  gsap.from(hexagons, {
    scale: 0,
    opacity: 0,
    stagger: {
      amount: 1,
      grid: "auto",
      from: "center",
    },
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top center+=100",
      end: "center center",
      toggleActions: "play none none reverse",
    },
  })
}

export const initCostAnimation = (containerRef: MutableRefObject<HTMLElement | null>, metrics: HTMLElement[]) => {
  if (!containerRef.current) return

  gsap.from(metrics, {
    width: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top center+=100",
      end: "bottom center",
      toggleActions: "play none none reverse",
    },
  })
}

