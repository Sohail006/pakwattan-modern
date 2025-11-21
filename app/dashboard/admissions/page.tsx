'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getUserRoles, isAuthenticated } from '@/lib/api/auth'
import { getStudentsPaginated, Student, PaginatedStudentsParams } from '@/lib/api/students'
import { getGrades, Grade } from '@/lib/api/grades'
import { Loader2, AlertCircle, LogIn, Users, TrendingUp, Calendar, GraduationCap, Search, Filter, Eye, Edit, Trash2, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { deleteStudent } from '@/lib/api/students'
import StudentForm from '@/components/students/StudentForm'
import StudentModal from '@/components/students/StudentModal'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import { formatDate } from '@/lib/utils'

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

// Helper to check if URL has an extension
const hasExtension = (url: string): boolean => {
  const path = url.split('?')[0]
  const lastDot = path.lastIndexOf('.')
  const lastSlash = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'))
  return lastDot > lastSlash && lastDot < path.length - 1
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

// Helper to get image URL with fallback for old files without extensions
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

interface AdmissionStats {
  totalAdmissions: number
  activeAdmissions: number
  admissionsThisMonth: number
  admissionsByGrade: { gradeName: string; count: number }[]
}

export default function AdmissionsPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  
  const [students, setStudents] = useState<Student[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('')
  const [gradeFilter, setGradeFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  
  // Scroll indicator states
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)
  const tableScrollRef = useRef<HTMLDivElement>(null)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 25

  // Edit and delete state
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    type: 'danger' | 'warning' | 'info'
    title: string
    message: string
    confirmText: string
    onConfirm: () => void
  } | null>(null)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      setCheckingAuth(true)
      
      if (!isAuthenticated()) {
        setAuthError('You must be logged in to access this page.')
        setCheckingAuth(false)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
        return
      }

      const userRoles = getUserRoles()
      const canManage = userRoles.includes('Admin') || userRoles.includes('Staff')
      
      if (!canManage) {
        setAuthError('You do not have permission to access this page. Only Administrators and Staff can manage admissions.')
        setCheckingAuth(false)
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
        return
      }

      setCheckingAuth(false)
      setAuthError(null)
    }

    checkAuth()
  }, [router])

  const loadGrades = useCallback(async () => {
    try {
      const data = await getGrades()
      setGrades(data)
    } catch (err) {
      console.error('Error loading grades:', err)
    }
  }, [])

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: PaginatedStudentsParams = {
        page: currentPage,
        pageSize: itemsPerPage,
        searchTerm: searchTerm || undefined,
        gradeId: gradeFilter ? parseInt(gradeFilter) : undefined,
        status: statusFilter || undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }
      
      const response = await getStudentsPaginated(params)
      setStudents(response.data)
      setTotalCount(response.totalCount)
      setTotalPages(response.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load admissions. Please refresh the page and try again.')
    } finally {
      setLoading(false)
    }
  }, [currentPage, searchTerm, gradeFilter, statusFilter])

  useEffect(() => {
    if (!checkingAuth && !authError) {
      loadGrades()
    }
  }, [checkingAuth, authError, loadGrades])

  useEffect(() => {
    if (!checkingAuth && !authError) {
      loadStudents()
    }
  }, [checkingAuth, authError, loadStudents])

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

  // Calculate statistics
  const stats: AdmissionStats = useMemo(() => {
    const total = totalCount
    const active = students.filter(s => s.status === 'Active').length
    const thisMonth = students.filter(s => {
      const createdAt = new Date(s.createdAt)
      const now = new Date()
      return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()
    }).length
    
    const byGrade: { [key: string]: number } = {}
    students.forEach(student => {
      const gradeName = student.gradeName || 'Unknown'
      byGrade[gradeName] = (byGrade[gradeName] || 0) + 1
    })
    
    const admissionsByGrade = Object.entries(byGrade)
      .map(([gradeName, count]) => ({ gradeName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
    
    return {
      totalAdmissions: total,
      activeAdmissions: active,
      admissionsThisMonth: thisMonth,
      admissionsByGrade,
    }
  }, [students, totalCount])

  const handleSearch = () => {
    setCurrentPage(1)
    loadStudents()
  }

  const handleFilterChange = () => {
    setCurrentPage(1)
    loadStudents()
  }

  const handleView = (student: Student) => {
    setViewingStudent(student)
    setIsViewModalOpen(true)
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setIsFormOpen(true)
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
          setActionLoading(id)
          setError(null)
          await deleteStudent(id)
          setSuccess('Student deleted successfully')
          await loadStudents()
          setTimeout(() => setSuccess(null), 3000)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to delete student. Please try again.')
        } finally {
          setActionLoading(null)
        }
      },
    })
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingStudent(null)
  }

  const handleFormSuccess = (message?: string) => {
    setIsFormOpen(false)
    setEditingStudent(null)
    if (message) {
      setSuccess(message)
      setTimeout(() => setSuccess(null), 3000)
    }
    loadStudents()
  }

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{authError}</p>
          <div className="flex flex-col space-y-2">
            {authError.includes('logged in') ? (
              <Link
                href="/login"
                className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Go to Login</span>
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span>Go to Dashboard</span>
              </Link>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {authError.includes('logged in') ? 'Redirecting in 2 seconds...' : 'Redirecting in 3 seconds...'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <GraduationCap className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Student Admissions</h1>
        </div>
        <p className="text-gray-600">
          View and manage all enrolled students. These are students who have been admitted to the school.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          <span className="font-medium">Note:</span> To manage registration applications, visit the{' '}
          <Link href="/dashboard/registrations" className="text-primary-600 hover:text-primary-700 underline">
            Registrations
          </Link>{' '}
          page.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Admissions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalAdmissions}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeAdmissions}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.admissionsThisMonth}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">By Grade</p>
              <p className="text-sm text-gray-500 mt-2">
                {stats.admissionsByGrade.length > 0 
                  ? `${stats.admissionsByGrade[0]?.gradeName}: ${stats.admissionsByGrade[0]?.count}`
                  : 'No data'}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Grade Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={gradeFilter}
              onChange={(e) => {
                setGradeFilter(e.target.value)
                handleFilterChange()
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Grades</option>
              {grades.map(grade => (
                <option key={grade.id} value={grade.id.toString()}>{grade.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                handleFilterChange()
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Graduated">Graduated</option>
              <option value="Transferred">Transferred</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 mb-6">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 mb-6">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Students Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admissions...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Admissions Found</h3>
          <p className="text-gray-600">
            {searchTerm || gradeFilter || statusFilter
              ? 'Try adjusting your search or filter criteria.'
              : 'No students have been admitted yet.'}
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 relative">
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
              
              <table className="min-w-[1000px] w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Section
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Admission Date
                    </th>
                    <th className="sticky right-0 px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50 z-10 border-l border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => {
                    const imageUrls = getImageUrlWithFallback(student.profileImageUrl)
                    const imageUrl = imageUrls[0] || null
                    
                    return (
                    <tr key={student.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {imageUrl ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                              <Image
                                src={imageUrl}
                                alt={student.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold mr-3">
                              {student.name[0]}
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.gradeName || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.sectionName || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : student.status === 'Inactive'
                              ? 'bg-gray-100 text-gray-800'
                              : student.status === 'Suspended'
                              ? 'bg-red-100 text-red-800'
                              : student.status === 'Graduated'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(student.createdAt)}
                      </td>
                      <td className="sticky right-0 px-6 py-4 whitespace-nowrap text-right text-sm font-medium bg-white group-hover:bg-gray-50 z-10 border-l border-gray-200 transition-colors">
                        <div className="flex items-center justify-end space-x-2">
                          {actionLoading === student.id ? (
                            <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleView(student)
                                }}
                                className="text-primary-600 hover:text-primary-700 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                                title="View Details"
                                aria-label={`View ${student.name} details`}
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEdit(student)
                                }}
                                className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                title="Edit Student"
                                aria-label={`Edit ${student.name}`}
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDelete(student.id)
                                }}
                                className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                title="Delete Student"
                                aria-label={`Delete ${student.name}`}
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          )}
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, totalCount)}
                    </span>{' '}
                    of <span className="font-medium">{totalCount}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      First
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Last
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Student View Modal */}
      {isViewModalOpen && viewingStudent && (
        <StudentModal
          student={viewingStudent}
          onClose={() => {
            setIsViewModalOpen(false)
            setViewingStudent(null)
          }}
        />
      )}

      {/* Student Edit Form Modal */}
      {isFormOpen && editingStudent ? (
        <StudentForm
          student={editingStudent}
          mode="edit"
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      ) : null}

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
          isLoading={actionLoading !== null}
        />
      )}
    </div>
  )
}
