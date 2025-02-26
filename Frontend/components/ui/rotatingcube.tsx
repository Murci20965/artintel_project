"use client"

import { motion } from "framer-motion"
import type { FC } from "react"
import { useMemo } from "react"

interface RotatingCubeProps {
  size: number
  position: {
    x: number
    y: number
    z: number
  }
  rotation: {
    x: number
    y: number
    z: number
  }
  color: string
}

export const RotatingCube: FC<RotatingCubeProps> = ({ size, position, rotation, color }) => {
  // Memoizing face styles for performance optimization
  const faces = useMemo(() => ["front", "back", "right", "left", "top", "bottom"], [])

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: "absolute",
        left: position.x,
        top: position.y,
        perspective: "1000px",
      }}
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        rotateX: [rotation.x, rotation.x + 360],
        rotateY: [rotation.y, rotation.y + 360],
        rotateZ: [rotation.z, rotation.z + 360],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        {faces.map((face) => (
          <motion.div
            key={face}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: color,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 0px 8px rgba(255, 255, 255, 0.2)",
              ...getFaceStyles(face, size),
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

// Helper function for cube face transformations
const getFaceStyles = (face: string, size: number) => {
  const translateZ = `translateZ(${size / 2}px)`
  switch (face) {
    case "front":
      return { transform: `rotateY(0deg) ${translateZ}` }
    case "back":
      return { transform: `rotateY(180deg) ${translateZ}` }
    case "right":
      return { transform: `rotateY(90deg) ${translateZ}` }
    case "left":
      return { transform: `rotateY(-90deg) ${translateZ}` }
    case "top":
      return { transform: `rotateX(90deg) ${translateZ}` }
    case "bottom":
      return { transform: `rotateX(-90deg) ${translateZ}` }
    default:
      return {}
  }
}

