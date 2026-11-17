'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock3,
  Download,
  Loader2,
  LogOut,
  Smartphone,
  Trash2,
  Trophy,
  Users,
} from 'lucide-react'
import {
  deleteAttendanceRecord,
  getAttendanceCampuses,
  getAttendanceGroups,
  getAttendanceReports,
  getAttendanceStaff,
  type AttendanceReportPayload,
} from '@/lib/api/attendance'
import type { AttendanceRecord } from '@/lib/attendance/types'
import {
  exportAttendanceRecordsCsv,
  exportAttendanceScorecardCsv,
} from '@/lib/attendance/reportExport'
import { formatDate, formatTime, statusClass, statusLabel } from './statusStyles'
import { karachiToday, shiftKarachiDate } from '@/lib/attendance/pakistanDate'

type ReportView = 'overview' | 'late' | 'early' | 'other' | 'leaderboard' | 'details'

type AttendanceReportsProps = {
  embedded?: boolean
}

function enrichRecord(
  r: AttendanceRecord,
  campusNameById: Map<string, string>,
  groupNameById: Map<string, string>
): AttendanceRecord {
  return {
    ...r,
    campusName: r.campusName || campusNameById.get(String(r.campusId)) || r.campusName,
    groupName: r.groupName || groupNameById.get(String(r.groupId)) || r.groupName,
  }
}

function KpiCard({
  label,
  value,
  hint,
  tone = 'default',
}: {
  label: string
  value: string | number
  hint?: string
  tone?: 'default' | 'amber' | 'rose' | 'sky' | 'emerald'
}) {
  const tones = {
    default: 'border-gray-200 bg-white',
    amber: 'border-amber-200 bg-amber-50/80',
    rose: 'border-rose-200 bg-rose-50/80',
    sky: 'border-sky-200 bg-sky-50/80',
    emerald: 'border-emerald-200 bg-emerald-50/80',
  }
  return (
    <div className={`rounded-2xl border px-4 py-3 shadow-sm ${tones[tone]}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 font-josefin text-2xl font-bold text-gray-900">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-gray-500">{hint}</p>}
    </div>
  )
}

function RecordRow({
  record,
  onDelete,
  deleting,
  onFilterStaff,
}: {
  record: AttendanceRecord
  onDelete?: (r: AttendanceRecord) => void
  deleting?: boolean
  onFilterStaff?: (userId: string) => void
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-gray-100 bg-white px-3 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900">
          {onFilterStaff ? (
            <button
              type="button"
              onClick={() => onFilterStaff(record.userId)}
              className="hover:text-primary-700 hover:underline"
            >
              {record.userName}
            </button>
          ) : (
            record.userName
          )}
          <span className="font-normal text-gray-500"> · {formatDate(record.date)}</span>
        </p>
        <p className="mt-0.5 text-xs text-gray-600">
          {[record.campusName, record.groupName].filter(Boolean).join(' · ') || 'Campus / group n/a'}
          {record.shiftStart && record.shiftEnd
            ? ` · Shift ${record.shiftStart}–${record.shiftEnd}`
            : ''}
          {typeof record.graceMinutes === 'number' ? ` · Grace ${record.graceMinutes}m` : ''}
        </p>
        <p className="mt-0.5 text-xs text-gray-600">
          In {formatTime(record.checkInAt)} · Out {formatTime(record.checkOutAt)}
          {typeof record.checkInDistanceM === 'number' ? ` · In ${record.checkInDistanceM}m` : ''}
          {typeof record.checkOutDistanceM === 'number'
            ? ` · Out ${record.checkOutDistanceM}m`
            : ''}
        </p>
        <p className="mt-0.5 text-xs font-medium text-amber-900">
          {record.lateLabel ? `Late ${record.lateLabel}` : 'On time'}
          {' · '}
          {record.earlyLeaveLabel ? `Early out ${record.earlyLeaveLabel}` : 'Full shift'}
        </p>
        {record.otherDeviceUsed && (
          <p className="mt-0.5 text-xs font-medium text-rose-800">
            Other device
            {record.checkInOtherDevice ? ' (check-in)' : ''}
            {record.checkOutOtherDevice ? ' (check-out)' : ''}
            {record.checkInDeviceInfo || record.checkOutDeviceInfo || record.deviceInfo
              ? ` · ${record.checkInDeviceInfo || record.checkOutDeviceInfo || record.deviceInfo}`
              : ''}
          </p>
        )}
        {record.adminNote && (
          <p className="mt-0.5 text-xs text-gray-500">Note: {record.adminNote}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(record.status)}`}
        >
          {statusLabel(record.status)}
        </span>
        {onDelete && (
          <button
            type="button"
            disabled={deleting}
            onClick={() => onDelete(record)}
            className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 disabled:opacity-50"
            title="Delete record"
          >
            {deleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default function AttendanceReports({ embedded = false }: AttendanceReportsProps) {
  const today = karachiToday()
  const [from, setFrom] = useState(() => shiftKarachiDate(today, -6))
  const [to, setTo] = useState(today)
  const [campusId, setCampusId] = useState('')
  const [groupId, setGroupId] = useState('')
  const [userId, setUserId] = useState('')
  const [view, setView] = useState<ReportView>('overview')
  const [scoreSort, setScoreSort] = useState<'late' | 'attendance' | 'name'>('attendance')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [campuses, setCampuses] = useState<Awaited<ReturnType<typeof getAttendanceCampuses>>>([])
  const [groups, setGroups] = useState<Awaited<ReturnType<typeof getAttendanceGroups>>>([])
  const [staff, setStaff] = useState<Awaited<ReturnType<typeof getAttendanceStaff>>>([])
  const [report, setReport] = useState<AttendanceReportPayload | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

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

  const campusNameById = useMemo(
    () => new Map(campuses.map((c) => [String(c.id), c.name])),
    [campuses]
  )
  const groupNameById = useMemo(
    () => new Map(groups.map((g) => [String(g.id), g.name])),
    [groups]
  )

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

  const records = useMemo(
    () => (report?.records || []).map((r) => enrichRecord(r, campusNameById, groupNameById)),
    [report, campusNameById, groupNameById]
  )

  const lateRecords = useMemo(
    () =>
      records
        .filter((r) => (r.lateMinutes ?? 0) > 0)
        .sort((a, b) => (b.lateMinutes ?? 0) - (a.lateMinutes ?? 0)),
    [records]
  )
  const earlyRecords = useMemo(
    () =>
      records
        .filter((r) => (r.earlyLeaveMinutes ?? 0) > 0)
        .sort((a, b) => (b.earlyLeaveMinutes ?? 0) - (a.earlyLeaveMinutes ?? 0)),
    [records]
  )
  const otherDeviceRecords = useMemo(
    () => records.filter((r) => r.otherDeviceUsed),
    [records]
  )

  /** Checked in but never checked out (incomplete shift). */
  const missingCheckoutRecords = useMemo(
    () =>
      records.filter(
        (r) =>
          Boolean(r.checkInAt) &&
          !r.checkOutAt &&
          r.status !== 'Absent' &&
          r.status !== 'OnLeave' &&
          r.status !== 'Rejected'
      ),
    [records]
  )

  const scorecard = useMemo(() => {
    const rows = [...(report?.byUser || [])]
    // Enrich older API payloads from returned records
    return rows
      .map((u) => {
        const userRecords = records.filter((r) => r.userId === u.userId)
        const lateMins =
          u.lateMinutesTotal ??
          userRecords.reduce((s, r) => s + (r.lateMinutes ?? 0), 0)
        const earlyMins =
          u.earlyLeaveMinutesTotal ??
          userRecords.reduce((s, r) => s + (r.earlyLeaveMinutes ?? 0), 0)
        const lateDays =
          u.lateDays ?? userRecords.filter((r) => (r.lateMinutes ?? 0) > 0).length
        const present = u.present
        const late = u.late
        return {
          ...u,
          rejected: u.rejected ?? userRecords.filter((r) => r.status === 'Rejected').length,
          lateDays,
          earlyDays:
            u.earlyDays ?? userRecords.filter((r) => (r.earlyLeaveMinutes ?? 0) > 0).length,
          otherDeviceDays:
            u.otherDeviceDays ?? userRecords.filter((r) => r.otherDeviceUsed).length,
          expectedWorkingDays: u.expectedWorkingDays,
          attendedDays: u.attendedDays,
          noShowDays: u.noShowDays,
          attendancePercent: u.attendancePercent,
          lateMinutesTotal: lateMins,
          earlyLeaveMinutesTotal: earlyMins,
          lateTotalLabel: u.lateTotalLabel || (lateMins > 0 ? `${lateMins} min` : null),
          earlyLeaveTotalLabel:
            u.earlyLeaveTotalLabel || (earlyMins > 0 ? `${earlyMins} min` : null),
          avgLateMinutesWhenLate:
            u.avgLateMinutesWhenLate ??
            (lateDays > 0 ? Math.round(lateMins / lateDays) : 0),
          onTimeRate:
            u.onTimeRate ??
            (present + late > 0 ? Math.round((1000 * present) / (present + late)) / 10 : null),
        }
      })
      .sort((a, b) => {
        if (scoreSort === 'name') return a.userName.localeCompare(b.userName)
        if (scoreSort === 'attendance') {
          const ap = a.attendancePercent ?? -1
          const bp = b.attendancePercent ?? -1
          if (bp !== ap) return bp - ap
          return (b.lateMinutesTotal ?? 0) - (a.lateMinutesTotal ?? 0)
        }
        return (b.lateMinutesTotal ?? 0) - (a.lateMinutesTotal ?? 0)
      })
  }, [report?.byUser, records, scoreSort])

  const matchedCount = report?.matchedCount ?? report?.totalRecords ?? records.length
  const returnedCount = report?.returnedCount ?? records.length
  const truncated = report?.truncated ?? matchedCount > returnedCount

  // Fallbacks when an older API build is still live (compute from returned records)
  const presentCount =
    report?.presentCount ?? records.filter((r) => r.status === 'Present').length
  const lateCount = report?.lateCount ?? records.filter((r) => r.status === 'Late').length
  const absentCount = report?.absentCount ?? records.filter((r) => r.status === 'Absent').length
  const onLeaveCount =
    report?.onLeaveCount ?? records.filter((r) => r.status === 'OnLeave').length
  const pendingCount =
    report?.pendingCount ?? records.filter((r) => r.status === 'PendingVerification').length
  const otherDeviceCount = report?.otherDeviceCount ?? otherDeviceRecords.length
  const lateEventCount = report?.lateEventCount ?? lateRecords.length
  const earlyEventCount = report?.earlyEventCount ?? earlyRecords.length
  const lateTotalLabel =
    report?.lateTotalLabel ||
    (lateRecords.reduce((s, r) => s + (r.lateMinutes ?? 0), 0) > 0
      ? `${lateRecords.reduce((s, r) => s + (r.lateMinutes ?? 0), 0)} min`
      : null)
  const earlyTotalLabel =
    report?.earlyLeaveTotalLabel ||
    (earlyRecords.reduce((s, r) => s + (r.earlyLeaveMinutes ?? 0), 0) > 0
      ? `${earlyRecords.reduce((s, r) => s + (r.earlyLeaveMinutes ?? 0), 0)} min`
      : null)

  const removeRecord = async (r: AttendanceRecord) => {
    if (
      !window.confirm(
        `Delete attendance record for ${r.userName} on ${r.date}? This cannot be undone.`
      )
    ) {
      return
    }
    setDeletingId(r.id)
    setError(null)
    try {
      await deleteAttendanceRecord(r.id)
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed.')
    } finally {
      setDeletingId(null)
    }
  }

  const filterToStaff = (id: string) => {
    setUserId(id)
    setView('details')
  }

  const clearFilters = () => {
    setCampusId('')
    setGroupId('')
    setUserId('')
  }

  const selectedStaffName = staff.find((s) => s.userId === userId)?.userName
  const hasNarrowFilters = Boolean(campusId || groupId || userId)

  const views: { id: ReportView; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Scorecard', icon: <Users className="h-4 w-4" /> },
    {
      id: 'late',
      label: 'Late',
      icon: <Clock3 className="h-4 w-4" />,
      count: lateEventCount,
    },
    {
      id: 'early',
      label: 'Early out',
      icon: <LogOut className="h-4 w-4" />,
      count: earlyEventCount,
    },
    {
      id: 'other',
      label: 'Other device',
      icon: <Smartphone className="h-4 w-4" />,
      count: otherDeviceCount,
    },
    {
      id: 'leaderboard',
      label: 'Late time',
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      id: 'details',
      label: 'All records',
      icon: <Users className="h-4 w-4" />,
      count: returnedCount,
    },
  ]

  return (
    <div className="space-y-5">
      {!embedded && (
        <div>
          <Link
            href="/dashboard/attendance?tab=today"
            className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to attendance hub
          </Link>
          <h1 className="font-josefin text-2xl font-bold text-gray-900">Attendance reports</h1>
          <p className="mt-1 text-sm text-gray-600">
            Scorecard, late arrivals, early check-outs, other-device marks, and total late time.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Today', from: today, to: today },
          { label: 'Last 7 days', from: shiftKarachiDate(today, -6), to: today },
          { label: 'Last 30 days', from: shiftKarachiDate(today, -29), to: today },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            className={`rounded-xl border px-3 py-2 text-sm font-semibold ${
              from === p.from && to === p.to
                ? 'border-primary-600 bg-primary-50 text-primary-900'
                : 'border-gray-200 bg-white text-gray-800'
            }`}
            onClick={() => {
              setFrom(p.from)
              setTo(p.to)
            }}
          >
            {p.label}
          </button>
        ))}
        <div className="ml-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              report &&
              exportAttendanceScorecardCsv(
                { ...report, byUser: scorecard },
                { from, to }
              )
            }
            disabled={!scorecard.length}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export scorecard
          </button>
          <button
            type="button"
            onClick={() => exportAttendanceRecordsCsv(records, { from, to })}
            disabled={!records.length}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export records
          </button>
        </div>
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

      {hasNarrowFilters && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-primary-100 bg-primary-50/60 px-3 py-2 text-sm">
          <span className="font-semibold text-primary-900">Filtered:</span>
          {campusId && (
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
              Campus: {campusNameById.get(campusId) || campusId}
            </span>
          )}
          {groupId && (
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
              Group: {groupNameById.get(groupId) || groupId}
            </span>
          )}
          {userId && (
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
              Staff: {selectedStaffName || userId}
            </span>
          )}
          <button
            type="button"
            onClick={clearFilters}
            className="ml-auto text-xs font-semibold text-primary-800 underline"
          >
            Clear filters
          </button>
        </div>
      )}

      <nav
        className="flex gap-1 overflow-x-auto rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200/80"
        aria-label="Report views"
      >
        {views.map((v) => {
          const active = view === v.id
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                active
                  ? 'bg-primary-700 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary-800'
              }`}
            >
              {v.icon}
              {v.label}
              {typeof v.count === 'number' && (
                <span
                  className={`rounded-full px-1.5 text-[11px] ${
                    active ? 'bg-white/20' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {v.count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-700" />
          <p className="mt-2 text-sm text-gray-600">Loading reports…</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
            <KpiCard label="Records" value={matchedCount} hint={`${from} → ${to}`} />
            <KpiCard
              label="Avg attendance"
              value={
                typeof report?.averageAttendancePercent === 'number'
                  ? `${report.averageAttendancePercent}%`
                  : '—'
              }
              hint={
                report?.expectedWorkingDaysInRange
                  ? `${report.expectedWorkingDaysInRange} working days in range`
                  : 'Expected days vs check-ins'
              }
              tone="emerald"
            />
            <KpiCard
              label="Total late time"
              value={lateTotalLabel || '—'}
              hint={
                lateEventCount
                  ? `${lateEventCount} late arrival${lateEventCount === 1 ? '' : 's'}`
                  : 'No late arrivals'
              }
              tone="amber"
            />
            <KpiCard
              label="Early out time"
              value={earlyTotalLabel || '—'}
              hint={
                earlyEventCount
                  ? `${earlyEventCount} early checkout${earlyEventCount === 1 ? '' : 's'}`
                  : 'No early checkouts'
              }
              tone="sky"
            />
            <KpiCard
              label="Other device"
              value={otherDeviceCount}
              hint="Check-in or check-out"
              tone="rose"
            />
            <KpiCard
              label="Pending review"
              value={pendingCount}
              tone={pendingCount > 0 ? 'amber' : 'default'}
            />
            <KpiCard
              label="Present / Late"
              value={`${presentCount} / ${lateCount}`}
              hint={`Absent ${absentCount} · Leave ${onLeaveCount}`}
              tone="emerald"
            />
          </div>

          {truncated && (
            <p className="text-xs font-medium text-amber-800">
              Showing {returnedCount.toLocaleString()} of {matchedCount.toLocaleString()} matching
              records (API limit 500). Narrow filters for the full set.
            </p>
          )}

          {view === 'overview' && (
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 className="font-josefin text-lg font-bold text-gray-900">
                    Staff scorecard
                  </h2>
                  <p className="text-sm text-gray-500">
                    Attendance % uses expected working days (offs + calendar). Click a name for
                    their records.
                  </p>
                </div>
                <label className="text-xs font-semibold text-gray-600">
                  Sort by
                  <select
                    value={scoreSort}
                    onChange={(e) =>
                      setScoreSort(e.target.value as 'late' | 'attendance' | 'name')
                    }
                    className="ml-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800"
                  >
                    <option value="attendance">Attendance %</option>
                    <option value="late">Late time</option>
                    <option value="name">Name</option>
                  </select>
                </label>
              </div>
              <div className="mt-4 space-y-2">
                {scorecard.map((u) => (
                  <button
                    key={u.userId}
                    type="button"
                    onClick={() => filterToStaff(u.userId)}
                    className="flex w-full flex-wrap items-center justify-between gap-2 rounded-xl bg-gray-50 px-3 py-3 text-left transition hover:bg-primary-50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{u.userName}</p>
                      <p className="mt-0.5 text-xs text-amber-900">
                        {typeof u.attendancePercent === 'number'
                          ? `Attendance ${u.attendancePercent}%`
                          : 'Attendance —'}
                        {typeof u.expectedWorkingDays === 'number'
                          ? ` (${u.attendedDays ?? 0}/${u.expectedWorkingDays} days)`
                          : ''}
                        {(u.noShowDays ?? 0) > 0 ? ` · No-show ${u.noShowDays}` : ''}
                        {' · '}
                        {u.lateTotalLabel
                          ? `Late ${u.lateTotalLabel}`
                          : 'No late time'}
                        {' · '}
                        {u.earlyLeaveTotalLabel
                          ? `Early out ${u.earlyLeaveTotalLabel}`
                          : 'No early leave'}
                        {(u.otherDeviceDays ?? 0) > 0
                          ? ` · Other device ${u.otherDeviceDays}d`
                          : ''}
                        {typeof u.onTimeRate === 'number'
                          ? ` · On-time ${u.onTimeRate}%`
                          : ''}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600">
                      P {u.present} · L {u.late} · A {u.absent} · Leave {u.onLeave} · Pending{' '}
                      {u.pending}
                      {(u.rejected ?? 0) > 0 ? ` · Rejected ${u.rejected}` : ''}
                    </p>
                  </button>
                ))}
                {!scorecard.length && (
                  <p className="py-8 text-center text-sm text-gray-500">
                    No attendance records in this range.
                  </p>
                )}
              </div>
            </div>
          )}

          {view === 'late' && (
            <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="font-josefin text-lg font-bold text-gray-900">Late arrivals</h2>
              <p className="text-sm text-gray-500">
                Check-ins after shift start + grace, sorted by late minutes.
              </p>
              {lateRecords.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">No late arrivals in this range.</p>
              ) : (
                lateRecords.map((r) => (
                  <RecordRow
                    key={r.id}
                    record={r}
                    onFilterStaff={filterToStaff}
                    onDelete={removeRecord}
                    deleting={deletingId === r.id}
                  />
                ))
              )}
            </div>
          )}

          {view === 'early' && (
            <div className="space-y-4">
              <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <h2 className="font-josefin text-lg font-bold text-gray-900">Early check-outs</h2>
                <p className="text-sm text-gray-500">
                  Check-outs before shift end, sorted by early-leave minutes.
                </p>
                {earlyRecords.length === 0 ? (
                  <p className="py-8 text-center text-sm text-gray-500">
                    No early check-outs in this range.
                  </p>
                ) : (
                  earlyRecords.map((r) => (
                    <RecordRow
                      key={r.id}
                      record={r}
                      onFilterStaff={filterToStaff}
                      onDelete={removeRecord}
                      deleting={deletingId === r.id}
                    />
                  ))
                )}
              </div>
              <div className="space-y-2 rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-sm">
                <h2 className="font-josefin text-lg font-bold text-gray-900">
                  Missing check-out ({missingCheckoutRecords.length})
                </h2>
                <p className="text-sm text-gray-600">
                  Staff who checked in but never checked out in this range.
                </p>
                {missingCheckoutRecords.length === 0 ? (
                  <p className="py-6 text-center text-sm text-gray-500">
                    No missing check-outs in this range.
                  </p>
                ) : (
                  missingCheckoutRecords.map((r) => (
                    <RecordRow
                      key={r.id}
                      record={r}
                      onFilterStaff={filterToStaff}
                      onDelete={removeRecord}
                      deleting={deletingId === r.id}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {view === 'other' && (
            <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="font-josefin text-lg font-bold text-gray-900">Other-device marks</h2>
              <p className="text-sm text-gray-500">
                Check-in or check-out from a device other than the staff bound device.
              </p>
              {otherDeviceRecords.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">
                  No other-device activity in this range.
                </p>
              ) : (
                otherDeviceRecords.map((r) => (
                  <RecordRow
                    key={r.id}
                    record={r}
                    onFilterStaff={filterToStaff}
                    onDelete={removeRecord}
                    deleting={deletingId === r.id}
                  />
                ))
              )}
            </div>
          )}

          {view === 'leaderboard' && (
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="font-josefin text-lg font-bold text-gray-900">
                Total late time leaderboard
              </h2>
              <p className="text-sm text-gray-500">
                Staff ranked by cumulative late minutes in the selected range.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-2 py-2">#</th>
                      <th className="px-2 py-2">Staff</th>
                      <th className="px-2 py-2">Attendance %</th>
                      <th className="px-2 py-2">Late days</th>
                      <th className="px-2 py-2">Total late</th>
                      <th className="px-2 py-2">Avg when late</th>
                      <th className="px-2 py-2">On-time rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scorecard
                      .filter((u) => (u.lateMinutesTotal ?? 0) > 0)
                      .map((u, idx) => (
                        <tr key={u.userId} className="border-b border-gray-50">
                          <td className="px-2 py-2.5 text-gray-500">{idx + 1}</td>
                          <td className="px-2 py-2.5">
                            <button
                              type="button"
                              className="font-semibold text-primary-800 hover:underline"
                              onClick={() => filterToStaff(u.userId)}
                            >
                              {u.userName}
                            </button>
                          </td>
                          <td className="px-2 py-2.5 font-semibold text-emerald-800">
                            {typeof u.attendancePercent === 'number'
                              ? `${u.attendancePercent}%`
                              : '—'}
                          </td>
                          <td className="px-2 py-2.5">{u.lateDays ?? u.late}</td>
                          <td className="px-2 py-2.5 font-semibold text-amber-900">
                            {u.lateTotalLabel || `${u.lateMinutesTotal ?? 0} min`}
                          </td>
                          <td className="px-2 py-2.5">
                            {u.avgLateMinutesWhenLate
                              ? `${u.avgLateMinutesWhenLate} min`
                              : '—'}
                          </td>
                          <td className="px-2 py-2.5">
                            {typeof u.onTimeRate === 'number' ? `${u.onTimeRate}%` : '—'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {!scorecard.some((u) => (u.lateMinutesTotal ?? 0) > 0) && (
                  <p className="py-8 text-center text-sm text-gray-500">
                    No late time recorded in this range.
                  </p>
                )}
              </div>
            </div>
          )}

          {view === 'details' && (
            <div className="space-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h2 className="font-josefin text-lg font-bold text-gray-900">All records</h2>
              <p className="text-sm text-gray-500">
                Full detail for the current filters, including device and distance context.
              </p>
              {records.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-500">
                  No detailed records in this range.
                </p>
              ) : (
                records.map((r) => (
                  <RecordRow
                    key={r.id}
                    record={r}
                    onFilterStaff={filterToStaff}
                    onDelete={removeRecord}
                    deleting={deletingId === r.id}
                  />
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
