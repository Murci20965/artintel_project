"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/ui/auth-context"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // If not loading and not authenticated, redirect to login
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  // Show loading state or nothing during SSR
  if (!isClient || loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}</h2>
        <p className="text-gray-300">Your account is active and ready to use.</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Account Type</h3>
            <p className="text-cyan-400">{user.role}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Email</h3>
            <p className="text-cyan-400">{user.email}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium mb-2">User ID</h3>
            <p className="text-cyan-400">{user.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded transition">
              Create New Project
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition">
              View Analytics
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition">
              Manage Settings
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-cyan-500 pl-4">
              <p className="text-sm text-gray-400">Just now</p>
              <p className="text-white">Logged in successfully</p>
            </div>
            <div className="border-l-4 border-gray-600 pl-4">
              <p className="text-sm text-gray-400">Yesterday</p>
              <p className="text-white">Updated profile information</p>
            </div>
            <div className="border-l-4 border-gray-600 pl-4">
              <p className="text-sm text-gray-400">3 days ago</p>
              <p className="text-white">Created new project</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>API Status</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Database</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Healthy</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Storage</span>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">75% Used</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

