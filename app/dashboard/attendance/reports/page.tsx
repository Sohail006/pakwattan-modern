'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AttendanceReports from '@/components/attendance/AttendanceReports'
import { canPerform, getCurrentUser, getUserRoles } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { userHasAnyNormalizedRole } from '@/lib/roles'

export default function AttendanceReportsPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.replace('/login')
      return
    }
    const roles = getUserRoles()
    const ok =
      canPerform(PERMISSIONS.ATTENDANCE_REPORTS, ['Admin', 'Staff', 'ManagerialStaff']) ||
      userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff')
    if (!ok) {
      router.replace('/dashboard/my-attendance')
      return
    }
    setReady(true)
  }, [router])

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-600">
        Loading reports…
      </div>
    )
  }

  return <AttendanceReports />
}
