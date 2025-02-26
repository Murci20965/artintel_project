import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CyberContainer } from "./cyber-container"

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  glowIntensity?: "low" | "medium" | "high"
  children: React.ReactNode
  containerClassName?: string
}

export const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      glowIntensity = "medium",
      children,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    const glowClasses = {
      low: "hover:shadow-[0_0_15px_rgba(0,203,221,0.3)]",
      medium: "hover:shadow-[0_0_20px_rgba(0,203,221,0.5)]",
      high: "hover:shadow-[0_0_30px_rgba(0,203,221,0.7)]",
    }

    return (
      <CyberContainer
        variant="glow"
        className={cn("inline-block transition-all duration-300", glowClasses[glowIntensity], containerClassName)}
      >
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] before:transition-transform before:duration-300",
            "hover:before:translate-x-[200%]",
            className,
          )}
          {...props}
        >
          {children}
        </Button>
      </CyberContainer>
    )
  },
)

CyberButton.displayName = "CyberButton"

