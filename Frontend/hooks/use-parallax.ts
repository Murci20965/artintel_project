"use client"

import { useEffect, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useParallax(ref: RefObject<HTMLElement>, speed = 0.5) {
  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.to(element, {
      y: `${speed * 100}%`,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  }, [ref, speed])
}

