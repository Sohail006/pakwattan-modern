import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

// Force dynamic rendering since we use request.headers
export const dynamic = 'force-dynamic'

/**
 * GET /api/permissions/[id]
 * Proxy to backend: GET /api/permissions/{id}
 * Get permission by ID (Admin only)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const permissionId = params.id
    
    const response = await fetch(`${backendUrl}/api/permissions/${permissionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch permission' }))
      return NextResponse.json(
        { error: error.message || 'Permission not found' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in permission API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

