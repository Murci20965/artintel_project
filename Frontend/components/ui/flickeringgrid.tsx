"use client"
import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useScroll, useTransform, motion } from "framer-motion"

interface FlickeringGridProps {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color1?: string
  color2?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 20,
  gridGap = 5,
  flickerChance = 0.3,
  color1 = "rgb(0, 203, 221)",
  color2 = "rgb(0, 203, 223)",
  width,
  height,
  className,
  maxOpacity = 0.3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll()
  const flickerSpeed = useTransform(scrollYProgress, [0, 1], [1, 5])

  const toRGBA = useCallback((color: string) => {
    if (typeof window === "undefined") return `rgba(0, 0, 0,`
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext("2d")
    if (!ctx) return "rgba(255, 0, 0,"
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
    return `rgba(${r}, ${g}, ${b},`
  }, [])

  const memoizedColors = useMemo(() => [toRGBA(color1), toRGBA(color2)], [color1, color2, toRGBA])

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const cols = Math.floor(width / (squareSize + gridGap))
      const rows = Math.floor(height / (squareSize + gridGap))

      const squares = new Float32Array(cols * rows * 3)
      for (let i = 0; i < squares.length; i += 3) {
        squares[i] = Math.random() * maxOpacity // Opacity
        squares[i + 1] = Math.random() < 0.5 ? 0 : 1 // Binary digit
        squares[i + 2] = Math.random() < 0.5 ? 0 : 1 // Color toggle
      }

      return { cols, rows, squares, dpr }
    },
    [squareSize, gridGap, maxOpacity],
  )

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number, currentFlickerSpeed: number) => {
      for (let i = 0; i < squares.length; i += 3) {
        if (Math.random() < flickerChance * deltaTime * currentFlickerSpeed) {
          squares[i] = Math.random() * maxOpacity
          squares[i + 1] = Math.random() < 0.5 ? 0 : 1
          squares[i + 2] = Math.random() < 0.5 ? 0 : 1
        }
      }
    },
    [flickerChance, maxOpacity],
  )

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "transparent"
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = (i * rows + j) * 3
          const opacity = squares[index]
          const digit = squares[index + 1]
          const colorIndex = squares[index + 2]
          ctx.fillStyle = `${memoizedColors[colorIndex]}${opacity})`
          ctx.font = `${squareSize * 0.8}px monospace`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(
            digit.toString(),
            (i * (squareSize + gridGap) + squareSize / 2) * dpr,
            (j * (squareSize + gridGap) + squareSize / 2) * dpr,
          )
        }
      }
    },
    [memoizedColors, squareSize, gridGap],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let gridParams: ReturnType<typeof setupCanvas>

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth
      const newHeight = height || container.clientHeight
      setCanvasSize({ width: newWidth, height: newHeight })
      gridParams = setupCanvas(canvas, newWidth, newHeight)
    }

    updateCanvasSize()

    let lastTime = 0
    const animate = (time: number) => {
      if (!isInView) return
      const deltaTime = (time - lastTime) / 1000
      lastTime = time
      const currentFlickerSpeed = flickerSpeed.get()
      updateSquares(gridParams.squares, deltaTime, currentFlickerSpeed)
      drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr)
      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(canvas)

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView, flickerSpeed])

  return (
    <motion.div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      />
    </motion.div>
  )
}

export { FlickeringGrid }

