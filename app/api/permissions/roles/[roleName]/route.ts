import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

// Force dynamic rendering since we use request.headers
export const dynamic = 'force-dynamic'

/**
 * GET /api/permissions/roles/[roleName]
 * Proxy to backend: GET /api/permissions/roles/{roleName}
 * Get permissions for a specific role (Admin only)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { roleName: string } }
) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const roleName = decodeURIComponent(params.roleName)
    
    const response = await fetch(`${backendUrl}/api/permissions/roles/${encodeURIComponent(roleName)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch role permissions' }))
      return NextResponse.json(
        { error: error.message || 'Unable to load role permissions' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in role permissions API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/permissions/roles/[roleName]
 * Proxy to backend: POST /api/permissions/roles/{roleName}
 * Assign permission to a role (Admin only)
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
    
    const response = await fetch(`${backendUrl}/api/permissions/roles/${encodeURIComponent(roleName)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to assign permission' }))
      return NextResponse.json(
        { error: error.message || 'Unable to assign permission to role' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in assign role permission API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

