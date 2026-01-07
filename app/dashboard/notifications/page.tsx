'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/api/auth'
import { Bell, Loader2, AlertCircle } from 'lucide-react'
import NotificationCenter from '@/components/notifications/NotificationCenter'

export default function NotificationsPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      try {
        if (!isAuthenticated()) {
          router.push('/login')
          return
        }
      } catch {
        setAuthError('Unable to verify authentication. Please try again.')
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
          </div>
          <p className="text-gray-600 mb-6">{authError}</p>
          <button
            onClick={() => router.push('/dashboard/admin')}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary-600" />
            Notifications
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage your notifications
          </p>
        </div>
      </div>

      <NotificationCenter />
    </div>
  )
}

