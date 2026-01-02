import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

// Force dynamic rendering since we use request.headers
export const dynamic = 'force-dynamic'

/**
 * POST /api/permissions/roles/[roleName]/bulk
 * Proxy to backend: POST /api/permissions/roles/{roleName}/bulk
 * Bulk assign permissions to a role (Admin only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { roleName: string } }
) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const roleName = decodeURIComponent(params.roleName)
    const body = await request.json()
    
    const response = await fetch(`${backendUrl}/api/permissions/roles/${encodeURIComponent(roleName)}/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to bulk assign permissions' }))
      return NextResponse.json(
        { error: error.message || 'Unable to bulk assign permissions' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in bulk assign role permissions API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

