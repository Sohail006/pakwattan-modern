'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, AlertCircle, Trophy } from 'lucide-react'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'
import TalentHuntSeason3RegistrationsTable from '@/components/talent-hunt-season3/TalentHuntSeason3RegistrationsTable'
import { isAuthenticated, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'

export default function TalentHuntSeason3DashboardPage() {
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
      setAuthError('You do not have permission to manage Talent Hunt registrations.')
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
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-50 to-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-primary-600 p-3 text-white shadow-md">
            <Trophy className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-josefin text-gray-900">{TALENT_HUNT_SEASON3_TITLE}</h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600 max-w-2xl">
              Manage participant (PKR 500) and institution (PKR 1000) registrations. Search, filter, export to Excel,
              and verify payment receipts.
            </p>
          </div>
        </div>
      </div>
      <TalentHuntSeason3RegistrationsTable />
    </div>
  )
}
