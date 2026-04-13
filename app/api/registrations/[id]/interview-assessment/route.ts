import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

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
      const error = await response.json().catch(() => ({ message: 'Failed to save interview assessment' }))
      return NextResponse.json(
        { error: error.message || error.error || 'Unable to save interview assessment' },
        { status: response.status }
      )
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
