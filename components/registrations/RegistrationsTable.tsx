'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import Image from 'next/image'
import { Search, X, Trash2, Download, FileText, Loader2, AlertCircle, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Users, Calendar, GraduationCap, TrendingUp, Eye, CheckCircle2, Sparkles, Receipt, CheckCircle, XCircle, Clock } from 'lucide-react'
import { RegistrationResponse, getAllRegistrations, deleteRegistration, verifyReceipt } from '@/lib/api/registrations'
import { getAllScholarshipTypes } from '@/lib/api/admissionSettings'
import type { ScholarshipType } from '@/lib/api/admissionSettings'
import { generateRollNumberSlipPDF } from '@/lib/utils/pdfGenerator'
import { debounce, formatDate, formatTime } from '@/lib/utils'
import { getApiBaseUrl } from '@/lib/config'
import { exportRegistrationsToExcel } from '@/lib/utils/excelExportRegistrations'
import { formatPaymentMethod, getPaymentStatusDisplay, getReceiptStatusDisplay } from '@/lib/utils/paymentHelpers'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import { toastService } from '@/lib/utils/toast'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

type SortField = 'name' | 'rollNumber' | 'gradeId' | 'registrationDate' | 'fatherName' | 'scholarship' | 'paymentStatus' | 'receipt' | null
type SortOrder = 'asc' | 'desc'

export default function RegistrationsTable() {
  const [registrations, setRegistrations] = useState<RegistrationResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scholarshipTypes, setScholarshipTypes] = useState<ScholarshipType[]>([])
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState<string>('')
  const [filterScholarship, setFilterScholarship] = useState<string>('')
  const [filterPayment, setFilterPayment] = useState<string>('')

  // Debounce search to reduce filtering cost
  const debouncedSetSearch = useRef(
    debounce((value: string) => {
      setDebouncedSearchTerm(value)
    }, 300)
  ).current
  
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
  const [viewingReceipt, setViewingReceipt] = useState<RegistrationResponse | null>(null)
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [verificationNotes, setVerificationNotes] = useState('')
  const [verificationAction, setVerificationAction] = useState<'verify' | 'reject' | null>(null)
  const [verifyingReceipt, setVerifyingReceipt] = useState(false)
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

  // Load scholarship types for ID-to-name mapping
  useEffect(() => {
    const loadScholarshipTypes = async () => {
      try {
        const types = await getAllScholarshipTypes()
        setScholarshipTypes(types)
      } catch (error) {
        console.warn('[RegistrationsTable] Failed to load scholarship types:', error)
        // Continue without scholarship types - will show IDs as fallback
      }
    }
    loadScholarshipTypes()
  }, [])

  // Helper function to get payment status display text (using extracted utility)
  const getPaymentStatusDisplayMemo = useCallback((paymentStatus?: string, paymentMethod?: string): string => {
    return getPaymentStatusDisplay(paymentStatus, paymentMethod)
  }, [])

  // Filter and sort registrations
  useEffect(() => {
    debouncedSetSearch(searchTerm)
  }, [searchTerm, debouncedSetSearch])

  // Memoized filtering and sorting for performance
  const filteredRegistrations = useMemo(() => {
    let filtered = [...registrations]

    if (debouncedSearchTerm) {
      const term = debouncedSearchTerm.toLowerCase()
      filtered = filtered.filter(reg =>
        reg.name.toLowerCase().includes(term) ||
        reg.fatherName.toLowerCase().includes(term) ||
        reg.rollNumber?.toLowerCase().includes(term) ||
        reg.mobile?.toLowerCase().includes(term) ||
        reg.email?.toLowerCase().includes(term)
      )
    }

    if (filterGrade) {
      filtered = filtered.filter(reg => reg.gradeId.toString() === filterGrade)
    }

    if (filterScholarship) {
      if (filterScholarship === 'yes') {
        filtered = filtered.filter(reg => reg.applyForScholarship)
      } else if (filterScholarship === 'no') {
        filtered = filtered.filter(reg => !reg.applyForScholarship)
      }
    }

    if (filterPayment) {
      filtered = filtered.filter(reg => reg.paymentMethod.toLowerCase() === filterPayment.toLowerCase())
    }

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
          case 'fatherName':
            aVal = a.fatherName.toLowerCase()
            bVal = b.fatherName.toLowerCase()
            break
          case 'scholarship':
            aVal = a.applyForScholarship ? 1 : 0
            bVal = b.applyForScholarship ? 1 : 0
            break
          case 'paymentStatus':
            aVal = getPaymentStatusDisplayMemo(a.paymentStatus, a.paymentMethod).toLowerCase()
            bVal = getPaymentStatusDisplayMemo(b.paymentStatus, b.paymentMethod).toLowerCase()
            break
          case 'receipt':
            aVal = getReceiptStatusDisplay(a.transactionReceiptUrl, a.receiptVerificationStatus, a.paymentMethod).toLowerCase()
            bVal = getReceiptStatusDisplay(b.transactionReceiptUrl, b.receiptVerificationStatus, b.paymentMethod).toLowerCase()
            break
          default:
            return 0
        }

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [registrations, debouncedSearchTerm, filterGrade, filterScholarship, filterPayment, sortBy, sortOrder, getPaymentStatusDisplayMemo])

  // Create ID-to-name mapping for scholarship types
  const scholarshipTypeMap = useMemo(() => {
    const map = new Map<number, string>()
    scholarshipTypes.forEach(type => {
      map.set(type.id, type.name)
    })
    return map
  }, [scholarshipTypes])

  // Helper function to get payment status badge
  const getPaymentStatusBadge = (paymentStatus?: string, paymentMethod?: string) => {
    const displayText = getPaymentStatusDisplayMemo(paymentStatus, paymentMethod)
    const status = paymentStatus?.toLowerCase() || ''
    
    // Determine badge color based on display text
    // Green for: EasyPaisa, Bank Account, or Paid status
    if (displayText === 'EasyPaisa' || displayText === 'Bank Account' || status === 'paid' || displayText === 'Paid') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
          {displayText}
        </span>
      )
    }
    
    // Red for: Unpaid
    if (displayText === 'Unpaid' || status === 'unpaid') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md">
          {displayText}
        </span>
      )
    }
    
    // Yellow for: Pending or By Hand on Test Date
    if (displayText === 'Pending' || status === 'pending') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-md">
          {displayText}
        </span>
      )
    }
    
    // Default fallback (gray)
    return (
      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-gray-400 to-gray-500 text-white shadow-md">
        {displayText}
      </span>
    )
  }

  // Helper function to get receipt status badge
  const getReceiptStatusBadge = (
    receiptUrl?: string | null,
    verificationStatus?: string | null,
    paymentMethod?: string,
    onClick?: () => void
  ) => {
    const displayText = getReceiptStatusDisplay(receiptUrl, verificationStatus, paymentMethod)
    const status = verificationStatus?.toLowerCase() || ''

    // N/A - Not required
    if (displayText === 'N/A') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-gray-400 to-gray-500 text-white shadow-md">
          <span className="mr-1">-</span>
          N/A
        </span>
      )
    }

    // Verified - Green
    if (displayText === 'Verified' || status === 'verified') {
      return (
        <button
          onClick={onClick}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-200 cursor-pointer"
        >
          <CheckCircle className="w-3 h-3 mr-1.5" />
          Verified
        </button>
      )
    }

    // Rejected - Red
    if (displayText === 'Rejected' || status === 'rejected') {
      return (
        <button
          onClick={onClick}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200 cursor-pointer"
        >
          <XCircle className="w-3 h-3 mr-1.5" />
          Rejected
        </button>
      )
    }

    // Pending - Yellow
    if (displayText === 'Pending' || status === 'pending') {
      return (
        <button
          onClick={onClick}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 cursor-pointer"
        >
          <Clock className="w-3 h-3 mr-1.5" />
          Pending
        </button>
      )
    }

    // Missing - Red
    if (displayText === 'Missing') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md">
          <AlertCircle className="w-3 h-3 mr-1.5" />
          Missing
        </span>
      )
    }

    // Default fallback
    return (
      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-gray-400 to-gray-500 text-white shadow-md">
        {displayText}
      </span>
    )
  }

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, filterGrade, filterScholarship, filterPayment])

  // Clamp current page if filtered results shrink
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredRegistrations.length / itemsPerPage))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [filteredRegistrations.length, currentPage])

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
    const previousRegistrations = registrations
    
    setConfirmDialog({
      isOpen: true,
      type: 'danger',
      title: 'Delete Registration',
      message: `Are you sure you want to permanently delete the registration for ${studentName}? This action cannot be undone and all associated data will be lost.`,
      confirmText: 'Delete',
      onConfirm: async () => {
        setConfirmDialog(null)
        setDeletingId(id)
        // Optimistically remove from UI
        setRegistrations(prev => prev.filter(r => r.id !== id))
        try {
          await deleteRegistration(id)
          toastService.success('Registration deleted.')
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to delete registration.'
          setError(message)
          // Roll back on error
          setRegistrations(previousRegistrations)
          toastService.error(message)
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

  const handleViewReceipt = (registration: RegistrationResponse) => {
    setViewingReceipt(registration)
  }

  const handleVerifyReceipt = async (registrationId: number, status: 'Verified' | 'Rejected', notes?: string) => {
    try {
      setVerifyingReceipt(true)
      await verifyReceipt(registrationId, status, notes)
      toastService.success(`Receipt ${status.toLowerCase()} successfully.`)
      await loadRegistrations() // Refresh registrations
      setViewingReceipt(null)
      setShowVerificationDialog(false)
      setVerificationNotes('')
      setVerificationAction(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to verify receipt.'
      toastService.error(message)
    } finally {
      setVerifyingReceipt(false)
    }
  }

  const openVerificationDialog = (action: 'verify' | 'reject') => {
    setVerificationAction(action)
    setShowVerificationDialog(true)
  }

  const handleExportExcel = () => {
    if (filteredRegistrations.length === 0) {
      toastService.error('No registrations to export.')
      return
    }
    
    setExporting(true)
    try {
      exportRegistrationsToExcel(filteredRegistrations)
      toastService.success(`Successfully exported ${filteredRegistrations.length} registration(s) to Excel.`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to export to Excel.'
      toastService.error(message)
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
      <div className="space-y-6 animate-fade-in">
        {/* Statistics Cards Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 space-y-2">
                  <SkeletonLoader variant="text" width="60%" height="16px" />
                  <SkeletonLoader variant="text" width="40%" height="32px" />
                </div>
                <SkeletonLoader variant="default" width="48px" height="48px" className="rounded-lg" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Filters Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <SkeletonLoader variant="text" height="44px" className="sm:col-span-2 lg:col-span-2" />
            <SkeletonLoader variant="text" height="44px" />
            <SkeletonLoader variant="text" height="44px" />
            <SkeletonLoader variant="text" height="44px" />
          </div>
        </div>
        
        {/* Table Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4">
            <SkeletonLoader variant="text" height="24px" width="200px" className="mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonLoader key={i} variant="text" height="56px" />
              ))}
            </div>
          </div>
        </div>
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
    <div className="space-y-6 animate-fade-in">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md hover:border-primary-200 transition-all duration-300 group cursor-default">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate group-hover:text-primary-600 transition-colors">Total Registrations</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2 group-hover:text-primary-700 transition-colors">{stats.totalRegistrations}</p>
            </div>
            <div className="p-2 sm:p-3 bg-primary-100 rounded-lg flex-shrink-0 ml-2 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md hover:border-green-200 transition-all duration-300 group cursor-default">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate group-hover:text-green-600 transition-colors">Active Registrations</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2 group-hover:text-green-700 transition-colors">{stats.activeRegistrations}</p>
            </div>
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg flex-shrink-0 ml-2 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md hover:border-blue-200 transition-all duration-300 group cursor-default">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate group-hover:text-blue-600 transition-colors">This Month</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2 group-hover:text-blue-700 transition-colors">{stats.registrationsThisMonth}</p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg flex-shrink-0 ml-2 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md hover:border-purple-200 transition-all duration-300 group cursor-default">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate group-hover:text-purple-600 transition-colors">With Scholarship</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2 group-hover:text-purple-700 transition-colors">{stats.withScholarship}</p>
            </div>
            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg flex-shrink-0 ml-2 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 transition-shadow hover:shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, roll number, mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 min-h-[44px] hover:border-gray-400"
            />
          </div>

          {/* Grade Filter */}
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="px-3 sm:px-4 py-2.5 sm:py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 min-h-[44px] bg-white hover:border-gray-400 cursor-pointer"
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
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 min-h-[44px] hover:border-gray-400 cursor-pointer"
          >
            <option value="">All</option>
            <option value="yes">With Scholarship</option>
            <option value="no">Without Scholarship</option>
          </select>

          {/* Payment Method Filter */}
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 min-h-[44px] hover:border-gray-400 cursor-pointer"
          >
            <option value="">All Payment Methods</option>
            <option value="easypaisa">EasyPaisa</option>
            <option value="bankaccount">Bank Account</option>
            <option value="byhandontestdate">By Hand on Test Date</option>
          </select>
        </div>

        {(searchTerm || filterGrade || filterScholarship || filterPayment) && (
          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 animate-fade-in">
            <span className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
              Active Filters:
            </span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs sm:text-sm font-medium hover:bg-primary-200 transition-colors shadow-sm">
                Search: &quot;<span className="truncate max-w-[100px] sm:max-w-none">{searchTerm}</span>&quot;
                <button onClick={() => setSearchTerm('')} className="hover:text-primary-900 active:text-primary-800 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-primary-300 transition-colors" aria-label="Clear search filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterGrade && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-200 transition-colors shadow-sm">
                Grade: <span className="truncate max-w-[80px] sm:max-w-none">{registrations.find(r => r.gradeId.toString() === filterGrade)?.gradeName || filterGrade}</span>
                <button onClick={() => setFilterGrade('')} className="hover:text-blue-900 active:text-blue-800 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-blue-300 transition-colors" aria-label="Clear grade filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterScholarship && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm font-medium hover:bg-purple-200 transition-colors shadow-sm">
                Scholarship: {filterScholarship === 'yes' ? 'Yes' : 'No'}
                <button onClick={() => setFilterScholarship('')} className="hover:text-purple-900 active:text-purple-800 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-purple-300 transition-colors" aria-label="Clear scholarship filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterPayment && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors shadow-sm">
                Payment: <span className="truncate max-w-[100px] sm:max-w-none">{filterPayment}</span>
                <button onClick={() => setFilterPayment('')} className="hover:text-green-900 active:text-green-800 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-green-300 transition-colors" aria-label="Clear payment filter">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 active:text-primary-800 font-semibold flex items-center gap-1 ml-auto touch-target min-h-[44px] px-2 py-1 rounded-lg hover:bg-primary-50 transition-colors"
              aria-label="Clear all filters"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Clear All</span>
              <span className="sm:hidden">Clear</span>
            </button>
            <span className="text-xs sm:text-sm text-gray-600 ml-2 break-words">
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
          Registered Students ({filteredRegistrations.length})
        </h2>
        <button
          onClick={handleExportExcel}
          disabled={exporting || filteredRegistrations.length === 0}
          className="flex items-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 active:bg-green-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-target min-h-[44px] text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-md"
          aria-label="Export registrations to Excel"
        >
          {exporting ? (
            <>
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Export to Excel</span>
              <span className="sm:hidden">Export</span>
            </>
          )}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden relative w-full">
        <div 
          ref={tableScrollRef}
          className="overflow-x-auto relative w-full mobile-scroll"
          style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch', width: '100%' }}
        >
          {/* Left scroll indicator */}
          {showLeftScroll && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none z-20" />
          )}
          
          {/* Right scroll indicator */}
          {showRightScroll && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/95 to-transparent pointer-events-none z-20" />
          )}
          
          <div className="min-w-[1400px] w-full">
            <table className="w-full table-auto" role="table" aria-label="Registered students table" style={{ width: '100%', tableLayout: 'auto' }}>
              <thead className="sticky top-0 bg-gradient-to-r from-primary-600 via-primary-600 to-primary-700 text-white z-30 shadow-2xl" style={{ width: '100%', display: 'table-header-group' }}>
                <tr className="border-b-2 border-primary-800/30" style={{ width: '100%' }}>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-700/60 active:bg-primary-800/80 touch-target min-h-[52px] whitespace-nowrap transition-all duration-200 first:rounded-tl-2xl"
                    onClick={() => handleSort('rollNumber')}>
                    <div className="flex items-center gap-2">
                      <span className="drop-shadow-sm">Roll Number</span>
                      {sortBy === 'rollNumber' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 flex-shrink-0 drop-shadow-md" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 drop-shadow-md" />)}
                    </div>
                  </th>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-700/60 active:bg-primary-800/80 touch-target min-h-[52px] whitespace-nowrap transition-all duration-200"
                    onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-2">
                      <span className="drop-shadow-sm">Name</span>
                      {sortBy === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 flex-shrink-0 drop-shadow-md" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 drop-shadow-md" />)}
                    </div>
                  </th>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-700/60 active:bg-primary-800/80 touch-target min-h-[52px] hidden md:table-cell whitespace-nowrap transition-all duration-200"
                    onClick={() => handleSort('fatherName')}>
                    <div className="flex items-center gap-2">
                      <span className="drop-shadow-sm">Father Name</span>
                      {sortBy === 'fatherName' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 flex-shrink-0 drop-shadow-md" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 drop-shadow-md" />)}
                    </div>
                  </th>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-700/60 active:bg-primary-800/80 touch-target min-h-[52px] whitespace-nowrap transition-all duration-200"
                    onClick={() => handleSort('gradeId')}>
                    <div className="flex items-center gap-2">
                      <span className="drop-shadow-sm">Grade</span>
                      {sortBy === 'gradeId' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 flex-shrink-0 drop-shadow-md" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 drop-shadow-md" />)}
                    </div>
                  </th>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider hidden md:table-cell whitespace-nowrap">
                    <span className="drop-shadow-sm">Previous School</span>
                  </th>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider hidden sm:table-cell whitespace-nowrap">
                    <span className="drop-shadow-sm">Mobile</span>
                  </th>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-700/60 active:bg-primary-800/80 touch-target min-h-[52px] hidden lg:table-cell whitespace-nowrap transition-all duration-200"
                    onClick={() => handleSort('scholarship')}>
                    <div className="flex items-center gap-2">
                      <span className="drop-shadow-sm">Scholarship</span>
                      {sortBy === 'scholarship' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 flex-shrink-0 drop-shadow-md" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 drop-shadow-md" />)}
                    </div>
                  </th>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-700/60 active:bg-primary-800/80 touch-target min-h-[52px] hidden lg:table-cell whitespace-nowrap transition-all duration-200"
                    onClick={() => handleSort('paymentStatus')}>
                    <div className="flex items-center gap-2">
                      <span className="drop-shadow-sm">Payment Status</span>
                      {sortBy === 'paymentStatus' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 flex-shrink-0 drop-shadow-md" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 drop-shadow-md" />)}
                    </div>
                  </th>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-700/60 active:bg-primary-800/80 touch-target min-h-[52px] hidden lg:table-cell whitespace-nowrap transition-all duration-200"
                    onClick={() => handleSort('receipt')}>
                    <div className="flex items-center gap-2">
                      <span className="drop-shadow-sm">Receipt</span>
                      {sortBy === 'receipt' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 flex-shrink-0 drop-shadow-md" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 drop-shadow-md" />)}
                    </div>
                  </th>
                  <th className="px-4 sm:px-5 py-4 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer hover:bg-primary-700/60 active:bg-primary-800/80 touch-target min-h-[52px] hidden lg:table-cell whitespace-nowrap transition-all duration-200"
                    onClick={() => handleSort('registrationDate')}>
                    <div className="flex items-center gap-2">
                      <span className="drop-shadow-sm">Reg. Date</span>
                      {sortBy === 'registrationDate' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 flex-shrink-0 drop-shadow-md" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 drop-shadow-md" />)}
                    </div>
                  </th>
                  <th className="sticky right-0 px-4 sm:px-5 py-4 text-right text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-primary-700 to-primary-600 z-30 border-l-2 border-white/30 whitespace-nowrap shadow-[4px_0_12px_rgba(0,0,0,0.15)]">
                    <span className="drop-shadow-sm">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-3 sm:px-4 py-8 sm:py-12 text-center">
                    <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <Search className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900 mb-2">No registrations found</p>
                      <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
                        {searchTerm || filterGrade || filterScholarship || filterPayment
                          ? 'Try adjusting your filters to see more results'
                          : 'No registrations have been submitted yet'}
                      </p>
                      {(searchTerm || filterGrade || filterScholarship || filterPayment) && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-primary-600 hover:text-primary-700 font-semibold px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedRegistrations.map((reg, index) => (
                  <tr key={reg.id} className="group hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-transparent transition-all duration-300 animate-fade-in border-b border-gray-100/80 hover:border-primary-100" style={{ animationDelay: `${index * 20}ms` }}>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden">
                      <div className="min-w-0">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 truncate max-w-full">
                          {reg.rollNumber || <span className="text-primary-200">Pending</span>}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden">
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-gray-900 block truncate" title={reg.name}>{reg.name || '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden hidden md:table-cell">
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-gray-700 block truncate" title={reg.fatherName}>{reg.fatherName || '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden">
                      <div className="min-w-0">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 border border-gray-300/50 shadow-sm truncate max-w-full">
                          {reg.gradeName || `Grade ${reg.gradeId}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden hidden md:table-cell">
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-gray-700 block truncate" title={reg.previousSchoolName || '-'}>
                          {reg.previousSchoolName || '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden hidden sm:table-cell">
                      <div className="min-w-0">
                        {reg.mobile ? (
                          <a 
                            href={`tel:${reg.mobile}`}
                            className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline transition-all duration-200 inline-flex items-center gap-1.5 group/link truncate max-w-full"
                            title={`Call ${reg.mobile}`}
                            aria-label={`Call ${reg.mobile}`}
                          >
                            <span className="truncate">{reg.mobile}</span>
                            <span className="text-primary-400 group-hover/link:text-primary-600 transition-colors flex-shrink-0">📞</span>
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden hidden lg:table-cell">
                      <div className="min-w-0">
                        {reg.applyForScholarship ? (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md truncate max-w-full">
                            {reg.scholarshipType 
                              ? (scholarshipTypeMap.get(Number(reg.scholarshipType)) || reg.scholarshipType)
                              : 'Yes'}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400 font-medium">No</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden hidden lg:table-cell">
                      <div className="min-w-0">
                        {getPaymentStatusBadge(reg.paymentStatus, reg.paymentMethod)}
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden hidden lg:table-cell">
                      <div className="min-w-0">
                        {getReceiptStatusBadge(
                          reg.transactionReceiptUrl,
                          reg.receiptVerificationStatus,
                          reg.paymentMethod,
                          reg.transactionReceiptUrl || reg.receiptVerificationStatus ? () => handleViewReceipt(reg) : undefined
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-4 overflow-hidden hidden lg:table-cell">
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-gray-700 block">{formatDate(reg.registrationDate)}</span>
                      </div>
                    </td>
                    <td className="sticky right-0 px-4 sm:px-5 py-4 whitespace-nowrap text-right text-sm font-medium bg-white group-hover:bg-gradient-to-l group-hover:from-primary-50/50 group-hover:to-white z-10 border-l-2 border-gray-200 group-hover:border-primary-200 transition-all duration-300">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewingDetails(reg)}
                          className="text-blue-600 hover:text-blue-700 active:text-blue-800 p-2 rounded-xl hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                          title="View Details"
                          aria-label="View registration details"
                        >
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={() => handlePrintSlip(reg)}
                          className="text-primary-600 hover:text-primary-700 active:text-primary-800 p-2 rounded-xl hover:bg-primary-50 active:bg-primary-100 transition-all duration-200 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                          title="Print Roll Number Slip"
                          aria-label="Print roll number slip"
                        >
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(reg.id)}
                          disabled={deletingId === reg.id}
                          className="text-red-600 hover:text-red-700 active:text-red-800 p-2 rounded-xl hover:bg-red-50 active:bg-red-100 transition-all duration-200 disabled:opacity-50 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-110 active:scale-95 disabled:hover:scale-100 shadow-sm hover:shadow-md"
                          title="Delete"
                          aria-label="Delete registration"
                        >
                          {deletingId === reg.id ? (
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
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
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 px-6 py-4 flex items-center justify-between border-t-2 border-gray-200/60">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Showing <span className="font-bold text-primary-700">{startIndex + 1}</span> to <span className="font-bold text-primary-700">{Math.min(endIndex, filteredRegistrations.length)}</span> of <span className="font-bold text-primary-700">{filteredRegistrations.length}</span> results
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2.5 border-2 border-gray-300 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:border-primary-400 hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 bg-white"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-sm font-bold text-gray-800 px-4 py-2 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 border-2 border-gray-300 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:border-primary-400 hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 bg-white"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {viewingDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up border border-gray-200">
            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 flex items-center justify-between shadow-lg">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                Registration Details
              </h2>
              <button
                onClick={() => setViewingDetails(null)}
                className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Student Name</p>
                  <p className="text-gray-900 font-medium">{viewingDetails.name}</p>
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
                  <p className="text-sm font-semibold text-gray-500 mb-1">Payment Method</p>
                  <p className="text-gray-900">{viewingDetails.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Scholarship</p>
                  <p className="text-gray-900">
                    {viewingDetails.applyForScholarship 
                      ? (viewingDetails.scholarshipType 
                          ? (scholarshipTypeMap.get(Number(viewingDetails.scholarshipType)) || viewingDetails.scholarshipType)
                          : 'Yes') 
                      : 'No'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Payment Status</p>
                  <div className="mt-1">
                    {getPaymentStatusBadge(viewingDetails.paymentStatus, viewingDetails.paymentMethod)}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-1">Payment Method</p>
                  <p className="text-gray-900">{viewingDetails.paymentMethod || '-'}</p>
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
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200 shadow-lg">
              <button
                onClick={() => handlePrintSlip(viewingDetails)}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>Print Roll Slip</span>
              </button>
              <button
                onClick={() => setViewingDetails(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt View Modal */}
      {viewingReceipt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-slide-up border border-gray-200">
            <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 flex items-center justify-between shadow-lg z-10">
              <div>
                <h2 className="text-2xl font-bold mb-1">Transaction Receipt</h2>
                <p className="text-primary-100 text-sm">
                  {viewingReceipt.name} • Registration #{viewingReceipt.id}
                </p>
              </div>
              <button
                onClick={() => {
                  setViewingReceipt(null)
                  setShowVerificationDialog(false)
                  setVerificationNotes('')
                  setVerificationAction(null)
                }}
                className="text-white hover:text-gray-200 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 bg-gray-50">
              {/* Receipt Image */}
              {viewingReceipt.transactionReceiptUrl ? (
                <div className="bg-white rounded-lg border-2 border-gray-200 p-4 mb-4">
                  <div className="relative">
                    <Image
                      src={viewingReceipt.transactionReceiptUrl.startsWith('http') 
                        ? viewingReceipt.transactionReceiptUrl 
                        : `${getApiBaseUrl()}${viewingReceipt.transactionReceiptUrl.startsWith('/') ? '' : '/'}${viewingReceipt.transactionReceiptUrl}`}
                      alt="Transaction Receipt"
                      width={800}
                      height={600}
                      className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                      unoptimized={true}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg border-2 border-gray-200 p-8 text-center">
                  <Receipt className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 font-medium">No receipt uploaded</p>
                </div>
              )}

              {/* Verification Status */}
              {viewingReceipt.receiptVerificationStatus && (
                <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-gray-700">Verification Status:</span>
                    {getReceiptStatusBadge(
                      viewingReceipt.transactionReceiptUrl,
                      viewingReceipt.receiptVerificationStatus,
                      viewingReceipt.paymentMethod
                    )}
                  </div>
                  {viewingReceipt.receiptVerifiedBy && (
                    <p className="text-sm text-gray-600">
                      Verified by: <span className="font-medium">{viewingReceipt.receiptVerifiedBy}</span>
                    </p>
                  )}
                  {viewingReceipt.receiptVerifiedAt && (
                    <p className="text-sm text-gray-600">
                      Verified at: <span className="font-medium">{formatDate(viewingReceipt.receiptVerifiedAt)}</span>
                    </p>
                  )}
                  {viewingReceipt.receiptVerificationNotes && (
                    <p className="text-sm text-gray-600 mt-2">
                      Notes: <span className="font-medium">{viewingReceipt.receiptVerificationNotes}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              {viewingReceipt.transactionReceiptUrl && (
                <div className="flex items-center gap-3 flex-wrap">
                  {viewingReceipt.receiptVerificationStatus !== 'Verified' && (
                    <button
                      onClick={() => openVerificationDialog('verify')}
                      disabled={verifyingReceipt}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Mark as Verified
                    </button>
                  )}
                  {viewingReceipt.receiptVerificationStatus !== 'Rejected' && (
                    <button
                      onClick={() => openVerificationDialog('reject')}
                      disabled={verifyingReceipt}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  )}
                  <a
                    href={viewingReceipt.transactionReceiptUrl.startsWith('http') 
                      ? viewingReceipt.transactionReceiptUrl 
                      : `${getApiBaseUrl()}${viewingReceipt.transactionReceiptUrl.startsWith('/') ? '' : '/'}${viewingReceipt.transactionReceiptUrl}`}
                    download
                    className="px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Verification Dialog */}
      {showVerificationDialog && viewingReceipt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-slide-up border border-gray-200">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {verificationAction === 'verify' ? 'Verify Receipt' : 'Reject Receipt'}
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {verificationAction === 'reject' ? 'Rejection Reason (Optional)' : 'Notes (Optional)'}
                </label>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                  placeholder={verificationAction === 'reject' ? 'Enter reason for rejection...' : 'Enter verification notes...'}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (verificationAction === 'verify') {
                      handleVerifyReceipt(viewingReceipt.id, 'Verified', verificationNotes || undefined)
                    } else {
                      handleVerifyReceipt(viewingReceipt.id, 'Rejected', verificationNotes || undefined)
                    }
                  }}
                  disabled={verifyingReceipt}
                  className={`flex-1 font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    verificationAction === 'verify'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                      : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                  }`}
                >
                  {verifyingReceipt ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Confirm'
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowVerificationDialog(false)
                    setVerificationNotes('')
                    setVerificationAction(null)
                  }}
                  disabled={verifyingReceipt}
                  className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
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

