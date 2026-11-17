'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  RefreshCw,
  Settings2,
  Trash2,
  UserX,
  Umbrella,
  XCircle,
  BarChart3,
} from 'lucide-react'
import {
  deleteAttendanceRecord,
  getAttendanceBoard,
  postAttendanceAdminAction,
} from '@/lib/api/attendance'
import { formatTime, statusClass, statusLabel } from './statusStyles'
import { karachiToday } from '@/lib/attendance/pakistanDate'

type AdminTodayBoardProps = {
  /** When true, hide page chrome (used inside AttendanceHub tabs). */
  embedded?: boolean
}

export default function AdminTodayBoard({ embedded = false }: AdminTodayBoardProps) {
  const [date, setDate] = useState(() => karachiToday())
  const [loading, setLoading] = useState(true)
  const [actingId, setActingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [board, setBoard] = useState<Awaited<ReturnType<typeof getAttendanceBoard>> | null>(
    null
  )
  const [note, setNote] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setBoard(await getAttendanceBoard(date))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load board.')
    } finally {
      setLoading(false)
    }
  }, [date])

  useEffect(() => {
    refresh()
  }, [refresh])

  const act = async (
    action: 'Approve' | 'MarkAbsent' | 'ApproveLeave' | 'Reject',
    row: NonNullable<typeof board>['rows'][number]
  ) => {
    const key = row.record?.id || row.assignment.id
    setActingId(key)
    setError(null)
    try {
      await postAttendanceAdminAction({
        recordId: row.record?.id,
        assignmentId: row.assignment.id,
        date,
        action,
        note: note.trim() || undefined,
      })
      setNote('')
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Action failed.')
    } finally {
      setActingId(null)
    }
  }

  const removeRecord = async (row: NonNullable<typeof board>['rows'][number]) => {
    if (!row.record?.id) return
    if (
      !window.confirm(
        `Delete attendance record for ${row.assignment.userName} on ${date}? This cannot be undone.`
      )
    ) {
      return
    }
    const key = row.record.id
    setActingId(key)
    setError(null)
    try {
      await deleteAttendanceRecord(row.record.id)
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed.')
    } finally {
      setActingId(null)
    }
  }

  const summary = board?.summary

  return (
    <div className="space-y-5">
      {!embedded && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-josefin text-2xl font-bold text-gray-900 sm:text-3xl">
              Staff Attendance
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Live campus board — verify GPS / other-device check-ins, mark leave, or mark absent.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/attendance?tab=settings"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm"
            >
              <Settings2 className="h-4 w-4" />
              Settings
            </Link>
            <Link
              href="/dashboard/attendance?tab=reports"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm"
            >
              <BarChart3 className="h-4 w-4" />
              Reports
            </Link>
            <button
              type="button"
              onClick={refresh}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary-700 px-3 py-2 text-sm font-semibold text-white"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      )}

      {embedded && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={refresh}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary-700 px-3 py-2 text-sm font-semibold text-white"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh board
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <label className="text-sm font-semibold text-gray-700">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 sm:w-auto"
          />
        </label>
        <label className="flex-1 text-sm font-semibold text-gray-700">
          Admin note (optional)
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reason for approve / leave / absent"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      {summary && (
        <div className="space-y-3">
          {summary.isWorkingDay === false && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Non-working day
              {summary.offReason ? ` — ${summary.offReason}` : ''}. Staff without a record show as Off.
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {[
              { label: 'Staff', value: summary.total, tone: 'bg-slate-100 text-slate-800' },
              { label: 'Present', value: summary.present, tone: 'bg-emerald-100 text-emerald-800' },
              { label: 'Late', value: summary.late, tone: 'bg-amber-100 text-amber-900' },
              summary.isWorkingDay === false
                ? { label: 'Off', value: summary.off ?? 0, tone: 'bg-slate-100 text-slate-600' }
                : { label: 'Absent', value: summary.absent, tone: 'bg-rose-100 text-rose-800' },
              { label: 'Leave', value: summary.onLeave, tone: 'bg-sky-100 text-sky-800' },
              { label: 'Pending', value: summary.pending, tone: 'bg-orange-100 text-orange-900' },
            ].map((card) => (
              <div
                key={card.label}
                className={`rounded-2xl border border-black/5 px-4 py-3 ${card.tone}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  {card.label}
                </p>
                <p className="mt-1 text-2xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      {!loading && summary && summary.total === 0 && (
        <div className="rounded-2xl border border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900">Set up attendance in 3 steps</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-700">
            <li>Add each campus with GPS coordinates and a radius (e.g. 100–150m).</li>
            <li>Confirm staff groups and grace time (Teaching / Clerical / Managerial).</li>
            <li>Assign teachers and staff to a campus — only then will My Attendance appear for them.</li>
          </ol>
          <Link
            href="/dashboard/attendance?tab=settings"
            className="mt-5 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary-700 px-5 text-sm font-bold text-white"
          >
            Open attendance settings
          </Link>
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary-700" />
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">Staff</th>
                  <th className="px-4 py-3">Campus / Group</th>
                  <th className="px-4 py-3">In / Out</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {board?.rows.map((row) => {
                  const busy = actingId === (row.record?.id || row.assignment.id)
                  return (
                    <tr key={row.assignment.id} className="align-top">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{row.assignment.userName}</p>
                        <p className="text-xs text-gray-500">{row.assignment.userEmail}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <p>{row.campus?.name}</p>
                        <p className="text-xs text-gray-500">{row.group?.name}</p>
                        {typeof row.record?.checkInDistanceM === 'number' && (
                          <p className="mt-1 inline-flex items-center gap-1 text-xs text-orange-700">
                            <MapPin className="h-3 w-3" />
                            {row.record.checkInDistanceM}m from fence
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <p>
                          In {formatTime(row.record?.checkInAt)}
                          {row.record?.checkInOtherDevice ? (
                            <span className="ml-1 text-xs font-semibold text-violet-700">
                              · other device
                            </span>
                          ) : null}
                        </p>
                        <p>
                          Out {formatTime(row.record?.checkOutAt)}
                          {row.record?.checkOutOtherDevice ? (
                            <span className="ml-1 text-xs font-semibold text-violet-700">
                              · other device
                            </span>
                          ) : null}
                        </p>
                        {row.record?.lateLabel && (
                          <p className="mt-1 text-xs font-semibold text-amber-700">
                            Late {row.record.lateLabel}
                          </p>
                        )}
                        {row.record?.earlyLeaveLabel && (
                          <p className="text-xs font-semibold text-rose-700">
                            Early out {row.record.earlyLeaveLabel}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(row.status)}`}
                        >
                          {statusLabel(row.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => act('Approve', row)}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => act('ApproveLeave', row)}
                            className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            <Umbrella className="h-3.5 w-3.5" />
                            Leave
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => act('MarkAbsent', row)}
                            className="inline-flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            <UserX className="h-3.5 w-3.5" />
                            Absent
                          </button>
                          {row.status === 'PendingVerification' && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => act('Reject', row)}
                              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-semibold text-gray-700 disabled:opacity-50"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              Reject
                            </button>
                          )}
                          {row.record?.id && (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => removeRecord(row)}
                              className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 disabled:opacity-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 lg:hidden">
            {board?.rows.map((row) => {
              const busy = actingId === (row.record?.id || row.assignment.id)
              return (
                <div
                  key={row.assignment.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">{row.assignment.userName}</p>
                      <p className="text-xs text-gray-500">
                        {row.campus?.name} · {row.group?.name}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(row.status)}`}
                    >
                      {statusLabel(row.status)}
                    </span>
                  </div>
                  <p className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-3.5 w-3.5" />
                    In {formatTime(row.record?.checkInAt)}
                    {row.record?.checkInOtherDevice ? ' (other device)' : ''}
                    {' · '}
                    Out {formatTime(row.record?.checkOutAt)}
                    {row.record?.checkOutOtherDevice ? ' (other device)' : ''}
                  </p>
                  {(row.record?.lateLabel || row.record?.earlyLeaveLabel) && (
                    <p className="mt-1 text-xs font-medium text-amber-800">
                      {row.record.lateLabel ? `Late ${row.record.lateLabel}` : ''}
                      {row.record.lateLabel && row.record.earlyLeaveLabel ? ' · ' : ''}
                      {row.record.earlyLeaveLabel
                        ? `Early out ${row.record.earlyLeaveLabel}`
                        : ''}
                    </p>
                  )}
                  {typeof row.record?.checkInDistanceM === 'number' && (
                    <p className="mt-1 text-xs text-orange-700">
                      GPS {row.record.checkInDistanceM}m from campus fence
                    </p>
                  )}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => act('Approve', row)}
                      className="min-h-[44px] rounded-xl bg-emerald-600 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => act('ApproveLeave', row)}
                      className="min-h-[44px] rounded-xl bg-sky-600 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Leave
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => act('MarkAbsent', row)}
                      className="min-h-[44px] rounded-xl bg-rose-600 text-sm font-semibold text-white disabled:opacity-50"
                    >
                      Absent
                    </button>
                    {row.status === 'PendingVerification' && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => act('Reject', row)}
                        className="min-h-[44px] rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    )}
                    {row.record?.id && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => removeRecord(row)}
                        className="col-span-2 min-h-[44px] rounded-xl border border-rose-200 bg-rose-50 text-sm font-semibold text-rose-700 disabled:opacity-50"
                      >
                        Delete record
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
