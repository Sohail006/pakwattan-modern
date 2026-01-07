'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Edit, Trash2, Loader2, Search, X, Filter, FileText, Eye } from 'lucide-react'
import { TestSyllabus, getTestSyllabi, deleteTestSyllabus, TestSyllabusQueryParams } from '@/lib/api/testSyllabus'
import { formatDate, debounce } from '@/lib/utils'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

interface TestSyllabusTableProps {
  onEdit: (syllabus: TestSyllabus) => void
  onRefresh: () => void
}

export default function TestSyllabusTable({ onEdit, onRefresh }: TestSyllabusTableProps) {
  const [allSyllabi, setAllSyllabi] = useState<TestSyllabus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('all') // 'all', 'active', 'inactive'
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean
    syllabusId: number | null
    syllabusTitle: string
  }>({
    isOpen: false,
    syllabusId: null,
    syllabusTitle: ''
  })

  // Debounce search term updates
  const debouncedSetSearch = useRef(
    debounce((value: string) => {
      setDebouncedSearchTerm(value)
    }, 300)
  ).current

  useEffect(() => {
    debouncedSetSearch(searchTerm)
  }, [searchTerm, debouncedSetSearch])

  // Load syllabi - only fetch from API, no client-side filtering
  const loadSyllabi = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: TestSyllabusQueryParams = {
        isActive: activeFilter === 'all' ? undefined : activeFilter === 'active',
      }
      
      const data = await getTestSyllabi(params)
      setAllSyllabi(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load test syllabi. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [activeFilter]) // Only depend on activeFilter, not searchTerm

  useEffect(() => {
    loadSyllabi()
  }, [loadSyllabi])

  // Memoize filtered and sorted data to prevent recalculation on every render
  const syllabi = useMemo(() => {
    let filtered = [...allSyllabi]
    
    // Filter by search term if provided
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase()
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.gradeName?.toLowerCase().includes(searchLower) ||
        s.description?.toLowerCase().includes(searchLower)
      )
    }
    
    // Sort by display order, then by created date
    return filtered.sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [allSyllabi, debouncedSearchTerm])

  const handleDelete = async (syllabusId: number) => {
    try {
      await deleteTestSyllabus(syllabusId)
      setDeleteConfirm({ isOpen: false, syllabusId: null, syllabusTitle: '' })
      // Remove from local state immediately for better UX
      setAllSyllabi(prev => prev.filter(s => s.id !== syllabusId))
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete model paper.')
      // Reload on error to ensure consistency
      loadSyllabi()
    }
  }

  const getContentTypeBadge = (contentType: string) => {
    const colors = {
      'PDF': 'bg-blue-100 text-blue-800',
      'Text': 'bg-green-100 text-green-800',
      'Both': 'bg-purple-100 text-purple-800',
    }
    return colors[contentType as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }


  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search syllabi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 active:text-gray-700 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Active Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-h-[44px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 text-sm sm:text-base text-red-800 break-words">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-8 sm:py-12">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary-600" />
          </div>
        ) : syllabi.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-600">No test syllabi found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0 mobile-scroll">
            <div className="min-w-[640px] sm:min-w-0">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Type</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {syllabi.map((syllabus) => (
                    <tr key={syllabus.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{syllabus.title}</div>
                        {syllabus.description && (
                          <div className="text-xs text-gray-500 mt-1 line-clamp-1 truncate">{syllabus.description}</div>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-900 truncate">{syllabus.gradeName || `Grade ${syllabus.gradeId}`}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getContentTypeBadge(syllabus.contentType)}`}>
                          {syllabus.contentType}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {syllabus.academicYear || 'N/A'}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          syllabus.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {syllabus.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {formatDate(syllabus.updatedAt)}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          {syllabus.pdfUrl && (
                            <a
                              href={syllabus.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-900 active:text-primary-800 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                              title="View PDF"
                              aria-label={`View ${syllabus.title} PDF`}
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => onEdit(syllabus)}
                            className="text-primary-600 hover:text-primary-900 active:text-primary-800 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                            title="Edit"
                            aria-label={`Edit ${syllabus.title}`}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({
                              isOpen: true,
                              syllabusId: syllabus.id,
                              syllabusTitle: syllabus.title
                            })}
                            className="text-red-600 hover:text-red-900 active:text-red-800 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
                            title="Delete"
                            aria-label={`Delete ${syllabus.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, syllabusId: null, syllabusTitle: '' })}
        onConfirm={() => deleteConfirm.syllabusId && handleDelete(deleteConfirm.syllabusId)}
        title="Delete Model Paper"
        message={`Are you sure you want to delete "${deleteConfirm.syllabusTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}

