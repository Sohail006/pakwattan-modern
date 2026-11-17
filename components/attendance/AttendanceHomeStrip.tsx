'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ClipboardCheck, Loader2, MapPin, BarChart3, Settings2 } from 'lucide-react'
import { getAttendanceBoard } from '@/lib/api/attendance'
import { canPerform, getUserRoles } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { userHasAnyNormalizedRole } from '@/lib/roles'
import { useAttendanceEnrollment } from '@/lib/hooks/useAttendanceEnrollment'

/** Compact attendance snapshot for role home dashboards — no full board. */
export default function AttendanceHomeStrip() {
  const roles = getUserRoles()
  const { loading: enrollmentLoading, enrolled } = useAttendanceEnrollment()
  const canManage =
    canPerform(PERMISSIONS.ATTENDANCE_MANAGE, ['Admin', 'Staff', 'ManagerialStaff']) ||
    canPerform(PERMISSIONS.ATTENDANCE_VERIFY, ['Admin', 'Staff', 'ManagerialStaff']) ||
    userHasAnyNormalizedRole(roles, 'admin', 'staff', 'managerialstaff')

  const [loading, setLoading] = useState(canManage)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<{
    present: number
    late: number
    absent: number
    pending: number
    total: number
  } | null>(null)

  useEffect(() => {
    if (!canManage) return
    let cancelled = false
    ;(async () => {
      try {
        const board = await getAttendanceBoard()
        if (cancelled) return
        setSummary(board.summary)
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Unable to load attendance.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [canManage])

  // Managers always see the strip; others only when enrolled for personal check-in
  if (!canManage && (enrollmentLoading || !enrolled)) return null

  const chips = summary
    ? [
        { label: 'Present', value: summary.present, tone: 'text-emerald-800 bg-emerald-50' },
        { label: 'Late', value: summary.late, tone: 'text-amber-900 bg-amber-50' },
        { label: 'Absent', value: summary.absent, tone: 'text-rose-800 bg-rose-50' },
        { label: 'Pending', value: summary.pending, tone: 'text-orange-900 bg-orange-50' },
      ]
    : []

  return (
    <section
      aria-label="Attendance overview"
      className="rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-900 via-primary-800 to-emerald-800 p-4 text-white shadow-md sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-emerald-200" />
            <h2 className="font-josefin text-lg font-bold sm:text-xl">Staff attendance today</h2>
          </div>
          <p className="mt-1 text-sm text-primary-100">
            {canManage
              ? 'Live status across campuses. Approve pending check-ins or open full board, reports, and settings.'
              : 'Mark your own check-in and check-out from My Attendance.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {!enrollmentLoading && enrolled && (
            <Link
              href="/dashboard/attendance?tab=me"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
            >
              <MapPin className="h-4 w-4" />
              My Attendance
            </Link>
          )}
          {canManage && (
            <>
              <Link
                href="/dashboard/attendance?tab=today"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-primary-900 transition hover:bg-primary-50"
              >
                Open board
              </Link>
              <Link
                href="/dashboard/attendance?tab=reports"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
              >
                <BarChart3 className="h-4 w-4" />
                Reports
              </Link>
              <Link
                href="/dashboard/attendance?tab=settings"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
              >
                <Settings2 className="h-4 w-4" />
                Settings
              </Link>
            </>
          )}
        </div>
      </div>

      {canManage && (
        <div className="mt-4">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-primary-100">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading today’s summary…
            </div>
          ) : error ? (
            <p className="text-sm text-amber-100">{error}</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {chips.map((c) => (
                <div key={c.label} className={`rounded-xl px-3 py-2.5 shadow-sm ${c.tone}`}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                    {c.label}
                  </p>
                  <p className="text-xl font-bold">{c.value}</p>
                </div>
              ))}
            </div>
          )}
          {summary && summary.pending > 0 && (
            <p className="mt-3 text-sm font-medium text-amber-100">
              {summary.pending} check-in{summary.pending === 1 ? '' : 's'} waiting for approval — open
              the board to act without leaving attendance.
            </p>
          )}
        </div>
      )}
    </section>
  )
}
