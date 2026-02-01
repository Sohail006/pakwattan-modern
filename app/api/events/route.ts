import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * GET /api/events
 * Proxy to backend: GET /api/events with pagination and filters
 * Get all events
 */
export async function GET(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { searchParams } = new URL(request.url)
    
    // Build query string from all search params
    const queryString = searchParams.toString()
    const backendUrl_with_query = `${backendUrl}/api/events${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(backendUrl_with_query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch events' }))
      return NextResponse.json(
        { error: error.message || 'Unable to fetch events' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in events API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/events
 * Proxy to backend: POST /api/events
 * Create new event
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const body = await request.json()
    
    const response = await fetch(`${backendUrl}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create event' }))
      return NextResponse.json(
        { error: error.message || 'Unable to create event' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in events create API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
