import type { AttendanceRecord } from '@/lib/attendance/types'
import type { AttendanceReportPayload } from '@/lib/api/attendance'

function csvEscape(value: unknown): string {
  const s = value == null ? '' : String(value)
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function downloadCsv(filename: string, headers: string[], rows: unknown[][]) {
  const lines = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => row.map(csvEscape).join(',')),
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function exportAttendanceRecordsCsv(
  records: AttendanceRecord[],
  range: { from: string; to: string }
) {
  downloadCsv(
    `attendance-records-${range.from}_to_${range.to}.csv`,
    [
      'Date',
      'Staff',
      'Campus',
      'Group',
      'Status',
      'CheckIn',
      'CheckOut',
      'LateMinutes',
      'LateLabel',
      'EarlyLeaveMinutes',
      'EarlyLeaveLabel',
      'OtherDevice',
      'CheckInOtherDevice',
      'CheckOutOtherDevice',
      'CheckInDistanceM',
      'CheckOutDistanceM',
      'DeviceInfo',
      'AdminNote',
    ],
    records.map((r) => [
      r.date,
      r.userName,
      r.campusName || r.campusId,
      r.groupName || r.groupId,
      r.status,
      r.checkInAt || '',
      r.checkOutAt || '',
      r.lateMinutes ?? '',
      r.lateLabel || '',
      r.earlyLeaveMinutes ?? '',
      r.earlyLeaveLabel || '',
      r.otherDeviceUsed ? 'Yes' : 'No',
      r.checkInOtherDevice ? 'Yes' : 'No',
      r.checkOutOtherDevice ? 'Yes' : 'No',
      r.checkInDistanceM ?? '',
      r.checkOutDistanceM ?? '',
      r.checkInDeviceInfo || r.deviceInfo || '',
      r.adminNote || '',
    ])
  )
}

export function exportAttendanceScorecardCsv(
  report: AttendanceReportPayload,
  range: { from: string; to: string }
) {
  downloadCsv(
    `attendance-scorecard-${range.from}_to_${range.to}.csv`,
    [
      'Staff',
      'Present',
      'Late',
      'Absent',
      'Leave',
      'Pending',
      'Rejected',
      'Days',
      'ExpectedWorkingDays',
      'AttendedDays',
      'NoShowDays',
      'AttendancePercent',
      'LateDays',
      'EarlyDays',
      'OtherDeviceDays',
      'LateMinutesTotal',
      'LateTotalLabel',
      'EarlyMinutesTotal',
      'EarlyTotalLabel',
      'AvgLateWhenLate',
      'OnTimeRate',
    ],
    (report.byUser || []).map((u) => [
      u.userName,
      u.present,
      u.late,
      u.absent,
      u.onLeave,
      u.pending,
      u.rejected ?? 0,
      u.days,
      u.expectedWorkingDays ?? '',
      u.attendedDays ?? '',
      u.noShowDays ?? '',
      u.attendancePercent ?? '',
      u.lateDays ?? '',
      u.earlyDays ?? '',
      u.otherDeviceDays ?? '',
      u.lateMinutesTotal ?? 0,
      u.lateTotalLabel || '',
      u.earlyLeaveMinutesTotal ?? 0,
      u.earlyLeaveTotalLabel || '',
      u.avgLateMinutesWhenLate ?? '',
      u.onTimeRate ?? '',
    ])
  )
}
