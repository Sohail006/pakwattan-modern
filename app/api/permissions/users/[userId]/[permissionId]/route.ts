import { NextRequest, NextResponse } from 'next/server'
import { getApiBaseUrl } from '@/lib/config'

// Force dynamic rendering since we use request.headers
export const dynamic = 'force-dynamic'

/**
 * DELETE /api/permissions/users/[userId]/[permissionId]
 * Proxy to backend: DELETE /api/permissions/users/{userId}/{permissionId}
 * Remove user permission override (Admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; permissionId: string } }
) {
  try {
    const backendUrl = getApiBaseUrl()
    const authHeader = request.headers.get('authorization')
    const { userId, permissionId } = params
    
    const response = await fetch(`${backendUrl}/api/permissions/users/${userId}/${permissionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to remove permission' }))
      return NextResponse.json(
        { error: error.message || 'Unable to remove user permission' },
        { status: response.status }
      )
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in remove user permission API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

