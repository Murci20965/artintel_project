"use client"

import { Button } from "@/components/ui/button"

import { motion } from "framer-motion"
import { MessageCircle, Users, BookOpen, Github } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="pt-16 sm:pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">Join Our Growing Community</h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Connect with AI enthusiasts, developers, and experts. Share knowledge, get help, and build the future of
              AI together.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Discussion Forums</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Engage in meaningful conversations about AI technology and applications.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Groups</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Join specialized groups based on your interests and expertise.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Resources</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Access tutorials, guides, and best practices from the community.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Open Source</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Contribute to our open-source projects and tools.</p>
            </div>
          </motion.div>

          <motion.div
            className="mt-16 bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 sm:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Join thousands of developers and AI enthusiasts who are already part of our community.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary hover:bg-primary/90 text-white">Join Community</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

