import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * POST /api/registrations/[id]/verify-receipt
 * Proxy to backend: POST /api/registrations/{id}/verify-receipt
 * Verify or reject a receipt (Admin only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    // Handle both Promise and direct params (Next.js 13+ vs older versions)
    const resolvedParams = await Promise.resolve(params)
    const registrationId = resolvedParams.id
    
    const body = await request.json()
    const { verificationStatus, verificationNotes } = body
    
    // Validate request body
    if (!verificationStatus || !['Verified', 'Rejected'].includes(verificationStatus)) {
      return NextResponse.json(
        { error: 'Invalid verification status. Must be "Verified" or "Rejected".' },
        { status: 400 }
      )
    }
    
    const response = await fetch(`${backendUrl}/api/registrations/${registrationId}/verify-receipt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify({
        verificationStatus,
        verificationNotes: verificationNotes || null,
      }),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to verify receipt' }))
      return NextResponse.json(
        { error: error.message || 'Unable to verify receipt' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in receipt verification API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
