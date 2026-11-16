import { api, ApiError } from './client'
import type {
  AttendanceCampus,
  AttendanceRecord,
  AttendanceSettings,
  StaffAssignment,
  StaffGroup,
  StaffGroupKind,
} from '@/lib/attendance/types'

type Envelope<T> = { success: boolean; data?: T; error?: string }

/** Profile headers so check-in matches the same user id used in Staff roster */
function attendanceHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem('user_info')
    if (!raw) return {}
    const user = JSON.parse(raw) as {
      id?: string
      email?: string
      firstName?: string
      lastName?: string
      roles?: string[]
    }
    if (!user?.id) return {}
    const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim()
    return {
      'X-PW-User-Id': String(user.id),
      ...(user.email ? { 'X-PW-User-Email': user.email } : {}),
      ...(name ? { 'X-PW-User-Name': name } : {}),
      ...(Array.isArray(user.roles)
        ? { 'X-PW-User-Roles': JSON.stringify(user.roles) }
        : {}),
    }
  } catch {
    return {}
  }
}

async function unwrap<T>(promise: Promise<Envelope<T>>): Promise<T> {
  try {
    const res = await promise
    if (!res?.success) throw new Error(res?.error || 'Request failed.')
    return res.data as T
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || (error as Error).message || 'Request failed.')
  }
}

const h = () => attendanceHeaders()

export async function getAttendanceSettings() {
  return unwrap(
    api.get<
      Envelope<{
        settings: AttendanceSettings
        campuses: AttendanceCampus[]
        groups: StaffGroup[]
        assignmentCount: number
      }>
    >('/api/attendance/settings', h())
  )
}

export async function updateAttendanceSettings(patch: Partial<AttendanceSettings>) {
  return unwrap(
    api.put<Envelope<AttendanceSettings>>('/api/attendance/settings', patch, h())
  )
}

export async function getAttendanceCampuses(all = false) {
  return unwrap(
    api.get<Envelope<AttendanceCampus[]>>(
      `/api/attendance/campuses${all ? '?all=1' : ''}`,
      h()
    )
  )
}

export async function saveAttendanceCampus(
  data: Partial<AttendanceCampus> & {
    name: string
    latitude: number
    longitude: number
    radiusMeters: number
  }
) {
  if (data.id) {
    return unwrap(
      api.put<Envelope<AttendanceCampus>>(`/api/attendance/campuses/${data.id}`, data, h())
    )
  }
  return unwrap(api.post<Envelope<AttendanceCampus>>('/api/attendance/campuses', data, h()))
}

export async function deleteAttendanceCampus(id: string) {
  return unwrap(
    api.delete<Envelope<AttendanceCampus>>(`/api/attendance/campuses/${id}`, h())
  )
}

export async function getAttendanceGroups(all = false) {
  return unwrap(
    api.get<Envelope<StaffGroup[]>>(`/api/attendance/groups${all ? '?all=1' : ''}`, h())
  )
}

export async function saveAttendanceGroup(
  data: Partial<StaffGroup> & {
    name: string
    kind: StaffGroupKind
    graceMinutes: number
    shiftStart: string
    shiftEnd: string
  }
) {
  if (data.id) {
    return unwrap(
      api.put<Envelope<StaffGroup>>(`/api/attendance/groups/${data.id}`, data, h())
    )
  }
  return unwrap(api.post<Envelope<StaffGroup>>('/api/attendance/groups', data, h()))
}

export async function getAttendanceStaff(params?: {
  campusId?: string
  groupId?: string
  status?: string
}) {
  const q = new URLSearchParams()
  if (params?.campusId) q.set('campusId', params.campusId)
  if (params?.groupId) q.set('groupId', params.groupId)
  if (params?.status) q.set('status', params.status)
  const qs = q.toString()
  return unwrap(
    api.get<Envelope<StaffAssignment[]>>(
      `/api/attendance/staff${qs ? `?${qs}` : ''}`,
      h()
    )
  )
}

export interface AttendanceEligibleFaculty {
  userId: string
  name: string
  username: string
  email?: string
  assignedRole?: string | null
  staffCategory?: string | null
  roleType?: string | null
  roleName?: string | null
  wing?: string | null
  facultyRegistrationId: number
}

/** Verified Pakians Faculty members available for attendance assignment. */
export async function getAttendanceEligibleFaculty() {
  return unwrap(api.get<Envelope<AttendanceEligibleFaculty[]>>('/api/attendance/eligible-faculty', h()))
}

export async function assignAttendanceStaff(data: {
  userId: string
  userName: string
  userEmail?: string
  roles?: string[]
  campusId: string
  groupId: string
  notes?: string
}) {
  return unwrap(
    api.post<Envelope<StaffAssignment>>('/api/attendance/staff', data, h())
  )
}

export async function transferAttendanceStaff(
  assignmentId: string,
  data: { campusId: string; groupId?: string; notes?: string }
) {
  return unwrap(
    api.post<Envelope<StaffAssignment>>(
      `/api/attendance/staff/${assignmentId}/transfer`,
      data,
      h()
    )
  )
}

export async function removeAttendanceStaff(assignmentId: string, notes?: string) {
  return unwrap(
    api.post<Envelope<StaffAssignment>>(
      `/api/attendance/staff/${assignmentId}/remove`,
      { notes },
      h()
    )
  )
}

export async function getMyAttendanceToday() {
  return unwrap(
    api.get<
      Envelope<{
        assigned: boolean
        assignment?: StaffAssignment
        campus?: AttendanceCampus
        group?: StaffGroup
        today: AttendanceRecord | null
        canCheckIn: boolean
        canCheckOut: boolean
        requireCheckout?: boolean
        date: string
      }>
    >('/api/attendance/me', h())
  )
}

export async function attendanceCheckIn(coords: {
  latitude: number
  longitude: number
  accuracy?: number
}) {
  return unwrap(
    api.post<
      Envelope<{
        record: AttendanceRecord
        campus: AttendanceCampus
        group: StaffGroup
        inside: boolean
        distanceM: number
      }>
    >(
      '/api/attendance/me/check-in',
      {
        ...coords,
        deviceInfo:
          typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 180) : undefined,
      },
      h()
    )
  )
}

export async function attendanceCheckOut(coords: {
  latitude: number
  longitude: number
  accuracy?: number
}) {
  return unwrap(
    api.post<
      Envelope<{
        record: AttendanceRecord
        campus?: AttendanceCampus
        distanceM?: number | null
        gpsRecorded?: boolean
        inside?: boolean
      }>
    >(
      '/api/attendance/me/check-out',
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        deviceInfo:
          typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 180) : undefined,
      },
      h()
    )
  )
}

export async function getMyAttendanceHistory(limit = 30) {
  return unwrap(
    api.get<Envelope<AttendanceRecord[]>>(
      `/api/attendance/me/history?limit=${limit}`,
      h()
    )
  )
}

export async function getAttendanceBoard(date?: string) {
  const q = date ? `?date=${encodeURIComponent(date)}` : ''
  return unwrap(
    api.get<
      Envelope<{
        summary: {
          date: string
          total: number
          present: number
          late: number
          absent: number
          onLeave: number
          pending: number
        }
        rows: Array<{
          assignment: StaffAssignment
          campus?: AttendanceCampus
          group?: StaffGroup
          record: AttendanceRecord | null
          status: string
        }>
      }>
    >(`/api/attendance/board${q}`, h())
  )
}

export async function postAttendanceAdminAction(data: {
  recordId?: string
  assignmentId?: string
  date?: string
  action: 'Approve' | 'MarkAbsent' | 'ApproveLeave' | 'Reject'
  note?: string
}) {
  return unwrap(
    api.post<Envelope<AttendanceRecord>>('/api/attendance/admin-action', data, h())
  )
}

export async function deleteAttendanceRecord(id: string) {
  return unwrap(
    api.delete<Envelope<{ id: string; deleted: boolean }>>(
      `/api/attendance/records/${id}`,
      h()
    )
  )
}

export async function getAttendanceReports(params: {
  from: string
  to: string
  userId?: string
  campusId?: string
  groupId?: string
}) {
  const q = new URLSearchParams()
  q.set('from', params.from)
  q.set('to', params.to)
  if (params.userId) q.set('userId', params.userId)
  if (params.campusId) q.set('campusId', params.campusId)
  if (params.groupId) q.set('groupId', params.groupId)
  return unwrap(
    api.get<
      Envelope<{
        from: string
        to: string
        totalRecords: number
        records: AttendanceRecord[]
        lateMinutesTotal?: number
        earlyLeaveMinutesTotal?: number
        lateTotalLabel?: string
        earlyLeaveTotalLabel?: string
        byUser: Array<{
          userId: string
          userName: string
          present: number
          late: number
          absent: number
          onLeave: number
          pending: number
          days: number
          lateMinutesTotal?: number
          earlyLeaveMinutesTotal?: number
          lateTotalLabel?: string
          earlyLeaveTotalLabel?: string
        }>
      }>
    >(`/api/attendance/reports?${q.toString()}`, h())
  )
}

/** Browser geolocation with clear user-facing errors */
export function requestDeviceLocation(
  options?: PositionOptions
): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('This device does not support location services.'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      resolve,
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          reject(
            new Error(
              'Location permission is off. Turn on location for your browser, then try again.'
            )
          )
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          reject(
            new Error(
              'Could not read your location. Move outdoors or check GPS, then retry.'
            )
          )
        } else if (err.code === err.TIMEOUT) {
          reject(new Error('Location request timed out. Please try again.'))
        } else {
          reject(new Error('Unable to get your location.'))
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
        ...options,
      }
    )
  })
}
