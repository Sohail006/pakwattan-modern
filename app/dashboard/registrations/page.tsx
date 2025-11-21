'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import RegistrationsTable from '@/components/registrations/RegistrationsTable'
import { getUserRoles, isAuthenticated } from '@/lib/api/auth'
import { Loader2, AlertCircle, LogIn, FileText, Calendar, Info } from 'lucide-react'
import Link from 'next/link'
import { getActiveAdmissionSetting, deriveRegistrationStatus } from '@/lib/api/admissionSettings'
import { formatDate } from '@/lib/utils'

export default function RegistrationsPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [settingsStatus, setSettingsStatus] = useState<ReturnType<typeof deriveRegistrationStatus> | null>(null)
  const [loadingSettings, setLoadingSettings] = useState(false)

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

      // Check authorization (Admin or Staff can manage registrations)
      const userRoles = getUserRoles()
      const canManage = userRoles.includes('Admin') || userRoles.includes('Staff')
      
      if (!canManage) {
        setAuthError('You do not have permission to access this page. Only Administrators and Staff can manage registrations.')
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

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoadingSettings(true)
        const activeSetting = await getActiveAdmissionSetting()
        setSettingsStatus(deriveRegistrationStatus(activeSetting))
      } catch (err) {
        console.error('Unable to load active admission setting', err)
        setSettingsStatus(null)
      } finally {
        setLoadingSettings(false)
      }
    }

    if (!checkingAuth && !authError) {
      loadSettings()
    }
  }, [checkingAuth, authError])

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

  // All checks passed, show the registrations management page
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Registrations</h1>
            <p className="text-gray-600">
              View and manage all student registrations. You can search, filter, export to Excel, and print roll number slips.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Calendar className="w-5 h-5 text-primary-600 mt-1 mr-3" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Registration window</h2>
              {loadingSettings ? (
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Checking admission settings...
                </div>
              ) : settingsStatus ? (
                <>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      settingsStatus.isOpen ? 'text-green-700' : 'text-amber-700'
                    }`}
                  >
                    {settingsStatus.message}
                  </p>
                  {settingsStatus.window?.start && settingsStatus.window?.end && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(settingsStatus.window.start)} — {formatDate(settingsStatus.window.end)}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-1 text-sm text-amber-700">
                  Admission settings have not been configured yet.
                </p>
              )}
            </div>
          </div>

          {settingsStatus && !settingsStatus.isOpen && (
            <div className="flex items-start p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-sm">
              <Info className="w-5 h-5 text-amber-600 mt-1 mr-3" />
              <div>
                <h2 className="text-sm font-semibold text-amber-900">Registrations closed</h2>
                <p className="mt-1 text-sm text-amber-800">
                  New registrations are currently disabled. You can still view existing applications below.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Registrations Table */}
      <RegistrationsTable />
    </div>
  )
}

