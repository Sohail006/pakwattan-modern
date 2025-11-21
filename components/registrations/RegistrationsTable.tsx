'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Search, X, Trash2, Download, FileText, Loader2, AlertCircle, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Users, Calendar, GraduationCap, TrendingUp, Eye } from 'lucide-react'
import { RegistrationResponse, getAllRegistrations, deleteRegistration } from '@/lib/api/registrations'
import { generateRollNumberSlipPDF } from '@/lib/utils/pdfGenerator'
import { formatDate, formatTime } from '@/lib/utils'
import { exportRegistrationsToExcel } from '@/lib/utils/excelExportRegistrations'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'

type SortField = 'name' | 'rollNumber' | 'gradeId' | 'registrationDate' | null
type SortOrder = 'asc' | 'desc'

export default function RegistrationsTable() {
  const [registrations, setRegistrations] = useState<RegistrationResponse[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState<string>('')
  const [filterScholarship, setFilterScholarship] = useState<string>('')
  const [filterPayment, setFilterPayment] = useState<string>('')
  
  // Sort state
  const [sortBy, setSortBy] = useState<SortField>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 25 // Fixed items per page
  
  // Action states
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [exporting, setExporting] = useState(false)
  const [viewingDetails, setViewingDetails] = useState<RegistrationResponse | null>(null)
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

  // Load registrations
  const loadRegistrations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllRegistrations()
      setRegistrations(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load registrations.'
      setError(message)
      console.error('Error loading registrations:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadRegistrations()
  }, [loadRegistrations])

  // Filter and sort registrations
  useEffect(() => {
    let filtered = [...registrations]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(reg =>
        reg.name.toLowerCase().includes(term) ||
        reg.fatherName.toLowerCase().includes(term) ||
        reg.rollNumber?.toLowerCase().includes(term) ||
        reg.mobile?.toLowerCase().includes(term) ||
        reg.email?.toLowerCase().includes(term)
      )
    }

    // Apply grade filter
    if (filterGrade) {
      filtered = filtered.filter(reg => reg.gradeId.toString() === filterGrade)
    }

    // Apply scholarship filter
    if (filterScholarship) {
      if (filterScholarship === 'yes') {
        filtered = filtered.filter(reg => reg.applyForScholarship)
      } else if (filterScholarship === 'no') {
        filtered = filtered.filter(reg => !reg.applyForScholarship)
      }
    }

    // Apply payment method filter
    if (filterPayment) {
      filtered = filtered.filter(reg => reg.paymentMethod.toLowerCase() === filterPayment.toLowerCase())
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        let aVal: string | number
        let bVal: string | number

        switch (sortBy) {
          case 'name':
            aVal = a.name.toLowerCase()
            bVal = b.name.toLowerCase()
            break
          case 'rollNumber':
            aVal = a.rollNumber || ''
            bVal = b.rollNumber || ''
            break
          case 'gradeId':
            aVal = a.gradeId
            bVal = b.gradeId
            break
          case 'registrationDate':
            aVal = new Date(a.registrationDate).getTime()
            bVal = new Date(b.registrationDate).getTime()
            break
          default:
            return 0
        }

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    setFilteredRegistrations(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [registrations, searchTerm, filterGrade, filterScholarship, filterPayment, sortBy, sortOrder])

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const handleDelete = (id: number) => {
    const registration = registrations.find(r => r.id === id)
    const studentName = registration ? registration.name : 'this registration'
    
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete Registration',
      message: `Are you sure you want to permanently delete the registration for ${studentName}? This action cannot be undone and all associated data will be lost.`,
      confirmText: 'Delete',
      onConfirm: async () => {
        setConfirmDialog(null)
        setDeletingId(id)
        try {
          await deleteRegistration(id)
          await loadRegistrations()
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to delete registration.'
          setError(message)
        } finally {
          setDeletingId(null)
        }
      },
    })
  }

  const handlePrintSlip = (registration: RegistrationResponse) => {
    generateRollNumberSlipPDF(registration).catch((error) => {
      console.error('Error generating PDF:', error)
      setError('Failed to generate PDF. Please try again.')
    })
  }

  const handleExportExcel = () => {
    if (filteredRegistrations.length === 0) {
      alert('No registrations to export.')
      return
    }
    
    setExporting(true)
    try {
      exportRegistrationsToExcel(filteredRegistrations)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to export to Excel.')
    } finally {
      setTimeout(() => setExporting(false), 1000)
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex)

  const clearFilters = () => {
    setSearchTerm('')
    setFilterGrade('')
    setFilterScholarship('')
    setFilterPayment('')
  }

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
      // Check initial state
      handleScroll()
      
      // Check on window resize
      window.addEventListener('resize', handleScroll)
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [filteredRegistrations.length]) // Re-check when data changes

  // Calculate statistics
  const stats = useMemo(() => {
    const total = registrations.length
    const active = registrations.filter(r => r.isActive).length
    const thisMonth = registrations.filter(r => {
      const regDate = new Date(r.registrationDate)
      const now = new Date()
      return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear()
    }).length
    
    const withScholarship = registrations.filter(r => r.applyForScholarship).length
    
    const byGrade: { [key: string]: number } = {}
    registrations.forEach(reg => {
      const gradeName = reg.gradeName || `Grade ${reg.gradeId}`
      byGrade[gradeName] = (byGrade[gradeName] || 0) + 1
    })
    
    const admissionsByGrade = Object.entries(byGrade)
      .map(([gradeName, count]) => ({ gradeName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
    
    return {
      totalRegistrations: total,
      activeRegistrations: active,
      registrationsThisMonth: thisMonth,
      withScholarship,
      byGrade: admissionsByGrade,
    }
  }, [registrations])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <p className="text-red-800">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Registrations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalRegistrations}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Registrations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeRegistrations}</p>
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
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.registrationsThisMonth}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">With Scholarship</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.withScholarship}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, roll number, mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Grade Filter */}
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Grades</option>
            {Array.from(new Set(registrations.map(r => r.gradeId))).sort().map(gradeId => {
              const reg = registrations.find(r => r.gradeId === gradeId)
              return (
                <option key={gradeId} value={gradeId.toString()}>
                  {reg?.gradeName || `Grade ${gradeId}`}
                </option>
              )
            })}
          </select>

          {/* Scholarship Filter */}
          <select
            value={filterScholarship}
            onChange={(e) => setFilterScholarship(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All</option>
            <option value="yes">With Scholarship</option>
            <option value="no">Without Scholarship</option>
          </select>

          {/* Payment Method Filter */}
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Payment Methods</option>
            <option value="easypaisa">EasyPaisa</option>
            <option value="bankaccount">Bank Account</option>
            <option value="byhandontestdate">By Hand on Test Date</option>
          </select>
        </div>

        {(searchTerm || filterGrade || filterScholarship || filterPayment) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                Search: &quot;{searchTerm}&quot;
                <button onClick={() => setSearchTerm('')} className="hover:text-primary-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterGrade && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Grade: {registrations.find(r => r.gradeId.toString() === filterGrade)?.gradeName || filterGrade}
                <button onClick={() => setFilterGrade('')} className="hover:text-blue-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterScholarship && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Scholarship: {filterScholarship === 'yes' ? 'Yes' : 'No'}
                <button onClick={() => setFilterScholarship('')} className="hover:text-purple-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterPayment && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Payment: {filterPayment}
                <button onClick={() => setFilterPayment('')} className="hover:text-green-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 ml-auto"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
            <span className="text-sm text-gray-600 ml-2">
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Registered Students ({filteredRegistrations.length})
        </h2>
        <button
          onClick={handleExportExcel}
          disabled={exporting || filteredRegistrations.length === 0}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {exporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Export to Excel</span>
            </>
          )}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
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
          
          <table className="min-w-[1200px] w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('rollNumber')}>
                  <div className="flex items-center gap-2">
                    Roll Number
                    {sortBy === 'rollNumber' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-2">
                    Name
                    {sortBy === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Father Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Mobile</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Scholarship</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Test Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Test Venue</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('registrationDate')}>
                  <div className="flex items-center gap-2">
                    Registration Date
                    {sortBy === 'registrationDate' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </div>
                </th>
                <th className="sticky right-0 px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50 z-10 border-l border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900 mb-2">No registrations found</p>
                      <p className="text-sm text-gray-500 mb-4">
                        {searchTerm || filterGrade || filterScholarship || filterPayment
                          ? 'Try adjusting your filters to see more results'
                          : 'No registrations have been submitted yet'}
                      </p>
                      {(searchTerm || filterGrade || filterScholarship || filterPayment) && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedRegistrations.map((reg) => (
                  <tr key={reg.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-semibold bg-primary-100 text-primary-800">
                        {reg.rollNumber || 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{reg.name}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{reg.fatherName}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {reg.gradeName || `Grade ${reg.gradeId}`}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{reg.mobile || '-'}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {reg.applyForScholarship ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {reg.scholarshipType || 'Yes'}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{reg.testDate ? formatDate(reg.testDate) : '-'}</span>
                      {reg.testTime && (
                        <span className="text-xs text-gray-500 block">{formatTime(reg.testTime)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {reg.testVenue || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{formatDate(reg.registrationDate)}</span>
                    </td>
                    <td className="sticky right-0 px-4 py-3 whitespace-nowrap text-right text-sm font-medium bg-white group-hover:bg-gray-50 z-10 border-l border-gray-200 transition-colors">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewingDetails(reg)}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          title="View Details"
                          aria-label="View registration details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handlePrintSlip(reg)}
                          className="text-primary-600 hover:text-primary-900 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                          title="Print Roll Number Slip"
                          aria-label="Print roll number slip"
                        >
                          <FileText className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(reg.id)}
                          disabled={deletingId === reg.id}
                          className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete"
                          aria-label="Delete registration"
                        >
                          {deletingId === reg.id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredRegistrations.length)} of {filteredRegistrations.length} results
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {viewingDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Registration Details</h2>
              <button
                onClick={() => setViewingDetails(null)}
                className="text-white hover:text-gray-200 p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Student Name</p>
                  <p className="text-gray-900">{viewingDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Father Name</p>
                  <p className="text-gray-900">{viewingDetails.fatherName}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Date of Birth</p>
                  <p className="text-gray-900">{formatDate(viewingDetails.dob)}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Gender</p>
                  <p className="text-gray-900">{viewingDetails.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Grade</p>
                  <p className="text-gray-900">{viewingDetails.gradeName || `Grade ${viewingDetails.gradeId}`}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Roll Number</p>
                  <p className="text-gray-900">{viewingDetails.rollNumber || 'Pending'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Mobile</p>
                  <p className="text-gray-900">{viewingDetails.mobile || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">WhatsApp</p>
                  <p className="text-gray-900">{viewingDetails.whatsApp || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Email</p>
                  <p className="text-gray-900">{viewingDetails.email || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Form B/CNIC</p>
                  <p className="text-gray-900">{viewingDetails.formBorCNIC || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Previous School</p>
                  <p className="text-gray-900">{viewingDetails.previousSchoolName || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Boarder/Day Scholar</p>
                  <p className="text-gray-900">{viewingDetails.boarderDayScholar}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Payment Method</p>
                  <p className="text-gray-900">{viewingDetails.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Scholarship</p>
                  <p className="text-gray-900">
                    {viewingDetails.applyForScholarship 
                      ? (viewingDetails.scholarshipType || 'Yes') 
                      : 'No'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Registration Date</p>
                  <p className="text-gray-900">{formatDate(viewingDetails.registrationDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Test Date</p>
                  <p className="text-gray-900">{viewingDetails.testDate ? formatDate(viewingDetails.testDate) : '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Test Time</p>
                  <p className="text-gray-900">{viewingDetails.testTime ? formatTime(viewingDetails.testTime) : '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Test Venue</p>
                  <p className="text-gray-900">{viewingDetails.testVenue || '-'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    viewingDetails.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {viewingDetails.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              {viewingDetails.address1 && (
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Address</p>
                  <p className="text-gray-900">{viewingDetails.address1}</p>
                </div>
              )}
            </div>
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => handlePrintSlip(viewingDetails)}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Print Roll Slip</span>
              </button>
              <button
                onClick={() => setViewingDetails(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
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
          isLoading={deletingId !== null}
        />
      )}
    </div>
  )
}

