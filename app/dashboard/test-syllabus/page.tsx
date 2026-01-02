'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { TestSyllabus } from '@/lib/api/testSyllabus'
import { Plus, Loader2, AlertCircle, FileText, CheckCircle } from 'lucide-react'
import TestSyllabusTable from '@/components/test-syllabus/TestSyllabusTable'
import TestSyllabusForm from '@/components/test-syllabus/TestSyllabusForm'

export default function TestSyllabusPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingSyllabus, setEditingSyllabus] = useState<TestSyllabus | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [success, setSuccess] = useState<string | null>(null)

  // Check authentication and authorization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated()) {
          router.push('/login')
          return
        }

        // Permission-based check (with role fallback for backward compatibility)
        const hasAccess = canPerform(PERMISSIONS.TEST_SYLLABUS_VIEW, ['Admin', 'Staff', 'ManagerialStaff'])

        if (!hasAccess) {
          setAuthError('You do not have permission to access this page.')
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

  const handleAddNew = () => {
    setEditingSyllabus(null)
    setIsFormOpen(true)
  }

  const handleEdit = (syllabus: TestSyllabus) => {
    setEditingSyllabus(syllabus)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingSyllabus(null)
  }

  const handleFormSuccess = (message?: string) => {
    if (message) {
      setSuccess(message)
      setTimeout(() => setSuccess(null), 3000)
    }
    setRefreshKey(prev => prev + 1)
    handleFormClose()
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary-600" />
            Test Syllabus Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage entry test and scholarship test syllabi for all grades
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add New Syllabus
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Table */}
      <TestSyllabusTable
        key={refreshKey}
        onEdit={handleEdit}
        onRefresh={handleRefresh}
      />

      {/* Form Modal */}
      <TestSyllabusForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        editingSyllabus={editingSyllabus}
      />
    </div>
  )
}

