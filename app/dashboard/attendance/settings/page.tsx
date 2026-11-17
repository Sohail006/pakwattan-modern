'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** Legacy route — redirects into the unified Attendance hub settings tab. */
export default function AttendanceSettingsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard/attendance?tab=settings')
  }, [router])

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-600">
      Opening attendance settings…
    </div>
  )
}
