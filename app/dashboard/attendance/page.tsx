'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AttendanceHub from '@/components/attendance/AttendanceHub'
import { getCurrentUser } from '@/lib/api/auth'

function AttendancePageInner() {
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
        Loading attendance…
      </div>
    )
  }

  return <AttendanceHub />
}

export default function AttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-600">
          Loading attendance…
        </div>
      }
    >
      <AttendancePageInner />
    </Suspense>
  )
}
