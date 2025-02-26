import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Building, Clock } from "lucide-react"
import { jobPostings } from "../data"

export default function JobPostingPage({ params }: { params: { id: string } }) {
  const job = jobPostings.find((j) => j.id === params.id)

  if (!job) {
    return (
      <div className="min-h-screen bg-white dark:bg-Artintelllms-primary pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Job Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The job posting you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/careers">
            <Button className="bg-Artintelllms-secondary hover:bg-Artintelllms-secondary/90">View All Positions</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-Artintelllms-primary pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/careers" className="inline-flex items-center text-Artintelllms-secondary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Careers
        </Link>

        <div className="bg-white dark:bg-Artintelllms-primary/50 rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{job.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Building className="w-4 h-4 mr-2" />
              {job.department}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 mr-2" />
              {job.location}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              {job.type}
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h2>About the Role</h2>
            <p>{job.description}</p>

            <h2>Requirements</h2>
            <ul>
              <li>5+ years of experience in software development</li>
              <li>Strong background in machine learning and AI technologies</li>
              <li>Experience with cloud platforms (AWS, GCP, Azure)</li>
              <li>Excellent problem-solving and communication skills</li>
            </ul>

            <h2>What We Offer</h2>
            <ul>
              <li>Competitive salary and equity package</li>
              <li>Comprehensive health, dental, and vision benefits</li>
              <li>Flexible work arrangements and unlimited PTO</li>
              <li>Learning and development budget</li>
              <li>Latest hardware and software tools</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              size="lg"
              className="w-full bg-Artintelllms-secondary hover:bg-Artintelllms-secondary/90"
              onClick={() => window.open("https://jobs.lever.co/Artintelllms", "_blank")}
            >
              Apply Now
            </Button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              By applying, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

