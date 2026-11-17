import type { AttendanceStatus } from '@/lib/attendance/types'
import { formatTime as formatTime12h } from '@/lib/utils'

export function statusLabel(status: string) {
  switch (status) {
    case 'Present':
      return 'Present'
    case 'Late':
      return 'Late'
    case 'Absent':
      return 'Absent'
    case 'OnLeave':
      return 'On Leave'
    case 'PendingVerification':
      return 'Needs review'
    case 'Rejected':
      return 'Rejected'
    case 'Off':
      return 'Off'
    default:
      return status
  }
}

export function statusClass(status: string) {
  switch (status as AttendanceStatus | 'Absent' | 'Off') {
    case 'Present':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'Late':
      return 'bg-amber-100 text-amber-900 border-amber-200'
    case 'Absent':
      return 'bg-rose-100 text-rose-800 border-rose-200'
    case 'OnLeave':
      return 'bg-sky-100 text-sky-800 border-sky-200'
    case 'PendingVerification':
      return 'bg-orange-100 text-orange-900 border-orange-200'
    case 'Rejected':
      return 'bg-gray-200 text-gray-700 border-gray-300'
    case 'Off':
      return 'bg-slate-100 text-slate-600 border-slate-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

/** Always 12-hour (e.g. 8:30 AM). Accepts ISO datetimes or HH:mm clock strings. */
export function formatTime(value?: string) {
  if (!value) return '—'
  const formatted = formatTime12h(value)
  return formatted || '—'
}

export function formatDate(dateKey: string) {
  try {
    return new Date(`${dateKey}T12:00:00`).toLocaleDateString('en-PK', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateKey
  }
}

/** Format minutes as "45 min" then hours: "1 hr 20 min" / "2 hrs". */
export function formatDurationMinutes(totalMinutes?: number | null) {
  if (totalMinutes == null || totalMinutes <= 0) return ''
  if (totalMinutes < 60) return `${totalMinutes} min`
  const hours = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60
  const hrLabel = hours === 1 ? '1 hr' : `${hours} hrs`
  return mins === 0 ? hrLabel : `${hrLabel} ${mins} min`
}
