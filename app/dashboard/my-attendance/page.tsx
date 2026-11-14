'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CheckInPanel from '@/components/attendance/CheckInPanel'
import { getCurrentUser } from '@/lib/api/auth'

export default function MyAttendancePage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.replace('/login')
      return
    }
    setReady(true)
  }, [router])

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-600">
        Loading…
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">My Attendance</h1>
        <p className="mt-1 text-sm text-gray-600">
          Check in when you arrive and check out when you leave. Times use 12-hour Pakistan
          format. Keep location on for check-in; check-out still works if GPS is unavailable.
        </p>
      </div>
      <CheckInPanel />
    </div>
  )
}
