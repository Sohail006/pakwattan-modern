'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, BookOpen, ClipboardList, TrendingUp } from 'lucide-react'

export default function TeacherDashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 500)
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Manage your classes and students.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">My Classes</p>
              {loading ? (
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2" />
              ) : (
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              )}
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">My Students</p>
              {loading ? (
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2" />
              ) : (
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              )}
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              {loading ? (
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2" />
              ) : (
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              )}
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <ClipboardList className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/dashboard/students"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <Users className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Students</span>
            </Link>
            <Link
              href="/dashboard/courses"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <BookOpen className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Courses</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-primary-100 rounded-lg">
                <TrendingUp className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Welcome to Teacher Dashboard</p>
                <p className="text-xs text-gray-500 mt-1">Manage your classes and students here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

