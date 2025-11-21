'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, ClipboardList, FileText, TrendingUp, ArrowRight } from 'lucide-react'

type Kpi = { 
  label: string
  value: number
  href?: string
  icon: React.ReactNode
  change?: string
  changeType?: 'increase' | 'decrease'
}

export default function AdminDashboardPage() {
  const [kpis, setKpis] = useState<Kpi[]>([
    { 
      label: 'Total Students', 
      value: 0, 
      href: '/dashboard/students',
      icon: <Users className="w-5 h-5" />,
    },
    { 
      label: 'Registrations', 
      value: 0,
      icon: <ClipboardList className="w-5 h-5" />,
    },
    { 
      label: 'Admissions', 
      value: 0,
      icon: <FileText className="w-5 h-5" />,
    },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadKpis() {
      setLoading(true)
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://localhost:7210'
        const [studentsRes, regsRes, admRes] = await Promise.all([
          fetch(`${base}/api/students`),
          fetch(`${base}/api/registrations`),
          fetch(`${base}/api/admissions`),
        ])
        const [students, regs, adms] = await Promise.all([
          studentsRes.ok ? studentsRes.json() : [],
          regsRes.ok ? regsRes.json() : [],
          admRes.ok ? admRes.json() : [],
        ])
        setKpis([
          { 
            label: 'Total Students',
            value: Array.isArray(students) ? students.length : 0,
            href: '/dashboard/students',
            icon: <Users className="w-5 h-5" />,
          },
          { 
            label: 'Registrations',
            value: Array.isArray(regs) ? regs.length : 0,
            icon: <ClipboardList className="w-5 h-5" />,
          },
          { 
            label: 'Admissions',
            value: Array.isArray(adms) ? adms.length : 0,
            icon: <FileText className="w-5 h-5" />,
          },
        ])
      } catch (error) {
        console.error('Failed to load KPIs:', error)
      } finally {
        setLoading(false)
      }
    }
    loadKpis()
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2" />
                ) : (
                  <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value.toLocaleString()}</p>
                )}
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <div className="text-primary-600">
                  {kpi.icon}
                </div>
              </div>
            </div>
            {kpi.href && (
              <Link
                href={kpi.href}
                className="inline-flex items-center mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
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
              href="/dashboard/registrations"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <ClipboardList className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Registrations</span>
            </Link>
            <Link
              href="/dashboard/admissions"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <FileText className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Admissions</span>
            </Link>
            <Link
              href="/dashboard/contacts"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <Users className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Contacts</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-primary-100 rounded-lg">
                <TrendingUp className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">System is running smoothly</p>
                <p className="text-xs text-gray-500 mt-1">All systems operational</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center py-4">
              Activity feed will appear here as events occur
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


