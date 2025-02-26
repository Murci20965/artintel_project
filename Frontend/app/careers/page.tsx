"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
}

const jobPostings: JobPosting[] = [
  {
    id: "eng-1",
    title: "Senior ML Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description: "Design and implement scalable ML infrastructure and model training pipelines.",
  },
  {
    id: "eng-2",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Build and maintain our customer-facing dashboard and developer tools.",
  },
  {
    id: "design-1",
    title: "Product Designer",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Create intuitive and beautiful interfaces for our AI platform.",
  },
  {
    id: "sales-1",
    title: "Enterprise Sales Manager",
    department: "Sales",
    location: "New York, NY",
    type: "Full-time",
    description: "Drive enterprise adoption of our AI solutions.",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">Join Our Team</h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
              Help us build the future of AI infrastructure and empower developers worldwide
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {[
              {
                title: "Innovation First",
                description:
                  "Work on cutting-edge AI technology and help shape the future of machine learning infrastructure.",
              },
              {
                title: "Remote-First",
                description:
                  "Work from anywhere in the world. We believe in hiring the best talent, regardless of location.",
              },
              {
                title: "Growth & Impact",
                description: "Develop your skills while making a real impact on how AI is built and deployed globally.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-8">Open Positions</h2>

          <div className="space-y-6">
            {jobPostings.map((job) => (
              <Card
                key={job.id}
                className="p-6 transition-transform hover:scale-101 hover:bg-accent hover:text-accent-foreground"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{job.title}</h3>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                          {job.department}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link href={`/careers/${job.id}`}>
                      <Button className="w-full md:w-auto">Apply Now</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

