import { gsap } from "gsap"

export const cyberElementEnter = (element: Element) => {
  const tl = gsap.timeline({ paused: true })

  tl.fromTo(
    element,
    {
      scale: 0.95,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    },
  )

  return tl
}

export const cyberGlitch = (element: Element) => {
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: Math.random() * 5 + 2, // Random delay between 2-7 seconds
  })

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

export const cyberPulse = (element: Element) => {
  const tl = gsap.timeline({ repeat: -1 })

  tl.to(element, {
    boxShadow: "0 0 20px rgba(0, 203, 221, 0.7), 0 0 30px rgba(0, 203, 221, 0.5)",
    duration: 1,
    ease: "power2.inOut",
  }).to(element, {
    boxShadow: "0 0 10px rgba(0, 203, 221, 0.3), 0 0 20px rgba(0, 203, 221, 0.2)",
    duration: 1,
    ease: "power2.inOut",
  })

  return tl
}

export const cyberReveal = (element: Element) => {
  const tl = gsap.timeline({ paused: true })

  tl.fromTo(
    element,
    {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      opacity: 0,
    },
    {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
      duration: 1,
      ease: "power3.inOut",
    },
  )

  return tl
}

export const initCyberAnimations = (container: Element) => {
  // Find elements with specific classes and apply animations
  const glitchElements = container.getElementsByClassName("animate-glitch")
  const pulseElements = container.getElementsByClassName("animate-cyber-pulse")
  const revealElements = container.getElementsByClassName("cyber-reveal")

  Array.from(glitchElements).forEach((element) => {
    cyberGlitch(element)
  })

  Array.from(pulseElements).forEach((element) => {
    cyberPulse(element)
  })

  Array.from(revealElements).forEach((element) => {
    const reveal = cyberReveal(element)
    reveal.play()
  })
}

