"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export const MotherboardGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const drawCircuit = (x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + size, y)
      ctx.lineTo(x + size, y + size)
      ctx.lineTo(x, y + size)
      ctx.closePath()
      ctx.stroke()
    }

    const drawNode = (x: number, y: number, size: number) => {
      ctx.beginPath()
      ctx.arc(x, y, size / 4, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawBinary = (x: number, y: number) => {
      ctx.font = "10px monospace"
      ctx.fillText(Math.random() > 0.5 ? "1" : "0", x, y)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 50
      const nodeSize = 4

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if (Math.random() > 0.7) {
            gsap.to(
              {},
              {
                duration: 0.1 + Math.random() * 0.3,
                onStart: () => {
                  ctx.strokeStyle = `rgba(0, 255, 0, ${0.1 + Math.random() * 0.2})`
                  ctx.fillStyle = `rgba(0, 255, 0, ${0.3 + Math.random() * 0.5})`
                  drawCircuit(x, y, gridSize)
                  drawNode(x + gridSize / 2, y + gridSize / 2, nodeSize)
                  drawBinary(x + Math.random() * gridSize, y + Math.random() * gridSize)
                },
              },
            )
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

