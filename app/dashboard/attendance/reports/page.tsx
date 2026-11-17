'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** Legacy route — redirects into the unified Attendance hub reports tab. */
export default function AttendanceReportsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard/attendance?tab=reports')
  }, [router])

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-600">
      Opening attendance reports…
    </div>
  )
}
