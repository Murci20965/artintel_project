import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  content: string
  date: string
  readTime: string
  category: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

// This would typically come from a CMS or API
const getBlogPost = (id: string): BlogPost => {
  return {
    id,
    title: "Getting Started with AI Model Deployment",
    content: `
      <h2>Introduction</h2>
      <p>AI model deployment is a critical step in the machine learning lifecycle. In this tutorial, we'll walk through the process of deploying your first AI model using Artintelllms's platform.</p>

      <h2>Prerequisites</h2>
      <ul>
        <li>An Artintelllms account</li>
        <li>A trained model in a supported format</li>
        <li>Basic understanding of REST APIs</li>
      </ul>

      <h2>Step 1: Prepare Your Model</h2>
      <p>Before deployment, ensure your model meets our platform requirements. We support models trained with popular frameworks like TensorFlow, PyTorch, and scikit-learn.</p>

      <h2>Step 2: Configure Deployment</h2>
      <p>Use our dashboard to configure your deployment settings, including compute resources, scaling parameters, and monitoring preferences.</p>

      <h2>Step 3: Deploy and Test</h2>
      <p>With configuration complete, deploy your model with a single click. Our platform automatically handles container creation, load balancing, and monitoring setup.</p>

      <h2>Next Steps</h2>
      <p>Once deployed, monitor your model's performance through our analytics dashboard. Set up alerts for key metrics and configure automatic retraining pipelines.</p>
    `,
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Tutorial",
    author: {
      name: "Sarah Chen",
      role: "ML Engineer",
      avatar: "/images/avatars/sarah.jpg",
    },
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)

  return (
    <div className="min-h-screen bg-white dark:bg-Artintelllms-primary pt-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center text-Artintelllms-secondary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              {post.category}
            </div>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-16">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-16">
          <div className="flex items-center">
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.author.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{post.author.role}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

