import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

function buildErrorResponse(
  status: number,
  statusText: string,
  raw: string
) {
  let parsed: { message?: string; error?: string; detail?: string } | null = null
  try {
    parsed = raw ? JSON.parse(raw) : null
  } catch {
    parsed = null
  }

  const errorMessage =
    parsed?.message ||
    parsed?.error ||
    parsed?.detail ||
    (raw && raw.trim()) ||
    `Backend request failed (${status} ${statusText})`

  return NextResponse.json(
    { error: errorMessage },
    { status }
  )
}

/**
 * GET /api/registrations/[id]/interview-assessment
 * Proxy to backend: GET /api/registrations/{id}
 * Returns registration record (including interview fields).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const resolvedParams = await Promise.resolve(params)
    const registrationId = resolvedParams.id

    const response = await fetch(`${backendUrl}/api/registrations/${registrationId}`, {
      method: 'GET',
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
    })

    if (!response.ok) {
      const raw = await response.text()
      return buildErrorResponse(response.status, response.statusText, raw)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in interview assessment API route (GET):', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/registrations/[id]/interview-assessment
 * Proxy to backend: PUT /api/registrations/{id}
 * Saves interview assessment fields on registration.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const resolvedParams = await Promise.resolve(params)
    const registrationId = resolvedParams.id
    const body = await request.json()

    const rawMarks = body?.testMarks
    const rawRemarks = body?.interviewRemarks
    const testMarks = typeof rawMarks === 'number' ? rawMarks : Number(rawMarks)
    const interviewRemarks = typeof rawRemarks === 'string' ? rawRemarks.trim() : ''

    if (Number.isNaN(testMarks)) {
      return NextResponse.json(
        { error: 'Test marks are required.' },
        { status: 400 }
      )
    }

    if (!interviewRemarks) {
      return NextResponse.json(
        { error: 'Interview remarks are required.' },
        { status: 400 }
      )
    }

    const response = await fetch(`${backendUrl}/api/registrations/${registrationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify({
        testMarks,
        interviewRemarks,
      }),
    })

    if (!response.ok) {
      const raw = await response.text()
      return buildErrorResponse(response.status, response.statusText, raw)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in interview assessment API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
