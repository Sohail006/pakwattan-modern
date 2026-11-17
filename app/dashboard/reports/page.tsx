'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, BarChart3, ClipboardCheck, Loader2 } from 'lucide-react'
import { isAuthenticated, canPerform, getUserRoles } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { userHasAnyNormalizedRole } from '@/lib/roles'
import AttendanceReports from '@/components/attendance/AttendanceReports'
import DashboardHero from '@/components/dashboard/DashboardHero'

function ReportsPageInner() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [canAttendance, setCanAttendance] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    const roles = getUserRoles()
    const reportsOk =
      canPerform(PERMISSIONS.REPORTS_VIEW, ['Admin', 'Staff']) ||
      userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff')

    if (!reportsOk) {
      setAuthError('You do not have permission to access reports.')
      setCheckingAuth(false)
      return
    }

    const attendanceOk =
      canPerform(PERMISSIONS.ATTENDANCE_REPORTS, ['Admin', 'Staff', 'ManagerialStaff']) ||
      canPerform(PERMISSIONS.ATTENDANCE_MANAGE, ['Admin', 'Staff', 'ManagerialStaff']) ||
      userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff')

    setCanAttendance(attendanceOk)
    setCheckingAuth(false)
  }, [router])

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

  return (
    <div className="space-y-6">
      <DashboardHero
        title="Reports & results"
        subtitle="Attendance results load here immediately. Open the hub if you also need the live board or settings."
      >
        <Link
          href="/dashboard/attendance?tab=reports"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-primary-200 bg-white px-3.5 py-2 text-sm font-semibold text-primary-800"
        >
          <ClipboardCheck className="h-4 w-4" />
          Attendance hub
        </Link>
      </DashboardHero>

      {canAttendance ? (
        <section aria-label="Staff attendance reports" className="space-y-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary-700" />
            <h2 className="font-josefin text-lg font-bold text-gray-900">
              Staff attendance results
            </h2>
          </div>
          <AttendanceReports embedded />
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-600">
          No report modules are available for your role yet.
        </div>
      )}
    </div>
  )
}

export default function ReportsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      }
    >
      <ReportsPageInner />
    </Suspense>
  )
}
