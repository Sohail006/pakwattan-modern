'use client'

import { useEffect, useState } from 'react'
import { getMyAttendanceToday } from '@/lib/api/attendance'

type EnrollmentState = {
  loading: boolean
  enrolled: boolean
  /** True when /me failed (network/API) — not the same as unassigned */
  error: boolean
}

type CacheEntry = {
  enrolled: boolean
  at: number
}

const CACHE_TTL_MS = 60_000
let memoryCache: CacheEntry | null = null
let inflight: Promise<boolean> | null = null

async function fetchAssigned(): Promise<boolean> {
  if (memoryCache && Date.now() - memoryCache.at < CACHE_TTL_MS) {
    return memoryCache.enrolled
  }
  if (!inflight) {
    inflight = getMyAttendanceToday()
      .then((me) => {
        const enrolled = Boolean(me?.assigned)
        memoryCache = { enrolled, at: Date.now() }
        return enrolled
      })
      .finally(() => {
        inflight = null
      })
  }
  return inflight
}

/** Invalidate after admin roster changes (optional). */
export function invalidateAttendanceEnrollmentCache() {
  memoryCache = null
}

/**
 * True when the signed-in user has an Active staff-attendance assignment.
 * Shares one in-flight /me request across Sidebar, Header, and dashboards.
 */
export function useAttendanceEnrollment(): EnrollmentState {
  const [loading, setLoading] = useState(!memoryCache)
  const [enrolled, setEnrolled] = useState(memoryCache?.enrolled ?? false)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const value = await fetchAssigned()
        if (!cancelled) {
          setEnrolled(value)
          setError(false)
        }
      } catch {
        if (!cancelled) {
          setError(true)
          // Keep last known enrolled if we had a cache; otherwise false
          if (!memoryCache) setEnrolled(false)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return { loading, enrolled, error }
}
