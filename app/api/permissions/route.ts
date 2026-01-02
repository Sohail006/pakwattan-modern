import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

// Force dynamic rendering since we use request.headers
export const dynamic = 'force-dynamic'

/**
 * GET /api/permissions
 * Proxy to backend: GET /api/permissions
 * Get all available permissions (Admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isActive = searchParams.get('isActive')
    
    // Build query string
    const queryParams = new URLSearchParams()
    if (category) queryParams.append('category', category)
    if (isActive !== null) queryParams.append('isActive', isActive)
    
    const queryString = queryParams.toString()
    const endpoint = queryString ? `/api/permissions?${queryString}` : '/api/permissions'
    
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
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
    console.error('Error in permissions API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

