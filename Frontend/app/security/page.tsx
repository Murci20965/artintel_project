"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Server, UserCheck } from "lucide-react"

const SecurityPage = () => {
  const securityFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and security measures to protect your data and models.",
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Data Protection",
      description: "End-to-end encryption for all data in transit and at rest.",
    },
    {
      icon: <Server className="h-8 w-8 text-primary" />,
      title: "Secure Infrastructure",
      description: "Hosted on AWS with multiple layers of security and redundancy.",
    },
    {
      icon: <UserCheck className="h-8 w-8 text-primary" />,
      title: "Access Control",
      description: "Role-based access control and multi-factor authentication.",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Security at Artintelllms</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We take security seriously. Learn about our comprehensive approach to protecting your data and AI models.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold ml-4 text-gray-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold mb-4">Compliance & Certifications</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>SOC 2 Type II Certified</li>
            <li>GDPR Compliant</li>
            <li>HIPAA Compliant</li>
            <li>ISO 27001 Certified</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Security Measures</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>Regular security audits and penetration testing</li>
            <li>24/7 infrastructure monitoring</li>
            <li>Automated threat detection and prevention</li>
            <li>Regular security updates and patches</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
          <p className="mb-4">
            All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3. We maintain strict
            access controls and regularly audit access logs.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SecurityPage

