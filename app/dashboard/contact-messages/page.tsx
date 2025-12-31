'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserRoles, isAuthenticated } from '@/lib/api/auth'
import { Loader2, AlertCircle, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import ContactMessagesTable from '@/components/contact-messages/ContactMessagesTable'

export default function ContactMessagesPage() {
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
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }

      // Check authorization (Admin or Staff can manage contact messages)
      const userRoles = getUserRoles()
      const canManage = userRoles.includes('Admin') || userRoles.includes('Staff')

      if (!canManage) {
        setAuthError('You do not have permission to access this page. Only Administrators and Staff can manage contact messages.')
        setCheckingAuth(false)
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">{authError}</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Contact Messages</h1>
            <p className="text-primary-100 mt-1">Manage and respond to contact form submissions from visitors</p>
          </div>
        </div>
      </div>

      {/* Contact Messages Table */}
      <ContactMessagesTable />
    </div>
  )
}

