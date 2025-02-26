"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Database, Brain, Target, Rocket, TrendingUp } from "lucide-react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: <Database className="w-10 h-10 text-cyan-400" />,
    title: "Data Collection",
    description: "Gather and prepare your training data",
    glowColor: "rgba(0, 203, 221, 0.6)",
  },
  {
    icon: <Brain className="w-10 h-10 text-cyan-400" />,
    title: "Model Selection",
    description: "Select the model that best fits your needs",
    glowColor: "rgba(0, 203, 221, 0.6)",
  },
  {
    icon: <Target className="w-10 h-10 text-cyan-400" />,
    title: "Fine-Tuning",
    description: "Customize the model for your specific use case",
    glowColor: "rgba(0, 203, 221, 0.6)",
  },
  {
    icon: <Rocket className="w-10 h-10 text-cyan-400" />,
    title: "Deployment",
    description: "Deploy your model to production",
    glowColor: "rgba(0, 203, 221, 0.6)",
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-cyan-400" />,
    title: "Continuous Learning",
    description: "Monitor and improve your model over time",
    glowColor: "rgba(0, 203, 221, 0.6)",
  },
]

export function HowItWorks() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const particles: HTMLDivElement[] = []
    const container = containerRef.current
    if (!container) return

    // Create particle system
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0"
      container.appendChild(particle)
      particles.push(particle as HTMLDivElement)
    }

    // Animate particles
    particles.forEach((particle, i) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      })

      gsap.to(particle, {
        duration: "random(2, 4)",
        x: "+=100",
        y: "+=100",
        opacity: gsap.utils.random(0.1, 0.3),
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: i * 0.1,
      })
    })

    // Animate timeline and icons
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })

    // Heartbeat animation for icons
    gsap.to(".timeline-icon", {
      scale: 1.1,
      boxShadow: "0 0 30px rgba(0, 203, 221, 0.8)",
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    // Glowing timeline
    gsap.to(".timeline-line", {
      boxShadow: "0 0 20px rgba(0, 203, 221, 0.6)",
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "none",
    })

    return () => {
      particles.forEach((particle) => particle.remove())
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      id="how-it-works"
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      ref={containerRef}
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{ top: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              style={{ left: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover our streamlined process for AI implementation
          </p>
        </motion.div>

        <motion.div className="relative" style={{ scale, opacity }} ref={timelineRef}>
          <div className="timeline-line absolute left-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 via-cyan-300 to-cyan-500 transform -translate-x-1/2 z-20 rounded-full" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="timeline-item relative mb-16"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                <div className="relative">
                  <div
                    className="timeline-icon w-16 h-16 bg-gray-800 rounded-full border-4 border-cyan-400 flex items-center justify-center z-30 relative hover:scale-110 transition-transform duration-300"
                    style={{
                      boxShadow: "0 0 20px rgba(0, 203, 221, 0.6)",
                    }}
                  >
                    {step.icon}
                  </div>
                  {/* Connection lines */}
                  <div
                    className="absolute top-1/2 w-8 h-1 bg-gradient-to-r from-cyan-400 to-transparent transform -translate-y-1/2 rounded-full"
                    style={{
                      left: index % 2 === 0 ? "100%" : "auto",
                      right: index % 2 === 0 ? "auto" : "100%",
                      boxShadow: "0 0 10px rgba(0, 203, 221, 0.4)",
                    }}
                  />
                </div>
                <div className="w-1/2" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

