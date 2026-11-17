'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Users,
  ClipboardList,
  FileText,
  AlertCircle,
  Newspaper,
  Mail,
  Briefcase,
  ClipboardCheck,
  Loader2,
} from 'lucide-react'
import { getStudentsPaginated } from '@/lib/api/students'
import { getJobApplicationsCount } from '@/lib/api/jobs'
import { getRegistrationsCount } from '@/lib/api/registrations'
import { getNews } from '@/lib/api/news'
import { getContactsCount } from '@/lib/api/contact'
import { isAuthenticated, getUserRoles, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { userHasAnyNormalizedRole } from '@/lib/roles'
import DashboardHero from '@/components/dashboard/DashboardHero'
import DashboardKpiGrid, { type DashboardKpi } from '@/components/dashboard/DashboardKpiGrid'
import AttendanceHomeStrip from '@/components/attendance/AttendanceHomeStrip'
import { useAttendanceEnrollment } from '@/lib/hooks/useAttendanceEnrollment'

export default function StaffDashboardPage() {
  const router = useRouter()
  const { loading: enrollmentLoading, enrolled } = useAttendanceEnrollment()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [kpis, setKpis] = useState<DashboardKpi[]>([
    { label: 'Students', value: 0, href: '/dashboard/students', icon: <Users className="h-5 w-5" />, loading: true },
    { label: 'Registrations', value: 0, href: '/dashboard/registrations', icon: <ClipboardList className="h-5 w-5" />, loading: true },
    { label: 'News & Events', value: 0, href: '/dashboard/news', icon: <Newspaper className="h-5 w-5" />, loading: true },
    { label: 'Messages', value: 0, href: '/dashboard/contact-messages', icon: <Mail className="h-5 w-5" />, loading: true },
    { label: 'Jobs', value: 0, href: '/dashboard/jobs', icon: <Briefcase className="h-5 w-5" />, loading: true },
  ])
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      setAuthError('You must be logged in to access this page.')
      setCheckingAuth(false)
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    const roles = getUserRoles()
    const allowed =
      canPerform(PERMISSIONS.REGISTRATIONS_VIEW, ['Admin', 'Staff']) ||
      canPerform(PERMISSIONS.ADMISSIONS_VIEW, ['Admin', 'Staff']) ||
      userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff')

    if (!allowed) {
      setAuthError('You do not have permission to access the staff workspace.')
      setCheckingAuth(false)
      setTimeout(() => router.push('/dashboard'), 3000)
      return
    }

    setCheckingAuth(false)
    setAuthError(null)
  }, [router])

  const loadKpis = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    setError(null)
    try {
      const [studentsRes, regsCount, newsRes, contactsCount, jobsCount] = await Promise.all([
        getStudentsPaginated({ page: 1, pageSize: 1 }).catch(() => ({ data: [], totalCount: 0 })),
        getRegistrationsCount().catch(() => 0),
        getNews({ pageSize: 1 }).catch(() => ({ data: [], totalCount: 0 })),
        getContactsCount().catch(() => 0),
        getJobApplicationsCount().catch(() => 0),
      ])

      setKpis([
        {
          label: 'Students',
          value: studentsRes.totalCount ?? 0,
          href: '/dashboard/students',
          icon: <Users className="h-5 w-5" />,
          hint: 'Student records',
        },
        {
          label: 'Registrations',
          value: regsCount,
          href: '/dashboard/registrations',
          icon: <ClipboardList className="h-5 w-5" />,
          hint: 'New applications',
        },
        {
          label: 'News & Events',
          value: newsRes.totalCount ?? 0,
          href: '/dashboard/news',
          icon: <Newspaper className="h-5 w-5" />,
          hint: 'Published content',
        },
        {
          label: 'Messages',
          value: contactsCount,
          href: '/dashboard/contact-messages',
          icon: <Mail className="h-5 w-5" />,
          hint: 'Contact inbox',
        },
        {
          label: 'Jobs',
          value: jobsCount,
          href: '/dashboard/jobs',
          icon: <FileText className="h-5 w-5" />,
          hint: 'Job applications',
        },
      ])
    } catch {
      setError('Failed to load dashboard data. Please try again.')
      setKpis((prev) => prev.map((k) => ({ ...k, loading: false, error: true })))
    } finally {
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    if (!checkingAuth && !authError) loadKpis()
  }, [checkingAuth, authError, loadKpis])

  if (checkingAuth) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-4">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
          <p className="text-gray-700">{authError}</p>
        </div>
      </div>
    )
  }

  const needsAttention = kpis.filter(
    (k) =>
      !k.loading &&
      !k.error &&
      typeof k.value === 'number' &&
      k.value > 0 &&
      (k.label === 'Registrations' || k.label === 'Messages' || k.label === 'Jobs')
  )

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Staff workspace"
        subtitle="Check in, review today’s attendance, and clear admissions work from one screen."
        onRefresh={() => loadKpis(true)}
        refreshing={refreshing}
      />

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-800">{error}</p>
            <button type="button" onClick={() => loadKpis(true)} className="mt-1 text-sm text-red-700 underline">
              Try again
            </button>
          </div>
        </div>
      )}

      <AttendanceHomeStrip />

      {needsAttention.length > 0 && (
        <section aria-label="Needs attention" className="space-y-3">
          <h2 className="font-josefin text-lg font-bold text-gray-900">Needs attention</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {needsAttention.map((item) => (
              <Link
                key={item.label}
                href={item.href || '#'}
                className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 transition hover:border-amber-300 hover:bg-amber-50"
              >
                <div>
                  <p className="text-sm font-semibold text-amber-950">{item.label}</p>
                  <p className="text-xs text-amber-800/80">{item.hint}</p>
                </div>
                <span className="font-josefin text-2xl font-bold text-amber-900">
                  {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section aria-label="School totals" className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-josefin text-lg font-bold text-gray-900">At a glance</h2>
          {!enrollmentLoading && enrolled && (
            <Link
              href="/dashboard/attendance?tab=me"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              <ClipboardCheck className="h-4 w-4" />
              My Attendance
            </Link>
          )}
        </div>
        <DashboardKpiGrid items={kpis} />
      </section>
    </div>
  )
}
