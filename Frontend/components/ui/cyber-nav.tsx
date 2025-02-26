import React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { CyberText } from "./cyber-container"

interface CyberNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  active?: boolean
}

export const CyberNavLink = React.forwardRef<HTMLAnchorElement, CyberNavLinkProps>(
  ({ className, href, active, children, ...props }, ref) => {
    return (
      <Link
        href={href}
        ref={ref}
        className={cn(
          "relative px-3 py-2 transition-all duration-300",
          "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px]",
          "after:bg-gradient-to-r after:from-primary/0 after:via-primary after:to-primary/0",
          "after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
          "hover:text-primary dark:hover:text-primary-dark",
          active && "text-primary dark:text-primary-dark after:scale-x-100",
          className,
        )}
        {...props}
      >
        <CyberText className={cn("text-sm font-medium", active && "animate-pulse")}>{children}</CyberText>
      </Link>
    )
  },
)

CyberNavLink.displayName = "CyberNavLink"

interface CyberNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    label: string
    active?: boolean
  }[]
}

export const CyberNav = React.forwardRef<HTMLElement, CyberNavProps>(({ className, items, ...props }, ref) => {
  return (
    <nav ref={ref} className={cn("flex items-center space-x-4", className)} {...props}>
      {items.map((item) => (
        <CyberNavLink key={item.href} href={item.href} active={item.active}>
          {item.label}
        </CyberNavLink>
      ))}
    </nav>
  )
})

CyberNav.displayName = "CyberNav"

