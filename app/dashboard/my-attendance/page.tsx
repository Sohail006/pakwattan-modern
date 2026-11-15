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
          Check in and check out only inside the campus GPS radius. Times use 12-hour Pakistan
          format; late check-in and early check-out are shown in minutes, then hours.
        </p>
      </div>
      <CheckInPanel />
    </div>
  )
}
