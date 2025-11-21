'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Loader2, User, Mail, Lock, Phone, Users, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { 
  Guardian, 
  CreateGuardianRequest, 
  UpdateGuardianRequest, 
  createGuardian, 
  updateGuardian,
  checkGuardianEmailExists,
  GuardianRelation
} from '@/lib/api/guardians'
import { maskPakistanPhoneNumber, validatePakistanPhoneNumber, cleanPhoneNumber, debounce } from '@/lib/utils'
import FormField from '@/components/ui/FormField'

interface GuardianFormProps {
  guardian?: Guardian | null
  mode: 'create' | 'edit'
  onClose: () => void
  onSuccess: (message?: string, createdGuardian?: Guardian) => void
  studentId?: number // Optional: Link to student during creation
}

type FormData = Omit<CreateGuardianRequest, 'password'> & {
  password: string
  confirmPassword?: string
}

const RELATION_OPTIONS: { value: GuardianRelation; label: string; icon: string }[] = [
  { value: 'Father', label: 'Father', icon: '👨' },
  { value: 'Mother', label: 'Mother', icon: '👩' },
  { value: 'Brother', label: 'Brother', icon: '👦' },
  { value: 'Sister', label: 'Sister', icon: '👧' },
  { value: 'Guardian', label: 'Guardian', icon: '👤' },
]

export default function GuardianForm({ guardian, mode, onClose, onSuccess, studentId }: GuardianFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    whatsApp: '',
    relation: 'Father',
    address: '',
    cnic: '',
    occupation: '',
    isActive: true,
    studentId: studentId,
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [checkingEmail, setCheckingEmail] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Load guardian data when in edit mode
  useEffect(() => {
    if (guardian && mode === 'edit') {
      const formattedPhone = guardian.phone ? maskPakistanPhoneNumber(guardian.phone) : ''
      const formattedWhatsApp = guardian.whatsApp ? maskPakistanPhoneNumber(guardian.whatsApp) : ''
      
      setFormData({
        firstName: guardian.firstName,
        lastName: guardian.lastName,
        email: guardian.email,
        password: '', // Don't pre-fill password
        confirmPassword: '',
        phone: formattedPhone,
        whatsApp: formattedWhatsApp,
        relation: guardian.relation,
        address: guardian.address || '',
        cnic: guardian.cnic || '',
        occupation: guardian.occupation || '',
        isActive: guardian.isActive,
        studentId: undefined, // Don't pre-fill studentId in edit mode
      })
    }
  }, [guardian, mode])

  // Debounced email check function
  const debouncedEmailCheck = debounce(async (email: string) => {
    if (!email || email.trim() === '') {
      setCheckingEmail(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setCheckingEmail(false)
      return
    }

    try {
      setCheckingEmail(true)
      const excludeId = mode === 'edit' && guardian ? guardian.id : undefined
      const emailExists = await checkGuardianEmailExists(email, excludeId)
      
      if (emailExists) {
        setErrors(prev => ({
          ...prev,
          email: 'This email is already registered. Please use a different email address.'
        }))
      } else {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.email
          return newErrors
        })
      }
    } catch (error) {
      console.error('Email check failed:', error)
    } finally {
      setCheckingEmail(false)
    }
  }, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Special handling for phone and WhatsApp fields - apply masking in real-time
    if (name === 'phone' || name === 'whatsApp') {
      const masked = maskPakistanPhoneNumber(value)
      setFormData((prev) => ({
        ...prev,
        [name]: masked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    // Email validation
    if (name === 'email' && mode === 'create') {
      debouncedEmailCheck(value)
    }
  }

  const handlePhoneBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Only validate if there's a value (phone is required, WhatsApp is optional)
    if (value && value.trim() !== '') {
      const validation = validatePakistanPhoneNumber(value)
      if (!validation.valid) {
        setErrors((prev) => ({
          ...prev,
          [name]: validation.error || 'Invalid phone number format',
        }))
      } else {
        // Clear error if validation passes
        setErrors((prev) => {
          if (prev[name]) {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
          }
          return prev
        })
        
        // Format the number on blur
        const cleaned = cleanPhoneNumber(value)
        const formatted = maskPakistanPhoneNumber(cleaned)
        setFormData(prev => ({ ...prev, [name]: formatted }))
      }
    } else if (name === 'phone') {
      // Phone is required, so show error if empty
      setErrors((prev) => ({
        ...prev,
        [name]: 'Phone number is required',
      }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (mode === 'create') {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    } else if (formData.password && formData.password.length > 0) {
      // In edit mode, password is optional but if provided, must be valid
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else {
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

    if (!formData.relation) {
      newErrors.relation = 'Relation is required'
    }

    // Final email check before submission
    if (formData.email && formData.email.trim() !== '') {
      try {
        const excludeId = mode === 'edit' && guardian ? guardian.id : undefined
        const emailExists = await checkGuardianEmailExists(formData.email, excludeId)
        if (emailExists) {
          newErrors.email = 'This email is already registered. Please use a different email address.'
        }
      } catch (error) {
        console.error('Email check failed:', error)
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    try {
      // Clean phone numbers before sending
      const submitData: CreateGuardianRequest | UpdateGuardianRequest = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: cleanPhoneNumber(formData.phone),
        whatsApp: formData.whatsApp ? cleanPhoneNumber(formData.whatsApp) : undefined,
        relation: formData.relation,
        address: formData.address?.trim() || undefined,
        cnic: formData.cnic?.trim() || undefined,
        occupation: formData.occupation?.trim() || undefined,
        isActive: formData.isActive,
      }

      if (mode === 'create') {
        const createdGuardian = await createGuardian({
          ...submitData as CreateGuardianRequest,
          password: formData.password,
          studentId: formData.studentId,
        })
        onSuccess('Guardian created successfully', createdGuardian)
      } else if (guardian) {
        const updateData: UpdateGuardianRequest = { ...submitData }
        // Only include password if provided
        if (formData.password && formData.password.length > 0) {
          // Note: Update endpoint might need password handling separately
          // For now, we'll update without password (password reset should be separate)
        }
        await updateGuardian(guardian.id, updateData)
        onSuccess('Guardian updated successfully')
      }
    } catch (err: unknown) {
      let errorMessage = 'Unable to save guardian. Please check your input and try again.'
      
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
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        // Close modal when clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      onKeyDown={(e) => {
        // Close modal on Escape key
        if (e.key === 'Escape') {
          onClose()
        }
      }}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Create New Guardian' : 'Edit Guardian'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-200 transition-all duration-200 p-1 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2"
            aria-label={`Close ${mode === 'create' ? 'create guardian' : 'edit guardian'} form`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <FormField label="First Name" required error={errors.firstName} htmlFor="firstName">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
                />
              </div>
            </FormField>

            {/* Last Name */}
            <FormField label="Last Name" required error={errors.lastName} htmlFor="lastName">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                />
              </div>
            </FormField>

            {/* Email */}
            <FormField 
              label="Email Address (Username)" 
              required 
              error={errors.email}
              hint={mode === 'edit' ? 'Email cannot be changed after creation' : (checkingEmail ? 'Checking email availability...' : undefined)}
              htmlFor="email"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={mode === 'create' ? () => debouncedEmailCheck(formData.email) : undefined}
                  required
                  disabled={mode === 'edit'}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : checkingEmail ? 'email-checking' : mode === 'edit' ? 'email-hint' : undefined}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } ${mode === 'edit' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="Enter email address"
                />
                {checkingEmail && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-live="polite" aria-label="Checking email">
                    <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
                  </div>
                )}
              </div>
            </FormField>

            {/* Relation */}
            <FormField 
              label={
                <span className="flex items-center">
                  <Users className="inline w-4 h-4 mr-1" />
                  Relation
                </span>
              }
              required 
              error={errors.relation}
              htmlFor="relation"
            >
              <select
                id="relation"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                required
                aria-invalid={!!errors.relation}
                aria-describedby={errors.relation ? 'relation-error' : undefined}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.relation ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                {RELATION_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Phone */}
            <FormField 
              label="Phone Number" 
              required 
              error={errors.phone}
              hint={!errors.phone ? 'Format: 03XX-XXXXXXX (11 digits)' : undefined}
              htmlFor="phone"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handlePhoneBlur}
                  required
                  maxLength={12}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="03XX-XXXXXXX"
                />
              </div>
            </FormField>

            {/* WhatsApp */}
            <FormField 
              label="WhatsApp Number (Optional)" 
              error={errors.whatsApp}
              hint={!errors.whatsApp ? 'Format: 03XX-XXXXXXX (11 digits)' : undefined}
              htmlFor="whatsApp"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="whatsApp"
                  type="tel"
                  name="whatsApp"
                  value={formData.whatsApp}
                  onChange={handleChange}
                  onBlur={handlePhoneBlur}
                  maxLength={12}
                  aria-invalid={!!errors.whatsApp}
                  aria-describedby={errors.whatsApp ? 'whatsApp-error' : undefined}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                    errors.whatsApp ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="03XX-XXXXXXX"
                />
              </div>
            </FormField>

            {/* Password - Only for create mode */}
            {mode === 'create' && (
              <>
                <FormField 
                  label="Password" 
                  required 
                  error={errors.password}
                  hint="Minimum 6 characters"
                  htmlFor="password"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                      className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-all duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormField>

                <FormField 
                  label="Confirm Password" 
                  required 
                  error={errors.confirmPassword}
                  htmlFor="confirmPassword"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                      className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                        errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-all duration-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </FormField>
              </>
            )}

            {/* CNIC */}
            <FormField label="CNIC (Optional)" error={errors.cnic} htmlFor="cnic">
              <input
                id="cnic"
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                maxLength={15}
                aria-invalid={!!errors.cnic}
                aria-describedby={errors.cnic ? 'cnic-error' : undefined}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="XXXXX-XXXXXXX-X"
              />
            </FormField>

            {/* Occupation */}
            <FormField label="Occupation (Optional)" error={errors.occupation} htmlFor="occupation">
              <input
                id="occupation"
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                aria-invalid={!!errors.occupation}
                aria-describedby={errors.occupation ? 'occupation-error' : undefined}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter occupation"
              />
            </FormField>
          </div>

          {/* Address */}
          <FormField label="Address (Optional)" error={errors.address} htmlFor="address">
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? 'address-error' : undefined}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-y"
              placeholder="Enter address"
            />
          </FormField>

          {/* Is Active */}
          <div className="flex items-start space-x-3 pt-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="mt-0.5 h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 border-gray-300 rounded transition-all duration-200"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
              Activate guardian immediately (guardian can login right away)
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label="Cancel and close form"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
              aria-label={mode === 'create' ? 'Create guardian' : 'Update guardian'}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{mode === 'create' ? 'Create Guardian' : 'Update Guardian'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

