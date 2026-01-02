'use client'

import { useState, useEffect, useCallback } from 'react'
import { Edit, Trash2, Loader2, Search, X, Filter, Calendar, Clock, MapPin, Image as ImageIcon } from 'lucide-react'
import { Event, getEvents, deleteEvent, PaginatedEventsParams } from '@/lib/api/events'
import { formatDate } from '@/lib/utils'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import Image from 'next/image'
import { getApiBaseUrl } from '@/lib/config'

interface EventsTableProps {
  onEdit?: (event: Event) => void
  onRefresh: () => void
}

const EVENT_CATEGORIES = [
  'Academic',
  'Sports',
  'Cultural',
  'Religious',
  'General',
  'Ceremony',
  'Competition',
  'Test',
  'Announcement'
]

export default function EventsTable({ onEdit, onRefresh }: EventsTableProps) {
  const [events, setEvents] = useState<Event[]>([])
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
  const [publishedFilter, setPublishedFilter] = useState<string>('all')
  const [upcomingFilter, setUpcomingFilter] = useState<boolean>(false)
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean
    eventId: number | null
    eventTitle: string
  }>({
    isOpen: false,
    eventId: null,
    eventTitle: ''
  })

  // Load events
  const loadEvents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: PaginatedEventsParams = {
        page,
        pageSize,
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
        isPublished: publishedFilter === 'all' ? undefined : publishedFilter === 'published',
        upcoming: upcomingFilter || undefined,
        sortBy: 'date',
        sortOrder: 'asc'
      }
      
      const response = await getEvents(params)
      setEvents(response.data)
      setTotalCount(response.totalCount)
      setTotalPages(response.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load events. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, searchTerm, selectedCategory, publishedFilter, upcomingFilter])

  useEffect(() => {
    loadEvents()
  }, [loadEvents])

  const handleDelete = async (eventId: number) => {
    try {
      await deleteEvent(eventId)
      setDeleteConfirm({ isOpen: false, eventId: null, eventTitle: '' })
      loadEvents()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete event.')
    }
  }

  const getImageUrl = (imageUrl: string | null | undefined): string | null => {
    if (!imageUrl) return null
    if (imageUrl.startsWith('http')) return imageUrl
    const apiBase = getApiBaseUrl()
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
    return `${apiBase}${path}`
  }

  const formatTime = (time?: string): string => {
    if (!time) return ''
    try {
      const [hours, minutes] = time.split(':')
      const hour = parseInt(hours)
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour % 12 || 12
      return `${displayHour}:${minutes} ${ampm}`
    } catch {
      return time
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setPage(1)
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Categories</option>
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Published Filter */}
          <div>
            <select
              value={publishedFilter}
              onChange={(e) => {
                setPublishedFilter(e.target.value)
                setPage(1)
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Upcoming Filter */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={upcomingFilter}
                onChange={(e) => {
                  setUpcomingFilter(e.target.checked)
                  setPage(1)
                }}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Upcoming Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <X className="w-5 h-5 text-red-500" />
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No events found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((item) => {
                  const imageUrl = getImageUrl(item.imageUrl)
                  const isPast = new Date(item.date) < new Date()
                  return (
                    <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${isPast ? 'opacity-60' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {imageUrl ? (
                          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                          {item.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-accent-100 text-accent-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500 space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        {item.time && (
                          <div className="flex items-center text-xs text-gray-400 mt-1 space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(item.time)}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {item.location ? (
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="line-clamp-1">{item.location}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.isPublished ? (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            Draft
                          </span>
                        )}
                        {item.isFeatured && (
                          <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(item)}
                              className="text-primary-600 hover:text-primary-900 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteConfirm({
                              isOpen: true,
                              eventId: item.id,
                              eventTitle: item.title
                            })}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalCount)} of {totalCount} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteConfirm.eventTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => deleteConfirm.eventId && handleDelete(deleteConfirm.eventId)}
        onClose={() => setDeleteConfirm({ isOpen: false, eventId: null, eventTitle: '' })}
      />
    </div>
  )
}

