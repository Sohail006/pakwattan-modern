import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

const jsonHeaders = (authHeader: string | null) =>
  ({
    'Content-Type': 'application/json',
    ...(authHeader && { Authorization: authHeader }),
  }) as Record<string, string>

const authOnlyHeaders = (authHeader: string | null) =>
  ({
    ...(authHeader && { Authorization: authHeader }),
  }) as Record<string, string>

/**
 * Proxies GET to the backend. Tries GET /api/registrations/{id}, then
 * GET /api/registrations/{id}/interview-assessment if the first returns 404/405.
 */
async function fetchRegistrationGetFromBackend(
  backendUrl: string,
  registrationId: string,
  authHeader: string | null
): Promise<Response> {
  const urls = [
    `${backendUrl}/api/registrations/${registrationId}`,
    `${backendUrl}/api/registrations/${registrationId}/interview-assessment`,
  ]

  let lastResponse: Response | null = null
  for (const url of urls) {
    const response = await fetch(url, {
      method: 'GET',
      headers: authOnlyHeaders(authHeader),
    })
    lastResponse = response
    if (response.ok) return response
    if (response.status === 401 || response.status === 403) return response
    if (response.status === 404 || response.status === 405) continue
    return response
  }
  return lastResponse!
}

/**
 * Saves interview assessment on the backend. Matches verify-receipt style (POST on sub-path)
 * and supports multiple API shapes across deployments:
 * POST /api/registrations/{id}/interview-assessment
 * PUT  /api/registrations/{id}/interview-assessment
 * PUT  /api/registrations/{id}
 */
async function saveInterviewAssessmentToBackend(
  backendUrl: string,
  registrationId: string,
  authHeader: string | null,
  body: string
): Promise<Response> {
  const attempts: { url: string; method: 'POST' | 'PUT' }[] = [
    {
      url: `${backendUrl}/api/registrations/${registrationId}/interview-assessment`,
      method: 'POST',
    },
    {
      url: `${backendUrl}/api/registrations/${registrationId}/interview-assessment`,
      method: 'PUT',
    },
    {
      url: `${backendUrl}/api/registrations/${registrationId}`,
      method: 'PUT',
    },
  ]

  let lastResponse: Response | null = null
  for (const { url, method } of attempts) {
    const response = await fetch(url, {
      method,
      headers: jsonHeaders(authHeader),
      body,
    })
    lastResponse = response
    if (response.ok) return response
    if (response.status === 401 || response.status === 403) return response
    if (response.status === 404 || response.status === 405) continue
    return response
  }
  return lastResponse!
}

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

    const response = await fetchRegistrationGetFromBackend(
      backendUrl,
      registrationId,
      authHeader
    )

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
 * Proxies to backend using POST or PUT on the interview-assessment sub-path or PUT on the registration (see saveInterviewAssessmentToBackend).
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

    const response = await saveInterviewAssessmentToBackend(
      backendUrl,
      registrationId,
      authHeader,
      JSON.stringify({
        testMarks,
        interviewRemarks,
      })
    )

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
