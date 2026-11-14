import { NextResponse } from 'next/server'

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ success: true, data }, init)
}

export function jsonError(error: unknown) {
  const err = error as Error & { status?: number }
  const status = typeof err.status === 'number' ? err.status : 500
  const message = err.message || 'Something went wrong.'
  return NextResponse.json({ success: false, error: message }, { status })
}
