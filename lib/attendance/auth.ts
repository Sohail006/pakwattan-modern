import { normalizeRoleName } from '@/lib/roles'
import type { AttendanceActor } from './types'

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const part = token.split('.')[1]
    if (!part) return null
    const json =
      typeof atob === 'function'
        ? atob(part.replace(/-/g, '+').replace(/_/g, '/'))
        : Buffer.from(part, 'base64url').toString('utf8')
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

function extractRoles(payload: Record<string, unknown>): string[] {
  const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
  const roles: string[] = []
  const push = (v: unknown) => {
    if (typeof v === 'string' && v && !roles.includes(v)) roles.push(v)
    if (Array.isArray(v)) v.forEach(push)
  }
  push(payload.roles)
  push(payload.role)
  push(payload[roleClaim])
  for (const [key, value] of Object.entries(payload)) {
    if (key === roleClaim || key.endsWith('/role')) push(value)
  }
  return roles
}

function extractId(payload: Record<string, unknown>): string | null {
  const candidates = [
    payload.sub,
    payload.nameid,
    payload[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ],
    payload.uid,
    payload.userId,
    payload.id,
  ]
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim()
    if (typeof c === 'number') return String(c)
  }
  return null
}

/**
 * Resolve actor from Authorization Bearer JWT.
 * Optional trusted profile headers (from login user_info) fill gaps when JWT
 * claims omit name/roles, and supply the same user id used when assigning staff.
 */
export function getActorFromRequest(req: Request): AttendanceActor | null {
  const header = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!header?.startsWith('Bearer ')) return null
  const token = header.slice(7).trim()
  if (!token) return null
  const payload = decodeJwtPayload(token)
  if (!payload) return null

  const headerId = req.headers.get('x-pw-user-id')?.trim() || undefined
  const jwtId = extractId(payload)
  // Prefer login user_info id (matches Users API assignment) when both exist and differ —
  // Identity tokens sometimes use a different claim than /api/users id.
  const id = headerId || jwtId
  if (!id) return null

  let roles = extractRoles(payload)
  const headerRolesRaw = req.headers.get('x-pw-user-roles')
  if ((!roles.length || headerId) && headerRolesRaw) {
    try {
      const parsed = JSON.parse(headerRolesRaw) as unknown
      if (Array.isArray(parsed)) {
        roles = parsed.filter((r): r is string => typeof r === 'string')
      }
    } catch {
      // ignore
    }
  }

  const email =
    req.headers.get('x-pw-user-email')?.trim() ||
    (typeof payload.email === 'string' && payload.email) ||
    (typeof payload[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    ] === 'string'
      ? (payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ] as string)
      : undefined)

  const headerName = req.headers.get('x-pw-user-name')?.trim() || undefined
  const given =
    (typeof payload.given_name === 'string' && payload.given_name) ||
    (typeof payload.firstName === 'string' && payload.firstName) ||
    undefined
  const family =
    (typeof payload.family_name === 'string' && payload.family_name) ||
    (typeof payload.lastName === 'string' && payload.lastName) ||
    undefined
  const nameClaim =
    typeof payload[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
    ] === 'string'
      ? (payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ] as string)
      : typeof payload.name === 'string'
        ? payload.name
        : undefined

  const displayName =
    headerName ||
    [given, family].filter(Boolean).join(' ').trim() ||
    nameClaim ||
    email ||
    'Staff Member'

  const isAdmin = roles.some((r) => {
    const n = normalizeRoleName(r)
    return n === 'admin' || n === 'managerialstaff' || n === 'staff'
  })

  return {
    id,
    email,
    firstName: given,
    lastName: family,
    roles,
    displayName,
    isAdmin,
  }
}

export function requireActor(req: Request): AttendanceActor {
  const actor = getActorFromRequest(req)
  if (!actor) {
    const err = new Error('Please sign in to continue.') as Error & { status: number }
    err.status = 401
    throw err
  }
  return actor
}

export function requireAdmin(actor: AttendanceActor): void {
  if (!actor.isAdmin) {
    const err = new Error('You do not have permission for this action.') as Error & {
      status: number
    }
    err.status = 403
    throw err
  }
}
