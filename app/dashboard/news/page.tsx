'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated, canPerform } from '@/lib/api/auth'
import { PERMISSIONS } from '@/lib/types/permissions'
import { News, unmarkLegacyMarqueeNews } from '@/lib/api/news'
import { Plus, Loader2, AlertCircle, Newspaper, CheckCircle, Megaphone } from 'lucide-react'
import NewsTable from '@/components/news/NewsTable'
import NewsForm from '@/components/news/NewsForm'

export default function NewsPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<News | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [success, setSuccess] = useState<string | null>(null)
  const [clearingLegacy, setClearingLegacy] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated()) {
          router.push('/login')
          return
        }

        const hasAccess = canPerform(PERMISSIONS.NEWS_VIEW, ['Admin', 'Staff', 'ManagerialStaff'])

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
      setTimeout(() => setSuccess(null), 3500)
    }
    setRefreshKey((prev) => prev + 1)
    handleFormClose()
  }

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleClearLegacyMarquee = async () => {
    if (
      !confirm(
        'Remove old static ticker items (e.g. Umama Hafeez Marks) from the homepage marquee? News records stay; only the Marquee flag is turned off.'
      )
    ) {
      return
    }

    setClearingLegacy(true)
    setActionError(null)
    try {
      const result = await unmarkLegacyMarqueeNews()
      setSuccess(result.message)
      setTimeout(() => setSuccess(null), 5000)
      setRefreshKey((prev) => prev + 1)
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Failed to clear legacy marquee items.')
      setTimeout(() => setActionError(null), 5000)
    } finally {
      setClearingLegacy(false)
    }
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" aria-hidden />
        <span className="sr-only">Loading news management</span>
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <AlertCircle className="h-7 w-7 text-red-500" aria-hidden />
            <h2 className="text-xl font-bold text-secondary-900">Access Denied</h2>
          </div>
          <p className="mb-6 text-secondary-600">{authError}</p>
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin')}
            className="w-full min-h-[44px] rounded-xl bg-primary-700 px-4 py-2.5 font-semibold text-white hover:bg-primary-600"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const canCreate = canPerform(PERMISSIONS.NEWS_CREATE, ['Admin', 'Staff', 'ManagerialStaff'])
  const canUpdate = canPerform(PERMISSIONS.NEWS_UPDATE, ['Admin', 'Staff', 'ManagerialStaff'])

  return (
    <div className="space-y-5 sm:space-y-6 pb-8">
      {success && (
        <div
          className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3"
          role="status"
        >
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden />
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {actionError && (
        <div
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden />
          <p className="text-sm text-red-800">{actionError}</p>
        </div>
      )}

      <header className="overflow-hidden rounded-2xl border border-secondary-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
              <Newspaper className="h-6 w-6" aria-hidden />
            </div>
            <div>
              <h1 className="font-josefin text-2xl font-bold text-secondary-900 sm:text-3xl">
                News Management
              </h1>
              <p className="mt-1 text-sm text-secondary-600">
                Manage news items and announcements — filter by Published, Featured, and Top Marquee.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {canUpdate && (
              <button
                type="button"
                onClick={handleClearLegacyMarquee}
                disabled={clearingLegacy}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-900 hover:bg-amber-100 disabled:opacity-60"
              >
                {clearingLegacy ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Megaphone className="h-4 w-4" aria-hidden />
                )}
                Clear old static ticker
              </button>
            )}
            {canCreate && (
              <button
                type="button"
                onClick={handleAddNew}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 py-2.5 font-semibold text-white hover:bg-primary-600"
              >
                <Plus className="h-5 w-5" aria-hidden />
                Add News
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-secondary-100 bg-primary-50/60 px-5 py-3 sm:px-6">
          <p className="flex items-start gap-2 text-xs sm:text-sm text-primary-900">
            <Megaphone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              <strong>Marquee tip:</strong> Only news with <em>Show in Top Marquee</em> checked (and
              Published) appear in the yellow homepage ticker. If you still see old seeded items
              (e.g. Umama Hafeez Marks), use <em>Clear old static ticker</em> once after deploying the API.
            </span>
          </p>
        </div>
      </header>

      <NewsTable
        key={refreshKey}
        onEdit={canUpdate ? handleEdit : undefined}
        onRefresh={handleRefresh}
      />

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
