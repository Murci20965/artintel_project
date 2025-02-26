"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "../ThemeProvider"

const NavbarLogo = () => {
  const { theme } = useTheme()
  const [logoSrc, setLogoSrc] = useState("/Logo-no-bg.png")

  useEffect(() => {
    const isDarkMode = theme === "dark"
    setLogoSrc(isDarkMode ? "/Logo-no-bg-white.png" : "/Logo-no-bg.png")
  }, [theme])

  return (
    <Image
      src={logoSrc}
      alt="Artintellms Logo"
      width={100}
      height={80}
      className="rounded-lg transition-opacity duration-300"
    />
  )
}

export default NavbarLogo

