'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminTodayBoard from '@/components/attendance/AdminTodayBoard'
import { canPerform, getCurrentUser, getUserRoles } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { userHasAnyNormalizedRole } from '@/lib/roles'

export default function AttendanceAdminPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.replace('/login')
      return
    }
    const roles = getUserRoles()
    const ok =
      canPerform(PERMISSIONS.ATTENDANCE_MANAGE, ['Admin', 'Staff', 'ManagerialStaff']) ||
      userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff')
    setAllowed(ok)
    setReady(true)
    if (!ok) router.replace('/dashboard/my-attendance')
  }, [router])

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-600">
        Checking access…
      </div>
    )
  }

  if (!allowed) return null

  return <AdminTodayBoard />
}
