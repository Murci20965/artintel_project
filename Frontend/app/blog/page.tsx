"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
}

const featuredPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with AI Model Deployment",
    excerpt: "Learn how to deploy your first AI model with Artintelllms's platform in under 10 minutes.",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Tutorial",
  },
  {
    id: "2",
    title: "Understanding Model Pretraining",
    excerpt: "Deep dive into the pretraining process and why it matters for your AI applications.",
    date: "2025-01-10",
    readTime: "8 min read",
    category: "Technical",
  },
  {
    id: "3",
    title: "The Future of AI Infrastructure",
    excerpt: "Exploring upcoming trends in AI infrastructure and how they'll shape development.",
    date: "2025-01-05",
    readTime: "6 min read",
    category: "Industry",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">Artintelllms Blog</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
            Latest insights, tutorials, and updates from our team
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-3 mb-16">
          {featuredPosts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col overflow-hidden transform transition-transform hover:scale-105"
            >
              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.id}`} className="block mt-2">
                  <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="px-6 pb-4">
                <time className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center pb-16">
          <Link
            href="/blog/archive"
            className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

