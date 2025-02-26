import type React from "react"

interface SplineSceneProps {
  scene: string
  className?: string
}

export const SplineScene: React.FC<SplineSceneProps> = ({ scene, className }) => {
  return (
    <iframe
      src={scene}
      frameBorder="0"
      width="100%"
      height="100%"
      className={className}
      title="Spline Scene"
      allowFullScreen
    />
  )
}

