'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  MapPin,
  LogIn,
  LogOut,
  Loader2,
  Navigation,
  ShieldAlert,
  CheckCircle2,
  Clock3,
} from 'lucide-react'
import {
  attendanceCheckIn,
  attendanceCheckOut,
  getMyAttendanceHistory,
  getMyAttendanceToday,
  requestDeviceLocation,
} from '@/lib/api/attendance'
import type { AttendanceRecord } from '@/lib/attendance/types'
import { formatDate, formatTime, statusClass, statusLabel } from './statusStyles'

type TodayState = Awaited<ReturnType<typeof getMyAttendanceToday>>

function isBlockedStatus(status?: string | null) {
  return status === 'Absent' || status === 'OnLeave' || status === 'Rejected'
}

export default function CheckInPanel() {
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [history, setHistory] = useState<AttendanceRecord[]>([])
  const [state, setState] = useState<TodayState | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Today first so check-in/out buttons appear quickly; history loads after
      const today = await getMyAttendanceToday()
      setState(today)
      setLoading(false)
      getMyAttendanceHistory(7)
        .then(setHistory)
        .catch(() => setHistory([]))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load attendance.')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  /** Client-side eligibility so checkout still appears if API flags are missing/stale */
  const { canCheckIn, canCheckOut } = useMemo(() => {
    if (!state?.assigned) return { canCheckIn: false, canCheckOut: false }
    const today = state.today
    const blocked = isBlockedStatus(today?.status)
    const checkedIn = Boolean(today?.checkInAt)
    const checkedOut = Boolean(today?.checkOutAt)

    const derivedIn = !blocked && !checkedIn
    const derivedOut = !blocked && checkedIn && !checkedOut

    return {
      canCheckIn: typeof state.canCheckIn === 'boolean' ? state.canCheckIn || derivedIn : derivedIn,
      canCheckOut:
        typeof state.canCheckOut === 'boolean' ? state.canCheckOut || derivedOut : derivedOut,
    }
  }, [state])

  const runCheckIn = async () => {
    setActing(true)
    setError(null)
    setSuccess(null)
    try {
      const pos = await requestDeviceLocation()
      const result = await attendanceCheckIn({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      })
      const late = result.record.lateLabel
        ? ` · ${result.record.lateLabel} late`
        : ''
      const bound = result.deviceAutoBound ? ' · This device is now bound for attendance' : ''
      setSuccess(
        `Checked in at ${formatTime(result.record.checkInAt)} · ${statusLabel(result.record.status)}${late} · ${result.distanceM}m from campus${bound}`
      )
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not check in.')
    } finally {
      setActing(false)
    }
  }

  const runCheckOut = async () => {
    setActing(true)
    setError(null)
    setSuccess(null)
    try {
      const pos = await requestDeviceLocation({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 15000,
      })
      const result = await attendanceCheckOut({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      })
      const outLabel = formatTime(result.record.checkOutAt)
      const early = result.record.earlyLeaveLabel
        ? ` · left ${result.record.earlyLeaveLabel} early`
        : ''
      setSuccess(
        `Checked out at ${outLabel}${early} · ${result.distanceM ?? 0}m from campus. Have a good day!`
      )
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not check out.')
    } finally {
      setActing(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-700" />
        <p className="mt-3 text-sm text-gray-600">Loading your attendance…</p>
      </div>
    )
  }

  if (!state?.assigned) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Not assigned yet</h2>
            <p className="mt-1 text-sm text-gray-600">
              An attendance admin must assign you to a campus and staff group before you can
              check in.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const today = state.today
  const shiftLabel =
    state.group?.shiftStart && state.group?.shiftEnd
      ? `${formatTime(state.group.shiftStart)} – ${formatTime(state.group.shiftEnd)}`
      : null

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 p-5 text-white shadow-lg sm:p-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-teal-400/20" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/90">
            Today · {formatDate(state.date)}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {state.assignment?.userName || 'My Attendance'}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-emerald-50">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
              <MapPin className="h-3.5 w-3.5" />
              {state.campus?.name}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
              <Clock3 className="h-3.5 w-3.5" />
              {state.group?.name}
              {shiftLabel ? ` · ${shiftLabel}` : ''}
              {typeof state.group?.graceMinutes === 'number'
                ? ` · grace ${state.group.graceMinutes}m`
                : ''}
            </span>
            {state.deviceBound ? (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${
                  state.thisDeviceMatches === false
                    ? 'bg-rose-500/30 text-rose-50'
                    : 'bg-white/15'
                }`}
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                {state.thisDeviceMatches === false
                  ? 'Wrong device — ask admin to clear binding'
                  : 'Device bound'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
                <ShieldAlert className="h-3.5 w-3.5" />
                Device will auto-bind on first check-in
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:max-w-md">
            <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-100/80">
                Check in
              </p>
              <p className="mt-0.5 text-lg font-bold tabular-nums">
                {formatTime(today?.checkInAt)}
              </p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-100/80">
                Check out
              </p>
              <p className="mt-0.5 text-lg font-bold tabular-nums">
                {formatTime(today?.checkOutAt)}
              </p>
            </div>
          </div>

          {today && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(today.status)}`}
              >
                {statusLabel(today.status)}
              </span>
              {today.lateLabel && (
                <span className="rounded-full border border-amber-200/40 bg-amber-400/20 px-2.5 py-1 text-xs font-semibold text-amber-50">
                  Late {today.lateLabel}
                </span>
              )}
              {today.earlyLeaveLabel && (
                <span className="rounded-full border border-rose-200/40 bg-rose-400/20 px-2.5 py-1 text-xs font-semibold text-rose-50">
                  Early out {today.earlyLeaveLabel}
                </span>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {canCheckIn && (
              <button
                type="button"
                disabled={acting}
                onClick={runCheckIn}
                className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 text-base font-bold text-emerald-900 shadow-md transition hover:bg-emerald-50 disabled:opacity-60"
              >
                {acting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <LogIn className="h-5 w-5" />
                )}
                Check in
              </button>
            )}
            {canCheckOut && (
              <button
                type="button"
                disabled={acting}
                onClick={runCheckOut}
                className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border-2 border-white bg-amber-400 px-5 text-base font-bold text-emerald-950 shadow-md transition hover:bg-amber-300 disabled:opacity-60"
              >
                {acting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <LogOut className="h-5 w-5" />
                )}
                Check out
              </button>
            )}
            {!canCheckIn && !canCheckOut && (
              <div className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-white/15 px-5 text-sm font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                {today?.checkOutAt
                  ? `Day complete · out at ${formatTime(today.checkOutAt)}`
                  : 'Attendance complete for today'}
              </div>
            )}
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs text-emerald-100/90">
            <Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Check-in and check-out both require GPS inside the campus radius (
            {state.campus?.radiusMeters ?? 120}m). Late / early times use minutes first, then hours.
          </p>
        </div>
      </section>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {success}
        </div>
      )}

      <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="text-base font-semibold text-gray-900">Recent history</h3>
        <p className="mt-1 text-sm text-gray-500">Last 7 days · 12-hour Pakistan time</p>
        <div className="mt-4 space-y-2">
          {history.length === 0 && (
            <p className="rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
              No attendance records yet.
            </p>
          )}
          {history.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{formatDate(row.date)}</p>
                <p className="text-xs text-gray-600">
                  In <span className="font-semibold tabular-nums">{formatTime(row.checkInAt)}</span>
                  {' · '}
                  Out{' '}
                  <span className="font-semibold tabular-nums">{formatTime(row.checkOutAt)}</span>
                </p>
                {(row.lateLabel || row.earlyLeaveLabel) && (
                  <p className="mt-0.5 text-xs font-medium text-amber-800">
                    {row.lateLabel ? `Late ${row.lateLabel}` : ''}
                    {row.lateLabel && row.earlyLeaveLabel ? ' · ' : ''}
                    {row.earlyLeaveLabel ? `Early out ${row.earlyLeaveLabel}` : ''}
                  </p>
                )}
              </div>
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(row.status)}`}
              >
                {statusLabel(row.status)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
