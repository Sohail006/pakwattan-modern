'use client'

import { useState, useEffect, useCallback } from 'react'
import { Edit, Trash2, Loader2, Search, X, Filter, FileText, Eye } from 'lucide-react'
import { TestSyllabus, getTestSyllabi, deleteTestSyllabus, TestSyllabusQueryParams } from '@/lib/api/testSyllabus'
import { formatDate } from '@/lib/utils'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

interface TestSyllabusTableProps {
  onEdit: (syllabus: TestSyllabus) => void
  onRefresh: () => void
}

export default function TestSyllabusTable({ onEdit, onRefresh }: TestSyllabusTableProps) {
  const [syllabi, setSyllabi] = useState<TestSyllabus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
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

  // Load syllabi
  const loadSyllabi = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: TestSyllabusQueryParams = {
        isActive: activeFilter === 'all' ? undefined : activeFilter === 'active',
      }
      
      const data = await getTestSyllabi(params)
      
      // Filter by search term if provided
      let filtered = data
      if (searchTerm) {
        filtered = data.filter(s => 
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.gradeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      
      // Sort by display order, then by created date
      filtered.sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) {
          return a.displayOrder - b.displayOrder
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      
      setSyllabi(filtered)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load test syllabi. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [searchTerm, activeFilter])

  useEffect(() => {
    loadSyllabi()
  }, [loadSyllabi])

  const handleDelete = async (syllabusId: number) => {
    try {
      await deleteTestSyllabus(syllabusId)
      setDeleteConfirm({ isOpen: false, syllabusId: null, syllabusTitle: '' })
      loadSyllabi()
      onRefresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete test syllabus.')
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search syllabi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Active Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : syllabi.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No test syllabi found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {syllabi.map((syllabus) => (
                  <tr key={syllabus.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{syllabus.title}</div>
                      {syllabus.description && (
                        <div className="text-xs text-gray-500 mt-1 line-clamp-1">{syllabus.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{syllabus.gradeName || `Grade ${syllabus.gradeId}`}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getContentTypeBadge(syllabus.contentType)}`}>
                        {syllabus.contentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {syllabus.academicYear || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        syllabus.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {syllabus.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(syllabus.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {syllabus.pdfUrl && (
                          <a
                            href={syllabus.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-900"
                            title="View PDF"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => onEdit(syllabus)}
                          className="text-primary-600 hover:text-primary-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({
                            isOpen: true,
                            syllabusId: syllabus.id,
                            syllabusTitle: syllabus.title
                          })}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
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
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, syllabusId: null, syllabusTitle: '' })}
        onConfirm={() => deleteConfirm.syllabusId && handleDelete(deleteConfirm.syllabusId)}
        title="Delete Test Syllabus"
        message={`Are you sure you want to delete "${deleteConfirm.syllabusTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}

