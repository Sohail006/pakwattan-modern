'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Edit, Trash2, Eye, Users, Loader2, Search, X, AlertCircle, Download, Edit2, Keyboard } from 'lucide-react'
import { Student, getStudentsPaginated, PaginatedResponse, PaginatedStudentsParams, deleteStudent, bulkUpdateStudents } from '@/lib/api/students'
import { Grade, getGrades } from '@/lib/api/grades'
import { Section, getSections } from '@/lib/api/sections'
import { getCampuses, Campus } from '@/lib/api/campuses'
import { getSessions, Session } from '@/lib/api/sessions'
import Image from 'next/image'
import Link from 'next/link'
import StatusBadge from '@/components/ui/StatusBadge'
import StudentModal from './StudentModal'
import BulkEditToolbar from './BulkEditToolbar'
import EditableCell from './EditableCell'
import BulkEditPreview from './BulkEditPreview'
import { exportStudentsToExcel } from '@/lib/utils/excelExport'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog'
import { getApiBaseUrl } from '@/lib/config'
import { validatePakistanPhoneNumber } from '@/lib/utils'

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

  // Bulk edit state
  const [isBulkEditMode, setIsBulkEditMode] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null)
  const [editedValues, setEditedValues] = useState<Record<number, Partial<Student>>>({})
  const [originalValues, setOriginalValues] = useState<Record<number, Student>>({})
  const [validationErrors, setValidationErrors] = useState<Record<number, Record<string, string>>>({})
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)
  const [history, setHistory] = useState<Array<Record<number, Partial<Student>>>>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentFocusedCell, setCurrentFocusedCell] = useState<{ studentId: number; field: string } | null>(null)

  // Load grades, sections, campuses, and sessions
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [gradesData, sectionsData, campusesData, sessionsData] = await Promise.all([
          getGrades(true),
          getSections(true),
          getCampuses(true),
          getSessions(true)
        ])
        setGrades(gradesData)
        setSections(sectionsData)
        setCampuses(campusesData)
        setSessions(sessionsData)
      } catch (err) {
        console.error('Error loading filters:', err)
      }
    }
    loadFilters()
  }, [])

  // Store original values when entering bulk edit mode
  useEffect(() => {
    if (isBulkEditMode && students.length > 0) {
      const originals: Record<number, Student> = {}
      students.forEach(student => {
        originals[student.id] = { ...student }
      })
      setOriginalValues(originals)
    }
  }, [isBulkEditMode, students])

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

  // Field configuration for bulk editing
  const fieldConfigs = useMemo(() => {
    const statusOptions = [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
      { value: 'Suspended', label: 'Suspended' },
      { value: 'Graduated', label: 'Graduated' },
      { value: 'Transferred', label: 'Transferred' }
    ]

    return {
      name: {
        type: 'text' as const,
        label: 'Student Name',
        required: true,
        validation: (value: string | number) => {
          const str = String(value).trim()
          if (!str || str.length < 2) {
            return 'Name must be at least 2 characters'
          }
          return null
        }
      },
      fatherName: {
        type: 'text' as const,
        label: 'Father Name',
        required: true,
        validation: (value: string | number) => {
          const str = String(value).trim()
          if (!str || str.length < 2) {
            return 'Father name must be at least 2 characters'
          }
          return null
        }
      },
      dateOfBirth: {
        type: 'date' as const,
        label: 'Date of Birth',
        required: true,
        validation: (value: string | number) => {
          const str = String(value)
          if (!str) {
            return 'Date of birth is required'
          }
          const date = new Date(str)
          if (isNaN(date.getTime())) {
            return 'Invalid date'
          }
          if (date > new Date()) {
            return 'Date cannot be in the future'
          }
          return null
        }
      },
      phone: {
        type: 'tel' as const,
        label: 'Phone',
        required: false,
        validation: (value: string | number) => {
          const str = String(value).trim()
          if (str && !validatePakistanPhoneNumber(str).valid) {
            return 'Invalid phone format (03XX-XXXXXXX)'
          }
          return null
        }
      },
      whatsApp: {
        type: 'tel' as const,
        label: 'WhatsApp',
        required: false,
        validation: (value: string | number) => {
          const str = String(value).trim()
          if (str && !validatePakistanPhoneNumber(str).valid) {
            return 'Invalid WhatsApp format (03XX-XXXXXXX)'
          }
          return null
        }
      },
      status: {
        type: 'select' as const,
        label: 'Status',
        required: true,
        options: statusOptions,
        validation: (value: string | number) => {
          const validStatuses = ['Active', 'Inactive', 'Suspended', 'Graduated', 'Transferred']
          if (!validStatuses.includes(String(value))) {
            return 'Invalid status'
          }
          return null
        }
      },
      gradeId: {
        type: 'select' as const,
        label: 'Grade',
        required: true,
        options: grades.map(g => ({ value: g.id, label: g.name })),
        validation: (value: string | number) => {
          const num = typeof value === 'number' ? value : parseInt(String(value))
          if (!num || num === 0) {
            return 'Please select a grade'
          }
          return null
        }
      },
      sectionId: {
        type: 'select' as const,
        label: 'Section',
        required: true,
        options: sections.map(s => ({ value: s.id, label: s.name })),
        validation: (value: string | number) => {
          const num = typeof value === 'number' ? value : parseInt(String(value))
          if (!num || num === 0) {
            return 'Please select a section'
          }
          return null
        }
      },
      campusId: {
        type: 'select' as const,
        label: 'Campus',
        required: true,
        options: campuses.map(c => ({ value: c.id, label: c.name })),
        validation: (value: string | number) => {
          const num = typeof value === 'number' ? value : parseInt(String(value))
          if (!num || num === 0) {
            return 'Please select a campus'
          }
          return null
        }
      },
      sessionId: {
        type: 'select' as const,
        label: 'Session',
        required: true,
        options: sessions.map(s => ({ value: s.id, label: s.name })),
        validation: (value: string | number) => {
          const num = typeof value === 'number' ? value : parseInt(String(value))
          if (!num || num === 0) {
            return 'Please select a session'
          }
          return null
        }
      },
      address: {
        type: 'text' as const,
        label: 'Address',
        required: false,
        validation: () => null
      },
      previousSchool: {
        type: 'text' as const,
        label: 'Previous School',
        required: false,
        validation: () => null
      }
    }
  }, [grades, sections, campuses, sessions])

  // Editable columns for toolbar
  const editableColumns = useMemo(() => [
    { value: 'name', label: 'Student Name' },
    { value: 'fatherName', label: 'Father Name' },
    { value: 'dateOfBirth', label: 'Date of Birth' },
    { value: 'phone', label: 'Phone' },
    { value: 'whatsApp', label: 'WhatsApp' },
    { value: 'status', label: 'Status' },
    { value: 'gradeId', label: 'Grade' },
    { value: 'sectionId', label: 'Section' },
    { value: 'campusId', label: 'Campus' },
    { value: 'sessionId', label: 'Session' },
    { value: 'address', label: 'Address' },
    { value: 'previousSchool', label: 'Previous School' }
  ], [])

  // Handle cell edit (defined first for use in other handlers)
  const handleCellEdit = useCallback((
    studentId: number,
    field: string,
    value: string | number,
    skipHistory = false
  ) => {
    // Convert date to ISO format if needed
    let processedValue: string | number = value
    if (field === 'dateOfBirth' && typeof value === 'string' && value) {
      // If it's a date string (YYYY-MM-DD), convert to ISO
      if (!value.includes('T')) {
        const date = new Date(value)
        if (!isNaN(date.getTime())) {
          processedValue = date.toISOString()
        }
      }
    }

    setEditedValues(prev => {
      const newState = {
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [field]: processedValue
        }
      }
      
      // Save to history after state update (debounced)
      if (!skipHistory) {
        setTimeout(() => {
          setHistory(prev => {
            const newHistory = prev.slice(0, historyIndex + 1)
            newHistory.push({ ...newState })
            return newHistory.slice(-50)
          })
          setHistoryIndex(prev => Math.min(prev + 1, 49))
        }, 100)
      }
      
      return newState
    })

    // Validate field
    const fieldConfig = fieldConfigs[field as keyof typeof fieldConfigs]
    if (fieldConfig?.validation) {
      // Convert to string or number for validation
      const valueForValidation: string | number = typeof processedValue === 'string' || typeof processedValue === 'number'
        ? processedValue
        : String(processedValue)
      
      const error = fieldConfig.validation(valueForValidation)
      if (error) {
        setValidationErrors(prev => ({
          ...prev,
          [studentId]: {
            ...prev[studentId],
            [field]: error
          }
        }))
      } else {
        // Clear error
        setValidationErrors(prev => {
          const newErrors = { ...prev }
          if (newErrors[studentId]) {
            delete newErrors[studentId][field]
            if (Object.keys(newErrors[studentId]).length === 0) {
              delete newErrors[studentId]
            }
          }
          return newErrors
        })
      }
    }
  }, [fieldConfigs, historyIndex])

  // Handle keyboard navigation between cells
  useEffect(() => {
    const handleMoveToNextCell = (event: CustomEvent<{ studentId: number; field: string; direction: 'up' | 'down' }>) => {
      if (!selectedColumn || !isBulkEditMode) return
      
      const { studentId, field, direction } = event.detail
      const currentIndex = students.findIndex(s => s.id === studentId)
      
      if (currentIndex === -1) return
      
      const nextIndex = direction === 'down' ? currentIndex + 1 : currentIndex - 1
      
      if (nextIndex >= 0 && nextIndex < students.length) {
        const nextStudent = students[nextIndex]
        setCurrentFocusedCell({ studentId: nextStudent.id, field })
        
        // Focus the cell after a brief delay
        setTimeout(() => {
          const container = document.querySelector(`[data-student-id="${nextStudent.id}"][data-field="${field}"]`)
          const element = container?.querySelector('input, select') as HTMLElement
          if (element) {
            element.focus()
            if (element instanceof HTMLInputElement) {
              element.select()
            }
          }
        }, 50)
      }
    }

    window.addEventListener('moveToNextCell', handleMoveToNextCell as EventListener)
    return () => {
      window.removeEventListener('moveToNextCell', handleMoveToNextCell as EventListener)
    }
  }, [selectedColumn, isBulkEditMode, students])

  // Save draft to localStorage
  useEffect(() => {
    if (isBulkEditMode && Object.keys(editedValues).length > 0) {
      const draft = {
        editedValues,
        selectedColumn,
        timestamp: Date.now()
      }
      localStorage.setItem('bulkEditDraft', JSON.stringify(draft))
    }
  }, [editedValues, selectedColumn, isBulkEditMode])

  // Load draft from localStorage on mount
  useEffect(() => {
    if (isBulkEditMode) {
      const draftStr = localStorage.getItem('bulkEditDraft')
      if (draftStr) {
        try {
          const draft = JSON.parse(draftStr)
          // Only restore if draft is less than 1 hour old
          if (Date.now() - draft.timestamp < 3600000) {
            setEditedValues(draft.editedValues || {})
            if (draft.selectedColumn) {
              setSelectedColumn(draft.selectedColumn)
            }
          } else {
            localStorage.removeItem('bulkEditDraft')
          }
        } catch {
          localStorage.removeItem('bulkEditDraft')
        }
      }
    }
  }, [isBulkEditMode])

  // Check for validation errors
  const hasValidationErrors = useMemo(() => {
    return Object.keys(validationErrors).length > 0
  }, [validationErrors])

  // Computed values for undo/redo
  const canUndo = historyIndex >= 0
  const canRedo = historyIndex < history.length - 1

  // Save to history for undo/redo
  const saveToHistory = useCallback(() => {
    const currentState = { ...editedValues }
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(currentState)
      // Limit history to 50 states
      return newHistory.slice(-50)
    })
    setHistoryIndex(prev => Math.min(prev + 1, 49))
  }, [editedValues, historyIndex])

  // Handle undo
  const handleUndo = useCallback(() => {
    if (historyIndex >= 0) {
      const previousState = history[historyIndex]
      setEditedValues(previousState)
      setHistoryIndex(prev => prev - 1)
    }
  }, [history, historyIndex])

  // Handle redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1]
      setEditedValues(nextState)
      setHistoryIndex(prev => prev + 1)
    }
  }, [history, historyIndex])

  // Handle fill down - copy first edited value to all cells
  const handleFillDown = useCallback(() => {
    if (!selectedColumn || students.length === 0) return
    
    const firstStudent = students[0]
    const rawValue = editedValues[firstStudent.id]?.[selectedColumn as keyof Student] ?? 
                    originalValues[firstStudent.id]?.[selectedColumn as keyof Student]
    
    if (rawValue !== undefined) {
      // Convert to string or number
      const firstValue: string | number = typeof rawValue === 'string' || typeof rawValue === 'number'
        ? rawValue
        : String(rawValue)
      
      saveToHistory()
      students.forEach(student => {
        handleCellEdit(student.id, selectedColumn, firstValue, true)
      })
    }
  }, [selectedColumn, students, editedValues, originalValues, saveToHistory, handleCellEdit])

  // Handle set all - set all cells to same value
  const handleSetAll = useCallback(() => {
    if (!selectedColumn) return
    
    const value = prompt(`Set all ${editableColumns.find(c => c.value === selectedColumn)?.label} to:`)
    if (value !== null && value !== '') {
      saveToHistory()
      students.forEach(student => {
        handleCellEdit(student.id, selectedColumn, value, true)
      })
    }
  }, [selectedColumn, students, editableColumns, saveToHistory, handleCellEdit])

  // Handle cell blur (validate on blur)
  const handleCellBlur = useCallback((
    studentId: number,
    field: string
  ) => {
    const editedValue = editedValues[studentId]?.[field as keyof Student]
    if (editedValue !== undefined) {
      const fieldConfig = fieldConfigs[field as keyof typeof fieldConfigs]
      if (fieldConfig?.validation) {
        // Convert to string or number for validation
        const valueForValidation: string | number = typeof editedValue === 'string' || typeof editedValue === 'number' 
          ? editedValue 
          : String(editedValue ?? '')
        const error = fieldConfig.validation(valueForValidation)
        if (error) {
          setValidationErrors(prev => ({
            ...prev,
            [studentId]: {
              ...prev[studentId],
              [field]: error
            }
          }))
        }
      }
    }
  }, [editedValues, fieldConfigs])

  // Toggle bulk edit mode
  const toggleBulkEditMode = useCallback(() => {
    if (isBulkEditMode && Object.keys(editedValues).length > 0) {
      if (!confirm('You have unsaved changes. Exit bulk edit mode?')) {
        return
      }
    }
    
    setIsBulkEditMode(prev => !prev)
    setSelectedColumn(null)
    setEditedValues({})
    setValidationErrors({})
    setOriginalValues({})
  }, [isBulkEditMode, editedValues])

  // Prepare changes for preview
  const previewChanges = useMemo(() => {
    const allChanges: Array<{
      studentId: number
      studentName: string
      field: string
      fieldLabel: string
      oldValue: string | number
      newValue: string | number
    }> = []

    Object.entries(editedValues).forEach(([studentId, studentChanges]) => {
      const student = students.find(s => s.id === parseInt(studentId))
      if (!student) return

      Object.entries(studentChanges).forEach(([field, newValue]) => {
        const originalValue = originalValues[student.id]?.[field as keyof Student] ?? ''
        const fieldConfig = fieldConfigs[field as keyof typeof fieldConfigs]
        
        // Format values for display
        let displayOldValue: string | number = typeof originalValue === 'string' || typeof originalValue === 'number' 
          ? originalValue 
          : String(originalValue ?? '')
        let displayNewValue: string | number = typeof newValue === 'string' || typeof newValue === 'number'
          ? (newValue ?? '')
          : String(newValue ?? '')
        
        // Format dates
        if (field === 'dateOfBirth') {
          if (originalValue && (typeof originalValue === 'string' || typeof originalValue === 'number')) {
            try {
              const date = typeof originalValue === 'string' 
                ? new Date(originalValue.includes('T') ? originalValue : originalValue + 'T00:00:00')
                : new Date(originalValue)
              if (!isNaN(date.getTime())) {
                displayOldValue = date.toISOString().split('T')[0]
              }
            } catch {}
          }
          if (newValue && (typeof newValue === 'string' || typeof newValue === 'number')) {
            try {
              const date = typeof newValue === 'string' 
                ? new Date(newValue.includes('T') ? newValue : newValue + 'T00:00:00')
                : new Date(newValue)
              if (!isNaN(date.getTime())) {
                displayNewValue = date.toISOString().split('T')[0]
              }
            } catch {}
          }
        }
        
        if (fieldConfig && String(displayOldValue) !== String(displayNewValue)) {
          allChanges.push({
            studentId: student.id,
            studentName: student.name,
            field,
            fieldLabel: fieldConfig.label,
            oldValue: displayOldValue,
            newValue: displayNewValue
          })
        }
      })
    })

    return allChanges
  }, [editedValues, students, originalValues, fieldConfigs])

  // Handle bulk save
  const handleBulkSave = useCallback(() => {
    if (hasValidationErrors) {
      alert('Please fix validation errors before saving. Invalid fields are highlighted in red.')
      return
    }

    if (Object.keys(editedValues).length === 0) {
      alert('No changes to save')
      return
    }

    // Show preview
    setShowPreview(true)
  }, [editedValues, hasValidationErrors])

  // Confirm save after preview
  const handleConfirmSave = useCallback(async () => {
    try {
      setSaving(true)
      
      // Prepare updates with proper date formatting
      const updates = Object.entries(editedValues).map(([studentId, changes]) => {
        const update: {
          id: number
          name?: string
          fatherName?: string
          email?: string
          phone?: string
          whatsApp?: string
          dateOfBirth?: string
          gender?: 'Male' | 'Female' | 'Other'
          status?: 'Active' | 'Inactive' | 'Suspended' | 'Graduated' | 'Transferred'
          address?: string
          previousSchool?: string
          gradeId?: number
          sectionId?: number
          campusId?: number
          sessionId?: number
        } = {
          id: parseInt(studentId),
          ...changes
        }
        
        // Ensure dateOfBirth is in ISO format if provided
        if (update.dateOfBirth) {
          if (typeof update.dateOfBirth === 'string') {
            // If it's already an ISO string, use it; otherwise parse it
            if (!update.dateOfBirth.includes('T')) {
              // It's a date string (YYYY-MM-DD), convert to ISO
              const date = new Date(update.dateOfBirth)
              if (!isNaN(date.getTime())) {
                update.dateOfBirth = date.toISOString()
              }
            }
          }
        }
        
        return update
      })

      const response = await bulkUpdateStudents(updates)
      
      if (response.failed > 0 && response.errors && response.errors.length > 0) {
        // Show errors
        const errorMessages = response.errors.map(e => 
          `Student ID ${e.studentId}: ${e.field} - ${e.error}`
        ).join('\n')
        alert(`Some updates failed:\n\n${errorMessages}\n\n${response.success} student(s) were updated successfully.`)
      } else if (response.success > 0) {
        // Show success message
        alert(`Successfully updated ${response.success} student${response.success !== 1 ? 's' : ''}`)
      }

      // Refresh table
      await loadStudents()
      
      // Reset state
      setIsBulkEditMode(false)
      setSelectedColumn(null)
      setEditedValues({})
      setValidationErrors({})
      setOriginalValues({})
      setShowPreview(false)
      setHistory([])
      setHistoryIndex(-1)
      localStorage.removeItem('bulkEditDraft')
    } catch (error) {
      console.error('Error saving bulk changes:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to save changes. Please try again.'
      alert(errorMessage)
    } finally {
      setSaving(false)
    }
  }, [editedValues, loadStudents])

  // Handle bulk cancel
  const handleBulkCancel = useCallback(() => {
    if (Object.keys(editedValues).length > 0) {
      if (!confirm('Discard all unsaved changes?')) {
        return
      }
    }
    
    setIsBulkEditMode(false)
    setSelectedColumn(null)
    setEditedValues({})
    setValidationErrors({})
    setOriginalValues({})
    setShowPreview(false)
    setHistory([])
    setHistoryIndex(-1)
    localStorage.removeItem('bulkEditDraft')
  }, [editedValues])

  // Global keyboard shortcuts (moved after function declarations)
  useEffect(() => {
    if (!isBulkEditMode) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'SELECT') {
        // Allow Ctrl+Enter, Ctrl+Z, Ctrl+Y even in inputs
        if (e.ctrlKey && (e.key === 'Enter' || e.key === 'z' || e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
          // Continue to handle these
        } else {
          return
        }
      }

      // Ctrl+Enter to save
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        if (Object.keys(editedValues).length > 0 && !hasValidationErrors) {
          handleBulkSave()
        }
      }
      // Ctrl+Z to undo
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) {
          handleUndo()
        }
      }
      // Ctrl+Y or Ctrl+Shift+Z to redo
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'Z')) {
        e.preventDefault()
        if (canRedo) {
          handleRedo()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isBulkEditMode, editedValues, hasValidationErrors, handleBulkSave, handleUndo, handleRedo, canUndo, canRedo])

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
        {/* Error Summary Banner */}
        {isBulkEditMode && hasValidationErrors && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="font-semibold text-red-800">
                  {Object.keys(validationErrors).length} student(s) have validation errors
                </span>
              </div>
              <button
                onClick={() => {
                  const firstError = Object.entries(validationErrors)[0]
                  if (firstError) {
                    const studentId = parseInt(firstError[0])
                    const field = Object.keys(firstError[1])[0]
                    setCurrentFocusedCell({ studentId, field })
                    // Scroll to error
                    const element = document.querySelector(`[data-student-id="${studentId}"][data-field="${field}"]`)
                    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                }}
                className="text-red-600 hover:text-red-800 underline text-sm font-medium"
              >
                Go to first error →
              </button>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-red-700 max-h-32 overflow-y-auto">
              {Object.entries(validationErrors).slice(0, 5).map(([studentId, errors]) => {
                const student = students.find(s => s.id === parseInt(studentId))
                return (
                  <li key={studentId}>
                    <strong>{student?.name || `Student ${studentId}`}</strong>: {Object.values(errors)[0]}
                  </li>
                )
              })}
              {Object.keys(validationErrors).length > 5 && (
                <li className="text-red-600 italic">
                  ...and {Object.keys(validationErrors).length - 5} more error(s)
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-sm font-semibold text-gray-700">Filter Students</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <BulkEditToolbar
              isActive={isBulkEditMode}
              selectedColumn={selectedColumn}
              editedCount={Object.keys(editedValues).length}
              totalStudents={students.length}
              onToggleMode={toggleBulkEditMode}
              onColumnSelect={setSelectedColumn}
              onSave={handleBulkSave}
              onCancel={handleBulkCancel}
              saving={saving}
              editableColumns={editableColumns}
              hasValidationErrors={hasValidationErrors}
              onFillDown={handleFillDown}
              onSetAll={handleSetAll}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyIndex >= 0}
              canRedo={historyIndex < history.length - 1}
              onShowKeyboardHelp={() => setShowKeyboardHelp(true)}
            />
            <button
              onClick={handleExport}
              disabled={exporting || loading || totalCount === 0 || isBulkEditMode}
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
                  className={`px-4 py-3 text-left text-sm font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 ${
                    isBulkEditMode && selectedColumn === 'name'
                      ? 'bg-blue-500 border-b-4 border-blue-300'
                      : 'hover:bg-primary-700'
                  }`}
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
                  <div className="flex items-center gap-2">
                    {isBulkEditMode && selectedColumn === 'name' && (
                      <Edit2 className="w-4 h-4" />
                    )}
                    Name
                    <SortIcon field="name" />
                  </div>
                </th>
                <th 
                  className={`px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    isBulkEditMode && selectedColumn === 'fatherName'
                      ? 'bg-blue-500 border-b-4 border-blue-300'
                      : ''
                  }`}
                  role="columnheader"
                  scope="col"
                >
                  <div className="flex items-center gap-2">
                    {isBulkEditMode && selectedColumn === 'fatherName' && (
                      <Edit2 className="w-4 h-4" />
                    )}
                    Father Name
                  </div>
                </th>
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
                <th 
                  className={`px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    isBulkEditMode && selectedColumn === 'phone'
                      ? 'bg-blue-500 border-b-4 border-blue-300'
                      : ''
                  }`}
                  role="columnheader"
                  scope="col"
                >
                  <div className="flex items-center gap-2">
                    {isBulkEditMode && selectedColumn === 'phone' && (
                      <Edit2 className="w-4 h-4" />
                    )}
                    Phone
                  </div>
                </th>
                <th 
                  className={`px-4 py-3 text-left text-sm font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 ${
                    isBulkEditMode && selectedColumn === 'gradeId'
                      ? 'bg-blue-500 border-b-4 border-blue-300'
                      : 'hover:bg-primary-700'
                  }`}
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
                  <div className="flex items-center gap-2">
                    {isBulkEditMode && selectedColumn === 'gradeId' && (
                      <Edit2 className="w-4 h-4" />
                    )}
                    Grade
                    <SortIcon field="grade" />
                  </div>
                </th>
                <th 
                  className={`px-4 py-3 text-left text-sm font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 ${
                    isBulkEditMode && selectedColumn === 'sectionId'
                      ? 'bg-blue-500 border-b-4 border-blue-300'
                      : 'hover:bg-primary-700'
                  }`}
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
                  <div className="flex items-center gap-2">
                    {isBulkEditMode && selectedColumn === 'sectionId' && (
                      <Edit2 className="w-4 h-4" />
                    )}
                    Section
                    <SortIcon field="section" />
                  </div>
                </th>
                <th 
                  className={`px-4 py-3 text-left text-sm font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 ${
                    isBulkEditMode && selectedColumn === 'status'
                      ? 'bg-blue-500 border-b-4 border-blue-300'
                      : 'hover:bg-primary-700'
                  }`}
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
                  <div className="flex items-center gap-2">
                    {isBulkEditMode && selectedColumn === 'status' && (
                      <Edit2 className="w-4 h-4" />
                    )}
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
                        {isBulkEditMode && selectedColumn === 'name' ? (
                          <div data-student-id={student.id} data-field="name">
                            <EditableCell
                              studentId={student.id}
                              field="name"
                              value={editedValues[student.id]?.name ?? student.name}
                              originalValue={originalValues[student.id]?.name ?? student.name}
                              isEditing={currentFocusedCell?.studentId === student.id && currentFocusedCell?.field === 'name'}
                              fieldConfig={fieldConfigs.name}
                              onChange={handleCellEdit}
                              onBlur={handleCellBlur}
                              error={validationErrors[student.id]?.name}
                              isEdited={!!editedValues[student.id]?.name}
                            />
                          </div>
                        ) : (
                          <div className="truncate max-w-[150px]" title={student.name}>
                            {student.name}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {isBulkEditMode && selectedColumn === 'fatherName' ? (
                          <div data-student-id={student.id} data-field="fatherName">
                            <EditableCell
                              studentId={student.id}
                              field="fatherName"
                              value={editedValues[student.id]?.fatherName ?? student.fatherName}
                              originalValue={originalValues[student.id]?.fatherName ?? student.fatherName}
                              isEditing={currentFocusedCell?.studentId === student.id && currentFocusedCell?.field === 'fatherName'}
                              fieldConfig={fieldConfigs.fatherName}
                              onChange={handleCellEdit}
                              onBlur={handleCellBlur}
                              error={validationErrors[student.id]?.fatherName}
                              isEdited={!!editedValues[student.id]?.fatherName}
                            />
                          </div>
                        ) : (
                          <div className="truncate max-w-[150px]" title={student.fatherName}>
                            {student.fatherName}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="truncate max-w-[180px]" title={student.email}>
                          {student.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {isBulkEditMode && selectedColumn === 'phone' ? (
                          <div data-student-id={student.id} data-field="phone">
                            <EditableCell
                              studentId={student.id}
                              field="phone"
                              value={editedValues[student.id]?.phone ?? student.phone ?? ''}
                              originalValue={originalValues[student.id]?.phone ?? student.phone ?? ''}
                              isEditing={currentFocusedCell?.studentId === student.id && currentFocusedCell?.field === 'phone'}
                              fieldConfig={fieldConfigs.phone}
                              onChange={handleCellEdit}
                              onBlur={handleCellBlur}
                              error={validationErrors[student.id]?.phone}
                              isEdited={!!editedValues[student.id]?.phone}
                            />
                          </div>
                        ) : (
                          student.phone || '-'
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {isBulkEditMode && selectedColumn === 'gradeId' ? (
                          <div data-student-id={student.id} data-field="gradeId">
                            <EditableCell
                              studentId={student.id}
                              field="gradeId"
                              value={editedValues[student.id]?.gradeId ?? student.gradeId}
                              originalValue={originalValues[student.id]?.gradeId ?? student.gradeId}
                              isEditing={currentFocusedCell?.studentId === student.id && currentFocusedCell?.field === 'gradeId'}
                              fieldConfig={fieldConfigs.gradeId}
                              onChange={handleCellEdit}
                              onBlur={handleCellBlur}
                              error={validationErrors[student.id]?.gradeId}
                              isEdited={!!editedValues[student.id]?.gradeId}
                            />
                          </div>
                        ) : (
                          student.gradeName || student.grade?.name || `Grade ${student.gradeId}`
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {isBulkEditMode && selectedColumn === 'sectionId' ? (
                          <div data-student-id={student.id} data-field="sectionId">
                            <EditableCell
                              studentId={student.id}
                              field="sectionId"
                              value={editedValues[student.id]?.sectionId ?? student.sectionId}
                              originalValue={originalValues[student.id]?.sectionId ?? student.sectionId}
                              isEditing={currentFocusedCell?.studentId === student.id && currentFocusedCell?.field === 'sectionId'}
                              fieldConfig={fieldConfigs.sectionId}
                              onChange={handleCellEdit}
                              onBlur={handleCellBlur}
                              error={validationErrors[student.id]?.sectionId}
                              isEdited={!!editedValues[student.id]?.sectionId}
                            />
                          </div>
                        ) : (
                          student.sectionName || student.section?.name || `Section ${student.sectionId}`
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {isBulkEditMode && selectedColumn === 'status' ? (
                          <div data-student-id={student.id} data-field="status">
                            <EditableCell
                              studentId={student.id}
                              field="status"
                              value={editedValues[student.id]?.status ?? student.status}
                              originalValue={originalValues[student.id]?.status ?? student.status}
                              isEditing={currentFocusedCell?.studentId === student.id && currentFocusedCell?.field === 'status'}
                              fieldConfig={fieldConfigs.status}
                              onChange={handleCellEdit}
                              onBlur={handleCellBlur}
                              error={validationErrors[student.id]?.status}
                              isEdited={!!editedValues[student.id]?.status}
                            />
                          </div>
                        ) : (
                          <StatusBadge status={student.status} size="sm" />
                        )}
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

      {/* Bulk Edit Preview Modal */}
      <BulkEditPreview
        isOpen={showPreview}
        changes={previewChanges}
        onConfirm={handleConfirmSave}
        onCancel={() => setShowPreview(false)}
        saving={saving}
        errors={validationErrors}
      />

      {/* Keyboard Shortcuts Help Modal */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <Keyboard className="w-6 h-6" />
                  Keyboard Shortcuts
                </h2>
                <p className="text-sm sm:text-base text-white/90 mt-1">
                  Speed up your bulk editing workflow
                </p>
              </div>
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="text-white hover:text-gray-200 p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Close help"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Navigation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Move to next cell</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Tab</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Move to previous cell</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Shift + Tab</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Move down</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">↓</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Move up</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">↑</kbd>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Editing</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Confirm and move to next</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Enter</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Cancel edit (revert)</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Esc</kbd>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Save all changes</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl</kbd>
                      <span className="text-gray-400">+</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Enter</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Undo last change</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl</kbd>
                      <span className="text-gray-400">+</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Z</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Redo last undone</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Ctrl</kbd>
                      <span className="text-gray-400">+</span>
                      <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">Y</kbd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowKeyboardHelp(false)}
                className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Got it!
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
          isLoading={false}
        />
      )}
    </div>
  )
}

