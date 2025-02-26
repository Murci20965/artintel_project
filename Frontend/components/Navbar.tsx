"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "./ui/ThemeToggle"
import "@/styles/animations.css"
import { GlowingEffect } from "./ui/glowing-effect"
import NavbarLogo from "./ui/NavbarLogo"

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Use Cases", href: "/use-cases" },
    { name: "LLMs", href: "/llm-models" },
    { name: "SLMs", href: "/slm-models" },
    { name: "Contact", href: "/contact" },
    { name: "Sign In", href: "/login" },
  ]

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: 0,
          position: "fixed",
          top: scrolled ? 16 : 0,
          width: "100%",
          zIndex: 50,
          opacity: 1,
          scale: 1,
        }}
        exit={{ y: -100, opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={`w-full ${scrolled ? "px-4" : ""}`}
      >
        <div
          className={`relative w-full max-w-5xl mx-auto rounded-xl transition-all duration-300 ease-in-out
            ${
              scrolled
                ? "bg-white/80 dark:bg-gray-900/80 shadow-lg backdrop-blur-lg"
                : "bg-transparent dark:bg-transparent"
            }`}
        >
          <GlowingEffect spread={20} glow={scrolled} disabled={false} />
          <div className="w-full px-4 py-3 flex justify-between items-center rounded-xl">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
                className="relative"
              >
                <NavbarLogo />
              </motion.div>
            </Link>

            {/* Nav Items (Desktop) */}
            <div className="hidden md:flex space-x-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300
                      ${
                        isActive
                          ? "text-primary dark:text-primary"
                          : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-b-xl">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-4 py-2 text-sm font-medium rounded-md transition-all duration-300
                          ${
                            isActive
                              ? "text-primary dark:text-primary bg-primary/5"
                              : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </AnimatePresence>
  )
}

export default Navbar

