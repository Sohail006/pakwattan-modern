/** Staff Attendance domain types (portable to ASP.NET later) */

export type StaffGroupKind = 'Teaching' | 'Clerical' | 'Managerial' | 'Support' | 'Other'

export type AssignmentStatus = 'Active' | 'Transferred' | 'Removed'

export type AttendanceStatus =
  | 'Present'
  | 'Late'
  | 'Absent'
  | 'OnLeave'
  | 'PendingVerification'
  | 'Rejected'

export interface AttendanceCampus {
  id: string
  name: string
  address?: string
  /** Link to ASP.NET campus id when available */
  externalCampusId?: number
  latitude: number
  longitude: number
  /** Geofence radius in meters */
  radiusMeters: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface StaffGroup {
  id: string
  name: string
  kind: StaffGroupKind
  /** Minutes after shift start still counted Present (not Late) */
  graceMinutes: number
  /** Local time HH:mm (Asia/Karachi) */
  shiftStart: string
  shiftEnd: string
  requireCheckout: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface StaffAssignment {
  id: string
  userId: string
  userEmail?: string
  userName: string
  roles: string[]
  campusId: string
  groupId: string
  status: AssignmentStatus
  joinedAt: string
  leftAt?: string
  notes?: string
  updatedAt: string
}

export interface AttendanceRecord {
  id: string
  userId: string
  userName: string
  assignmentId: string
  campusId: string
  groupId: string
  /** YYYY-MM-DD in Asia/Karachi */
  date: string
  checkInAt?: string
  checkOutAt?: string
  checkInLat?: number
  checkInLng?: number
  checkOutLat?: number
  checkOutLng?: number
  checkInDistanceM?: number
  checkOutDistanceM?: number
  status: AttendanceStatus
  /** Set when admin overrides location / leave / absent */
  adminAction?: 'Approved' | 'MarkedAbsent' | 'LeaveApproved' | 'Rejected'
  adminNote?: string
  adminBy?: string
  adminByName?: string
  adminAt?: string
  deviceInfo?: string
  createdAt: string
  updatedAt: string
}

export interface AttendanceSettings {
  timezone: string
  allowCheckInWithoutGps: boolean
  pendingNeedsAdmin: boolean
  reminderCheckoutMinutes: number
  updatedAt: string
}

export interface AttendanceDb {
  settings: AttendanceSettings
  campuses: AttendanceCampus[]
  groups: StaffGroup[]
  assignments: StaffAssignment[]
  records: AttendanceRecord[]
}

export interface AttendanceActor {
  id: string
  email?: string
  firstName?: string
  lastName?: string
  roles: string[]
  displayName: string
  isAdmin: boolean
}
