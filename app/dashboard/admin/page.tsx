'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  ClipboardList, 
  FileText, 
  TrendingUp, 
  ArrowRight, 
  RefreshCw, 
  AlertCircle,
  Newspaper,
  Mail,
  CheckCircle
} from 'lucide-react'
import { getStudentsPaginated } from '@/lib/api/students'
import { getAllJobApplications } from '@/lib/api/jobs'
import { getAllRegistrations } from '@/lib/api/registrations'
import { getNews } from '@/lib/api/news'
import { getContacts, Contact } from '@/lib/api/contact'

type Kpi = { 
  label: string
  value: number
  href?: string
  icon: React.ReactNode
  change?: string
  changeType?: 'increase' | 'decrease'
  loading?: boolean
  error?: boolean
}

export default function AdminDashboardPage() {
  const [kpis, setKpis] = useState<Kpi[]>([
    { 
      label: 'Total Students', 
      value: 0, 
      href: '/dashboard/students',
      icon: <Users className="w-5 h-5" />,
      loading: true,
    },
    { 
      label: 'Registrations', 
      value: 0,
      href: '/dashboard/registrations',
      icon: <ClipboardList className="w-5 h-5" />,
      loading: true,
    },
    { 
      label: 'News & Events', 
      value: 0,
      href: '/dashboard/news',
      icon: <Newspaper className="w-5 h-5" />,
      loading: true,
    },
    { 
      label: 'Contact Messages', 
      value: 0,
      href: '/dashboard/contact-messages',
      icon: <Mail className="w-5 h-5" />,
      loading: true,
    },
    { 
      label: 'Job Applications', 
      value: 0,
      href: '/dashboard/jobs',
      icon: <FileText className="w-5 h-5" />,
      loading: true,
    },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const loadKpis = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    setError(null)

    try {
      // Update all KPIs to loading state
      setKpis(prev => prev.map(kpi => ({ ...kpi, loading: true, error: false })))

      // Fetch all data in parallel using API client functions (with authentication)
      // Use paginated endpoints to get total counts efficiently
      const results = await Promise.allSettled([
        getStudentsPaginated({ page: 1, pageSize: 1 }).catch((err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Admin Dashboard] Error fetching students:', err)
          }
          return { data: [], totalCount: 0 }
        }),
        getAllRegistrations().catch((err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Admin Dashboard] Error fetching registrations:', err)
          }
          return []
        }),
        getNews({ pageSize: 1 }).catch((err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Admin Dashboard] Error fetching news:', err)
          }
          return { data: [], totalCount: 0 }
        }),
        getContacts().then((contacts) => {
          // Log successful response for debugging
          if (process.env.NODE_ENV === 'development') {
            console.log('[Admin Dashboard] Contacts API response:', {
              contacts,
              count: Array.isArray(contacts) ? contacts.length : 'not an array',
              type: typeof contacts,
              isArray: Array.isArray(contacts)
            })
          }
          return contacts
        }).catch((err) => {
          // Log error details
          if (process.env.NODE_ENV === 'development') {
            console.error('[Admin Dashboard] Error fetching contacts:', err)
            console.error('[Admin Dashboard] Contacts error details:', {
              message: err instanceof Error ? err.message : String(err),
              name: err instanceof Error ? err.name : undefined,
              stack: err instanceof Error ? err.stack : undefined
            })
          }
          return []
        }),
        getAllJobApplications().catch((err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Admin Dashboard] Error fetching job applications:', err)
          }
          return []
        }),
      ])

      const [studentsResult, regsResult, newsResult, contactsResult, jobsResult] = results

      // Extract totalCount from paginated responses
      const studentsData = studentsResult.status === 'fulfilled' ? studentsResult.value : { data: [], totalCount: 0 }
      const studentsCount = studentsData?.totalCount || 0
      
      const regs = regsResult.status === 'fulfilled' ? regsResult.value : []
      const regsCount = Array.isArray(regs) ? regs.length : 0
      
      const newsData = newsResult.status === 'fulfilled' ? newsResult.value : { data: [], totalCount: 0 }
      const newsCount = newsData?.totalCount || 0
      
      // Handle contacts - check if response is wrapped or direct array
      let contacts: Contact[] = []
      if (contactsResult.status === 'fulfilled') {
        const result = contactsResult.value
        // Handle both direct array and wrapped response
        if (Array.isArray(result)) {
          contacts = result
        } else if (result && typeof result === 'object' && 'data' in result && Array.isArray((result as { data: Contact[] }).data)) {
          contacts = (result as { data: Contact[] }).data
        } else if (result && typeof result === 'object' && 'contacts' in result && Array.isArray((result as { contacts: Contact[] }).contacts)) {
          contacts = (result as { contacts: Contact[] }).contacts
        }
      }
      const contactsCount = contacts.length
      
      // Debug logging for contacts
      if (process.env.NODE_ENV === 'development') {
        console.log('[Admin Dashboard] Contacts result:', {
          status: contactsResult.status,
          rawValue: contactsResult.status === 'fulfilled' ? contactsResult.value : undefined,
          processedContacts: contacts,
          count: contactsCount,
          isArray: Array.isArray(contactsResult.status === 'fulfilled' ? contactsResult.value : [])
        })
      }
      
      const jobs = jobsResult.status === 'fulfilled' ? jobsResult.value : []
      const jobsCount = Array.isArray(jobs) ? jobs.length : 0

      const studentsError = studentsResult.status === 'rejected'
      const regsError = regsResult.status === 'rejected'
      const newsError = newsResult.status === 'rejected'
      const contactsError = contactsResult.status === 'rejected'
      const jobsError = jobsResult.status === 'rejected'

      setKpis([
        { 
          label: 'Total Students',
          value: studentsCount,
          href: '/dashboard/students',
          icon: <Users className="w-5 h-5" />,
          loading: false,
          error: studentsError,
        },
        { 
          label: 'Registrations',
          value: regsCount,
          href: '/dashboard/registrations',
          icon: <ClipboardList className="w-5 h-5" />,
          loading: false,
          error: regsError,
        },
        { 
          label: 'News & Events',
          value: newsCount,
          href: '/dashboard/news',
          icon: <Newspaper className="w-5 h-5" />,
          loading: false,
          error: newsError,
        },
        { 
          label: 'Contact Messages',
          value: contactsCount,
          href: '/dashboard/contact-messages',
          icon: <Mail className="w-5 h-5" />,
          loading: false,
          error: contactsError,
        },
        { 
          label: 'Job Applications',
          value: jobsCount,
          href: '/dashboard/jobs',
          icon: <FileText className="w-5 h-5" />,
          loading: false,
          error: jobsError,
        },
      ])
    } catch (error) {
      console.error('Failed to load KPIs:', error)
      setError('Failed to load dashboard data. Please try again.')
      setKpis(prev => prev.map(kpi => ({ ...kpi, loading: false, error: true })))
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadKpis()
  }, [])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <button
          onClick={() => loadKpis(true)}
          disabled={refreshing || loading}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Refresh dashboard data"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium">Refresh</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">{error}</p>
            <button
              onClick={() => loadKpis(true)}
              className="text-sm text-red-600 hover:text-red-800 underline mt-1"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className={`bg-white rounded-xl shadow-sm border p-6 transition-all duration-200 ${
              kpi.error 
                ? 'border-red-200 hover:shadow-md' 
                : 'border-gray-200 hover:shadow-md hover:border-primary-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 truncate">{kpi.label}</p>
                {kpi.loading ? (
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse mt-2" aria-label="Loading" />
                ) : kpi.error ? (
                  <div className="flex items-center space-x-2 mt-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-sm text-red-600">Error loading</p>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value.toLocaleString()}</p>
                )}
              </div>
              <div className={`p-3 rounded-lg flex-shrink-0 ${
                kpi.error ? 'bg-red-50' : 'bg-primary-50'
              }`}>
                <div className={kpi.error ? 'text-red-600' : 'text-primary-600'}>
                  {kpi.icon}
                </div>
              </div>
            </div>
            {kpi.href && !kpi.loading && (
              <Link
                href={kpi.href}
                className="inline-flex items-center mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                aria-label={`View ${kpi.label} details`}
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
            <Link
              href="/dashboard/students"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Manage students"
            >
              <Users className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">Students</span>
            </Link>
            <Link
              href="/dashboard/registrations"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="View registrations"
            >
              <ClipboardList className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">Registrations</span>
            </Link>
            <Link
              href="/dashboard/admissions"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Manage admissions"
            >
              <FileText className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">Admissions</span>
            </Link>
                   <Link
                     href="/dashboard/contact-messages"
                     className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                     aria-label="Manage contact messages"
                   >
                     <Mail className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
                     <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">Contact Messages</span>
                   </Link>
            <Link
              href="/dashboard/news"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Manage news"
            >
              <Newspaper className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">News</span>
            </Link>
            <Link
              href="/dashboard/jobs"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="View job applications"
            >
              <FileText className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">Jobs</span>
            </Link>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">System Operational</p>
                <p className="text-xs text-gray-600 mt-1">All services are running normally</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Dashboard Updated</p>
                <p className="text-xs text-gray-600 mt-1">
                  Last refreshed: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
            {!loading && !error && (
              <div className="pt-2">
                <p className="text-xs text-gray-500 text-center">
                  All systems are functioning properly
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


