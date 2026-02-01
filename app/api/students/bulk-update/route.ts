import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

export const dynamic = 'force-dynamic'

/**
 * POST /api/students/bulk-update
 * Proxy to backend: POST /api/students/bulk-update
 * Bulk update student records
 */
export async function POST(request: NextRequest) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const body = await request.json()
    
    const response = await fetch(`${backendUrl}/api/students/bulk-update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        message: 'Failed to update students',
        errors: []
      }))
      return NextResponse.json(
        { 
          error: error.message || 'Unable to update students',
          success: error.success || 0,
          failed: error.failed || 0,
          errors: error.errors || []
        },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in bulk update students API route:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        success: 0,
        failed: 0,
        errors: []
      },
      { status: 500 }
    )
  }
}
