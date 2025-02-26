"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function Logo() {
  const { theme } = useTheme()

  return (
    <Link href="/" className="relative flex items-center">
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative"
      >
        <div className="relative flex items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-24 w-72"
          >
            <Image
              src={theme === "dark" ? "/images/Logo-white.png" : "/images/Logo-no-bg.png"}
              alt="Artintelllms Logo"
              width={120}
              height={40}
              className="rounded-lg"
              priority
            />
          </motion.div>
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(66, 133, 244, 0)",
                "0 0 0 12px rgba(66, 133, 244, 0.15)",
                "0 0 0 24px rgba(66, 133, 244, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            className="absolute inset-0 rounded-full"
          />
        </div>
      </motion.div>
    </Link>
  )
}

