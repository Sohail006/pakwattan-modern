'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import {
  getAttendanceCampuses,
  getAttendanceGroups,
  getAttendanceReports,
  getAttendanceStaff,
} from '@/lib/api/attendance'
import { formatDate, statusClass, statusLabel } from './statusStyles'

function shiftDays(base: string, delta: number) {
  const d = new Date(`${base}T12:00:00`)
  d.setDate(d.getDate() + delta)
  return d.toISOString().slice(0, 10)
}

export default function AttendanceReports() {
  const today = new Date().toISOString().slice(0, 10)
  const [from, setFrom] = useState(today)
  const [to, setTo] = useState(today)
  const [campusId, setCampusId] = useState('')
  const [groupId, setGroupId] = useState('')
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [campuses, setCampuses] = useState<Awaited<ReturnType<typeof getAttendanceCampuses>>>([])
  const [groups, setGroups] = useState<Awaited<ReturnType<typeof getAttendanceGroups>>>([])
  const [staff, setStaff] = useState<Awaited<ReturnType<typeof getAttendanceStaff>>>([])
  const [report, setReport] = useState<Awaited<ReturnType<typeof getAttendanceReports>> | null>(
    null
  )

  useEffect(() => {
    Promise.all([
      getAttendanceCampuses(),
      getAttendanceGroups(),
      getAttendanceStaff({ status: 'Active' }),
    ])
      .then(([c, g, s]) => {
        setCampuses(c)
        setGroups(g)
        setStaff(s)
      })
      .catch(() => undefined)
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setReport(
        await getAttendanceReports({
          from,
          to,
          campusId: campusId || undefined,
          groupId: groupId || undefined,
          userId: userId || undefined,
        })
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load report.')
    } finally {
      setLoading(false)
    }
  }, [from, to, campusId, groupId, userId])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="space-y-5">
      <div>
        <Link
          href="/dashboard/attendance"
          className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to board
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Attendance reports</h1>
        <p className="mt-1 text-sm text-gray-600">Daily, weekly, and monthly views for all or one staff member.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold"
          onClick={() => {
            setFrom(today)
            setTo(today)
          }}
        >
          Today
        </button>
        <button
          type="button"
          className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold"
          onClick={() => {
            setFrom(shiftDays(today, -6))
            setTo(today)
          }}
        >
          Last 7 days
        </button>
        <button
          type="button"
          className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold"
          onClick={() => {
            setFrom(shiftDays(today, -29))
            setTo(today)
          }}
        >
          Last 30 days
        </button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-5">
        <label className="text-xs font-semibold text-gray-600">
          From
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </label>
        <label className="text-xs font-semibold text-gray-600">
          To
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          />
        </label>
        <label className="text-xs font-semibold text-gray-600">
          Campus
          <select
            value={campusId}
            onChange={(e) => setCampusId(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {campuses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-gray-600">
          Group
          <select
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold text-gray-600">
          Staff
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {staff.map((s) => (
              <option key={s.userId} value={s.userId}>
                {s.userName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-700" />
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="font-semibold text-gray-900">Summary by staff</h2>
            <p className="text-sm text-gray-500">{report?.totalRecords || 0} records in range</p>
            <div className="mt-4 space-y-2">
              {(report?.byUser || []).map((u) => (
                <div
                  key={u.userId}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-gray-50 px-3 py-3"
                >
                  <p className="font-semibold text-gray-900">{u.userName}</p>
                  <p className="text-xs text-gray-600">
                    P {u.present} · L {u.late} · A {u.absent} · Leave {u.onLeave} · Pending{' '}
                    {u.pending}
                  </p>
                </div>
              ))}
              {!report?.byUser?.length && (
                <p className="py-6 text-center text-sm text-gray-500">No records in this range.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="font-semibold text-gray-900">Detailed records</h2>
            <div className="mt-3 space-y-2">
              {(report?.records || []).slice(0, 100).map((r) => (
                <div
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gray-100 px-3 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {r.userName} · {formatDate(r.date)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {r.adminNote ? `Note: ${r.adminNote}` : '—'}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(r.status)}`}
                  >
                    {statusLabel(r.status)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
