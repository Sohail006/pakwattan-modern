'use client'

import { useMemo } from 'react'
import AttendanceHomeStrip from '@/components/attendance/AttendanceHomeStrip'
import { canPerform, getUserRoles } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { userHasAnyNormalizedRole } from '@/lib/roles'

/** Compact attendance overview for role dashboards (full board lives in Attendance hub). */
export default function AttendanceManageDashboard() {
  const allowed = useMemo(() => {
    const roles = getUserRoles()
    return (
      canPerform(PERMISSIONS.ATTENDANCE_MANAGE, ['Admin', 'Staff', 'ManagerialStaff']) ||
      canPerform(PERMISSIONS.ATTENDANCE_VERIFY, ['Admin', 'Staff', 'ManagerialStaff']) ||
      canPerform(PERMISSIONS.ATTENDANCE_MARK, ['Admin', 'Staff', 'ManagerialStaff', 'Teacher']) ||
      userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff', 'teacher')
    )
  }, [])

  if (!allowed) return null

  return <AttendanceHomeStrip />
}
