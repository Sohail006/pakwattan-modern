const STORAGE_KEY = 'pw_attendance_device_id'

function createDeviceId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `pw-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

/** Stable per-browser device id used for attendance binding. */
export function getOrCreateAttendanceDeviceId(): string {
  if (typeof window === 'undefined') return ''
  try {
    const existing = localStorage.getItem(STORAGE_KEY)?.trim()
    if (existing && existing.length >= 8) return existing
    const next = createDeviceId()
    localStorage.setItem(STORAGE_KEY, next)
    return next
  } catch {
    return createDeviceId()
  }
}

export function getAttendanceDeviceInfo(): string | undefined {
  if (typeof navigator === 'undefined') return undefined
  return navigator.userAgent.slice(0, 180)
}
