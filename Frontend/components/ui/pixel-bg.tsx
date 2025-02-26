"use client"

import { useEffect, useRef } from "react"

interface PixelCanvasProps {
  gap?: number
  speed?: number
  colors?: string[]
  variant?: "grid" | "dots"
}

export function PixelCanvas({
  gap = 20,
  speed = 30,
  colors = ["#6366f1", "#4f46e5", "#4338ca"],
  variant = "grid",
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    const drawGrid = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.floor(canvas.width / gap)
      const rows = Math.floor(canvas.height / gap)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap
          const y = j * gap

          // Create dynamic movement
          const movement = Math.sin(t / 1000 + (i + j) * 0.1) * 2

          if (variant === "grid") {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
            ctx.fillRect(x + movement, y + movement, 2, 2)
          } else {
            ctx.beginPath()
            ctx.arc(x + movement, y + movement, 1, 0, Math.PI * 2)
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
            ctx.fill()
          }
        }
      }
    }

    const animate = () => {
      time += speed
      drawGrid(time)
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [gap, speed, colors, variant])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ background: "transparent" }} />
}

