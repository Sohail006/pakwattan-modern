'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, AlertCircle, GraduationCap } from 'lucide-react'
import PakiansFacultyRegistrationsTable from '@/components/pakians-faculty/PakiansFacultyRegistrationsTable'
import { PAKIANS_FACULTY_PAGE_TITLE } from '@/lib/pakians-faculty-data'
import { isAuthenticated, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'

export default function PakiansFacultyDashboardPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      setAuthError('You must be logged in to access this page.')
      setCheckingAuth(false)
      setTimeout(() => router.push('/login'), 2000)
      return
    }
    if (!canPerform(PERMISSIONS.REGISTRATIONS_VIEW, ['Admin', 'Staff'])) {
      setAuthError('You do not have permission to manage faculty registrations.')
      setCheckingAuth(false)
      setTimeout(() => router.push('/dashboard'), 3000)
      return
    }
    setCheckingAuth(false)
  }, [router])

  if (checkingAuth) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
          <AlertCircle className="mx-auto mb-3 h-10 w-10 text-amber-600" />
          <p className="text-gray-700">{authError}</p>
          <Link href="/dashboard" className="mt-4 inline-block text-primary-700 font-semibold">
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary-700 mb-1">
            <GraduationCap className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Staff Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{PAKIANS_FACULTY_PAGE_TITLE}</h1>
          <p className="mt-1 text-sm text-gray-600">
            Review, verify, and manage faculty registration submissions from the public form.
          </p>
        </div>
        <Link
          href="/pakians-faculty-registration"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm font-semibold text-primary-800 hover:bg-primary-100"
        >
          View public form
        </Link>
      </div>
      <PakiansFacultyRegistrationsTable />
    </div>
  )
}
