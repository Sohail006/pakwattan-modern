'use client'

import { useMemo } from 'react'
import AdminTodayBoard from '@/components/attendance/AdminTodayBoard'
import { canPerform, getUserRoles } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { userHasAnyNormalizedRole } from '@/lib/roles'

/** Live staff attendance board for Admin / attendance managers — place at top of role dashboards. */
export default function AttendanceManageDashboard() {
  const allowed = useMemo(() => {
    const roles = getUserRoles()
    return (
      canPerform(PERMISSIONS.ATTENDANCE_MANAGE, ['Admin', 'Staff', 'ManagerialStaff']) ||
      canPerform(PERMISSIONS.ATTENDANCE_VERIFY, ['Admin', 'Staff', 'ManagerialStaff']) ||
      userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff')
    )
  }, [])

  if (!allowed) return null

  return (
    <section aria-label="Staff attendance management" className="space-y-2">
      <AdminTodayBoard />
    </section>
  )
}
