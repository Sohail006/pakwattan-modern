import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * POST /api/news/bulk-update
 * Proxy to backend: POST /api/news/bulk-update
 * Bulk update news items (publish/unpublish, category, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const body = await request.json()
    
    const response = await fetch(`${backendUrl}/api/news/bulk-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update news items' }))
      return NextResponse.json(
        { error: error.message || 'Unable to update news items' },
        { status: response.status }
      )
    }
    
    // Return empty response for successful update
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in bulk update news API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

