'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import StudentsManagement from '@/components/students/StudentsManagement'
import { getUserRoles, isAuthenticated } from '@/lib/api/auth'
import { Loader2, AlertCircle, LogIn } from 'lucide-react'
import Link from 'next/link'

export default function StudentsPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      setCheckingAuth(true)
      
      // Check authentication
      if (!isAuthenticated()) {
        setAuthError('You must be logged in to access this page.')
        setCheckingAuth(false)
        // Redirect after showing message
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }

      // Check authorization (Admin or Staff can manage students)
      const userRoles = getUserRoles()
      const canManage = userRoles.includes('Admin') || userRoles.includes('Staff')
      
      if (!canManage) {
        setAuthError('You do not have permission to access this page. Only Administrators and Staff can manage students.')
        setCheckingAuth(false)
        // Redirect after showing message
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
        return
      }

      // All checks passed
      setCheckingAuth(false)
      setAuthError(null)
    }

    checkAuth()
  }, [router])

  // Show loading state while checking
  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Show error message if authentication/authorization failed
  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{authError}</p>
          <div className="flex flex-col space-y-2">
            {authError.includes('logged in') ? (
              <Link
                href="/login"
                className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Go to Login</span>
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span>Go to Dashboard</span>
              </Link>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {authError.includes('logged in') ? 'Redirecting in 2 seconds...' : 'Redirecting in 3 seconds...'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // All checks passed, show the students management page
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentsManagement />
    </div>
  )
}

