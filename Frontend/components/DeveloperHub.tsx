"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Github, MessageSquare, Calendar } from "lucide-react"

const DeveloperHub = () => {
  return (
    <section id="developer-hub" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#00031b] dark:text-white">
          Developer & Community Hub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" />
                  API Docs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Comprehensive API documentation for seamless integration.</CardDescription>
                <Button className="mt-4" variant="outline">
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Github className="mr-2" />
                  GitHub Repos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Explore our open-source projects and contribute to the community.</CardDescription>
                <Button className="mt-4" variant="outline">
                  Visit GitHub
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2" />
                  Developer Forums
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Connect with other developers and get your questions answered.</CardDescription>
                <Button className="mt-4" variant="outline">
                  Join Forum
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" />
                  Events & Webinars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Stay updated with the latest AI trends and Artintelllms features.</CardDescription>
                <Button className="mt-4" variant="outline">
                  View Schedule
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DeveloperHub

