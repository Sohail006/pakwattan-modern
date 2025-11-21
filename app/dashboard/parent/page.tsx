'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, GraduationCap, Award, Bell, TrendingUp, Mail, Phone, User } from 'lucide-react'
import { GuardianInfo, StudentBasicInfo } from '@/lib/api/auth'

export default function ParentDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [guardianInfo, setGuardianInfo] = useState<GuardianInfo | null>(null)
  const [students, setStudents] = useState<StudentBasicInfo[]>([])

  useEffect(() => {
    // Load guardian info from localStorage (set during login)
    const loadGuardianInfo = () => {
      try {
        const stored = localStorage.getItem('guardian_info')
        if (stored) {
          const guardian: GuardianInfo = JSON.parse(stored)
          setGuardianInfo(guardian)
          setStudents(guardian.students || [])
        }
      } catch (error) {
        console.error('Failed to load guardian info:', error)
      } finally {
        setLoading(false)
      }
    }

    loadGuardianInfo()
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parent Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome! Monitor your child&apos;s academic progress.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">My Children</p>
              {loading ? (
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2" />
              ) : (
                <p className="text-3xl font-bold text-gray-900 mt-2">{students.length}</p>
              )}
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              {loading ? (
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2" />
              ) : (
                <p className="text-3xl font-bold text-gray-900 mt-2">-</p>
              )}
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Notifications</p>
              {loading ? (
                <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2" />
              ) : (
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              )}
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Guardian Info Card */}
      {guardianInfo && (
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl shadow-sm border border-primary-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Guardian Information</h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-primary-600" />
                  <span>
                    <span className="font-medium">{guardianInfo.fullName}</span> ({guardianInfo.relation})
                  </span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-primary-600" />
                  <span>{guardianInfo.email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-primary-600" />
                  <span>{guardianInfo.phone}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Linked Students */}
      {students.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Children</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{student.email}</p>
                  </div>
                </div>
                {student.phone && (
                  <p className="text-sm text-gray-600 flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{student.phone}</span>
                  </p>
                )}
                <Link
                  href={`/dashboard/students/${student.id}`}
                  className="mt-3 block text-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/dashboard/students"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <Users className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">My Children</span>
            </Link>
            <Link
              href="/dashboard/grades"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <Award className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Grades</span>
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
                <p className="text-sm font-medium text-gray-900">Welcome to Parent Dashboard</p>
                <p className="text-xs text-gray-500 mt-1">Monitor your child&apos;s academic progress here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

