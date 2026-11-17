'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bell, BookOpen, Info, Newspaper } from 'lucide-react'
import { getCurrentUser } from '@/lib/api/auth'
import DashboardHero from '@/components/dashboard/DashboardHero'
import DashboardKpiGrid, { type DashboardKpi } from '@/components/dashboard/DashboardKpiGrid'

export default function StudentDashboardPage() {
  const [name, setName] = useState('Student')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      const first = String(user.firstName ?? '').trim()
      const last = String(user.lastName ?? '').trim()
      const email = String(user.email ?? '').trim()
      setName([first, last].filter(Boolean).join(' ') || email || 'Student')
    }
    setReady(true)
  }, [])

  const kpis: DashboardKpi[] = [
    {
      label: 'School news',
      value: 'Open',
      href: '/dashboard/notifications',
      icon: <Newspaper className="h-5 w-5" />,
      hint: 'Announcements & notices',
      loading: !ready,
    },
    {
      label: 'Notifications',
      value: 'Open',
      href: '/dashboard/notifications',
      icon: <Bell className="h-5 w-5" />,
      hint: 'Alerts for your account',
      loading: !ready,
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardHero
        title={`Welcome, ${name}`}
        subtitle="Your student workspace. Classes, assignments, and exam results will appear here as the school enables them."
      >
        <Link
          href="/dashboard/notifications"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary-700 px-3.5 py-2 text-sm font-semibold text-white"
        >
          <Bell className="h-4 w-4" />
          Notifications
        </Link>
      </DashboardHero>

      <DashboardKpiGrid items={kpis} columns="grid-cols-1 sm:grid-cols-2" />

      <section
        aria-label="Academic modules"
        className="rounded-2xl border border-gray-200 bg-white/90 p-5 shadow-sm sm:p-6"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary-50 p-2.5 text-primary-700">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-josefin text-lg font-bold text-gray-900">Classes & results</h2>
            <p className="mt-1 text-sm text-gray-600">
              Course lists, assignment due dates, and grade reports are not connected for student
              accounts yet. Nothing here is broken — those tools simply are not live.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-sm text-amber-950">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <p>
            When results are published, they will show on this dashboard automatically so you do not
            need to hunt through extra pages.
          </p>
        </div>
      </section>
    </div>
  )
}
