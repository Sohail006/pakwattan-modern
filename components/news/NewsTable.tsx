'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Edit, Trash2, Loader2, Search, X, Filter, Calendar, Image as ImageIcon, CheckSquare, Square, Trash, Eye, EyeOff, Megaphone } from 'lucide-react'
import { News, getNews, deleteNews, bulkDeleteNews, bulkUpdateNews, updateNews, PaginatedNewsParams } from '@/lib/api/news'
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [publishedFilter, setPublishedFilter] = useState<string>('all') // 'all', 'published', 'draft'
  const [marqueeFilter, setMarqueeFilter] = useState<string>('all') // 'all', 'marquee', 'not-marquee'
  const [togglingId, setTogglingId] = useState<number | null>(null)
  
  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [bulkLoading, setBulkLoading] = useState(false)
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean
    newsId: number | null
    newsTitle: string
    isBulk: boolean
  }>({
    isOpen: false,
    newsId: null,
    newsTitle: '',
    isBulk: false
  })
  
  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setPage(1) // Reset to first page when search changes
    }, 500) // 500ms debounce delay

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Load news
  const loadNews = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: PaginatedNewsParams = {
        page,
        pageSize,
        search: debouncedSearchTerm || undefined,
        category: selectedCategory || undefined,
        isPublished: publishedFilter === 'all' ? undefined : publishedFilter === 'published',
        isInMarquee: marqueeFilter === 'all' ? undefined : marqueeFilter === 'marquee',
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
  }, [page, pageSize, debouncedSearchTerm, selectedCategory, publishedFilter, marqueeFilter])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  const handleDelete = async (newsId: number) => {
    try {
      await deleteNews(newsId)
      setDeleteConfirm({ isOpen: false, newsId: null, newsTitle: '', isBulk: false })
      setSelectedIds(new Set())
      loadNews()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete news item.')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return
    
    try {
      setBulkLoading(true)
      await bulkDeleteNews(Array.from(selectedIds))
      setDeleteConfirm({ isOpen: false, newsId: null, newsTitle: '', isBulk: false })
      setSelectedIds(new Set())
      loadNews()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete news items.')
    } finally {
      setBulkLoading(false)
    }
  }

  const handleBulkPublish = async (publish: boolean) => {
    if (selectedIds.size === 0) return
    
    try {
      setBulkLoading(true)
      await bulkUpdateNews(Array.from(selectedIds), { isPublished: publish })
      setSelectedIds(new Set())
      loadNews()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : `Unable to ${publish ? 'publish' : 'unpublish'} news items.`)
    } finally {
      setBulkLoading(false)
    }
  }

  const handleBulkMarquee = async (inMarquee: boolean) => {
    if (selectedIds.size === 0) return

    try {
      setBulkLoading(true)
      await bulkUpdateNews(Array.from(selectedIds), { isInMarquee: inMarquee })
      setSelectedIds(new Set())
      loadNews()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : `Unable to update marquee settings.`)
    } finally {
      setBulkLoading(false)
    }
  }

  const handleToggleMarquee = async (item: News) => {
    try {
      setTogglingId(item.id)
      setError(null)
      await updateNews({
        id: item.id,
        isInMarquee: !item.isInMarquee,
      })
      loadNews()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update marquee setting.')
    } finally {
      setTogglingId(null)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(news.map(item => item.id)))
    } else {
      setSelectedIds(new Set())
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedIds)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedIds(newSelected)
  }

  const allSelected = useMemo(() => {
    return news.length > 0 && news.every(item => selectedIds.has(item.id))
  }, [news, selectedIds])

  const someSelected = useMemo(() => {
    return selectedIds.size > 0 && selectedIds.size < news.length
  }, [news, selectedIds])

  const getImageUrl = (imageUrl: string | null | undefined): string | null => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    const apiBase = getApiBaseUrl()
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
    return `${apiBase}${path}`
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions Toolbar */}
      {selectedIds.size > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-primary-900">
              {selectedIds.size} item{selectedIds.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleBulkPublish(true)}
              disabled={bulkLoading}
              className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm touch-target min-h-[44px]"
              title="Publish selected"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Publish</span>
            </button>
            <button
              onClick={() => handleBulkPublish(false)}
              disabled={bulkLoading}
              className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm touch-target min-h-[44px]"
              title="Unpublish selected"
            >
              <EyeOff className="w-4 h-4" />
              <span className="hidden sm:inline">Unpublish</span>
            </button>
            <button
              type="button"
              onClick={() => handleBulkMarquee(true)}
              disabled={bulkLoading}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2 text-sm touch-target min-h-[44px]"
              title="Add selected to homepage marquee"
            >
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">To Marquee</span>
            </button>
            <button
              type="button"
              onClick={() => handleBulkMarquee(false)}
              disabled={bulkLoading}
              className="px-3 sm:px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 flex items-center space-x-2 text-sm touch-target min-h-[44px]"
              title="Remove selected from homepage marquee"
            >
              <Megaphone className="w-4 h-4 opacity-60" />
              <span className="hidden sm:inline">Clear Marquee</span>
            </button>
            <button
              onClick={() => setDeleteConfirm({
                isOpen: true,
                newsId: null,
                newsTitle: `${selectedIds.size} news item${selectedIds.size !== 1 ? 's' : ''}`,
                isBulk: true
              })}
              disabled={bulkLoading}
              className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm touch-target min-h-[44px]"
              title="Delete selected"
            >
              <Trash className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              disabled={bulkLoading}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 text-sm touch-target min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <label htmlFor="news-table-search" className="sr-only">Search news</label>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" aria-hidden />
            <input
              id="news-table-search"
              type="search"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-2 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]"
            />
            {searchTerm && (
              <button
                type="button"
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
            <label htmlFor="news-category-filter" className="sr-only">Filter by category</label>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" aria-hidden />
            <select
              id="news-category-filter"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setPage(1)
              }}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-h-[44px]"
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
          <div>
            <label htmlFor="news-published-filter" className="sr-only">Filter by publish status</label>
            <select
              id="news-published-filter"
              value={publishedFilter}
              onChange={(e) => {
                setPublishedFilter(e.target.value)
                setPage(1)
              }}
              className="w-full px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Marquee Filter */}
          <div>
            <label htmlFor="news-marquee-filter" className="sr-only">Filter by marquee</label>
            <select
              id="news-marquee-filter"
              value={marqueeFilter}
              onChange={(e) => {
                setMarqueeFilter(e.target.value)
                setPage(1)
              }}
              className="w-full px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]"
            >
              <option value="all">All Marquee</option>
              <option value="marquee">In Marquee only</option>
              <option value="not-marquee">Not in Marquee</option>
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
                    <th className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider touch-target w-12">
                      <button
                        onClick={() => handleSelectAll(!allSelected)}
                        className="flex items-center justify-center w-5 h-5 text-primary-600 hover:text-primary-800 transition-colors touch-target min-h-[44px] min-w-[44px]"
                        aria-label={allSelected ? 'Deselect all' : 'Select all'}
                        title={allSelected ? 'Deselect all' : 'Select all'}
                      >
                        {allSelected ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : someSelected ? (
                          <div className="w-5 h-5 border-2 border-primary-600 rounded bg-primary-100" />
                        ) : (
                          <Square className="w-5 h-5" />
                        )}
                      </button>
                    </th>
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
                    const isSelected = selectedIds.has(item.id)
                    return (
                      <tr key={item.id} className={`hover:bg-gray-50 active:bg-gray-100 transition-colors ${isSelected ? 'bg-primary-50' : ''}`}>
                        <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleSelectItem(item.id, !isSelected)}
                            className="flex items-center justify-center w-5 h-5 text-primary-600 hover:text-primary-800 transition-colors touch-target min-h-[44px] min-w-[44px]"
                            aria-label={isSelected ? 'Deselect' : 'Select'}
                            title={isSelected ? 'Deselect' : 'Select'}
                          >
                            {isSelected ? (
                              <CheckSquare className="w-5 h-5" />
                            ) : (
                              <Square className="w-5 h-5" />
                            )}
                          </button>
                        </td>
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
                            type="button"
                            onClick={() => handleToggleMarquee(item)}
                            disabled={togglingId === item.id}
                            className={`p-1.5 sm:p-2 rounded-lg transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-50 ${
                              item.isInMarquee
                                ? 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                                : 'text-secondary-500 hover:text-blue-700 hover:bg-blue-50'
                            }`}
                            title={item.isInMarquee ? 'Remove from marquee' : 'Add to marquee'}
                            aria-label={item.isInMarquee ? 'Remove from homepage marquee' : 'Add to homepage marquee'}
                          >
                            {togglingId === item.id ? (
                              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                            ) : (
                              <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </button>
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
                              newsTitle: item.title,
                              isBulk: false
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
        title={deleteConfirm.isBulk ? "Delete News Items" : "Delete News Item"}
        message={deleteConfirm.isBulk 
          ? `Are you sure you want to delete ${deleteConfirm.newsTitle}? This action cannot be undone.`
          : `Are you sure you want to delete "${deleteConfirm.newsTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (deleteConfirm.isBulk) {
            handleBulkDelete()
          } else if (deleteConfirm.newsId) {
            handleDelete(deleteConfirm.newsId)
          }
        }}
        onClose={() => setDeleteConfirm({ isOpen: false, newsId: null, newsTitle: '', isBulk: false })}
      />
    </div>
  )
}

