'use client'

import { useState, useEffect, useCallback } from 'react'
import { Edit, Trash2, Loader2, Search, X, Filter, Calendar, Image as ImageIcon } from 'lucide-react'
import { News, getNews, deleteNews, PaginatedNewsParams } from '@/lib/api/news'
import { formatDate } from '@/lib/utils'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import Image from 'next/image'
import { getApiBaseUrl } from '@/lib/config'

interface NewsTableProps {
  onEdit?: (news: News) => void
  onRefresh: () => void
}

const NEWS_CATEGORIES = [
  'General',
  'Admissions',
  'Exams',
  'Events',
  'Achievements',
  'Announcements',
  'Sports',
  'Academic',
  'Competition',
  'Ceremony',
  'Test'
]

export default function NewsTable({ onEdit, onRefresh }: NewsTableProps) {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Pagination state
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [publishedFilter, setPublishedFilter] = useState<string>('all') // 'all', 'published', 'draft'
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean
    newsId: number | null
    newsTitle: string
  }>({
    isOpen: false,
    newsId: null,
    newsTitle: ''
  })

  // Load news
  const loadNews = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: PaginatedNewsParams = {
        page,
        pageSize,
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
        isPublished: publishedFilter === 'all' ? undefined : publishedFilter === 'published',
        sortBy: 'date',
        sortOrder: 'desc'
      }
      
      const response = await getNews(params)
      setNews(response.data)
      setTotalCount(response.totalCount)
      setTotalPages(response.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load news. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, searchTerm, selectedCategory, publishedFilter])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  const handleDelete = async (newsId: number) => {
    try {
      await deleteNews(newsId)
      setDeleteConfirm({ isOpen: false, newsId: null, newsTitle: '' })
      loadNews()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete news item.')
    }
  }

  const getImageUrl = (imageUrl: string | null | undefined): string | null => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    const apiBase = getApiBaseUrl()
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
    return `${apiBase}${path}`
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setPage(1)
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 active:text-gray-700 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setPage(1)
              }}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-h-[44px]"
            >
              <option value="">All Categories</option>
              {NEWS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Published Filter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <select
              value={publishedFilter}
              onChange={(e) => {
                setPublishedFilter(e.target.value)
                setPage(1)
              }}
              className="w-full px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start sm:items-center space-x-2 sm:space-x-3">
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs sm:text-sm text-red-700 flex-1 break-words">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700 active:text-red-800 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-8 sm:py-12">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary-600" />
        </div>
      ) : news.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
          <p className="text-sm sm:text-base text-gray-500 break-words">No news items found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto -mx-4 sm:mx-0 mobile-scroll">
            <div className="min-w-[800px] sm:min-w-0">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider touch-target">
                      Image
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider touch-target">
                      Title
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider touch-target">
                      Category
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider touch-target">
                      Date
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider touch-target">
                      Status
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider touch-target">
                      Flags
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider touch-target">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {news.map((item) => {
                    const imageUrl = getImageUrl(item.imageUrl)
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 active:bg-gray-100 transition-colors">
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          {imageUrl ? (
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 relative rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 48px, (max-width: 1024px) 56px, 64px"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{item.title}</div>
                          <div className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1 break-words">
                            {item.description}
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800 truncate">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center text-xs sm:text-sm text-gray-500">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{formatDate(item.date)}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        {item.isPublished ? (
                          <span className="px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1 flex-wrap gap-1">
                          {item.isFeatured && (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 truncate">
                              Featured
                            </span>
                          )}
                          {item.isInMarquee && (
                            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 truncate">
                              Marquee
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                          <button
                            onClick={() => onEdit?.(item)}
                            className="text-primary-600 hover:text-primary-900 active:text-primary-800 p-1.5 sm:p-2 rounded-lg hover:bg-primary-50 active:bg-primary-100 transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                            title="Edit"
                            aria-label="Edit news item"
                          >
                            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({
                              isOpen: true,
                              newsId: item.id,
                              newsTitle: item.title
                            })}
                            className="text-red-600 hover:text-red-900 active:text-red-800 p-1.5 sm:p-2 rounded-lg hover:bg-red-50 active:bg-red-100 transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                            title="Delete"
                            aria-label="Delete news item"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left break-words">
                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalCount)} of {totalCount} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target min-h-[44px] text-xs sm:text-sm"
                  aria-label="Previous page"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                <span className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target min-h-[44px] text-xs sm:text-sm"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirm.isOpen}
        type="danger"
        title="Delete News Item"
        message={`Are you sure you want to delete "${deleteConfirm.newsTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => deleteConfirm.newsId && handleDelete(deleteConfirm.newsId)}
        onClose={() => setDeleteConfirm({ isOpen: false, newsId: null, newsTitle: '' })}
      />
    </div>
  )
}

