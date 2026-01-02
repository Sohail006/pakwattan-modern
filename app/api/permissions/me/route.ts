import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

// Force dynamic rendering since we use request.headers
export const dynamic = 'force-dynamic'

/**
 * GET /api/permissions/me
 * Proxy to backend: GET /api/permissions/me
 * Get current user's permissions
 */
export async function GET(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    const response = await fetch(`${backendUrl}/api/permissions/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch permissions' }))
      return NextResponse.json(
        { error: error.message || 'Unable to load permissions' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in current user permissions API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

