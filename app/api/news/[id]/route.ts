import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

interface Params {
  id: string
}

/**
 * GET /api/news/[id]
 * Proxy to backend: GET /api/news/{id}
 * Get specific news item by ID
 */
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { id } = params
    
    const response = await fetch(`${backendUrl}/api/news/${id}`, {
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
    console.error('Error in news get API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/news/[id]
 * Proxy to backend: PUT /api/news/{id}
 * Update news item
 */
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { id } = params
    const body = await request.json()
    
    const response = await fetch(`${backendUrl}/api/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update news' }))
      return NextResponse.json(
        { error: error.message || 'Unable to update news' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in news update API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/news/[id]
 * Proxy to backend: DELETE /api/news/{id}
 * Delete news item
 */
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { id } = params
    
    const response = await fetch(`${backendUrl}/api/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete news' }))
      return NextResponse.json(
        { error: error.message || 'Unable to delete news' },
        { status: response.status }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in news delete API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
