'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Edit, Trash2, Eye, Users, Loader2, Search, X, AlertCircle, Download } from 'lucide-react'
import { Student, getStudentsPaginated, PaginatedResponse, PaginatedStudentsParams, deleteStudent } from '@/lib/api/students'
import { Grade, getGrades } from '@/lib/api/grades'
import { Section, getSections } from '@/lib/api/sections'
import Image from 'next/image'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import StudentModal from './StudentModal'
import { exportStudentsToExcel } from '@/lib/utils/excelExport'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

// Helper to get API base URL
const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_BACKEND_BASE_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL
  }
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'https://localhost:7210'
    }
  }
  return 'http://localhost:5000'
}

// Helper to construct full image URL
const getImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl) return null
  if (imageUrl.startsWith('http')) {
    if (!hasExtension(imageUrl)) {
      try {
        const url = new URL(imageUrl)
        const path = url.pathname
        return `${url.origin}/api/images/serve?path=${encodeURIComponent(path)}`
      } catch {
        return imageUrl
      }
    }
    return imageUrl
  }
  const apiBase = getApiBaseUrl()
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
  return `${apiBase}${path}`
}

const hasExtension = (url: string): boolean => {
  const path = url.split('?')[0]
  const lastDot = path.lastIndexOf('.')
  const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
  return lastDot > lastSlash && lastDot < path.length - 1
}

const getImageUrlWithFallback = (imageUrl: string | null | undefined): string[] => {
  if (!imageUrl) return []
  const baseUrl = getImageUrl(imageUrl)
  if (!baseUrl) return []
  if (hasExtension(baseUrl)) {
    return [baseUrl]
  }
  const apiBase = getApiBaseUrl()
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
  return [`${apiBase}/api/images/serve?path=${encodeURIComponent(path)}`]
}

interface StudentsTableProps {
  onEdit: (student: Student) => void
  onRefresh: () => void
}

type SortField = 'name' | 'email' | 'grade' | 'section' | 'status' | 'createdAt' | null
type SortOrder = 'asc' | 'desc'

export default function StudentsTable({ onEdit, onRefresh }: StudentsTableProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    onConfirm: () => void
  } | null>(null)
  
  // Scroll indicator states
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)
  const tableScrollRef = useRef<HTMLDivElement>(null)
  
  // Pagination state
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGradeId, setSelectedGradeId] = useState<number | undefined>()
  const [selectedSectionId, setSelectedSectionId] = useState<number | undefined>()
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  
  // Sort state
  const [sortBy, setSortBy] = useState<SortField>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  
  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  
  // Export state
  const [exporting, setExporting] = useState(false)

  // Load grades and sections
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [gradesData, sectionsData] = await Promise.all([
          getGrades(true),
          getSections(true)
        ])
        setGrades(gradesData)
        setSections(sectionsData)
      } catch (err) {
        console.error('Error loading filters:', err)
      }
    }
    loadFilters()
  }, [])

  // Load students with pagination
  const loadStudents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: PaginatedStudentsParams = {
        page,
        pageSize,
        searchTerm: searchTerm || undefined,
        gradeId: selectedGradeId,
        sectionId: selectedSectionId,
        status: selectedStatus || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder
      }
      
      const response: PaginatedResponse<Student> = await getStudentsPaginated(params)
      setStudents(response.data)
      setTotalCount(response.totalCount)
      setTotalPages(response.totalPages)
    } catch (err: unknown) {
      let message = 'Unable to load students. Please refresh the page and try again.'
      let isAuthError = false
      
      if (err instanceof Error) {
        message = err.message
        // Check if it's an authentication error
        if (message.includes('401') || 
            message.includes('Unauthorized') || 
            message.includes('session has expired') ||
            message.includes('authentication') ||
            message.toLowerCase().includes('unauthorized')) {
          isAuthError = true
          message = 'Your session has expired or you are not authenticated. Redirecting to login...'
          // Redirect to login immediately
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.location.href = '/login'
            }, 1500)
          }
        }
      } else if (err && typeof err === 'object' && 'statusCode' in err) {
        const apiError = err as { statusCode?: number; message?: string }
        if (apiError.statusCode === 401) {
          isAuthError = true
          message = 'Your session has expired or you are not authenticated. Redirecting to login...'
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.location.href = '/login'
            }, 1500)
          }
        }
      }
      
      setError(message)
      if (!isAuthError) {
        console.error('Error loading students:', err)
      }
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, searchTerm, selectedGradeId, selectedSectionId, selectedStatus, sortBy, sortOrder])

  useEffect(() => {
    loadStudents()
  }, [loadStudents])

  // Handle scroll indicators
  useEffect(() => {
    const handleScroll = () => {
      if (!tableScrollRef.current) return
      
      const { scrollLeft, scrollWidth, clientWidth } = tableScrollRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1)
    }

    const scrollContainer = tableScrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll()
      
      window.addEventListener('resize', handleScroll)
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [students.length])

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
    setPage(1) // Reset to first page when sorting
  }

  const handleFilterChange = () => {
    setPage(1) // Reset to first page when filters change
  }

  const handleSearch = () => {
    handleFilterChange()
  }

  const handleDelete = (id: number) => {
    const student = students.find(s => s.id === id)
    const studentName = student ? student.name : 'this student'
    
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete Student',
      message: `Are you sure you want to permanently delete ${studentName}? This action cannot be undone and all associated data will be lost.`,
      confirmText: 'Delete',
      onConfirm: async () => {
        setConfirmDialog(null)
        try {
          await deleteStudent(id)
          await loadStudents()
          onRefresh()
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Unable to delete student. Please try again.'
          setError(message)
          console.error('Error deleting student:', err)
        }
      },
    })
  }

  const handleView = (student: Student) => {
    setSelectedStudent(student)
    setShowModal(true)
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortBy !== field) {
      return <span className="inline-block w-4 h-4 opacity-30" />
    }
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline-block ml-1" />
    )
  }

  const hasActiveFilters = searchTerm || selectedGradeId || selectedSectionId || selectedStatus

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedGradeId(undefined)
    setSelectedSectionId(undefined)
    setSelectedStatus('')
    handleFilterChange()
  }

  // Export all filtered students to Excel
  const handleExport = useCallback(async () => {
    try {
      setExporting(true)
      setError(null)

      // Fetch all students with current filters (handle pagination)
      const allStudents: Student[] = []
      let currentPage = 1
      const pageSizeLimit = 100 // Backend limit
      let hasMore = true

      while (hasMore) {
        const params: PaginatedStudentsParams = {
          page: currentPage,
          pageSize: pageSizeLimit,
          searchTerm: searchTerm || undefined,
          gradeId: selectedGradeId,
          sectionId: selectedSectionId,
          status: selectedStatus || undefined,
          sortBy: sortBy || undefined,
          sortOrder: sortOrder
        }

        const response: PaginatedResponse<Student> = await getStudentsPaginated(params)
        
        if (response.data && response.data.length > 0) {
          allStudents.push(...response.data)
        }

        // Check if there are more pages
        hasMore = currentPage < response.totalPages
        currentPage++
      }
      
      if (allStudents.length === 0) {
        setError('No students found to export. Please adjust your filters.')
        setExporting(false)
        return
      }

      // Generate filename with filter info
      let filename = 'Students_Export'
      if (selectedGradeId) {
        const grade = grades.find(g => g.id === selectedGradeId)
        if (grade) filename += `_${grade.name.replace(/\s+/g, '-')}`
      }
      if (selectedSectionId) {
        const section = sections.find(s => s.id === selectedSectionId)
        if (section) filename += `_Section-${section.name}`
      }
      if (selectedStatus) {
        filename += `_${selectedStatus}`
      }
      if (searchTerm) {
        filename += `_Search-${searchTerm.substring(0, 10).replace(/\s+/g, '-')}`
      }

      // Export to Excel
      exportStudentsToExcel(allStudents, filename)

      // Clear any previous errors
      setError(null)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to export students. Please try again.'
      setError(message)
      console.error('Export error:', err)
    } finally {
      setExporting(false)
    }
  }, [searchTerm, selectedGradeId, selectedSectionId, selectedStatus, sortBy, sortOrder, grades, sections])

  if (loading && students.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Filter Students</h3>
          <button
            onClick={handleExport}
            disabled={exporting || loading || totalCount === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            aria-label="Export students to Excel"
            title="Export all filtered students to Excel"
          >
            {exporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export to Excel</span>
              </>
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="search-input"
                type="text"
                placeholder="Search by name, father name, or email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  handleFilterChange()
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSearch()
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                aria-label="Search students by name, father name, or email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="grade-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Grade
            </label>
            <select
              id="grade-filter"
              value={selectedGradeId || ''}
              onChange={(e) => {
                setSelectedGradeId(e.target.value ? parseInt(e.target.value) : undefined)
                handleFilterChange()
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Filter by grade"
            >
              <option value="">All Grades</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="section-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Section
            </label>
            <select
              id="section-filter"
              value={selectedSectionId || ''}
              onChange={(e) => {
                setSelectedSectionId(e.target.value ? parseInt(e.target.value) : undefined)
                handleFilterChange()
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Filter by section"
            >
              <option value="">All Sections</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value)
                handleFilterChange()
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Filter by status"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Graduated">Graduated</option>
              <option value="Transferred">Transferred</option>
            </select>
          </div>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="mt-4 flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            aria-label="Clear all filters"
          >
            <X className="w-4 h-4" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className={`rounded-lg p-4 flex items-center space-x-3 ${
          error.includes('session has expired') || error.includes('not authenticated') || error.includes('Redirecting to login')
            ? 'bg-amber-50 border border-amber-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
            error.includes('session has expired') || error.includes('not authenticated') || error.includes('Redirecting to login')
              ? 'text-amber-600'
              : 'text-red-600'
          }`} />
          <div className="flex-1">
            <p className={`font-medium ${
              error.includes('session has expired') || error.includes('not authenticated') || error.includes('Redirecting to login')
                ? 'text-amber-800'
                : 'text-red-700'
            }`}>
              {error.includes('session has expired') || error.includes('not authenticated') || error.includes('Redirecting to login')
                ? 'Authentication Required'
                : 'Error Loading Students'}
            </p>
            <p className={`text-sm mt-1 ${
              error.includes('session has expired') || error.includes('not authenticated') || error.includes('Redirecting to login')
                ? 'text-amber-700'
                : 'text-red-600'
            }`}>
              {error}
            </p>
            {error.includes('Redirecting to login') && (
              <div className="mt-2 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                <span className="text-sm text-amber-700">Please wait...</span>
              </div>
            )}
          </div>
          {!error.includes('Redirecting to login') && (
            <button
              onClick={() => {
                if (error.includes('session has expired') || error.includes('not authenticated')) {
                  window.location.href = '/login'
                } else {
                  loadStudents()
                }
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                error.includes('session has expired') || error.includes('not authenticated')
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {error.includes('session has expired') || error.includes('not authenticated')
                ? 'Go to Login'
                : 'Retry'}
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
        <div 
          ref={tableScrollRef}
          className="overflow-x-auto relative"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Left scroll indicator */}
          {showLeftScroll && (
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-20" />
          )}
          
          {/* Right scroll indicator */}
          {showRightScroll && (
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />
          )}
          
          <table className="min-w-[1200px] w-full" role="table" aria-label="Students table">
            <thead className="bg-primary-600 text-white">
              <tr role="row">
                <th className="px-4 py-3 text-left text-sm font-semibold" role="columnheader" scope="col">Photo</th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                  onClick={() => handleSort('name')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('name')
                    }
                  }}
                  tabIndex={0}
                  role="columnheader"
                  scope="col"
                  aria-label={`Sort by name, currently ${sortBy === 'name' ? sortOrder : 'not sorted'}`}
                >
                  <div className="flex items-center">
                    Name
                    <SortIcon field="name" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold" role="columnheader" scope="col">Father Name</th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                  onClick={() => handleSort('email')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('email')
                    }
                  }}
                  tabIndex={0}
                  role="columnheader"
                  scope="col"
                  aria-label={`Sort by email, currently ${sortBy === 'email' ? sortOrder : 'not sorted'}`}
                >
                  <div className="flex items-center">
                    Email
                    <SortIcon field="email" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold" role="columnheader" scope="col">Phone</th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                  onClick={() => handleSort('grade')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('grade')
                    }
                  }}
                  tabIndex={0}
                  role="columnheader"
                  scope="col"
                  aria-label={`Sort by grade, currently ${sortBy === 'grade' ? sortOrder : 'not sorted'}`}
                >
                  <div className="flex items-center">
                    Grade
                    <SortIcon field="grade" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                  onClick={() => handleSort('section')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('section')
                    }
                  }}
                  tabIndex={0}
                  role="columnheader"
                  scope="col"
                  aria-label={`Sort by section, currently ${sortBy === 'section' ? sortOrder : 'not sorted'}`}
                >
                  <div className="flex items-center">
                    Section
                    <SortIcon field="section" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                  onClick={() => handleSort('status')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSort('status')
                    }
                  }}
                  tabIndex={0}
                  role="columnheader"
                  scope="col"
                  aria-label={`Sort by status, currently ${sortBy === 'status' ? sortOrder : 'not sorted'}`}
                >
                  <div className="flex items-center">
                    Status
                    <SortIcon field="status" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold" role="columnheader" scope="col">Guardian</th>
                <th className="px-4 py-3 text-center text-sm font-semibold sticky right-0 bg-primary-600 z-10 border-l border-primary-500" role="columnheader" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">Loading students...</p>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-16 text-center">
                    <div className="max-w-md mx-auto">
                      <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {hasActiveFilters ? 'No students found' : 'No students yet'}
                      </h3>
                      <p className="text-gray-500 mb-6">
                        {hasActiveFilters
                          ? 'Try adjusting your search criteria or clear filters to see more results.'
                          : 'Get started by adding your first student.'}
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="inline-flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Clear filters</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const imageUrls = getImageUrlWithFallback(student.profileImageUrl)
                  const imageUrl = imageUrls[0] || null
                  
                  return (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-4 py-3">
                        {imageUrl ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={student.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-semibold text-sm">
                              {student.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        <div className="truncate max-w-[150px]" title={student.name}>
                          {student.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="truncate max-w-[150px]" title={student.fatherName}>
                          {student.fatherName}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="truncate max-w-[180px]" title={student.email}>
                          {student.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{student.phone || '-'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {student.gradeName || student.grade?.name || `Grade ${student.gradeId}`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {student.sectionName || student.section?.name || `Section ${student.sectionId}`}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={student.status} size="sm" />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {student.guardianName ? (
                          <div className="truncate max-w-[150px]" title={student.guardianName}>
                            <span className="text-gray-700">{student.guardianName}</span>
                          </div>
                        ) : student.guardian ? (
                          <Link
                            href={`/dashboard/guardians/${student.guardian.id}`}
                            className="text-primary-600 hover:text-primary-700 hover:underline truncate max-w-[150px] block"
                            onClick={(e) => e.stopPropagation()}
                            title={student.guardian.fullName}
                          >
                            {student.guardian.fullName}
                          </Link>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 sticky right-0 bg-white group-hover:bg-gray-50 z-10 border-l border-gray-200 transition-colors">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => handleView(student)}
                            className="text-primary-600 hover:text-primary-700 p-1.5 rounded-lg hover:bg-primary-50 transition-colors"
                            aria-label={`View ${student.name}`}
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEdit(student)}
                            className="text-blue-600 hover:text-blue-700 p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                            aria-label={`Edit ${student.name}`}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="text-red-600 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            aria-label={`Delete ${student.name}`}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(page * pageSize, totalCount)}</span> of <span className="font-medium">{totalCount}</span> students
                </span>
                <div className="flex items-center space-x-2">
                  <label htmlFor="page-size-select" className="text-sm text-gray-700">
                    Show:
                  </label>
                  <select
                    id="page-size-select"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(parseInt(e.target.value))
                      setPage(1)
                    }}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    aria-label="Items per page"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Go to first page"
                >
                  First
                </button>
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="p-2 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center"
                  aria-label="Go to previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 px-2">Page</span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={page}
                    onChange={(e) => {
                      const newPage = parseInt(e.target.value)
                      if (newPage >= 1 && newPage <= totalPages) {
                        setPage(newPage)
                      }
                    }}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    aria-label="Current page number"
                  />
                  <span className="text-sm text-gray-700 px-2">of {totalPages}</span>
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="p-2 bg-primary-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center"
                  aria-label="Go to next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Go to last page"
                >
                  Last
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      {showModal && selectedStudent && (
        <StudentModal student={selectedStudent} onClose={() => setShowModal(false)} />
      )}

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <ConfirmationDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog(null)}
          onConfirm={confirmDialog.onConfirm}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText="Cancel"
          type={confirmDialog.type}
          isLoading={false}
        />
      )}
    </div>
  )
}

