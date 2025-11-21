'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { X, Loader2, Users, Plus, AlertCircle } from 'lucide-react'
import { Student, createStudent, updateStudent, CreateStudentRequest, UpdateStudentRequest, checkEmailExists } from '@/lib/api/students'
import { getGrades, Grade } from '@/lib/api/grades'
import { getSections, Section } from '@/lib/api/sections'
import { getCampuses, Campus } from '@/lib/api/campuses'
import { getSessions, Session } from '@/lib/api/sessions'
import { getGuardians, Guardian } from '@/lib/api/guardians'
import { maskPakistanPhoneNumber, validatePakistanPhoneNumber, cleanPhoneNumber, debounce } from '@/lib/utils'
import GuardianForm from '@/components/guardians/GuardianForm'
import SearchableSelect, { SearchableSelectOption } from '@/components/ui/SearchableSelect'
import ProfileImageUpload from '@/components/ui/ProfileImageUpload'
import FormField from '@/components/ui/FormField'

interface StudentFormProps {
  student?: Student | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSuccess: (message?: string) => void
}

type FormData = Omit<CreateStudentRequest, 'dateOfBirth' | 'profileImageUrl'> & {
  dateOfBirth: string; // Always a string for form inputs
  profileImageUrl: string | null; // Allow null for form state
}

export default function StudentForm({ student, mode, onClose, onSuccess }: StudentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    fatherName: '',
    email: '',
    phone: '',
    whatsApp: '',
    gender: 'Male',
    status: 'Active',
    address: '',
    previousSchool: '',
    dateOfBirth: '',
    gradeId: 0, // Initialize as 0, will be set after options load
    sectionId: 0, // Initialize as 0, will be set after options load
    campusId: 0, // Initialize as 0, will be set after options load
    sessionId: 0, // Initialize as 0, will be set after options load
    guardianId: 0, // Keep as 0 - user must explicitly select
    profileImageUrl: null, // Standardize to null instead of undefined
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [checkingEmail, setCheckingEmail] = useState(false)
  
  // Dropdown options state
  const [grades, setGrades] = useState<Grade[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [guardians, setGuardians] = useState<Guardian[]>([])
  const [loadingOptions, setLoadingOptions] = useState(true)
  
  // Guardian form modal state
  const [showGuardianForm, setShowGuardianForm] = useState(false)
  
  // Ref for form element to scroll to errors
  const formRef = useRef<HTMLFormElement>(null)

  // Centralized error clearing function
  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      if (prev[fieldName]) {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      }
      return prev
    })
  }, [])


  // Fetch dropdown options on component mount
  useEffect(() => {
    fetchDropdownOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load student data when in edit mode
  useEffect(() => {
    if (student && mode === 'edit') {
      // Format phone numbers for display if they exist
      const formattedPhone = student.phone ? maskPakistanPhoneNumber(student.phone) : ''
      const formattedWhatsApp = student.whatsApp ? maskPakistanPhoneNumber(student.whatsApp) : ''
      
      setFormData({
        name: student.name,
        fatherName: student.fatherName,
        email: student.email,
        phone: formattedPhone,
        whatsApp: formattedWhatsApp,
        gender: student.gender,
        status: student.status,
        address: student.address || '',
        previousSchool: student.previousSchool || '',
        dateOfBirth: student.dateOfBirth.split('T')[0],
        gradeId: student.gradeId,
        sectionId: student.sectionId,
        campusId: student.campusId,
        sessionId: student.sessionId,
        guardianId: student.guardianId || 0,
        profileImageUrl: student.profileImageUrl || null,
      })
    }
  }, [student, mode])

  // Set default values when options are loaded (only for create mode)
  useEffect(() => {
    if (loadingOptions || mode === 'edit') return

    // Use functional updates to check previous values and set defaults
    setFormData(prev => {
      const updates: Partial<FormData> = {}

      // Set default grade if available and still unset (0)
      if (grades.length > 0 && prev.gradeId === 0) {
        updates.gradeId = grades[0].id
      }

      // Set default section if available and still unset (0)
      // Note: Currently sections are not filtered by grade in the API
      // TODO: Add grade-section dependency validation when backend supports it
      if (sections.length > 0 && prev.sectionId === 0) {
        updates.sectionId = sections[0].id
      }

      // Set default campus if available and still unset (0)
      if (campuses.length > 0 && prev.campusId === 0) {
        updates.campusId = campuses[0].id
      }

      // Set default session (prefer current session) if still unset (0)
      if (sessions.length > 0 && prev.sessionId === 0) {
        const currentSession = sessions.find(s => s.isCurrent)
        const defaultSession = currentSession || sessions[0]
        updates.sessionId = defaultSession.id
      }

      // Don't auto-select guardian - user must explicitly select
      // This ensures users are aware they need to choose a guardian

      // Only update if there are changes
      return Object.keys(updates).length > 0 ? { ...prev, ...updates } : prev
    })
  }, [grades, sections, campuses, sessions, loadingOptions, mode])

  const fetchDropdownOptions = async () => {
    setLoadingOptions(true)
    try {
      const [gradesData, sectionsData, campusesData, sessionsData, guardiansData] = await Promise.all([
        getGrades(true), // Only active grades
        getSections(true), // Only active sections
        getCampuses(true), // Only active campuses
        getSessions(true), // Only active sessions
        getGuardians() // All active guardians
      ])
      setGrades(gradesData)
      setSections(sectionsData)
      setCampuses(campusesData)
      setSessions(sessionsData)
      setGuardians(guardiansData)
      
      // Don't auto-select guardian - user must explicitly select
    } catch (error) {
      console.error('Failed to load dropdown options:', error)
      setErrors({ general: 'Unable to load form options. Please refresh the page and try again.' })
    } finally {
      setLoadingOptions(false)
    }
  }

  // Refresh guardians list (used after creating a new guardian)
  const refreshGuardiansList = useCallback(async () => {
    try {
      const guardiansData = await getGuardians()
      setGuardians(guardiansData)
      return guardiansData
    } catch (error) {
      console.error('Failed to refresh guardians list:', error)
      throw error
    }
  }, [])

  // Handle guardian creation success - memoized
  const handleGuardianCreated = useCallback(async (message?: string, createdGuardian?: Guardian) => {
    try {
      // Refresh the guardians list to get the latest data
      await refreshGuardiansList()
      
      // Auto-select the newly created guardian if provided
      if (createdGuardian) {
        // Batch state updates
        setFormData(prev => ({ ...prev, guardianId: createdGuardian.id }))
        clearFieldError('guardianId')
        
        // Show brief visual feedback - scroll to guardian field
        setTimeout(() => {
          const guardianSelect = document.querySelector('[aria-label="Select guardian"], [aria-haspopup="listbox"]') as HTMLElement
          if (guardianSelect) {
            guardianSelect.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // Brief highlight effect
            guardianSelect.focus()
            setTimeout(() => guardianSelect.blur(), 1000)
          }
        }, 100)
      }
      
      // Close the guardian form modal
      setShowGuardianForm(false)
    } catch (error) {
      console.error('Failed to refresh guardians after creation:', error)
      // Still close the modal and select guardian even if refresh fails
      if (createdGuardian) {
        setFormData(prev => ({ ...prev, guardianId: createdGuardian.id }))
        clearFieldError('guardianId')
      }
      setShowGuardianForm(false)
    }
  }, [refreshGuardiansList, clearFieldError])

  // Handle opening guardian form
  const handleOpenGuardianForm = useCallback(() => {
    setShowGuardianForm(true)
  }, [])

  // Handle closing guardian form
  const handleCloseGuardianForm = useCallback(() => {
    setShowGuardianForm(false)
  }, [])

  // Relation icons mapping (moved outside to avoid dependency warning)
  const relationIcons: Record<string, string> = useMemo(() => ({
    Father: '👨',
    Mother: '👩',
    Brother: '👦',
    Sister: '👧',
    Guardian: '👤',
  }), [])

  // Convert guardians to SearchableSelect options
  const guardianOptions = useMemo<SearchableSelectOption[]>(() => {
    return guardians.map(guardian => ({
      value: guardian.id,
      label: guardian.fullName,
      subtitle: `${guardian.relation} • ${guardian.email}${guardian.phone ? ` • ${guardian.phone}` : ''}`,
      icon: relationIcons[guardian.relation] || '👤',
      disabled: !guardian.isActive,
    }))
  }, [guardians, relationIcons])

  // Custom filter function for guardian search
  const guardianFilterFunction = useCallback((option: SearchableSelectOption, query: string): boolean => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    
    // Search in label (fullName) and subtitle (relation, email, phone)
    const matchesLabel = option.label.toLowerCase().includes(q)
    const matchesSubtitle = option.subtitle?.toLowerCase().includes(q) || false
    
    // Also search in the original guardian data for more comprehensive search
    const guardian = guardians.find(g => g.id === option.value)
    if (guardian) {
      return (
        matchesLabel ||
        matchesSubtitle ||
        guardian.email.toLowerCase().includes(q) ||
        guardian.phone.toLowerCase().includes(q) ||
        guardian.relation.toLowerCase().includes(q) ||
        (guardian.whatsApp ? guardian.whatsApp.toLowerCase().includes(q) : false) ||
        (guardian.cnic ? guardian.cnic.toLowerCase().includes(q) : false)
      )
    }
    
    return matchesLabel || matchesSubtitle
  }, [guardians])

  // Handle guardian selection change
  const handleGuardianChange = useCallback((selectedValue: string | number) => {
    // Handle empty string or invalid values
    if (selectedValue === '' || selectedValue === null || selectedValue === undefined) {
      setFormData(prev => ({ ...prev, guardianId: 0 }))
      return
    }
    
    const guardianId = typeof selectedValue === 'number' ? selectedValue : parseInt(selectedValue.toString()) || 0
    setFormData(prev => ({ ...prev, guardianId }))
    
    // Clear error if guardian is selected
    if (guardianId > 0) {
      clearFieldError('guardianId')
    } else {
      // Set error if guardian is cleared and it's required
      setErrors(prev => ({
        ...prev,
        guardianId: 'Please select a guardian'
      }))
    }
  }, [clearFieldError])

  // Memoize email check function to prevent recreation
  const emailCheckFunction = useCallback(async (email: unknown) => {
    const emailStr = typeof email === 'string' ? email : ''
    if (!emailStr || emailStr.trim() === '') {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.email
        return newErrors
      })
      setCheckingEmail(false)
      return
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailStr)) {
      setCheckingEmail(false)
      return // Don't check invalid email format
    }

    try {
      setCheckingEmail(true)
      const excludeId = mode === 'edit' && student ? student.id : undefined
      const exists = await checkEmailExists(emailStr, excludeId)
      
      if (exists) {
        setErrors((prev) => ({
          ...prev,
          email: 'This email is already registered. Please use a different email address.',
        }))
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.email
          return newErrors
        })
      }
    } catch (error) {
      // Silently fail - don't show error for check failures
      console.error('Failed to check email:', error)
    } finally {
      setCheckingEmail(false)
    }
  }, [mode, student])

  // Debounced email check function - memoized to prevent recreation
  const debouncedEmailCheck = useMemo(
    () => debounce(emailCheckFunction, 500),
    [emailCheckFunction]
  )

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear email error when user starts typing
    clearFieldError('email')
    
    // Debounced email check
    debouncedEmailCheck(value)
  }, [debouncedEmailCheck, clearFieldError])

  const handleEmailBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target
    // Trigger immediate check on blur if email is valid format
    if (value && value.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(value)) {
        debouncedEmailCheck(value)
      }
    }
  }, [debouncedEmailCheck])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // Validate phone numbers if provided
    const newErrors: Record<string, string> = {}
    
    if (formData.phone && formData.phone.trim() !== '') {
      const phoneValidation = validatePakistanPhoneNumber(formData.phone)
      if (!phoneValidation.valid) {
        newErrors.phone = phoneValidation.error || 'Invalid phone number format'
      }
    }
    
    if (formData.whatsApp && formData.whatsApp.trim() !== '') {
      const whatsAppValidation = validatePakistanPhoneNumber(formData.whatsApp)
      if (!whatsAppValidation.valid) {
        newErrors.whatsApp = whatsAppValidation.error || 'Invalid WhatsApp number format'
      }
    }

    // Final email check before submission
    if (formData.email && formData.email.trim() !== '') {
      try {
        const excludeId = mode === 'edit' && student ? student.id : undefined
        const emailExists = await checkEmailExists(formData.email, excludeId)
        if (emailExists) {
          newErrors.email = 'This email is already registered. Please use a different email address.'
        }
      } catch (error) {
        // If check fails, still allow submission (backend will catch it)
        console.error('Email check failed:', error)
      }
    }

    // Validate guardian
    if (!formData.guardianId || formData.guardianId === 0) {
      newErrors.guardianId = 'Please select a guardian'
    }

    // If there are validation errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      
      // Scroll to first error field
      setTimeout(() => {
        const firstErrorField = formRef.current?.querySelector('[class*="border-red-300"]') as HTMLElement
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
          firstErrorField.focus()
        }
      }, 100)
      return
    }

    try {
      // Clean phone numbers before sending (remove formatting)
      const submitData = {
        ...formData,
        phone: formData.phone ? cleanPhoneNumber(formData.phone) : undefined,
        whatsApp: formData.whatsApp ? cleanPhoneNumber(formData.whatsApp) : undefined,
        profileImageUrl: formData.profileImageUrl || undefined, // Convert null to undefined for API
      }

      if (mode === 'create') {
        await createStudent(submitData as CreateStudentRequest)
        // Call onSuccess before setting loading to false to ensure message is set
        onSuccess('Student created successfully')
      } else if (student) {
        await updateStudent({ ...submitData, id: student.id } as UpdateStudentRequest)
        // Call onSuccess before setting loading to false to ensure message is set
        onSuccess('Student updated successfully')
      }
    } catch (err: unknown) {
      let errorMessage = 'Unable to save student. Please check your input and try again.'
      
      // Check if it's an ApiError with a meaningful message
      if (err && typeof err === 'object' && 'message' in err) {
        const apiError = err as { message?: string; statusCode?: number; errors?: Record<string, string[]> }
        errorMessage = apiError.message || errorMessage
        
        // If there are field-specific errors, add them
        if (apiError.errors) {
          const fieldErrors: Record<string, string> = {}
          Object.entries(apiError.errors).forEach(([field, messages]) => {
            fieldErrors[field] = Array.isArray(messages) ? messages[0] : String(messages)
          })
          setErrors({ ...fieldErrors, general: errorMessage })
          setLoading(false)
          return
        }
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage
      }
      
      setErrors({ general: errorMessage })
    } finally {
      setLoading(false)
    }
  }, [formData, mode, student, onSuccess])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Special handling for email field - use separate handler
    if (name === 'email') {
      handleEmailChange(e as React.ChangeEvent<HTMLInputElement>)
      return
    }
    
    // Special handling for phone and WhatsApp fields - apply masking
    if (name === 'phone' || name === 'whatsApp') {
      const masked = maskPakistanPhoneNumber(value)
      setFormData((prev) => ({
        ...prev,
        [name]: masked,
      }))
      
      // Clear error if field is being edited
      clearFieldError(name)
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'gradeId' || name === 'sectionId' || name === 'campusId' || name === 'sessionId' 
          ? (value === '' ? 0 : parseInt(value) || 0)
          : value,
      }))
      clearFieldError(name)
    }
  }, [handleEmailChange, clearFieldError])

  const handlePhoneBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Only validate if there's a value (fields are optional)
    if (value && value.trim() !== '') {
      const validation = validatePakistanPhoneNumber(value)
      if (!validation.valid) {
        setErrors((prev) => ({
          ...prev,
          [name]: validation.error || 'Invalid phone number format',
        }))
      } else {
        // Clear error if validation passes
        clearFieldError(name)
      }
    }
  }, [clearFieldError])

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        // Close modal when clicking on backdrop
        if (e.target === e.currentTarget && !showGuardianForm) {
          onClose()
        }
      }}
      onKeyDown={(e) => {
        // Close modal on Escape key (only if guardian form is not open)
        if (e.key === 'Escape' && !showGuardianForm) {
          onClose()
        }
      }}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Add New Student' : 'Edit Student'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-200 p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-all duration-200"
            aria-label={`Close ${mode === 'create' ? 'add student' : 'edit student'} form`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {errors.general}
            </div>
          )}

          {/* Profile Picture */}
          <div>
            <ProfileImageUpload
              value={formData.profileImageUrl}
              onChange={(url) => setFormData(prev => ({ ...prev, profileImageUrl: url || null }))}
              studentId={student?.id}
              mode={mode}
              disabled={loading}
              size="md"
              shape="circle"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Name */}
            <FormField label="Student Name" required error={errors.name} htmlFor="name">
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </FormField>

            {/* Father Name */}
            <FormField label="Father Name" required error={errors.fatherName} htmlFor="fatherName">
              <input
                id="fatherName"
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                required
                aria-invalid={!!errors.fatherName}
                aria-describedby={errors.fatherName ? 'fatherName-error' : undefined}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </FormField>

            {/* Email */}
            <FormField 
              label="Email" 
              required 
              error={errors.email}
              hint={checkingEmail ? 'Checking email availability...' : (!errors.email && !checkingEmail && formData.email ? '✓ Email is available' : undefined)}
              htmlFor="email"
            >
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : checkingEmail ? 'email-checking' : undefined}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {checkingEmail && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-live="polite" aria-label="Checking email">
                    <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                  </div>
                )}
              </div>
            </FormField>

            {/* Phone */}
            <FormField 
              label="Phone" 
              error={errors.phone}
              hint={!errors.phone ? 'Format: 03XX-XXXXXXX (11 digits)' : undefined}
              htmlFor="phone"
            >
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handlePhoneBlur}
                placeholder="03XX-XXXXXXX"
                maxLength={12}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
            </FormField>

            {/* WhatsApp */}
            <FormField 
              label="WhatsApp" 
              error={errors.whatsApp}
              hint={!errors.whatsApp ? 'Format: 03XX-XXXXXXX (11 digits)' : undefined}
              htmlFor="whatsApp"
            >
              <input
                id="whatsApp"
                type="tel"
                name="whatsApp"
                value={formData.whatsApp}
                onChange={handleChange}
                onBlur={handlePhoneBlur}
                placeholder="03XX-XXXXXXX"
                maxLength={12}
                aria-invalid={!!errors.whatsApp}
                aria-describedby={errors.whatsApp ? 'whatsApp-error' : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.whatsApp ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
            </FormField>

            {/* Date of Birth */}
            <FormField label="Date of Birth" required error={errors.dateOfBirth} htmlFor="dateOfBirth">
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                aria-invalid={!!errors.dateOfBirth}
                aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </FormField>

            {/* Gender */}
            <FormField label="Gender" required error={errors.gender} htmlFor="gender">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                aria-invalid={!!errors.gender}
                aria-describedby={errors.gender ? 'gender-error' : undefined}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </FormField>

            {/* Status */}
            <FormField label="Status" required error={errors.status} htmlFor="status">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                aria-invalid={!!errors.status}
                aria-describedby={errors.status ? 'status-error' : undefined}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
                <option value="Graduated">Graduated</option>
                <option value="Transferred">Transferred</option>
              </select>
            </FormField>

            {/* Grade */}
            <FormField label="Grade" required error={errors.gradeId} htmlFor="gradeId">
              {loadingOptions ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                  <div className="h-5 bg-gray-300 rounded w-24"></div>
                </div>
              ) : (
                <select
                  id="gradeId"
                  name="gradeId"
                  value={formData.gradeId || ''}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.gradeId}
                  aria-describedby={errors.gradeId ? 'gradeId-error' : undefined}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Grade</option>
                  {grades.map(grade => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              )}
            </FormField>

            {/* Section */}
            <FormField label="Section" required error={errors.sectionId} htmlFor="sectionId">
              {loadingOptions ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                  <div className="h-5 bg-gray-300 rounded w-24"></div>
                </div>
              ) : (
                <select
                  id="sectionId"
                  name="sectionId"
                  value={formData.sectionId || ''}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.sectionId}
                  aria-describedby={errors.sectionId ? 'sectionId-error' : undefined}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Section</option>
                  {sections.map(section => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              )}
            </FormField>

            {/* Campus */}
            <FormField label="Campus" required error={errors.campusId} htmlFor="campusId">
              {loadingOptions ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                  <div className="h-5 bg-gray-300 rounded w-24"></div>
                </div>
              ) : (
                <select
                  id="campusId"
                  name="campusId"
                  value={formData.campusId || ''}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.campusId}
                  aria-describedby={errors.campusId ? 'campusId-error' : undefined}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Campus</option>
                  {campuses.map(campus => (
                    <option key={campus.id} value={campus.id}>
                      {campus.name}
                    </option>
                  ))}
                </select>
              )}
            </FormField>

            {/* Session */}
            <FormField label="Session" required error={errors.sessionId} htmlFor="sessionId">
              {loadingOptions ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                  <div className="h-5 bg-gray-300 rounded w-24"></div>
                </div>
              ) : (
                <select
                  id="sessionId"
                  name="sessionId"
                  value={formData.sessionId || ''}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.sessionId}
                  aria-describedby={errors.sessionId ? 'sessionId-error' : undefined}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Session</option>
                  {sessions.map(session => (
                    <option key={session.id} value={session.id}>
                      {session.name} {session.isCurrent && '(Current)'}
                    </option>
                  ))}
                </select>
              )}
            </FormField>

            {/* Guardian */}
            <FormField 
              label={
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center">
                    <Users className="inline w-4 h-4 mr-1" />
                    Guardian
                  </span>
                  <button
                    type="button"
                    onClick={handleOpenGuardianForm}
                    className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 font-medium transition-all hover:bg-primary-50 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label="Create new guardian"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New</span>
                  </button>
                </div>
              }
              required 
              error={errors.guardianId}
            >
              {loadingOptions ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                  <div className="h-5 bg-gray-300 rounded w-32"></div>
                </div>
              ) : (
                <SearchableSelect
                  options={guardianOptions}
                  value={formData.guardianId || 0}
                  onChange={handleGuardianChange}
                  placeholder="Search and select a guardian..."
                  searchPlaceholder="Search by name, email, phone, or relation..."
                  emptyMessage={guardians.length === 0 ? "No guardians available. Click 'Create New' to add one." : "No guardians found matching your search."}
                  loading={loadingOptions}
                  disabled={guardians.length === 0}
                  required
                  error={errors.guardianId}
                  maxHeight="max-h-72"
                  highlightMatch={true}
                  showClearButton={true}
                  filterFunction={guardianFilterFunction}
                />
              )}
              {!loadingOptions && guardians.length === 0 && !errors.guardianId && (
                <div className="mt-1 flex items-start space-x-1">
                  <AlertCircle className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-600">
                    No active guardians found. Click &quot;Create New&quot; to add a guardian.
                  </p>
                </div>
              )}
            </FormField>
          </div>

          {/* Address */}
          <FormField label="Address" error={errors.address} htmlFor="address">
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? 'address-error' : undefined}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-y"
            />
          </FormField>

          {/* Previous School */}
          <FormField label="Previous School" error={errors.previousSchool} htmlFor="previousSchool">
            <input
              id="previousSchool"
              type="text"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleChange}
              aria-invalid={!!errors.previousSchool}
              aria-describedby={errors.previousSchool ? 'previousSchool-error' : undefined}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </FormField>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Cancel and close form"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
              aria-label={mode === 'create' ? 'Create student' : 'Update student'}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{mode === 'create' ? 'Create Student' : 'Update Student'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Guardian Form Modal */}
      {showGuardianForm && (
        <GuardianForm
          mode="create"
          onClose={handleCloseGuardianForm}
          onSuccess={handleGuardianCreated}
        />
      )}
    </div>
  )
}


