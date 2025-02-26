import type React from "react"
import { cn } from "@/lib/utils"

interface CyberContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glow"
  children: React.ReactNode
}

export function CyberContainer({ variant = "default", className, children, ...props }: CyberContainerProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden",
        variant === "glow" &&
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#00cbdd]/20 before:via-transparent before:to-transparent before:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CyberTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function CyberText({ className, children, ...props }: CyberTextProps) {
  return (
    <span className={cn("relative", className)} {...props}>
      {children}
    </span>
  )
}

