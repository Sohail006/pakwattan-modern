'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { canPerform, getUserRoles } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { pickDashboardPath, userHasAnyNormalizedRole } from '@/lib/roles'
import { useAttendanceEnrollment } from '@/lib/hooks/useAttendanceEnrollment'

/** Legacy route — enrolled users go to My Attendance; managers/reports to hub. */
export default function MyAttendancePage() {
  const router = useRouter()
  const { loading, enrolled } = useAttendanceEnrollment()
  const roles = getUserRoles()
  const canManage =
    canPerform(PERMISSIONS.ATTENDANCE_MANAGE, ['Admin', 'Staff', 'ManagerialStaff']) ||
    canPerform(PERMISSIONS.ATTENDANCE_VERIFY, ['Admin', 'Staff', 'ManagerialStaff']) ||
    userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff')
  const canReports =
    canManage ||
    canPerform(PERMISSIONS.ATTENDANCE_REPORTS, ['Admin', 'Staff', 'ManagerialStaff'])

  useEffect(() => {
    if (loading) return
    if (enrolled) {
      router.replace('/dashboard/attendance?tab=me')
      return
    }
    if (canManage) {
      router.replace('/dashboard/attendance?tab=today')
      return
    }
    if (canReports) {
      router.replace('/dashboard/attendance?tab=reports')
      return
    }
    router.replace(pickDashboardPath(roles))
  }, [loading, enrolled, canManage, canReports, router, roles])

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-600">
      Opening attendance…
    </div>
  )
}
