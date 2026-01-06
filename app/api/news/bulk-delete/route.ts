import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * POST /api/news/bulk-delete
 * Proxy to backend: POST /api/news/bulk-delete
 * Bulk delete news items
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const body = await request.json()
    
    const response = await fetch(`${backendUrl}/api/news/bulk-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete news items' }))
      return NextResponse.json(
        { error: error.message || 'Unable to delete news items' },
        { status: response.status }
      )
    }
    
    // Return empty response for successful delete
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in bulk delete news API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

