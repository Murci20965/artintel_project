import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

export const initFeatureAnimations = (container: HTMLElement) => {
  // Add perspective to container
  // Enhanced container perspective
  // Enhanced perspective container
  // Enhanced container and perspective effects
  gsap.set(container, {
    perspective: 2000,
    transformStyle: "preserve-3d",
  })

  // Add scroll-based parallax effect
  gsap.to(".feature-section", {
    y: "30%",
    opacity: 0.9,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  })
  // Enhance card hover effects
  const cardElements = container.querySelectorAll(".feature-card, .pricing-card")
  cardElements.forEach((card) => {
    card.addEventListener("mousemove", (e: Event) => {
      const mouseEvent = e as MouseEvent
      const rect = (card as HTMLElement).getBoundingClientRect()
      const x = mouseEvent.clientX - rect.left
      const y = mouseEvent.clientY - rect.top
      const xPos = (x / rect.width - 0.5) * 20
      const yPos = (y / rect.height - 0.5) * 20
      gsap.to(card, {
        rotateX: -yPos,
        rotateY: xPos,
        duration: 0.4,
        ease: "power2.out",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      })
    })
  })

  // Parallax background
  gsap.to(".matrix-bg", {
    y: "30%",
    opacity: 0.2,
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  })

  // Floating elements
  gsap.to(".cyber-float", {
    y: -20,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
  })

  // Matrix background effect
  gsap.fromTo(
    ".matrix-bg",
    { y: "-100%" },
    {
      y: "100%",
      duration: 20,
      ease: "none",
      repeat: -1,
    },
  )

  // Cyber grid effect
  gsap.to(".cyber-grid-overlay", {
    y: "30%",
    opacity: 0.2,
    duration: 2,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
  })

  // Parallax grid effect
  gsap.to(".cyber-grid-overlay", {
    y: "30%",
    opacity: 0.2,
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  })

  // Add scroll-based parallax for grid overlay
  gsap.to(".cyber-grid-overlay", {
    backgroundPosition: "0 100%",
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  })

  // Enhance heading animations
  const heading = container.querySelector("h2")
  if (heading) {
    gsap.from(heading, {
      duration: 1.5,
      opacity: 0,
      y: 100,
      rotation: 5,
      transformOrigin: "left top",
      ease: "power4.out",
      scrollTrigger: {
        trigger: heading,
        start: "top bottom-=100",
        end: "top center",
        scrub: 1,
      },
    })
  }

  // Enhanced parallax background
  gsap.to(".cyber-grid-overlay", {
    y: "30%",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  })

  // Matrix rain effect
  gsap.to(".matrix-bg", {
    backgroundPosition: "0 1000px",
    ease: "none",
    duration: 20,
    repeat: -1,
  })

  // Hero section parallax effect
  const heroSection = container.querySelector("#features")
  if (heroSection) {
    gsap.to(heroSection, {
      backgroundPositionY: "50%",
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
  }
  // Glowing grid animation
  const glowingGrid = container.querySelector(".cyber-grid-overlay")
  if (glowingGrid) {
    gsap.to(glowingGrid, {
      opacity: 0.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }
  // Animate feature cards with stagger and 3D effect
  // Enhanced scroll animations
  ScrollTrigger.batch(".feature-card", {
    interval: 0.1,
    batchMax: 3,
    onEnter: (elements) => {
      gsap.from(elements, {
        autoAlpha: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        rotateX: -15,
        scale: 0.9,
      })
    },
  })

  const featureCards = container.querySelectorAll(".feature-card")
  featureCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        rotateY: -30,
        translateZ: -100,
      },
      {
        opacity: 1,
        rotateY: 0,
        translateZ: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.2,
      },
    )
  })

  // Animate metrics cards with floating effect
  const metricCards = container.querySelectorAll(".model-card")
  metricCards.forEach((card, index) => {
    gsap.to(card, {
      y: "random(-20, 20)",
      duration: "random(2, 4)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.3,
    })

    // Add hover effect
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 203, 221, 0.25)",
        duration: 0.3,
        rotateY: 15,
        rotateX: 5,
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: "0 10px 15px -3px rgba(0, 203, 221, 0.1)",
        duration: 0.3,
      })
    })
  })

  // Text reveal animation for headings
  const headings = container.querySelectorAll("h2")
  headings.forEach((heading) => {
    const text = new SplitType(heading as HTMLElement, { types: "chars" })
    gsap.fromTo(
      text.chars,
      {
        opacity: 0,
        y: 50,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: heading,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      },
    )
  })

  // Cyber grid background parallax
  // Add floating elements effect
  const floatingElements = container.querySelectorAll(".feature-section")
  floatingElements.forEach((element) => {
    gsap.to(element, {
      y: "random(-10, 10)",
      x: "random(-5, 5)",
      rotation: "random(-3, 3)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  })

  // Add 3D tilt effect on hover
  const cards = container.querySelectorAll(".feature-card")
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e: Event) => {
      const mouseEvent = e as MouseEvent
      const rect = (card as HTMLElement).getBoundingClientRect()
      const x = mouseEvent.clientX - rect.left
      const y = mouseEvent.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: "power2.out",
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    })
  })

  const grid = container.querySelector(".cyber-grid")
  if (grid) {
    gsap.to(grid, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      },
    })
  }
}

