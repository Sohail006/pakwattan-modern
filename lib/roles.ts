/**
 * Server JWT / Identity may use different spellings than the app menu (e.g. "Administrator" vs "Admin").
 */

export function normalizeRoleName(role: string): string {
  const r = role.toLowerCase().trim().replace(/\s+/g, '')
  if (r === 'administrator' || r === 'superadmin') return 'admin'
  return r
}

/** True if the user's roles include this menu/API role name (after normalization). */
export function userHasMenuRole(userRoles: string[], menuRole: string): boolean {
  const m = normalizeRoleName(menuRole)
  return userRoles.some((ur) => normalizeRoleName(ur) === m)
}

export function userHasAnyNormalizedRole(userRoles: string[], ...canonical: string[]): boolean {
  const set = new Set(userRoles.map(normalizeRoleName))
  return canonical.some((c) => set.has(c.toLowerCase()))
}

export function pickDashboardPath(userRoles: string[]): string {
  const n = userRoles.map(normalizeRoleName)
  if (n.includes('admin')) return '/dashboard/admin'
  if (n.includes('staff') || n.includes('managerialstaff')) return '/dashboard/staff'
  if (n.includes('teacher')) return '/dashboard/teacher'
  if (n.includes('student')) return '/dashboard/student'
  if (n.includes('parent')) return '/dashboard/parent'
  return '/dashboard/admin'
}
