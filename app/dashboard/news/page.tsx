'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserRoles, isAuthenticated } from '@/lib/api/auth'
import { News } from '@/lib/api/news'
import { Plus, Loader2, AlertCircle, Newspaper, CheckCircle } from 'lucide-react'
import NewsTable from '@/components/news/NewsTable'
import NewsForm from '@/components/news/NewsForm'

export default function NewsPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
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

        const roles = getUserRoles()
        const hasAccess = roles.some(role => 
          role.toLowerCase() === 'admin' || 
          role.toLowerCase() === 'staff' ||
          role.toLowerCase() === 'managerialstaff'
        )

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
    setEditingNews(null)
    setIsFormOpen(true)
  }

  const handleEdit = (news: News) => {
    setEditingNews(news)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingNews(null)
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
    <div className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <Newspaper className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
              <p className="text-sm text-gray-500 mt-1">Manage news items and announcements</p>
            </div>
          </div>
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add News</span>
          </button>
        </div>
      </div>

      {/* News Table */}
      <NewsTable 
        key={refreshKey}
        onEdit={handleEdit}
        onRefresh={handleRefresh}
      />

      {/* News Form Modal */}
      {isFormOpen && (
        <NewsForm
          news={editingNews}
          mode={editingNews ? 'edit' : 'create'}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  )
}

