'use client'

import { useEffect, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  BarChart3,
  ClipboardCheck,
  Loader2,
  MapPin,
  Settings2,
} from 'lucide-react'
import AdminTodayBoard from '@/components/attendance/AdminTodayBoard'
import AttendanceReports from '@/components/attendance/AttendanceReports'
import AttendanceSettingsPanel from '@/components/attendance/AttendanceSettingsPanel'
import CheckInPanel from '@/components/attendance/CheckInPanel'
import { canPerform, getUserRoles } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { userHasAnyNormalizedRole, pickDashboardPath } from '@/lib/roles'
import { useAttendanceEnrollment } from '@/lib/hooks/useAttendanceEnrollment'

export type AttendanceTab = 'today' | 'me' | 'reports' | 'settings'

const TAB_META: Record<
  AttendanceTab,
  { label: string; description: string; icon: React.ReactNode }
> = {
  today: {
    label: 'Today',
    description: 'Live campus board — approve, leave, or mark absent',
    icon: <ClipboardCheck className="h-4 w-4" />,
  },
  me: {
    label: 'My Attendance',
    description: 'GPS check-in and check-out for your assigned campus',
    icon: <MapPin className="h-4 w-4" />,
  },
  reports: {
    label: 'Reports',
    description: 'Today, 7-day, and 30-day attendance results inline',
    icon: <BarChart3 className="h-4 w-4" />,
  },
  settings: {
    label: 'Settings',
    description: 'Campuses, groups, staff roster, and academic calendar',
    icon: <Settings2 className="h-4 w-4" />,
  },
}

export default function AttendanceHub() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const roles = getUserRoles()
  const { loading: enrollmentLoading, enrolled } = useAttendanceEnrollment()

  const canManage = useMemo(
    () =>
      canPerform(PERMISSIONS.ATTENDANCE_MANAGE, ['Admin', 'Staff', 'ManagerialStaff']) ||
      canPerform(PERMISSIONS.ATTENDANCE_VERIFY, ['Admin', 'Staff', 'ManagerialStaff']) ||
      userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff'),
    [roles]
  )

  const canReports = useMemo(
    () =>
      canManage ||
      canPerform(PERMISSIONS.ATTENDANCE_REPORTS, ['Admin', 'Staff', 'ManagerialStaff']),
    [canManage]
  )

  const availableTabs = useMemo(() => {
    const tabs: AttendanceTab[] = []
    if (canManage) tabs.push('today')
    if (enrolled) tabs.push('me')
    if (canReports) tabs.push('reports')
    if (canManage) tabs.push('settings')
    return tabs
  }, [canManage, canReports, enrolled])

  const requested = (searchParams.get('tab') || '').toLowerCase()
  const requestedTab: AttendanceTab | null =
    requested === 'me' || requested === 'checkin' || requested === 'my'
      ? 'me'
      : requested === 'reports' || requested === 'report'
        ? 'reports'
        : requested === 'settings' || requested === 'setup'
          ? 'settings'
          : requested === 'today' || requested === 'board'
            ? 'today'
            : null

  const tab: AttendanceTab =
    requestedTab && availableTabs.includes(requestedTab)
      ? requestedTab
      : availableTabs[0] || 'today'

  const setTab = (next: AttendanceTab) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', next)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const canAccessHub = canManage || canReports || enrolled

  // No manage, no reports, and not enrolled → leave hub
  useEffect(() => {
    if (enrollmentLoading) return
    if (!canAccessHub) {
      router.replace(pickDashboardPath(roles))
    }
  }, [enrollmentLoading, canAccessHub, router, roles])

  // Keep URL in sync when requested tab is unavailable (e.g. My Attendance while not enrolled)
  useEffect(() => {
    if (enrollmentLoading || availableTabs.length === 0) return
    if (requestedTab && !availableTabs.includes(requestedTab)) {
      setTab(availableTabs[0])
    } else if (!requestedTab) {
      setTab(availableTabs[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only correct invalid tab
  }, [enrollmentLoading, availableTabs, requestedTab])

  if (enrollmentLoading) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 text-sm text-gray-600">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        Loading attendance…
      </div>
    )
  }

  if (!canAccessHub) {
    return null
  }

  if (availableTabs.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 text-sm text-amber-950">
        You do not have attendance access. Ask an admin to assign you to a campus roster if you need
        to check in.
      </div>
    )
  }

  const meta = TAB_META[tab]

  return (
    <div className="space-y-5">
      <header className="relative overflow-hidden rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-emerald-50/50 p-5 shadow-sm sm:p-6">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-200/40 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700/80">
            Attendance hub
          </p>
          <h1 className="mt-1 font-josefin text-2xl font-bold text-gray-900 sm:text-3xl">
            {meta.label}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-600">{meta.description}</p>
        </div>

        <nav
          className="relative mt-5 flex gap-1 overflow-x-auto rounded-xl bg-white/80 p-1 shadow-sm ring-1 ring-gray-200/80"
          aria-label="Attendance sections"
        >
          {availableTabs.map((id) => {
            const active = tab === id
            const item = TAB_META[id]
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-800'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {item.icon}
                {item.label}
              </button>
            )
          })}
        </nav>
      </header>

      {tab === 'today' && canManage && <AdminTodayBoard embedded />}
      {tab === 'me' && enrolled && (
        <div className="mx-auto max-w-3xl">
          <CheckInPanel />
        </div>
      )}
      {tab === 'reports' && canReports && <AttendanceReports embedded />}
      {tab === 'settings' && canManage && <AttendanceSettingsPanel embedded />}
    </div>
  )
}
