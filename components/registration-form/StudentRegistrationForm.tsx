'use client'

import { useState, useRef, useEffect } from 'react'
import { submitRegistration, RegistrationResponse } from '@/lib/api/registrations'
import { getActiveAdmissionSetting, deriveRegistrationStatus, getAllScholarshipTypes, getAllAdmissionCriteria, type AdmissionSetting, type ScholarshipType } from '@/lib/api/admissionSettings'
import { getGrades, type Grade } from '@/lib/api/grades'
import { CheckCircle, AlertCircle, Loader2, FileText, X, Calendar, Info, CreditCard, Phone, Copy, Building2, Wallet } from 'lucide-react'
import ProfileImageUpload from '@/components/ui/ProfileImageUpload'
import FormField from '@/components/ui/FormField'
import FormSectionNavigation from '@/components/registration-form/FormSectionNavigation'
import { generateRollNumberSlipPDF } from '@/lib/utils/pdfGenerator'
import { validatePakistanPhoneNumber, maskPakistanPhoneNumber, cleanPhoneNumber, formatDate, formatTime } from '@/lib/utils'


const TEST_RULES = [
  'Registration Fee is Rs: 500/- and not refundable.',
  'Do not proceed during the test session until instructed to do so.',
  'Please bring your roll number slip along with your other test materials at the day of Test.',
  'You will be provided with a new booklet in case of any damaged or miss printed one.',
  'You are expected to remain in the room for the test session, you will be accompanied by an instructor in case of any illness or other serious issues.',
  'To write the test you should only have the test materials (pencil, eraser, ruler and an approved calculator).',
  'The whole booklet must be completed in time.',
  'You may not discard any materials from the examination booklets also formula sheet and rough sheet must be attached.',
  'You may not leave the room with any test materials.',
  'You will not receive assistance from, nor give assistance to another student.',
  'Exam supervisor will help you in case of any need.',
  'Exam supervisor will only guide you during the test but will not help you in attempting the test questions.',
  'Electronic communication through telephone calls, email or any kind of file sharing during the test is strictly prohibited.',
  'Turn off your cell phones and other prohibited electronic devices at the venue.',
]

// Scholarship types and grades are now fetched from API - see component state below

// Validation utilities
const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email || email.trim() === '') {
    return { valid: true } // Email is optional
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Please enter a valid email address' }
  }
  return { valid: true }
}

const validateName = (name: string, fieldName: string): { valid: boolean; error?: string } => {
  if (!name || name.trim() === '') {
    return { valid: false, error: `${fieldName} is required` }
  }
  if (name.trim().length < 2) {
    return { valid: false, error: `${fieldName} must be at least 2 characters` }
  }
  if (name.trim().length > 100) {
    return { valid: false, error: `${fieldName} must be less than 100 characters` }
  }
  return { valid: true }
}

const validateDateOfBirth = (dob: string): { valid: boolean; error?: string } => {
  if (!dob) {
    return { valid: false, error: 'Date of birth is required' }
  }
  const date = new Date(dob)
  const today = new Date()
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Please enter a valid date' }
  }
  if (date > today) {
    return { valid: false, error: 'Date of birth cannot be in the future' }
  }
  // Check if age is reasonable (between 3 and 25 years)
  const age = today.getFullYear() - date.getFullYear()
  const monthDiff = today.getMonth() - date.getMonth()
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate()) ? age - 1 : age
  
  if (actualAge < 3) {
    return { valid: false, error: 'Student must be at least 3 years old' }
  }
  if (actualAge > 25) {
    return { valid: false, error: 'Please enter a valid date of birth' }
  }
  return { valid: true }
}

interface FormData {
  name: string
  fatherName: string
  dob: string
  gender: number
  gradeId: number
  mobile: string
  whatsApp: string
  email: string
  formBorCNIC: string
  previousSchoolName: string
  profilePictureUrl: string | null
  applyForScholarship: boolean
  scholarshipType: number | null
  boarderDayScholar: number
  paymentMethod: number
}

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    fatherName: '',
    dob: '',
    gender: -1, // -1 means not selected
    gradeId: 0,
    mobile: '',
    whatsApp: '',
    email: '',
    formBorCNIC: '',
    previousSchoolName: '',
    profilePictureUrl: null,
    applyForScholarship: false,
    scholarshipType: null,
    boarderDayScholar: 1,
    paymentMethod: 0,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<RegistrationResponse | null>(null)
  const [testInfoFromSettings, setTestInfoFromSettings] = useState<{
    testVenue?: string
    testDate?: string
    testTime?: string
  } | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)
  const hasSubmittedRef = useRef(false) // Prevent duplicate submissions
  const [activeSetting, setActiveSetting] = useState<AdmissionSetting | null>(null)
  const [settingsStatus, setSettingsStatus] = useState<ReturnType<typeof deriveRegistrationStatus> | null>(null)
  const [settingsError, setSettingsError] = useState<string | null>(null)
  const [loadingSettings, setLoadingSettings] = useState(true)
  
  // Scholarship types and grades from API
  const [scholarshipTypes, setScholarshipTypes] = useState<ScholarshipType[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [loadingScholarships, setLoadingScholarships] = useState(true)
  const [loadingGrades, setLoadingGrades] = useState(true)
  const [scholarshipsError, setScholarshipsError] = useState<string | null>(null)
  const [gradesError, setGradesError] = useState<string | null>(null)

  // Clear field error when user starts typing
  const clearFieldError = (fieldName: string) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }

  // Validate a single field
  const validateField = (name: string, value: string | number): string | null => {
    switch (name) {
      case 'name':
        return validateName(value as string, 'Student name').error || null
      case 'fatherName':
        return validateName(value as string, 'Father name').error || null
      case 'dob':
        return validateDateOfBirth(value as string).error || null
      case 'mobile':
        return validatePakistanPhoneNumber(value as string, true).error || null
      case 'whatsApp':
        if (value && (value as string).trim()) {
          return validatePakistanPhoneNumber(value as string, false).error || null
        }
        return null
      case 'email':
        return validateEmail(value as string).error || null
      case 'gender':
        if (value === -1) return 'Please select a gender'
        return null
      case 'gradeId':
        if (!value || value === 0) return 'Please select a grade'
        return null
      case 'scholarshipType':
        if (formData.applyForScholarship && (value === null || value === '')) {
          return 'Please select a scholarship type'
        }
        return null
      default:
        return null
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    // Clear error for this field when user starts typing
    clearFieldError(name)

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        ...(name === 'applyForScholarship' && !checked ? { scholarshipType: null } : {}),
      }))
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value ? parseInt(value) : 0,
      }))
    } else if (name === 'gender' || name === 'gradeId' || name === 'boarderDayScholar' || name === 'paymentMethod' || name === 'scholarshipType') {
      // Handle numeric select fields
      setFormData(prev => ({
        ...prev,
        [name]: value === '' || value === '-1' ? (name === 'gender' ? -1 : name === 'gradeId' ? 0 : prev[name as keyof FormData] as number) : parseInt(value),
      }))
    } else if (name === 'mobile' || name === 'whatsApp') {
      // Apply phone number masking
      const masked = maskPakistanPhoneNumber(value)
      setFormData(prev => ({
        ...prev,
        [name]: masked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Validate on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value as string | number)
    if (error) {
      setFieldErrors(prev => ({ ...prev, [name]: error }))
    } else {
      clearFieldError(name)
    }
  }

  const handleImageChange = (imageUrl: string | null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[RegistrationForm] Image changed:', {
        imageUrl,
        previous: formData.profilePictureUrl
      })
    }
    setFormData(prev => ({
      ...prev,
      profilePictureUrl: imageUrl,
    }))
  }

  const handleImageError = (errorMessage: string) => {
    console.error('[RegistrationForm] Image error:', errorMessage)
    setError(errorMessage)
  }

  // Scroll to first error field
  const scrollToFirstError = () => {
    const firstErrorField = Object.keys(fieldErrors)[0]
    if (firstErrorField) {
      const fieldElement = document.getElementById(firstErrorField) || 
                         document.querySelector(`[name="${firstErrorField}"]`)
      if (fieldElement) {
        fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        fieldElement.focus()
      }
    }
  }

  // Validate all fields
  const validateAllFields = (): boolean => {
    const errors: Record<string, string> = {}

    // Validate all fields
    const nameError = validateField('name', formData.name)
    if (nameError) errors.name = nameError

    const fatherNameError = validateField('fatherName', formData.fatherName)
    if (fatherNameError) errors.fatherName = fatherNameError

    const dobError = validateField('dob', formData.dob)
    if (dobError) errors.dob = dobError

    const genderError = validateField('gender', formData.gender)
    if (genderError) errors.gender = genderError

    const gradeError = validateField('gradeId', formData.gradeId)
    if (gradeError) errors.gradeId = gradeError

    const mobileError = validateField('mobile', formData.mobile)
    if (mobileError) errors.mobile = mobileError

    if (formData.whatsApp) {
      const whatsAppError = validateField('whatsApp', formData.whatsApp)
      if (whatsAppError) errors.whatsApp = whatsAppError
    }

    if (formData.email) {
      const emailError = validateField('email', formData.email)
      if (emailError) errors.email = emailError
    }

    if (formData.applyForScholarship) {
      const scholarshipError = validateField('scholarshipType', formData.scholarshipType ?? '')
      if (scholarshipError) errors.scholarshipType = scholarshipError
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Prevent duplicate submissions
    if (isSubmitting || hasSubmittedRef.current) {
      return
    }

    if (registrationDisabled) {
      setError(settingsStatus?.message || 'Registrations are currently closed.')
      return
    }

    setError(null)
    setFieldErrors({})

    // Validate all fields
    if (!validateAllFields()) {
      // Scroll to first error after a short delay to ensure DOM is updated
      setTimeout(() => {
        scrollToFirstError()
      }, 100)
      return
    }

    setIsSubmitting(true)
    hasSubmittedRef.current = true

    try {
      // Debug: Log form data before submission
      if (process.env.NODE_ENV === 'development') {
        console.log('[RegistrationForm] Submitting with profilePictureUrl:', formData.profilePictureUrl)
      }

      const response = await submitRegistration({
        name: formData.name.trim(),
        fatherName: formData.fatherName.trim(),
        dob: formData.dob,
        gender: formData.gender >= 0 ? formData.gender : 0,
        gradeId: formData.gradeId,
        mobile: cleanPhoneNumber(formData.mobile),
        whatsApp: formData.whatsApp ? cleanPhoneNumber(formData.whatsApp) : undefined,
        email: formData.email ? formData.email.trim().toLowerCase() : undefined,
        formBorCNIC: formData.formBorCNIC ? formData.formBorCNIC.trim() : undefined,
        previousSchoolName: formData.previousSchoolName ? formData.previousSchoolName.trim() : undefined,
        profilePictureUrl: formData.profilePictureUrl || undefined,
        applyForScholarship: formData.applyForScholarship,
        scholarshipType: formData.applyForScholarship && formData.scholarshipType !== null ? formData.scholarshipType : undefined,
        boarderDayScholar: formData.boarderDayScholar,
        paymentMethod: formData.paymentMethod,
      })

      setSuccess(response)
      
      // If response doesn't have test info, fetch from active admission settings as fallback
      if (!response.testVenue || !response.testDate || !response.testTime) {
        try {
          const activeSetting = await getActiveAdmissionSetting()
          if (activeSetting) {
            setTestInfoFromSettings({
              testVenue: activeSetting.defaultTestVenue || undefined,
              testDate: activeSetting.testStartDate || undefined,
              testTime: activeSetting.defaultTestTime || undefined,
            })
          }
        } catch (error) {
          console.warn('[RegistrationForm] Failed to fetch test info from admission settings:', error)
        }
      } else {
        setTestInfoFromSettings(null) // Clear fallback if response has test info
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit registration. Please try again.')
      // Scroll to error message
      setTimeout(() => {
        const errorElement = document.querySelector('[role="alert"]') || 
                           document.querySelector('.bg-red-50')
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    } finally {
      setIsSubmitting(false)
      // Reset duplicate submission flag after a delay
      setTimeout(() => {
        hasSubmittedRef.current = false
      }, 2000)
    }
  }

  // Reset duplicate submission flag when form data changes significantly
  // Scroll to Roll Number section when registration is successful
  useEffect(() => {
    if (success) {
      // Wait for success message to render, then scroll to Roll Number section
      setTimeout(() => {
        const rollNumberSection = document.getElementById('roll-number-section')
        if (rollNumberSection) {
          const offset = 120 // Offset for sticky headers/navigation
          const elementPosition = rollNumberSection.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 300) // Wait for DOM to update
    }
  }, [success])

  // Load admission settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoadingSettings(true)
        const setting = await getActiveAdmissionSetting()
        setActiveSetting(setting)
        setSettingsStatus(deriveRegistrationStatus(setting))
        setSettingsError(null)
      } catch (err) {
        console.error('Unable to load admission settings', err)
        setActiveSetting(null)
        setSettingsStatus(null)
        setSettingsError('Unable to load admission settings at this time.')
      } finally {
        setLoadingSettings(false)
      }
    }
    loadSettings()
  }, [])

  // Load scholarship types from API (only active ones)
  useEffect(() => {
    const loadScholarshipTypes = async () => {
      try {
        setLoadingScholarships(true)
        setScholarshipsError(null)
        const allTypes = await getAllScholarshipTypes()
        // Filter only active scholarship types and sort by displayOrder
        const activeTypes = allTypes
          .filter(type => type.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder)
        setScholarshipTypes(activeTypes)
      } catch (err) {
        console.error('Unable to load scholarship types', err)
        setScholarshipsError('Unable to load scholarship types. Please refresh the page.')
        setScholarshipTypes([]) // Fallback to empty array
      } finally {
        setLoadingScholarships(false)
      }
    }
    loadScholarshipTypes()
  }, [])

  // Load grades from "Passing Marks by Grade" in active admission settings
  useEffect(() => {
    const loadGradesFromCriteria = async () => {
      try {
        setLoadingGrades(true)
        setGradesError(null)

        // First, get active admission setting
        const activeSetting = await getActiveAdmissionSetting()
        
        if (!activeSetting) {
          setGradesError('Admission settings are not configured. Please contact the administration.')
          setGrades([])
          return
        }

        // Get all admission criteria
        const allCriteria = await getAllAdmissionCriteria()
        console.log('[RegistrationForm] Loaded all criteria:', allCriteria)

        // Filter criteria for the active admission setting
        // Match by sessionId and academicYear (or by settingId if available)
        const activeCriteria = allCriteria.filter(criteria => {
          const matchesSession = criteria.sessionId === activeSetting.sessionId
          const matchesYear = criteria.academicYear === activeSetting.academicYear
          const isActive = criteria.isActive !== false // Default to true if not specified
          return matchesSession && matchesYear && isActive
        })

        console.log('[RegistrationForm] Filtered criteria for active setting:', activeCriteria)

        if (activeCriteria.length === 0) {
          setGradesError('No grades have been configured for this admission cycle. Please contact the administration.')
          setGrades([])
          return
        }

        // Extract unique grades from criteria
        // Use a Map to deduplicate by gradeId
        const gradeMap = new Map<number, { id: number; name: string; order: number }>()
        
        for (const criteria of activeCriteria) {
          if (!gradeMap.has(criteria.gradeId)) {
            // If gradeName is available in criteria, use it
            // Otherwise, we'll need to fetch from Grade API
            const gradeName = criteria.gradeName || `Grade ${criteria.gradeId}`
            gradeMap.set(criteria.gradeId, {
              id: criteria.gradeId,
              name: gradeName,
              order: criteria.gradeId // Temporary order, will update if we fetch full grade details
            })
          }
        }

        // Fetch full grade details to get proper order and names
        // This ensures we have correct sorting and names
        try {
          const allGradesFromAPI = await getGrades(true)
          const gradesFromCriteria: Grade[] = []
          
          // Convert Map to Array for iteration
          const gradeMapArray = Array.from(gradeMap.entries())
          for (const [gradeId, gradeInfo] of gradeMapArray) {
            const fullGrade = allGradesFromAPI.find(g => g.id === gradeId)
            if (fullGrade) {
              // Use full grade details (includes proper name and order)
              gradesFromCriteria.push(fullGrade)
            } else {
              // Fallback: use info from criteria
              gradesFromCriteria.push({
                id: gradeInfo.id,
                name: gradeInfo.name,
                order: gradeInfo.order,
                isActive: true,
                createdAt: new Date().toISOString()
              } as Grade)
            }
          }

          // Sort by order field
          const sortedGrades = gradesFromCriteria.sort((a, b) => a.order - b.order)
          console.log('[RegistrationForm] Grades from admission criteria:', sortedGrades)
          setGrades(sortedGrades)
        } catch (gradeApiError) {
          // If Grade API fails, use criteria data as fallback
          console.warn('[RegistrationForm] Failed to fetch full grade details, using criteria data:', gradeApiError)
          const fallbackGrades = Array.from(gradeMap.values())
            .map(g => ({
              id: g.id,
              name: g.name,
              order: g.order,
              isActive: true,
              createdAt: new Date().toISOString()
            } as Grade))
            .sort((a, b) => a.order - b.order)
          setGrades(fallbackGrades)
        }
      } catch (err) {
        console.error('[RegistrationForm] Unable to load grades from admission criteria', err)
        setGradesError('Unable to load grades from admission settings. Please refresh the page.')
        setGrades([]) // Fallback to empty array
      } finally {
        setLoadingGrades(false)
      }
    }
    loadGradesFromCriteria()
  }, [])

  const registrationDisabled = settingsStatus ? !settingsStatus.isOpen : false

  useEffect(() => {
    hasSubmittedRef.current = false
  }, [formData.name, formData.fatherName, formData.dob])

  // Calculate form completion percentage
  const calculateProgress = (): number => {
    const requiredFields = [
      formData.name,
      formData.fatherName,
      formData.dob,
      formData.gender >= 0 ? formData.gender : null,
      formData.gradeId > 0 ? formData.gradeId : null,
      formData.mobile,
      formData.boarderDayScholar,
      formData.paymentMethod,
    ]
    
    const optionalFields = [
      formData.whatsApp,
      formData.email,
      formData.formBorCNIC,
      formData.previousSchoolName,
      formData.profilePictureUrl,
    ]

    const filledRequired = requiredFields.filter(field => field !== null && field !== '' && field !== 0 && field !== -1).length
    const filledOptional = optionalFields.filter(field => field !== null && field !== '').length
    
    // Required fields are 80% of progress, optional are 20%
    const requiredProgress = (filledRequired / requiredFields.length) * 80
    const optionalProgress = (filledOptional / optionalFields.length) * 20
    
    return Math.round(requiredProgress + optionalProgress)
  }

  const formProgress = calculateProgress()

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
              <p className="text-lg text-gray-600">Your registration has been submitted successfully.</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Registration Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div id="roll-number-section" className="bg-white rounded-lg p-4 border-2 border-primary-300 shadow-md transition-all duration-300">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Roll Number</p>
                  <p className="text-xl font-bold text-primary-600">{success.rollNumber || 'Pending'}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{success.name}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Test Venue</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {success.testVenue || testInfoFromSettings?.testVenue || 'TBA'}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Test Date & Time</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {(success.testDate
                      ? formatDate(success.testDate)
                      : testInfoFromSettings?.testDate
                        ? formatDate(testInfoFromSettings.testDate)
                        : 'TBA')}{' '}
                    {formatTime(success.testTime || testInfoFromSettings?.testTime || '')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  generateRollNumberSlipPDF(success).catch((error) => {
                    console.error('Error generating PDF:', error)
                    alert('Failed to generate PDF. Please try again.')
                  })
                }}
                className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <FileText className="w-5 h-5" />
                <span>Print Roll Number Slip</span>
              </button>
              <button
                onClick={() => {
                  setSuccess(null)
                  setFormData({
                    name: '',
                    fatherName: '',
                    dob: '',
                    gender: -1,
                    gradeId: 0,
                    mobile: '',
                    whatsApp: '',
                    email: '',
                    formBorCNIC: '',
                    previousSchoolName: '',
                    profilePictureUrl: null,
                    applyForScholarship: false,
                    scholarshipType: null,
                    boarderDayScholar: 1,
                    paymentMethod: 0,
                  })
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Register Another Student
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Admission Form</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Complete the form below to apply for admission. All fields marked with * are required.
          </p>
        </div>

        <div className="grid gap-4 mb-8 lg:grid-cols-2">
          <div className="flex items-start p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Calendar className="w-5 h-5 text-primary-600 mt-1 mr-3" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Registration window</h3>
              {loadingSettings ? (
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Checking availability...
                </div>
              ) : settingsStatus ? (
                <>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      settingsStatus.isOpen ? 'text-green-700' : 'text-amber-700'
                    }`}
                  >
                    {settingsStatus.message}
                  </p>
                  {settingsStatus.window?.start && settingsStatus.window?.end && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(settingsStatus.window.start)} — {formatDate(settingsStatus.window.end)}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-1 text-sm text-amber-700">
                  {settingsError ?? 'Admission settings have not been configured yet.'}
                </p>
              )}
            </div>
          </div>

          {activeSetting && (
            <div className="flex flex-col gap-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center text-gray-800 text-sm">
                <CreditCard className="w-4 h-4 text-primary-600 mr-2" />
                Registration fee:{' '}
                <span className="font-semibold text-gray-900 ml-1">
                  {activeSetting.registrationFee > 0 ? `PKR ${activeSetting.registrationFee}` : 'Not specified'}
                </span>
              </div>
              {(activeSetting.bankAccountNumber || activeSetting.easyPaisaAccountNumber) && (
                <div className="text-xs text-gray-600 space-y-1">
                  {activeSetting.bankAccountNumber && (
                    <p>
                      Bank:{' '}
                      <span className="font-medium text-gray-900">
                        {activeSetting.bankName} ({activeSetting.bankAccountTitle}) {activeSetting.bankAccountNumber}
                      </span>
                    </p>
                  )}
                  {activeSetting.easyPaisaAccountNumber && (
                    <p>
                      EasyPaisa:{' '}
                      <span className="font-medium text-gray-900">
                        {activeSetting.easyPaisaAccountName} {activeSetting.easyPaisaAccountNumber}
                      </span>
                    </p>
                  )}
                </div>
              )}
              {(activeSetting.contactPhone || activeSetting.contactEmail || activeSetting.contactWhatsApp) && (
                <div className="flex items-start text-xs text-gray-600">
                  <Phone className="w-4 h-4 text-primary-600 mr-2 mt-0.5" />
                  <div className="space-y-1">
                    {activeSetting.contactPhone && <p>Phone: {activeSetting.contactPhone}</p>}
                    {activeSetting.contactWhatsApp && <p>WhatsApp: {activeSetting.contactWhatsApp}</p>}
                    {activeSetting.contactEmail && <p>Email: {activeSetting.contactEmail}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {settingsStatus && !settingsStatus.isOpen && (
            <div className="lg:col-span-2 flex items-start p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-sm">
              <Info className="w-5 h-5 text-amber-600 mt-1 mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-amber-900">Registrations closed</h3>
                <p className="mt-1 text-sm text-amber-800">
                  You can review the form, but submissions are disabled until the registration window opens.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Rules and Regulations - Prominent Position */}
        <div className="mb-8">
          <details className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border-2 border-blue-300 rounded-xl shadow-lg overflow-hidden" open>
            <summary className="px-6 py-5 cursor-pointer font-bold text-lg text-primary-900 hover:text-primary-950 flex items-center justify-between bg-gradient-to-r from-blue-100 to-indigo-100 transition-colors duration-200 list-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-md">
                  <FileText className="w-5 h-5" />
                </div>
                <span>Rules and Regulations for Test</span>
              </div>
              <span className="text-sm font-semibold text-primary-700 bg-white px-3 py-1 rounded-full border border-primary-300">
                Important - Please Read
              </span>
            </summary>
            <div className="px-6 pb-6 pt-4">
              <div className="bg-white rounded-lg p-6 max-h-96 overflow-y-auto border-2 border-blue-200 shadow-inner">
                <div className="mb-4 pb-3 border-b border-gray-200">
                  <h4 className="text-base font-bold text-gray-900 mb-2">Test Rules and Guidelines</h4>
                  <p className="text-sm text-gray-600">Please read all rules carefully before proceeding with registration.</p>
                </div>
                <ol className="space-y-3 list-decimal list-inside">
                  {TEST_RULES.map((rule, index) => (
                    <li key={index} className="text-sm text-gray-700 leading-relaxed pl-2">
                      {rule}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg shadow-md">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-yellow-900 mb-1">
                      ⚠️ Important Notice
                    </p>
                    <p className="text-sm font-semibold text-yellow-800">
                      Registration Fee: Rs. 500/- (Non-refundable)
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      This fee must be paid before the test date. Please ensure you have completed the payment through your selected payment method.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>

        {(activeSetting?.admissionInstructions || activeSetting?.testInstructions) && (
          <div className="mb-10 grid gap-4 md:grid-cols-2">
            {activeSetting?.admissionInstructions && (
              <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Admission Instructions</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">{activeSetting.admissionInstructions}</p>
              </div>
            )}
            {activeSetting?.testInstructions && (
              <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Instructions</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">{activeSetting.testInstructions}</p>
              </div>
            )}
          </div>
        )}

        {error && (
          <div 
            role="alert" 
            aria-live="polite"
            className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3 animate-in slide-in-from-top-2"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
              aria-label="Close error message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Progress Indicator */}
        <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Form Progress</span>
            <span className="text-sm font-bold text-primary-600">{formProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-600 to-accent-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${formProgress}%` }}
              role="progressbar"
              aria-valuenow={formProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Form completion: ${formProgress}%`}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {formProgress < 50 ? 'Getting started...' : formProgress < 80 ? 'Almost there!' : 'Ready to submit!'}
          </p>
        </div>

        {/* Form Section Navigation */}
        <FormSectionNavigation />

        <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100 space-y-6 lg:space-y-8">
          {/* Basic Information */}
          <div id="basic-information" className="scroll-mt-24 space-y-4 lg:space-y-6">
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <div className="h-1 w-8 bg-primary-600 rounded"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-800">
                Basic Information
              </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Profile Picture - Left Column */}
              <div className="lg:col-span-1 order-1 lg:order-1 w-full min-w-0">
                <ProfileImageUpload
                  value={formData.profilePictureUrl}
                  onChange={handleImageChange}
                  onError={handleImageError}
                  mode="create"
                  disabled={isSubmitting}
                  size="md"
                  shape="rounded"
                  forceVertical={true}
                />
              </div>

              {/* Name and Personal Details - Right Columns */}
              <div className="lg:col-span-2 space-y-4 lg:space-y-5 order-2 lg:order-2">
                <FormField label="Student Name" required htmlFor="name" error={fieldErrors.name}>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base ${
                      fieldErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                  />
                </FormField>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Father Name" required htmlFor="fatherName" error={fieldErrors.fatherName}>
                    <input
                      id="fatherName"
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base ${
                        fieldErrors.fatherName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      required
                      aria-invalid={!!fieldErrors.fatherName}
                      aria-describedby={fieldErrors.fatherName ? 'fatherName-error' : undefined}
                    />
                  </FormField>

                  <FormField label="Date of Birth" required htmlFor="dob" error={fieldErrors.dob}>
                    <input
                      id="dob"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base ${
                        fieldErrors.dob ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      required
                      aria-invalid={!!fieldErrors.dob}
                      aria-describedby={fieldErrors.dob ? 'dob-error' : undefined}
                    />
                  </FormField>

                  <FormField label="Gender" required htmlFor="gender" error={fieldErrors.gender}>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base bg-white ${
                        fieldErrors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      required
                      aria-invalid={!!fieldErrors.gender}
                      aria-describedby={fieldErrors.gender ? 'gender-error' : undefined}
                    >
                      <option value={-1}>Select Gender</option>
                      <option value={0}>Male</option>
                      <option value={1}>Female</option>
                      <option value={2}>Other</option>
                    </select>
                  </FormField>

                  <FormField label="Form B / CNIC Number" htmlFor="formBorCNIC">
                    <input
                      id="formBorCNIC"
                      type="text"
                      name="formBorCNIC"
                      value={formData.formBorCNIC}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
                      aria-invalid={false}
                    />
                  </FormField>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div id="academic-information" className="scroll-mt-24 space-y-4 lg:space-y-6">
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <div className="h-1 w-8 bg-primary-600 rounded"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-800">
                Academic Information
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <FormField label="Grade Apply For" required htmlFor="gradeId" error={fieldErrors.gradeId}>
                {process.env.NODE_ENV === 'development' && (
                  <div className="mb-2 text-xs text-gray-500">
                    Debug: {loadingGrades ? 'Loading...' : `${grades.length} grades loaded from API`}
                  </div>
                )}
                <select
                  id="gradeId"
                  name="gradeId"
                  value={formData.gradeId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base bg-white ${
                    fieldErrors.gradeId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                  aria-invalid={!!fieldErrors.gradeId}
                  aria-describedby={fieldErrors.gradeId ? 'gradeId-error' : undefined}
                >
                  <option value={0} disabled>
                    {loadingGrades ? 'Loading grades...' : grades.length === 0 ? 'No grades available' : 'Select Grade'}
                  </option>
                  {grades.length > 0 && grades.map(grade => (
                    <option key={grade.id} value={grade.id}>
                      {grade.name}
                    </option>
                  ))}
                </select>
                {gradesError && (
                  <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {gradesError}
                  </p>
                )}
                {!loadingGrades && grades.length === 0 && !gradesError && (
                  <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    No active grades available. Please contact the administration.
                  </p>
                )}
              </FormField>

              <FormField label="Previous School Name" htmlFor="previousSchoolName">
                <input
                  id="previousSchoolName"
                  type="text"
                  name="previousSchoolName"
                  value={formData.previousSchoolName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base"
                  aria-invalid={false}
                />
              </FormField>
            </div>
          </div>

          {/* Contact Information */}
          <div id="contact-information" className="scroll-mt-24 space-y-4 lg:space-y-6">
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <div className="h-1 w-8 bg-primary-600 rounded"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-800">
                Contact Information
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <FormField 
                label="Mobile Number" 
                required 
                htmlFor="mobile"
                hint="Primary contact number"
                error={fieldErrors.mobile}
              >
                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength={12}
                  placeholder="03XX-XXXXXXX"
                  className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base ${
                    fieldErrors.mobile ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                  aria-invalid={!!fieldErrors.mobile}
                  aria-describedby={fieldErrors.mobile ? 'mobile-error' : undefined}
                />
              </FormField>

              <FormField 
                label="WhatsApp Number" 
                htmlFor="whatsApp"
                hint="Optional - for WhatsApp communication"
                error={fieldErrors.whatsApp}
              >
                <input
                  id="whatsApp"
                  type="tel"
                  name="whatsApp"
                  value={formData.whatsApp}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength={12}
                  placeholder="03XX-XXXXXXX"
                  className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base ${
                    fieldErrors.whatsApp ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  aria-invalid={!!fieldErrors.whatsApp}
                  aria-describedby={fieldErrors.whatsApp ? 'whatsApp-error' : undefined}
                />
              </FormField>

              <FormField 
                label="Email Address" 
                htmlFor="email"
                hint="Optional - for email notifications"
                className="sm:col-span-2"
                error={fieldErrors.email}
              >
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base ${
                    fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                />
              </FormField>
            </div>
          </div>

          {/* Additional Information */}
          <div id="additional-information" className="scroll-mt-24 space-y-4 lg:space-y-6">
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <div className="h-1 w-8 bg-primary-600 rounded"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-800">
                Additional Information
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <FormField label="Boarder / Day Scholar" required htmlFor="boarderDayScholar">
                <select
                  id="boarderDayScholar"
                  name="boarderDayScholar"
                  value={formData.boarderDayScholar}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base bg-white"
                  required
                  aria-invalid={false}
                >
                  <option value={0}>Boarder</option>
                  <option value={1}>Day Scholar</option>
                </select>
              </FormField>

              <FormField 
                label="Registration Fee Payment Method" 
                required 
                htmlFor="paymentMethod"
              >
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base bg-white"
                  required
                  aria-invalid={false}
                >
                  <option value={0}>EasyPaisa</option>
                  <option value={1}>Bank Account</option>
                  <option value={2}>By Hand on Test Date</option>
                </select>
                <p className="mt-2 text-xs sm:text-sm text-gray-600">
                  Registration Fee: <span className="font-semibold text-primary-600">
                    {activeSetting?.registrationFee ? `PKR ${activeSetting.registrationFee}` : 'PKR 500/-'}
                  </span> (Non-refundable)
                </p>

                {/* Dynamic Payment Information Based on Selected Method */}
                {activeSetting && formData.paymentMethod === 0 && activeSetting.easyPaisaAccountNumber && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-in slide-in-from-top-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                        <Wallet className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-green-900 mb-2">
                          EasyPaisa Payment Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          {activeSetting.easyPaisaAccountName && (
                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                              <span className="font-medium text-gray-700 sm:min-w-[120px] flex-shrink-0">Account Name:</span>
                              <span className="text-gray-900 font-semibold break-words">{activeSetting.easyPaisaAccountName}</span>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                            <span className="font-medium text-gray-700 sm:min-w-[120px] flex-shrink-0">Account Number:</span>
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-gray-900 font-semibold font-mono break-all">{activeSetting.easyPaisaAccountNumber}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(activeSetting.easyPaisaAccountNumber || '')
                                }}
                                className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100 rounded transition-colors flex-shrink-0"
                                title="Copy account number"
                                aria-label="Copy EasyPaisa account number"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-green-700 mt-3 pt-3 border-t border-green-200 break-words">
                          <Info className="w-3 h-3 inline mr-1" />
                          Please send the registration fee to the above EasyPaisa account and keep the transaction receipt for your records.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSetting && formData.paymentMethod === 1 && activeSetting.bankAccountNumber && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-in slide-in-from-top-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Bank Account Payment Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          {activeSetting.bankName && (
                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                              <span className="font-medium text-gray-700 sm:min-w-[120px] flex-shrink-0">Bank Name:</span>
                              <span className="text-gray-900 font-semibold break-words">{activeSetting.bankName}</span>
                            </div>
                          )}
                          {activeSetting.bankAccountTitle && (
                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                              <span className="font-medium text-gray-700 sm:min-w-[120px] flex-shrink-0">Account Title:</span>
                              <span className="text-gray-900 font-semibold break-words">{activeSetting.bankAccountTitle}</span>
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                            <span className="font-medium text-gray-700 sm:min-w-[120px] flex-shrink-0">Account Number:</span>
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-gray-900 font-semibold font-mono break-all">{activeSetting.bankAccountNumber}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(activeSetting.bankAccountNumber || '')
                                }}
                                className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded transition-colors flex-shrink-0"
                                title="Copy account number"
                                aria-label="Copy bank account number"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          {activeSetting.bankIBAN && (
                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                              <span className="font-medium text-gray-700 sm:min-w-[120px] flex-shrink-0">IBAN:</span>
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <span className="text-gray-900 font-semibold font-mono break-all">{activeSetting.bankIBAN}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(activeSetting.bankIBAN || '')
                                  }}
                                  className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded transition-colors flex-shrink-0"
                                  title="Copy IBAN"
                                  aria-label="Copy bank IBAN"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                          {activeSetting.bankBranch && (
                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                              <span className="font-medium text-gray-700 sm:min-w-[120px] flex-shrink-0">Branch:</span>
                              <span className="text-gray-900 break-words">{activeSetting.bankBranch}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-blue-700 mt-3 pt-3 border-t border-blue-200 break-words">
                          <Info className="w-3 h-3 inline mr-1" />
                          Please deposit the registration fee to the above bank account and keep the deposit slip for your records.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 2 && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg animate-in slide-in-from-top-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-amber-900 mb-2">
                          Payment on Test Date
                        </h4>
                        <p className="text-sm text-amber-800 break-words">
                          You will pay the registration fee in person on the test date. Please bring the exact cash amount of{' '}
                          <span className="font-semibold">
                            {activeSetting?.registrationFee ? `PKR ${activeSetting.registrationFee}` : 'PKR 500/-'}
                          </span>.
                        </p>
                        {activeSetting?.testStartDate && (
                          <p className="text-xs text-amber-700 mt-2">Test Date: {formatDate(activeSetting.testStartDate)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Show message if payment method selected but info not configured */}
                {activeSetting && formData.paymentMethod === 0 && !activeSetting.easyPaisaAccountNumber && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700 flex items-start gap-2 break-words">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>EasyPaisa payment information is not configured. Please contact the administration.</span>
                    </p>
                  </div>
                )}

                {activeSetting && formData.paymentMethod === 1 && !activeSetting.bankAccountNumber && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700 flex items-start gap-2 break-words">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Bank account payment information is not configured. Please contact the administration.</span>
                    </p>
                  </div>
                )}

                {!activeSetting && formData.paymentMethod !== 2 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700 flex items-start gap-2 break-words">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Payment information is not available. Please contact the administration.</span>
                    </p>
                  </div>
                )}
              </FormField>
            </div>
          </div>

          {/* Scholarship Information */}
          <div id="scholarship-information" className="scroll-mt-24 space-y-4 lg:space-y-6">
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <div className="h-1 w-8 bg-primary-600 rounded"></div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-800">
                Scholarship Information
              </h3>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="applyForScholarship"
                  checked={formData.applyForScholarship}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-0.5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                  id="applyForScholarship"
                />
                <label htmlFor="applyForScholarship" className="text-base font-semibold text-gray-700 cursor-pointer">
                  Apply for Scholarship
                </label>
              </div>

              {formData.applyForScholarship && (
                <div className="mt-4 pl-0 sm:pl-8">
                  <FormField label="Scholarship Type" required htmlFor="scholarshipType" error={fieldErrors.scholarshipType}>
                    <select
                      id="scholarshipType"
                      name="scholarshipType"
                      value={formData.scholarshipType ?? ''}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-2.5 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-base bg-white ${
                        fieldErrors.scholarshipType ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      required={formData.applyForScholarship}
                      aria-invalid={!!fieldErrors.scholarshipType}
                      aria-describedby={fieldErrors.scholarshipType ? 'scholarshipType-error' : undefined}
                    >
                      <option value="">
                        {loadingScholarships ? 'Loading scholarship types...' : 'Select Scholarship Type'}
                      </option>
                      {scholarshipTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    {scholarshipsError && (
                      <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {scholarshipsError}
                      </p>
                    )}
                    {!loadingScholarships && scholarshipTypes.length === 0 && !scholarshipsError && (
                      <p className="mt-1 text-sm text-amber-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        No active scholarship types available. Please contact the administration.
                      </p>
                    )}
                  </FormField>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 sm:pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting || registrationDisabled}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 min-h-[44px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Registration...</span>
                </>
              ) : (
                <span>{registrationDisabled ? 'Registrations Closed' : 'Submit Registration'}</span>
              )}
            </button>
            <p className="mt-3 text-center text-xs sm:text-sm text-gray-500">
              By submitting, you confirm that you have read and agree to the Rules and Regulations for Test mentioned above
            </p>
          </div>
        </form>
        </div>
      </div>
    </section>
  )
}

