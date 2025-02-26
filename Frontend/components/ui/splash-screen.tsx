"use client"

import { useEffect, useState } from "react"
import { useFirstLoad } from "@/hooks/use-first-load"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import Image from "next/image"

export const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const isFirstLoad = useFirstLoad()

  useEffect(() => {
    if (!isFirstLoad) {
      setIsLoading(false)
      return
    }
    const tl = gsap.timeline()

    // Loading bar animation
    tl.fromTo(
      ".loading-bar",
      {
        width: "0%",
        opacity: 1,
      },
      {
        width: "100%",
        duration: 2,
        ease: "power1.inOut",
      },
    )

    // Flash animation
    tl.to(
      ".logo-container",
      {
        duration: 0.2,
        opacity: 0.5,
        yoyo: true,
        repeat: 2,
        ease: "power2.inOut",
      },
      "-=0.5",
    ) // Start slightly before loading bar completes

    // Scale and fade animation
    tl.to(".logo-container", {
      scale: 1.2,
      duration: 0.5,
      ease: "power2.inOut",
    }).to(".splash-screen", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => setIsLoading(false),
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="splash-screen fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background dark:bg-gray-900"
        >
          <div className="logo-container relative w-32 h-32 md:w-48 md:h-48 mb-8">
            <Image src="/Icon - PNG.png" alt="Logo" fill className="object-contain" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-primary/20 mix-blend-overlay" />
          </div>

          {/* Loading Bar Container */}
          <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="loading-bar h-full bg-gradient-to-r from-[#00cbdd] to-primary rounded-full" />
          </div>

          {/* Loading Text */}
          <div className="mt-4 text-sm text-foreground/80 dark:text-foreground/60 font-medium">loading...</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

