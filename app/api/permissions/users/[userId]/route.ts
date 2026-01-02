import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

// Force dynamic rendering since we use request.headers
export const dynamic = 'force-dynamic'

/**
 * GET /api/permissions/users/[userId]
 * Proxy to backend: GET /api/permissions/users/{userId}
 * Get permissions for a specific user (Admin only)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const userId = params.userId
    
    const response = await fetch(`${backendUrl}/api/permissions/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch user permissions' }))
      return NextResponse.json(
        { error: error.message || 'Unable to load user permissions' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in user permissions API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/permissions/users/[userId]
 * Proxy to backend: POST /api/permissions/users/{userId}
 * Assign permission to a user (Admin only)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const userId = params.userId
    const body = await request.json()
    
    const response = await fetch(`${backendUrl}/api/permissions/users/${userId}`, {
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
        { error: error.message || 'Unable to assign permission to user' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in assign user permission API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

