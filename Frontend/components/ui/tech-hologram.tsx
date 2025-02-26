"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const TechHologram: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 200

    const particles: { x: number; y: number; size: number; speed: number }[] = []

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
      })
    }

    const drawParticle = (x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.5})`
      ctx.fill()
    }

    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = "rgba(0, 255, 255, 0.1)"
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.y -= particle.speed
        if (particle.y < 0) {
          particle.y = canvas.height
        }

        drawParticle(particle.x, particle.y, particle.size)

        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            drawLine(particle.x, particle.y, particles[j].x, particles[j].y)
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    ScrollTrigger.create({
      trigger: canvas,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress
        gsap.to(canvas, {
          opacity: progress,
          duration: 0.5,
          ease: "power2.inOut",
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-50 absolute z-10" />
}

