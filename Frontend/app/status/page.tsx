"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock } from "lucide-react"

const StatusPage = () => {
  // This would typically come from an API
  const services = [
    { name: "API", status: "operational", uptime: "99.99%" },
    { name: "Web Dashboard", status: "operational", uptime: "99.95%" },
    { name: "Model Training", status: "operational", uptime: "99.90%" },
    { name: "Model Inference", status: "operational", uptime: "99.99%" },
    { name: "Database", status: "operational", uptime: "99.99%" },
  ]

  const incidents = [
    {
      date: "2024-02-15",
      title: "API Performance Degradation",
      status: "resolved",
      description: "Temporary latency increase in API responses. Issue has been resolved.",
    },
    {
      date: "2024-02-10",
      title: "Scheduled Maintenance",
      status: "completed",
      description: "System upgrade and maintenance completed successfully.",
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">System Status</h1>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <p className="text-lg text-gray-600 dark:text-gray-300">All systems operational</p>
          </div>
        </motion.div>

        <div className="grid gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Uptime: {service.uptime}</p>
                  <p className="text-sm font-semibold text-green-500">Operational</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Past Incidents</h2>
          <div className="space-y-6">
            {incidents.map((incident, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {incident.status === "resolved" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{incident.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{incident.description}</p>
                  </div>
                  <p className="text-sm text-gray-500">{incident.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            For real-time updates, follow us on{" "}
            <a href="#" className="text-primary hover:underline">
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatusPage

