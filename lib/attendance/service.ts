import { isWithinRadius, karachiNow, timeToMinutes } from './geo'
import { newId, withDb } from './store'
import type {
  AttendanceActor,
  AttendanceCampus,
  AttendanceRecord,
  AttendanceSettings,
  AttendanceStatus,
  StaffAssignment,
  StaffGroup,
  StaffGroupKind,
} from './types'

function httpError(message: string, status = 400): Error & { status: number } {
  const err = new Error(message) as Error & { status: number }
  err.status = status
  return err
}

function activeAssignment(dbAssignments: StaffAssignment[], userId: string) {
  return dbAssignments.find((a) => a.userId === userId && a.status === 'Active')
}

/* ---------- Settings ---------- */

export async function getSettings() {
  return withDb((db) => ({
    settings: db.settings,
    campuses: db.campuses.filter((c) => c.isActive),
    groups: db.groups.filter((g) => g.isActive),
    assignmentCount: db.assignments.filter((a) => a.status === 'Active').length,
  }))
}

export async function updateSettings(patch: Partial<AttendanceSettings>) {
  return withDb((db) => {
    db.settings = {
      ...db.settings,
      ...patch,
      timezone: 'Asia/Karachi',
      updatedAt: new Date().toISOString(),
    }
    return db.settings
  })
}

/* ---------- Campuses ---------- */

export async function listCampuses(includeInactive = false) {
  return withDb((db) =>
    includeInactive ? db.campuses : db.campuses.filter((c) => c.isActive)
  )
}

export async function upsertCampus(input: {
  id?: string
  name: string
  address?: string
  externalCampusId?: number
  latitude: number
  longitude: number
  radiusMeters: number
  isActive?: boolean
}) {
  if (!input.name?.trim()) throw httpError('Campus name is required.')
  if (!Number.isFinite(input.latitude) || !Number.isFinite(input.longitude)) {
    throw httpError('Valid campus coordinates are required.')
  }
  if (!input.radiusMeters || input.radiusMeters < 20) {
    throw httpError('Geofence radius must be at least 20 meters.')
  }

  return withDb((db) => {
    const now = new Date().toISOString()
    if (input.id) {
      const idx = db.campuses.findIndex((c) => c.id === input.id)
      if (idx < 0) throw httpError('Campus not found.', 404)
      db.campuses[idx] = {
        ...db.campuses[idx],
        name: input.name.trim(),
        address: input.address?.trim(),
        externalCampusId: input.externalCampusId,
        latitude: input.latitude,
        longitude: input.longitude,
        radiusMeters: Math.round(input.radiusMeters),
        isActive: input.isActive ?? db.campuses[idx].isActive,
        updatedAt: now,
      }
      return db.campuses[idx]
    }

    const campus: AttendanceCampus = {
      id: newId(),
      name: input.name.trim(),
      address: input.address?.trim(),
      externalCampusId: input.externalCampusId,
      latitude: input.latitude,
      longitude: input.longitude,
      radiusMeters: Math.round(input.radiusMeters),
      isActive: input.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    }
    db.campuses.push(campus)
    return campus
  })
}

export async function deleteCampus(id: string) {
  return withDb((db) => {
    const campus = db.campuses.find((c) => c.id === id)
    if (!campus) throw httpError('Campus not found.', 404)
    const activeStaff = db.assignments.some(
      (a) => a.campusId === id && a.status === 'Active'
    )
    if (activeStaff) {
      throw httpError('Transfer or remove assigned staff before deleting this campus.')
    }
    campus.isActive = false
    campus.updatedAt = new Date().toISOString()
    return campus
  })
}

/* ---------- Groups ---------- */

export async function listGroups(includeInactive = false) {
  return withDb((db) => (includeInactive ? db.groups : db.groups.filter((g) => g.isActive)))
}

export async function upsertGroup(input: {
  id?: string
  name: string
  kind: StaffGroupKind
  graceMinutes: number
  shiftStart: string
  shiftEnd: string
  requireCheckout?: boolean
  isActive?: boolean
}) {
  if (!input.name?.trim()) throw httpError('Group name is required.')
  if (input.graceMinutes < 0 || input.graceMinutes > 180) {
    throw httpError('Grace time must be between 0 and 180 minutes.')
  }

  return withDb((db) => {
    const now = new Date().toISOString()
    if (input.id) {
      const idx = db.groups.findIndex((g) => g.id === input.id)
      if (idx < 0) throw httpError('Staff group not found.', 404)
      db.groups[idx] = {
        ...db.groups[idx],
        name: input.name.trim(),
        kind: input.kind,
        graceMinutes: Math.round(input.graceMinutes),
        shiftStart: input.shiftStart,
        shiftEnd: input.shiftEnd,
        requireCheckout: input.requireCheckout ?? db.groups[idx].requireCheckout,
        isActive: input.isActive ?? db.groups[idx].isActive,
        updatedAt: now,
      }
      return db.groups[idx]
    }

    const group: StaffGroup = {
      id: newId(),
      name: input.name.trim(),
      kind: input.kind,
      graceMinutes: Math.round(input.graceMinutes),
      shiftStart: input.shiftStart,
      shiftEnd: input.shiftEnd,
      requireCheckout: input.requireCheckout ?? true,
      isActive: input.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    }
    db.groups.push(group)
    return group
  })
}

/* ---------- Staff assignments ---------- */

export async function listAssignments(filters?: {
  campusId?: string
  groupId?: string
  status?: string
}) {
  return withDb((db) => {
    let list = [...db.assignments]
    if (filters?.campusId) list = list.filter((a) => a.campusId === filters.campusId)
    if (filters?.groupId) list = list.filter((a) => a.groupId === filters.groupId)
    if (filters?.status) list = list.filter((a) => a.status === filters.status)
    else list = list.filter((a) => a.status === 'Active')
    return list.sort((a, b) => a.userName.localeCompare(b.userName))
  })
}

export async function assignStaff(input: {
  userId: string
  userName: string
  userEmail?: string
  roles?: string[]
  campusId: string
  groupId: string
  notes?: string
}) {
  return withDb((db) => {
    const campus = db.campuses.find((c) => c.id === input.campusId && c.isActive)
    if (!campus) throw httpError('Select an active campus.')
    const group = db.groups.find((g) => g.id === input.groupId && g.isActive)
    if (!group) throw httpError('Select an active staff group.')

    const existing = activeAssignment(db.assignments, input.userId)
    if (existing) {
      throw httpError(
        `${input.userName} is already assigned. Use Transfer to move them to another campus.`
      )
    }

    const now = new Date().toISOString()
    const row: StaffAssignment = {
      id: newId(),
      userId: input.userId,
      userEmail: input.userEmail,
      userName: input.userName.trim(),
      roles: input.roles || [],
      campusId: input.campusId,
      groupId: input.groupId,
      status: 'Active',
      joinedAt: now,
      notes: input.notes,
      updatedAt: now,
    }
    db.assignments.push(row)
    return row
  })
}

export async function transferStaff(input: {
  assignmentId: string
  campusId: string
  groupId?: string
  notes?: string
}) {
  return withDb((db) => {
    const current = db.assignments.find((a) => a.id === input.assignmentId)
    if (!current || current.status !== 'Active') {
      throw httpError('Active assignment not found.', 404)
    }
    const campus = db.campuses.find((c) => c.id === input.campusId && c.isActive)
    if (!campus) throw httpError('Select an active campus.')
    const groupId = input.groupId || current.groupId
    const group = db.groups.find((g) => g.id === groupId && g.isActive)
    if (!group) throw httpError('Select an active staff group.')

    const now = new Date().toISOString()
    current.status = 'Transferred'
    current.leftAt = now
    current.updatedAt = now
    current.notes = [current.notes, input.notes].filter(Boolean).join(' | ')

    const next: StaffAssignment = {
      id: newId(),
      userId: current.userId,
      userEmail: current.userEmail,
      userName: current.userName,
      roles: current.roles,
      campusId: input.campusId,
      groupId,
      status: 'Active',
      joinedAt: now,
      notes: input.notes || `Transferred from previous campus`,
      updatedAt: now,
    }
    db.assignments.push(next)
    return next
  })
}

export async function removeStaff(assignmentId: string, notes?: string) {
  return withDb((db) => {
    const current = db.assignments.find((a) => a.id === assignmentId)
    if (!current || current.status !== 'Active') {
      throw httpError('Active assignment not found.', 404)
    }
    const now = new Date().toISOString()
    current.status = 'Removed'
    current.leftAt = now
    current.updatedAt = now
    if (notes) current.notes = [current.notes, notes].filter(Boolean).join(' | ')
    return current
  })
}

/* ---------- Check-in / out ---------- */

function resolveStatus(
  group: StaffGroup,
  inside: boolean,
  minutesNow: number
): AttendanceStatus {
  if (!inside) return 'PendingVerification'
  const start = timeToMinutes(group.shiftStart)
  const lateAfter = start + group.graceMinutes
  if (minutesNow <= lateAfter) return 'Present'
  return 'Late'
}

export async function getMyToday(actor: AttendanceActor) {
  return withDb((db) => {
    const assignment = activeAssignment(db.assignments, actor.id)
    const { dateKey } = karachiNow()
    const record = assignment
      ? db.records.find(
          (r) =>
            r.userId === actor.id &&
            r.date === dateKey &&
            r.assignmentId === assignment.id
        )
      : undefined
    const campus = assignment
      ? db.campuses.find((c) => c.id === assignment.campusId)
      : undefined
    const group = assignment
      ? db.groups.find((g) => g.id === assignment.groupId)
      : undefined

    return {
      assigned: Boolean(assignment),
      assignment,
      campus,
      group,
      today: record || null,
      canCheckIn: Boolean(
        assignment &&
          (!record ||
            (!record.checkInAt &&
              record.status !== 'OnLeave' &&
              record.status !== 'Absent'))
      ),
      canCheckOut: Boolean(
        record?.checkInAt &&
          !record.checkOutAt &&
          record.status !== 'Absent' &&
          record.status !== 'OnLeave' &&
          record.status !== 'Rejected'
      ),
      date: dateKey,
    }
  })
}

export async function checkIn(
  actor: AttendanceActor,
  coords: { latitude: number; longitude: number; accuracy?: number },
  deviceInfo?: string
) {
  return withDb((db) => {
    const assignment = activeAssignment(db.assignments, actor.id)
    if (!assignment) {
      throw httpError(
        'You are not assigned to a campus yet. Ask the attendance admin to add you.',
        403
      )
    }
    const campus = db.campuses.find((c) => c.id === assignment.campusId && c.isActive)
    const group = db.groups.find((g) => g.id === assignment.groupId && g.isActive)
    if (!campus || !group) throw httpError('Your campus or group settings are incomplete.', 400)

    const { dateKey, minutes, iso } = karachiNow()
    const existing = db.records.find(
      (r) => r.userId === actor.id && r.date === dateKey && r.assignmentId === assignment.id
    )
    if (existing?.checkInAt) {
      throw httpError('You have already checked in today.')
    }
    if (existing && (existing.status === 'OnLeave' || existing.status === 'Absent')) {
      throw httpError(`Cannot check in — status is ${existing.status}.`)
    }

    const { inside, distanceM } = isWithinRadius(
      coords.latitude,
      coords.longitude,
      campus.latitude,
      campus.longitude,
      campus.radiusMeters
    )

    if (!inside && db.settings.allowCheckInWithoutGps === false) {
      // Still create pending record so admin can verify
    }

    const status = resolveStatus(group, inside, minutes)
    const now = new Date().toISOString()

    if (existing) {
      existing.checkInAt = iso
      existing.checkInLat = coords.latitude
      existing.checkInLng = coords.longitude
      existing.checkInDistanceM = distanceM
      existing.status = status
      existing.deviceInfo = deviceInfo
      existing.updatedAt = now
      return { record: existing, campus, group, inside, distanceM }
    }

    const record: AttendanceRecord = {
      id: newId(),
      userId: actor.id,
      userName: actor.displayName,
      assignmentId: assignment.id,
      campusId: campus.id,
      groupId: group.id,
      date: dateKey,
      checkInAt: iso,
      checkInLat: coords.latitude,
      checkInLng: coords.longitude,
      checkInDistanceM: distanceM,
      status,
      deviceInfo,
      createdAt: now,
      updatedAt: now,
    }
    db.records.push(record)
    return { record, campus, group, inside, distanceM }
  })
}

export async function checkOut(
  actor: AttendanceActor,
  coords: { latitude: number; longitude: number },
  deviceInfo?: string
) {
  return withDb((db) => {
    const assignment = activeAssignment(db.assignments, actor.id)
    if (!assignment) throw httpError('You are not assigned to a campus.', 403)
    const campus = db.campuses.find((c) => c.id === assignment.campusId)
    const { dateKey, iso } = karachiNow()
    const record = db.records.find(
      (r) => r.userId === actor.id && r.date === dateKey && r.assignmentId === assignment.id
    )
    if (!record?.checkInAt) throw httpError('Check in first before checking out.')
    if (record.checkOutAt) throw httpError('You have already checked out today.')

    let distanceM: number | undefined
    if (campus) {
      distanceM = isWithinRadius(
        coords.latitude,
        coords.longitude,
        campus.latitude,
        campus.longitude,
        campus.radiusMeters
      ).distanceM
    }

    record.checkOutAt = iso
    record.checkOutLat = coords.latitude
    record.checkOutLng = coords.longitude
    record.checkOutDistanceM = distanceM
    record.deviceInfo = deviceInfo || record.deviceInfo
    record.updatedAt = new Date().toISOString()
    return { record, campus }
  })
}

export async function myHistory(actor: AttendanceActor, limit = 30) {
  return withDb((db) =>
    db.records
      .filter((r) => r.userId === actor.id)
      .sort((a, b) => b.date.localeCompare(a.date) || (b.checkInAt || '').localeCompare(a.checkInAt || ''))
      .slice(0, limit)
  )
}

/* ---------- Admin actions ---------- */

export async function listTodayBoard(date?: string) {
  return withDb((db) => {
    const dateKey = date || karachiNow().dateKey
    const active = db.assignments.filter((a) => a.status === 'Active')
    const rows = active.map((a) => {
      const record = db.records.find(
        (r) => r.assignmentId === a.id && r.date === dateKey
      )
      const campus = db.campuses.find((c) => c.id === a.campusId)
      const group = db.groups.find((g) => g.id === a.groupId)
      return {
        assignment: a,
        campus,
        group,
        record: record || null,
        status: (record?.status || 'Absent') as AttendanceStatus | 'Absent',
      }
    })

    const summary = {
      date: dateKey,
      total: rows.length,
      present: rows.filter((r) => r.status === 'Present').length,
      late: rows.filter((r) => r.status === 'Late').length,
      absent: rows.filter((r) => !r.record || r.status === 'Absent').length,
      onLeave: rows.filter((r) => r.status === 'OnLeave').length,
      pending: rows.filter((r) => r.status === 'PendingVerification').length,
    }

    return { summary, rows }
  })
}

export async function adminAction(
  actor: AttendanceActor,
  input: {
    recordId?: string
    assignmentId?: string
    date?: string
    action: 'Approve' | 'MarkAbsent' | 'ApproveLeave' | 'Reject'
    note?: string
  }
) {
  return withDb((db) => {
    const dateKey = input.date || karachiNow().dateKey
    let record = input.recordId
      ? db.records.find((r) => r.id === input.recordId)
      : undefined

    if (!record && input.assignmentId) {
      const assignment = db.assignments.find((a) => a.id === input.assignmentId)
      if (!assignment) throw httpError('Staff assignment not found.', 404)
      record = db.records.find(
        (r) => r.assignmentId === assignment.id && r.date === dateKey
      )
      if (!record) {
        const now = new Date().toISOString()
        record = {
          id: newId(),
          userId: assignment.userId,
          userName: assignment.userName,
          assignmentId: assignment.id,
          campusId: assignment.campusId,
          groupId: assignment.groupId,
          date: dateKey,
          status: 'Absent',
          createdAt: now,
          updatedAt: now,
        }
        db.records.push(record)
      }
    }

    if (!record) throw httpError('Attendance record not found.', 404)

    const now = new Date().toISOString()
    record.adminBy = actor.id
    record.adminByName = actor.displayName
    record.adminAt = now
    record.adminNote = input.note
    record.updatedAt = now

    switch (input.action) {
      case 'Approve': {
        const group = db.groups.find((g) => g.id === record!.groupId)
        if (record.checkInAt && group) {
          const checkInLocal = karachiNow(new Date(record.checkInAt))
          const lateAfter = timeToMinutes(group.shiftStart) + group.graceMinutes
          record.status = checkInLocal.minutes <= lateAfter ? 'Present' : 'Late'
        } else {
          record.status = 'Present'
          if (!record.checkInAt) record.checkInAt = karachiNow().iso
        }
        record.adminAction = 'Approved'
        break
      }
      case 'MarkAbsent':
        record.status = 'Absent'
        record.adminAction = 'MarkedAbsent'
        break
      case 'ApproveLeave':
        record.status = 'OnLeave'
        record.adminAction = 'LeaveApproved'
        break
      case 'Reject':
        record.status = 'Rejected'
        record.adminAction = 'Rejected'
        break
    }

    return record
  })
}

export async function reports(input: {
  from: string
  to: string
  userId?: string
  campusId?: string
  groupId?: string
}) {
  return withDb((db) => {
    let records = db.records.filter(
      (r) => r.date >= input.from && r.date <= input.to
    )
    if (input.userId) records = records.filter((r) => r.userId === input.userId)
    if (input.campusId) records = records.filter((r) => r.campusId === input.campusId)
    if (input.groupId) records = records.filter((r) => r.groupId === input.groupId)

    const byUser = new Map<
      string,
      {
        userId: string
        userName: string
        present: number
        late: number
        absent: number
        onLeave: number
        pending: number
        days: number
      }
    >()

    for (const r of records) {
      const row = byUser.get(r.userId) || {
        userId: r.userId,
        userName: r.userName,
        present: 0,
        late: 0,
        absent: 0,
        onLeave: 0,
        pending: 0,
        days: 0,
      }
      row.days += 1
      if (r.status === 'Present') row.present += 1
      else if (r.status === 'Late') row.late += 1
      else if (r.status === 'Absent') row.absent += 1
      else if (r.status === 'OnLeave') row.onLeave += 1
      else if (r.status === 'PendingVerification') row.pending += 1
      byUser.set(r.userId, row)
    }

    return {
      from: input.from,
      to: input.to,
      totalRecords: records.length,
      records: records.sort((a, b) => b.date.localeCompare(a.date)),
      byUser: Array.from(byUser.values()).sort((a, b) =>
        a.userName.localeCompare(b.userName)
      ),
    }
  })
}
