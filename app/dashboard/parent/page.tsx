'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, Bell, Mail, Phone, User, ArrowUpRight, Info } from 'lucide-react'
import { GuardianInfo, StudentBasicInfo, getCurrentUser } from '@/lib/api/auth'
import DashboardHero from '@/components/dashboard/DashboardHero'
import DashboardKpiGrid, { type DashboardKpi } from '@/components/dashboard/DashboardKpiGrid'

export default function ParentDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [guardianInfo, setGuardianInfo] = useState<GuardianInfo | null>(null)
  const [students, setStudents] = useState<StudentBasicInfo[]>([])
  const [parentName, setParentName] = useState('Parent')

  useEffect(() => {
    try {
      const user = getCurrentUser()
      if (user) {
        const first = String(user.firstName ?? '').trim()
        const last = String(user.lastName ?? '').trim()
        setParentName([first, last].filter(Boolean).join(' ') || 'Parent')
      }

      const stored = localStorage.getItem('guardian_info')
      if (stored) {
        const guardian: GuardianInfo = JSON.parse(stored)
        setGuardianInfo(guardian)
        setStudents(guardian.students || [])
        if (guardian.fullName) setParentName(guardian.fullName)
      }
    } catch (error) {
      console.error('Failed to load guardian info:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const kpis: DashboardKpi[] = [
    {
      label: 'My children',
      value: loading ? 0 : students.length,
      href: students.length === 1 ? `/dashboard/students/${students[0].id}` : '/dashboard/students',
      icon: <Users className="h-5 w-5" />,
      loading,
      hint: 'Linked student profiles',
    },
    {
      label: 'Notifications',
      value: 'Open',
      href: '/dashboard/notifications',
      icon: <Bell className="h-5 w-5" />,
      hint: 'School notices',
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardHero
        title={`Welcome, ${parentName}`}
        subtitle="Your children’s profiles are listed below. Exam grades and results will appear here when the school publishes them."
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

      {guardianInfo && (
        <section
          aria-label="Guardian details"
          className="rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-50 via-white to-amber-50/50 p-5 shadow-sm sm:p-6"
        >
          <h2 className="font-josefin text-lg font-bold text-gray-900">Your guardian profile</h2>
          <div className="mt-3 grid gap-2 text-sm text-gray-700 sm:grid-cols-3">
            <p className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary-700" />
              <span>
                <span className="font-semibold">{guardianInfo.fullName}</span>
                {guardianInfo.relation ? ` · ${guardianInfo.relation}` : ''}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary-700" />
              <span>{guardianInfo.email || 'No email on file'}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary-700" />
              <span>{guardianInfo.phone || 'No phone on file'}</span>
            </p>
          </div>
        </section>
      )}

      <section aria-label="My children" className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-josefin text-lg font-bold text-gray-900">My children</h2>
          {students.length > 0 && (
            <Link
              href="/dashboard/students"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700"
            >
              Browse all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : students.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white/80 p-6 text-sm text-gray-600">
            No students are linked to this guardian account yet. Contact the school office if this is
            unexpected.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <Link
                key={student.id}
                href={`/dashboard/students/${student.id}`}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-gray-900">{student.name}</h3>
                    <p className="truncate text-xs text-gray-500">{student.email || 'Student profile'}</p>
                  </div>
                </div>
                {student.phone && (
                  <p className="mt-3 flex items-center gap-1 text-sm text-gray-600">
                    <Phone className="h-3.5 w-3.5" />
                    {student.phone}
                  </p>
                )}
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-700">
                  View profile
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section
        aria-label="Results"
        className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-950"
      >
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
        <div>
          <p className="font-semibold">Exam results</p>
          <p className="mt-0.5 text-amber-900/80">
            Grades and report cards are not published in the parent portal yet. When available, they
            will show on this page next to each child — no extra menu required.
          </p>
        </div>
      </section>
    </div>
  )
}
