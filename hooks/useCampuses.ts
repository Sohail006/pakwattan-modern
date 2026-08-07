'use client'

import { useCallback, useEffect, useState } from 'react'
import { getCampuses, Campus } from '@/lib/api/campuses'
import {
  getFallbackCampuses,
  normalizeCampusesResponse,
  sortCampusesByPriority,
} from '@/lib/contact-utils'

type CacheEntry = {
  campuses: Campus[]
  usingFallback: boolean
  error: string | null
  at: number
}

const CACHE_TTL_MS = 30_000
const cache = new Map<string, CacheEntry>()
const inflight = new Map<string, Promise<CacheEntry>>()

async function loadCampuses(activeOnly: boolean): Promise<CacheEntry> {
  const key = activeOnly ? 'active' : 'all'
  const cached = cache.get(key)
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached
  }

  const pending = inflight.get(key)
  if (pending) return pending

  const request = (async (): Promise<CacheEntry> => {
    try {
      const raw = await getCampuses(activeOnly)
      const list = sortCampusesByPriority(normalizeCampusesResponse(raw))
      const entry: CacheEntry =
        list.length === 0
          ? {
              campuses: getFallbackCampuses(),
              usingFallback: true,
              error: 'Campus directory is temporarily unavailable. Showing main campus details.',
              at: Date.now(),
            }
          : {
              campuses: list,
              usingFallback: false,
              error: null,
              at: Date.now(),
            }
      cache.set(key, entry)
      return entry
    } catch (err) {
      console.error('[useCampuses] Failed to load campuses:', err)
      const entry: CacheEntry = {
        campuses: getFallbackCampuses(),
        usingFallback: true,
        error:
          err instanceof Error
            ? err.message
            : 'Unable to load campuses. Showing main campus details.',
        at: Date.now(),
      }
      cache.set(key, entry)
      return entry
    } finally {
      inflight.delete(key)
    }
  })()

  inflight.set(key, request)
  return request
}

type UseCampusesResult = {
  campuses: Campus[]
  mainCampus: Campus | null
  loading: boolean
  error: string | null
  usingFallback: boolean
  refetch: () => Promise<void>
}

export function useCampuses(activeOnly = true): UseCampusesResult {
  const key = activeOnly ? 'active' : 'all'
  const [campuses, setCampuses] = useState<Campus[]>(() => cache.get(key)?.campuses ?? [])
  const [loading, setLoading] = useState(() => !cache.get(key))
  const [error, setError] = useState<string | null>(() => cache.get(key)?.error ?? null)
  const [usingFallback, setUsingFallback] = useState(() => cache.get(key)?.usingFallback ?? false)

  const apply = (entry: CacheEntry) => {
    setCampuses(entry.campuses)
    setUsingFallback(entry.usingFallback)
    setError(entry.error)
  }

  const fetchCampuses = useCallback(async (force = false) => {
    if (force) {
      cache.delete(key)
      inflight.delete(key)
    }
    setLoading(true)
    const entry = await loadCampuses(activeOnly)
    apply(entry)
    setLoading(false)
  }, [activeOnly, key])

  useEffect(() => {
    fetchCampuses(false)
  }, [fetchCampuses])

  return {
    campuses,
    mainCampus: campuses[0] ?? null,
    loading,
    error,
    usingFallback,
    refetch: () => fetchCampuses(true),
  }
}
