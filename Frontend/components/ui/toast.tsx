"use client"

import type React from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface ToastProps {
  title: string
  description: string
  onClose: () => void
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({ title, description, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <button
            type="button"
            className="ml-4 inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="bg-blue-500 h-1 animate-[shrink_linear]" style={{ animationDuration: `${duration}ms` }} />
    </motion.div>
  )
}

