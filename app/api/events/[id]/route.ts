import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

interface Params {
  id: string
}

/**
 * GET /api/events/[id]
 * Proxy to backend: GET /api/events/{id}
 * Get specific event by ID
 */
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { id } = params
    
    const response = await fetch(`${backendUrl}/api/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to fetch event' }))
      return NextResponse.json(
        { error: error.message || 'Unable to fetch event' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in events get API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/events/[id]
 * Proxy to backend: PUT /api/events/{id}
 * Update event
 */
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { id } = params
    const body = await request.json()
    
    const response = await fetch(`${backendUrl}/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update event' }))
      return NextResponse.json(
        { error: error.message || 'Unable to update event' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in events update API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/events/[id]
 * Proxy to backend: DELETE /api/events/{id}
 * Delete event
 */
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { id } = params
    
    const response = await fetch(`${backendUrl}/api/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete event' }))
      return NextResponse.json(
        { error: error.message || 'Unable to delete event' },
        { status: response.status }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in events delete API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
