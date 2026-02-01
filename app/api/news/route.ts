import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * GET /api/news
 * Proxy to backend: GET /api/news with pagination and filters
 * Get all news items
 */
export async function GET(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { searchParams } = new URL(request.url)
    
    // Build query string from all search params
    const queryString = searchParams.toString()
    const backendUrl_with_query = `${backendUrl}/api/news${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(backendUrl_with_query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch news' }))
      return NextResponse.json(
        { error: error.message || 'Unable to fetch news' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/news
 * Proxy to backend: POST /api/news
 * Create new news item
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const body = await request.json()
    
    const response = await fetch(`${backendUrl}/api/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create news' }))
      return NextResponse.json(
        { error: error.message || 'Unable to create news' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news create API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
