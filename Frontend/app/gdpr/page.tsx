import Link from "next/link"
import { Shield, UserCheck, ScrollText, Mail } from "lucide-react"

const sections = [
  {
    icon: <Shield className="w-8 h-8 text-Artintelllms-secondary" />,
    title: "Data Protection",
    content:
      "We implement appropriate technical and organizational measures to ensure data security. All personal data is encrypted in transit and at rest.",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-Artintelllms-secondary" />,
    title: "Your Rights",
    content:
      "Under GDPR, you have the right to access, rectify, erase, restrict processing, data portability, and object to processing of your personal data.",
  },
  {
    icon: <ScrollText className="w-8 h-8 text-Artintelllms-secondary" />,
    title: "Transparency",
    content:
      "We maintain clear records of our data processing activities and provide detailed information about how we use your data.",
  },
  {
    icon: <Mail className="w-8 h-8 text-Artintelllms-secondary" />,
    title: "Communication",
    content: "We ensure clear communication about data processing and obtain explicit consent where required by GDPR.",
  },
]

const rights = [
  "Right to be informed",
  "Right of access",
  "Right to rectification",
  "Right to erasure",
  "Right to restrict processing",
  "Right to data portability",
  "Right to object",
  "Rights related to automated decision making",
]

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-Artintelllms-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">GDPR Compliance</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            Learn how we protect your data and comply with EU data protection regulations
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {sections.map((section, index) => (
            <div key={index} className="bg-white dark:bg-Artintelllms-primary/50 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="mr-4">{section.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Your Rights Under GDPR</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rights.map((right, index) => (
              <div
                key={index}
                className="bg-white dark:bg-Artintelllms-primary/50 p-6 rounded-lg shadow-lg text-center"
              >
                <p className="font-semibold text-gray-900 dark:text-white">{right}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center pb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Data Protection Inquiries</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            For any questions about your data or to exercise your rights, please contact our Data Protection Officer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-Artintelllms-secondary hover:bg-Artintelllms-secondary/90"
            >
              Contact DPO
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center px-6 py-3 border border-Artintelllms-secondary text-base font-medium rounded-md text-Artintelllms-secondary bg-transparent hover:bg-Artintelllms-secondary/10"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

