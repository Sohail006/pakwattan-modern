'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
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
  CheckCircle,
  Loader2,
  LogIn
} from 'lucide-react'
import { getStudentsPaginated } from '@/lib/api/students'
import { getAllJobApplications } from '@/lib/api/jobs'
import { getAllRegistrations } from '@/lib/api/registrations'
import { getNews } from '@/lib/api/news'
import { getContacts, Contact } from '@/lib/api/contact'
import { isAuthenticated, getUserRoles, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'

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

export default function StaffDashboardPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [kpis, setKpis] = useState<Kpi[]>([
    { 
      label: 'Total Students', 
      value: 0, 
      href: '/dashboard/students',
      icon: <Users className="w-5 h-5" />,
      loading: true,
    },
    { 
      label: 'New Registrations', 
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

  useEffect(() => {
    const checkAuth = () => {
      setCheckingAuth(true)

      // Check authentication
      if (!isAuthenticated()) {
        setAuthError('You must be logged in to access this page.')
        setCheckingAuth(false)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }

      // Check authorization (Permission-based with role fallback)
      // Staff dashboard access - check for any staff-related permission or role
      const userRoles = getUserRoles()
      const isStaff = canPerform(PERMISSIONS.REGISTRATIONS_VIEW, ['Admin', 'Staff']) ||
                      canPerform(PERMISSIONS.ADMISSIONS_VIEW, ['Admin', 'Staff']) ||
                      userRoles.includes('Staff') || 
                      userRoles.includes('Admin')

      if (!isStaff) {
        setAuthError('You do not have permission to access this page. Only Staff members can access the staff dashboard.')
        setCheckingAuth(false)
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
        return
      }

      // All checks passed
      setCheckingAuth(false)
      setAuthError(null)
    }

    checkAuth()
  }, [router])

  const loadKpis = useCallback(async (isRefresh = false) => {
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
            console.error('[Staff Dashboard] Error fetching students:', err)
          }
          return { data: [], totalCount: 0 }
        }),
        getAllRegistrations().catch((err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Staff Dashboard] Error fetching registrations:', err)
          }
          return []
        }),
        getNews({ pageSize: 1 }).catch((err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Staff Dashboard] Error fetching news:', err)
          }
          return { data: [], totalCount: 0 }
        }),
        getContacts().then((contacts) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('[Staff Dashboard] Contacts API response:', {
              contacts,
              count: Array.isArray(contacts) ? contacts.length : 'not an array',
            })
          }
          return contacts
        }).catch((err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Staff Dashboard] Error fetching contacts:', err)
          }
          return []
        }),
        getAllJobApplications().catch((err) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Staff Dashboard] Error fetching job applications:', err)
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
        if (Array.isArray(result)) {
          contacts = result
        } else if (result && typeof result === 'object' && 'data' in result && Array.isArray((result as { data: Contact[] }).data)) {
          contacts = (result as { data: Contact[] }).data
        } else if (result && typeof result === 'object' && 'contacts' in result && Array.isArray((result as { contacts: Contact[] }).contacts)) {
          contacts = (result as { contacts: Contact[] }).contacts
        }
      }
      const contactsCount = contacts.length
      
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
          label: 'New Registrations',
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
  }, [])

  useEffect(() => {
    if (!checkingAuth && !authError) {
      loadKpis()
    }
  }, [checkingAuth, authError, loadKpis])

  // Show loading state while checking authentication
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show error message if authentication/authorization failed
  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">{authError}</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what needs your attention today.</p>
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

      {/* Quick Actions & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
            <Link
              href="/dashboard/registrations"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="View registrations"
            >
              <ClipboardList className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">Registrations</span>
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
              href="/dashboard/jobs"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="View job applications"
            >
              <FileText className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">Job Applications</span>
            </Link>
            <Link
              href="/dashboard/news"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Manage news"
            >
              <Newspaper className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">News & Events</span>
            </Link>
            <Link
              href="/dashboard/students"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Manage students"
            >
              <Users className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">Students</span>
            </Link>
            <Link
              href="/dashboard/admissions"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Manage admissions"
            >
              <FileText className="w-6 h-6 text-gray-600 group-hover:text-primary-600 mb-2 transition-colors" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700 text-center">Admissions</span>
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

