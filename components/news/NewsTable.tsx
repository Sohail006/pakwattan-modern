'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Edit,
  Trash2,
  Loader2,
  Search,
  X,
  Filter,
  Calendar,
  Image as ImageIcon,
  CheckSquare,
  Square,
  Trash,
  Eye,
  EyeOff,
  Megaphone,
  Star,
  ArrowUpDown,
} from 'lucide-react'
import {
  News,
  getNews,
  deleteNews,
  bulkDeleteNews,
  bulkUpdateNews,
  updateNews,
  PaginatedNewsParams,
} from '@/lib/api/news'
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
  'Test',
]

const selectClass =
  'w-full px-3 py-2.5 text-sm border border-secondary-200 rounded-xl bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[44px]'

export default function NewsTable({ onEdit, onRefresh }: NewsTableProps) {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [publishedFilter, setPublishedFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'not-featured'>('all')
  const [marqueeFilter, setMarqueeFilter] = useState<'all' | 'marquee' | 'not-marquee'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'displayOrder'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [togglingId, setTogglingId] = useState<number | null>(null)

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [bulkLoading, setBulkLoading] = useState(false)

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean
    newsId: number | null
    newsTitle: string
    isBulk: boolean
  }>({
    isOpen: false,
    newsId: null,
    newsTitle: '',
    isBulk: false,
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

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
        isFeatured: featuredFilter === 'all' ? undefined : featuredFilter === 'featured',
        isInMarquee: marqueeFilter === 'all' ? undefined : marqueeFilter === 'marquee',
        sortBy,
        sortOrder,
      }

      const response = await getNews(params)
      setNews(response.data || [])
      setTotalCount(response.totalCount || 0)
      setTotalPages(response.totalPages || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load news. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [
    page,
    pageSize,
    debouncedSearchTerm,
    selectedCategory,
    publishedFilter,
    featuredFilter,
    marqueeFilter,
    sortBy,
    sortOrder,
  ])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (searchTerm.trim()) count += 1
    if (selectedCategory) count += 1
    if (publishedFilter !== 'all') count += 1
    if (featuredFilter !== 'all') count += 1
    if (marqueeFilter !== 'all') count += 1
    if (sortBy !== 'date' || sortOrder !== 'desc') count += 1
    return count
  }, [searchTerm, selectedCategory, publishedFilter, featuredFilter, marqueeFilter, sortBy, sortOrder])

  const clearFilters = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setSelectedCategory('')
    setPublishedFilter('all')
    setFeaturedFilter('all')
    setMarqueeFilter('all')
    setSortBy('date')
    setSortOrder('desc')
    setPage(1)
  }

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

  const handleBulkFeatured = async (featured: boolean) => {
    if (selectedIds.size === 0) return
    try {
      setBulkLoading(true)
      await bulkUpdateNews(Array.from(selectedIds), { isFeatured: featured })
      setSelectedIds(new Set())
      loadNews()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update featured settings.')
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
      setError(err instanceof Error ? err.message : 'Unable to update marquee settings.')
    } finally {
      setBulkLoading(false)
    }
  }

  const handleToggleMarquee = async (item: News) => {
    try {
      setTogglingId(item.id)
      setError(null)
      await updateNews({ id: item.id, isInMarquee: !item.isInMarquee })
      loadNews()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update marquee setting.')
    } finally {
      setTogglingId(null)
    }
  }

  const handleToggleFeatured = async (item: News) => {
    try {
      setTogglingId(item.id)
      setError(null)
      await updateNews({ id: item.id, isFeatured: !item.isFeatured })
      loadNews()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update featured setting.')
    } finally {
      setTogglingId(null)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? new Set(news.map((item) => item.id)) : new Set())
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    const next = new Set(selectedIds)
    if (checked) next.add(id)
    else next.delete(id)
    setSelectedIds(next)
  }

  const allSelected = useMemo(
    () => news.length > 0 && news.every((item) => selectedIds.has(item.id)),
    [news, selectedIds]
  )
  const someSelected = useMemo(
    () => selectedIds.size > 0 && selectedIds.size < news.length,
    [news, selectedIds]
  )

  const getImageUrl = (imageUrl: string | null | undefined): string | null => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    const apiBase = getApiBaseUrl()
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
    return `${apiBase}${path}`
  }

  return (
    <div className="space-y-4">
      {selectedIds.size > 0 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-primary-200 bg-primary-50 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <p className="text-sm font-semibold text-primary-900">
            {selectedIds.size} item{selectedIds.size !== 1 ? 's' : ''} selected
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleBulkPublish(true)}
              disabled={bulkLoading}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              <Eye className="h-4 w-4" /> Publish
            </button>
            <button
              type="button"
              onClick={() => handleBulkPublish(false)}
              disabled={bulkLoading}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-secondary-600 px-3 py-2 text-xs font-semibold text-white hover:bg-secondary-700 disabled:opacity-50"
            >
              <EyeOff className="h-4 w-4" /> Unpublish
            </button>
            <button
              type="button"
              onClick={() => handleBulkFeatured(true)}
              disabled={bulkLoading}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
            >
              <Star className="h-4 w-4" /> Feature
            </button>
            <button
              type="button"
              onClick={() => handleBulkMarquee(true)}
              disabled={bulkLoading}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Megaphone className="h-4 w-4" /> To Marquee
            </button>
            <button
              type="button"
              onClick={() => handleBulkMarquee(false)}
              disabled={bulkLoading}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-slate-500 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-600 disabled:opacity-50"
            >
              Clear Marquee
            </button>
            <button
              type="button"
              onClick={() =>
                setDeleteConfirm({
                  isOpen: true,
                  newsId: null,
                  newsTitle: `${selectedIds.size} news item${selectedIds.size !== 1 ? 's' : ''}`,
                  isBulk: true,
                })
              }
              disabled={bulkLoading}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              <Trash className="h-4 w-4" /> Delete
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              disabled={bulkLoading}
              className="inline-flex min-h-[40px] items-center rounded-lg border border-secondary-300 bg-white px-3 py-2 text-xs font-semibold text-secondary-700 hover:bg-secondary-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-2xl border border-secondary-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary-700" aria-hidden />
            <h2 className="text-sm font-bold text-secondary-900">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-800">
                {activeFilterCount} active
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2.5 text-xs font-semibold text-primary-700 hover:bg-primary-50"
            >
              <X className="h-3.5 w-3.5" /> Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <div className="relative sm:col-span-2 xl:col-span-1 2xl:col-span-1">
            <label htmlFor="news-table-search" className="mb-1 block text-xs font-semibold text-secondary-600">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" aria-hidden />
              <input
                id="news-table-search"
                type="search"
                placeholder="Title or description…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`${selectClass} pl-9 pr-9`}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-secondary-400 hover:text-secondary-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="news-category-filter" className="mb-1 block text-xs font-semibold text-secondary-600">
              Category
            </label>
            <select
              id="news-category-filter"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setPage(1)
              }}
              className={selectClass}
            >
              <option value="">All categories</option>
              {NEWS_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="news-published-filter" className="mb-1 block text-xs font-semibold text-secondary-600">
              Published (visible on website)
            </label>
            <select
              id="news-published-filter"
              value={publishedFilter}
              onChange={(e) => {
                setPublishedFilter(e.target.value as typeof publishedFilter)
                setPage(1)
              }}
              className={selectClass}
            >
              <option value="all">All</option>
              <option value="published">Published only</option>
              <option value="draft">Draft only</option>
            </select>
          </div>

          <div>
            <label htmlFor="news-featured-filter" className="mb-1 block text-xs font-semibold text-secondary-600">
              Featured News
            </label>
            <select
              id="news-featured-filter"
              value={featuredFilter}
              onChange={(e) => {
                setFeaturedFilter(e.target.value as typeof featuredFilter)
                setPage(1)
              }}
              className={selectClass}
            >
              <option value="all">All</option>
              <option value="featured">Featured only</option>
              <option value="not-featured">Not featured</option>
            </select>
          </div>

          <div>
            <label htmlFor="news-marquee-filter" className="mb-1 block text-xs font-semibold text-secondary-600">
              Show in Top Marquee
            </label>
            <select
              id="news-marquee-filter"
              value={marqueeFilter}
              onChange={(e) => {
                setMarqueeFilter(e.target.value as typeof marqueeFilter)
                setPage(1)
              }}
              className={selectClass}
            >
              <option value="all">All</option>
              <option value="marquee">In marquee only</option>
              <option value="not-marquee">Not in marquee</option>
            </select>
          </div>

          <div>
            <label htmlFor="news-sort-by" className="mb-1 block text-xs font-semibold text-secondary-600">
              Sort by
            </label>
            <div className="flex gap-2">
              <select
                id="news-sort-by"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as typeof sortBy)
                  setPage(1)
                }}
                className={`${selectClass} flex-1`}
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="displayOrder">Display order</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))
                  setPage(1)
                }}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-secondary-200 bg-white text-secondary-700 hover:bg-secondary-50"
                aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
                title={sortOrder === 'asc' ? 'Ascending — click for descending' : 'Descending — click for ascending'}
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="news-page-size" className="mb-1 block text-xs font-semibold text-secondary-600">
              Rows per page
            </label>
            <select
              id="news-page-size"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPage(1)
              }}
              className={selectClass}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 sm:items-center">
          <p className="flex-1 text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="rounded-lg p-2 text-red-500 hover:bg-red-100"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" aria-hidden />
        </div>
      ) : news.length === 0 ? (
        <div className="rounded-2xl border border-secondary-100 bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-base font-semibold text-secondary-800">No news items found</p>
          <p className="mt-1 text-sm text-secondary-500">Try clearing filters or add a new news item.</p>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 inline-flex min-h-[40px] items-center rounded-xl bg-primary-700 px-4 text-sm font-semibold text-white hover:bg-primary-600"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-secondary-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="border-b border-secondary-200 bg-secondary-50">
                <tr>
                  <th className="w-12 px-3 py-3 text-left">
                    <button
                      type="button"
                      onClick={() => handleSelectAll(!allSelected)}
                      className="flex h-10 w-10 items-center justify-center text-primary-700"
                      aria-label={allSelected ? 'Deselect all' : 'Select all'}
                    >
                      {allSelected ? (
                        <CheckSquare className="h-5 w-5" />
                      ) : someSelected ? (
                        <div className="h-5 w-5 rounded border-2 border-primary-600 bg-primary-100" />
                      ) : (
                        <Square className="h-5 w-5" />
                      )}
                    </button>
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary-600">
                    Image
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary-600">
                    Title
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary-600">
                    Category
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary-600">
                    Date
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-secondary-600">
                    Visibility
                  </th>
                  <th className="sticky right-0 z-10 bg-secondary-50 px-3 py-3 text-right text-xs font-bold uppercase tracking-wide text-secondary-600 shadow-[-8px_0_12px_-8px_rgba(0,0,0,0.12)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-100">
                {news.map((item) => {
                  const imageUrl = getImageUrl(item.imageUrl)
                  const isSelected = selectedIds.has(item.id)
                  const busy = togglingId === item.id

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${isSelected ? 'bg-primary-50/70' : 'hover:bg-secondary-50/80'}`}
                    >
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => handleSelectItem(item.id, !isSelected)}
                          className="flex h-10 w-10 items-center justify-center text-primary-700"
                          aria-label={isSelected ? 'Deselect' : 'Select'}
                        >
                          {isSelected ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5" />}
                        </button>
                      </td>
                      <td className="px-3 py-3">
                        {imageUrl ? (
                          <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-secondary-100">
                            <Image src={imageUrl} alt="" fill className="object-cover" sizes="56px" />
                          </div>
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary-100">
                            <ImageIcon className="h-5 w-5 text-secondary-400" aria-hidden />
                          </div>
                        )}
                      </td>
                      <td className="max-w-[280px] px-3 py-3">
                        <p className="truncate text-sm font-semibold text-secondary-900">{item.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-secondary-500">{item.description}</p>
                      </td>
                      <td className="px-3 py-3">
                        <span className="inline-flex rounded-lg bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-sm text-secondary-600">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" aria-hidden />
                          {formatDate(item.date)}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span
                            className={`inline-flex rounded-lg px-2 py-1 text-xs font-semibold ${
                              item.isPublished
                                ? 'bg-green-100 text-green-800'
                                : 'bg-secondary-100 text-secondary-700'
                            }`}
                          >
                            {item.isPublished ? 'Published' : 'Draft'}
                          </span>
                          {item.isFeatured && (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900">
                              <Star className="h-3 w-3" aria-hidden /> Featured
                            </span>
                          )}
                          {item.isInMarquee && (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-900">
                              <Megaphone className="h-3 w-3" aria-hidden /> Marquee
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="sticky right-0 z-10 bg-white px-3 py-3 shadow-[-8px_0_12px_-8px_rgba(0,0,0,0.12)]">
                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(item)}
                            disabled={busy}
                            className={`inline-flex min-h-[38px] items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors disabled:opacity-50 ${
                              item.isFeatured
                                ? 'border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-200'
                                : 'border-secondary-200 bg-white text-secondary-700 hover:border-amber-300 hover:bg-amber-50'
                            }`}
                            title={item.isFeatured ? 'Remove featured' : 'Mark featured'}
                          >
                            <Star className="h-3.5 w-3.5" />
                            <span className="hidden lg:inline">{item.isFeatured ? 'Featured' : 'Feature'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleMarquee(item)}
                            disabled={busy}
                            className={`inline-flex min-h-[38px] items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors disabled:opacity-50 ${
                              item.isInMarquee
                                ? 'border-blue-300 bg-blue-100 text-blue-900 hover:bg-blue-200'
                                : 'border-secondary-200 bg-white text-secondary-700 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                            title={item.isInMarquee ? 'Remove from marquee' : 'Add to marquee'}
                          >
                            {busy ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Megaphone className="h-3.5 w-3.5" />
                            )}
                            <span className="hidden lg:inline">
                              {item.isInMarquee ? 'In Marquee' : 'Marquee'}
                            </span>
                          </button>
                          {onEdit && (
                            <button
                              type="button"
                              onClick={() => onEdit(item)}
                              className="inline-flex min-h-[38px] items-center gap-1 rounded-lg bg-primary-700 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-primary-600"
                            >
                              <Edit className="h-3.5 w-3.5" />
                              Edit
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteConfirm({
                                isOpen: true,
                                newsId: item.id,
                                newsTitle: item.title,
                                isBulk: false,
                              })
                            }
                            className="inline-flex min-h-[38px] items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-red-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-secondary-100 bg-secondary-50 px-4 py-3 sm:flex-row">
            <p className="text-xs text-secondary-600 sm:text-sm">
              Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalCount)} of {totalCount}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="min-h-[40px] rounded-lg border border-secondary-300 bg-white px-3 text-sm font-semibold disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-2 text-sm text-secondary-700">
                {page} / {Math.max(totalPages, 1)}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="min-h-[40px] rounded-lg border border-secondary-300 bg-white px-3 text-sm font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationDialog
        isOpen={deleteConfirm.isOpen}
        type="danger"
        title={deleteConfirm.isBulk ? 'Delete News Items' : 'Delete News Item'}
        message={
          deleteConfirm.isBulk
            ? `Are you sure you want to delete ${deleteConfirm.newsTitle}? This action cannot be undone.`
            : `Are you sure you want to delete "${deleteConfirm.newsTitle}"? This action cannot be undone.`
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (deleteConfirm.isBulk) handleBulkDelete()
          else if (deleteConfirm.newsId) handleDelete(deleteConfirm.newsId)
        }}
        onClose={() => setDeleteConfirm({ isOpen: false, newsId: null, newsTitle: '', isBulk: false })}
      />
    </div>
  )
}
