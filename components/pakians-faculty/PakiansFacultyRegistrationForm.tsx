'use client'

import { useState } from 'react'
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  KeyRound,
  Loader2,
  Phone,
  User,
  Users,
} from 'lucide-react'
import ProfileImageUpload from '@/components/ui/ProfileImageUpload'
import {
  checkPakiansFacultyUsername,
  submitPakiansFacultyRegistration,
} from '@/lib/api/pakiansFaculty'
import {
  PAKIANS_FACULTY_PAGE_TITLE,
  PAKIANS_FACULTY_ROLE_TYPE_OPTIONS,
  PAKIANS_FACULTY_STAFF_CATEGORY_OPTIONS,
  PAKIANS_FACULTY_WINGS,
  type PakiansFacultyRoleType,
  type PakiansFacultyStaffCategory,
} from '@/lib/pakians-faculty-data'
import {
  cleanPhoneNumber,
  maskPakistanPhoneNumber,
  validatePakistanPhoneNumber,
} from '@/lib/utils'
import { toastService } from '@/lib/utils/toast'

type FieldErrors = Partial<
  Record<
    | 'mobileNumber'
    | 'whatsAppNumber'
    | 'profileImageUrl'
    | 'experienceYears'
    | 'username'
    | 'password'
    | 'confirmPassword',
    string
  >
>

const USERNAME_PATTERN = /^[a-zA-Z0-9._@+-]{3,64}$/

function validatePasswordRules(password: string): string | null {
  if (password.length < 6) return 'Password must be at least 6 characters.'
  if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter.'
  if (!/[a-z]/.test(password)) return 'Password must include at least one lowercase letter.'
  if (!/[0-9]/.test(password)) return 'Password must include at least one digit.'
  return null
}

const inputClass =
  'w-full min-w-0 max-w-full rounded-xl border border-gray-200 bg-white px-3.5 sm:px-4 py-3 text-base text-gray-900 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-gray-50 min-h-[48px]'
const labelClass = 'mb-1.5 block text-sm font-semibold text-gray-800'
const cardClass =
  'rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-7 shadow-lg shadow-primary-900/5 w-full min-w-0 max-w-full overflow-hidden'
const sectionHeaderClass = 'mb-4 sm:mb-5 flex items-start gap-3 min-w-0'

export default function PakiansFacultyRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const [form, setForm] = useState({
    name: '',
    fatherName: '',
    profileImageUrl: null as string | null,
    mobileNumber: '',
    whatsAppNumber: '',
    staffCategory: 'Teaching' as PakiansFacultyStaffCategory,
    roleType: 'Teacher' as PakiansFacultyRoleType,
    wing: '',
    subjectTaught: '',
    roleName: '',
    highestQualification: '',
    experienceYears: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [checkingUsername, setCheckingUsername] = useState(false)

  const isTeaching = form.staffCategory === 'Teaching'

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSubmitError('')
  }

  const clearFieldError = (key: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleUsernameBlur = async () => {
    const username = form.username.trim()
    if (!username) return

    if (!USERNAME_PATTERN.test(username)) {
      setFieldErrors((prev) => ({
        ...prev,
        username: 'Use 3–64 characters: letters, numbers, and . _ @ + - only.',
      }))
      return
    }

    setCheckingUsername(true)
    try {
      const result = await checkPakiansFacultyUsername(username)
      if (!result.available) {
        setFieldErrors((prev) => ({
          ...prev,
          username: result.message || 'This username is already taken.',
        }))
      } else {
        clearFieldError('username')
      }
    } catch {
      // Soft-fail: server will re-check on submit
    } finally {
      setCheckingUsername(false)
    }
  }

  const validatePhones = (): boolean => {
    const next: FieldErrors = {}

    const mobileValidation = validatePakistanPhoneNumber(form.mobileNumber, true)
    if (!mobileValidation.valid) {
      next.mobileNumber = mobileValidation.error || 'Invalid mobile number'
    }

    const whatsAppValidation = validatePakistanPhoneNumber(form.whatsAppNumber, true)
    if (!whatsAppValidation.valid) {
      next.whatsAppNumber = whatsAppValidation.error || 'Invalid WhatsApp number'
    }

    setFieldErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')

    if (!form.name.trim() || !form.fatherName.trim()) {
      setSubmitError('Name and father name are required.')
      return
    }

    if (!form.profileImageUrl) {
      setFieldErrors((prev) => ({ ...prev, profileImageUrl: 'Profile picture is required.' }))
      setSubmitError('Please upload your profile picture.')
      return
    }

    if (!validatePhones()) {
      setSubmitError('Please correct the phone numbers.')
      return
    }

    if (!form.highestQualification.trim()) {
      setSubmitError('Highest qualification is required.')
      return
    }

    const experience = Number(form.experienceYears)
    if (Number.isNaN(experience) || experience < 0 || experience > 60) {
      setFieldErrors((prev) => ({
        ...prev,
        experienceYears: 'Experience must be between 0 and 60 years.',
      }))
      setSubmitError('Please enter valid experience in years.')
      return
    }

    if (isTeaching) {
      if (!form.wing || !form.subjectTaught.trim()) {
        setSubmitError('Wing and subject taught are required for teaching staff.')
        return
      }
    } else if (!form.roleName.trim()) {
      setSubmitError('Role name is required for non-teaching staff.')
      return
    }

    const username = form.username.trim()
    if (!USERNAME_PATTERN.test(username)) {
      setFieldErrors((prev) => ({
        ...prev,
        username: 'Use 3–64 characters: letters, numbers, and . _ @ + - only.',
      }))
      setSubmitError('Please choose a valid unique username.')
      return
    }

    const passwordError = validatePasswordRules(form.password)
    if (passwordError) {
      setFieldErrors((prev) => ({ ...prev, password: passwordError }))
      setSubmitError(passwordError)
      return
    }

    if (form.password !== form.confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match.',
      }))
      setSubmitError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    try {
      await submitPakiansFacultyRegistration({
        name: form.name.trim(),
        fatherName: form.fatherName.trim(),
        profileImageUrl: form.profileImageUrl,
        mobileNumber: cleanPhoneNumber(form.mobileNumber),
        whatsAppNumber: cleanPhoneNumber(form.whatsAppNumber),
        staffCategory: form.staffCategory,
        roleType: isTeaching ? form.roleType : null,
        wing: isTeaching ? form.wing : null,
        subjectTaught: isTeaching ? form.subjectTaught.trim() : null,
        roleName: isTeaching ? null : form.roleName.trim(),
        highestQualification: form.highestQualification.trim(),
        experienceYears: experience,
        username,
        password: form.password,
      })
      setIsSubmitted(true)
      toastService.success('Registration submitted successfully!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.'
      setSubmitError(message)
      toastService.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="overflow-x-hidden py-8 sm:py-14">
        <div className="mx-auto w-full max-w-2xl px-3 sm:px-6">
          <div className="rounded-2xl sm:rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-10 text-center shadow-xl">
            <div className="mx-auto mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9 text-green-600" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-3 break-words">
              Registration Received
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Thank you for registering as Pak Wattan faculty. After an administrator verifies your
              application, you can sign in with the username and password you created.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="register"
      className="overflow-x-hidden py-6 sm:py-14 bg-gradient-to-b from-slate-50 via-white to-primary-50/40"
    >
      <div className="mx-auto w-full max-w-3xl px-3 sm:px-6">
        <div className="mb-6 sm:mb-10 text-center px-1">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-primary-100 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary-800">
            <GraduationCap className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">Faculty Onboarding</span>
          </span>
          <h1 className="mt-3 sm:mt-4 !text-xl xs:!text-2xl sm:!text-3xl md:!text-4xl font-bold text-gray-900 font-josefin leading-tight break-words">
            {PAKIANS_FACULTY_PAGE_TITLE}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Register as teaching or non-teaching staff at Pak Wattan School &amp; College of Sciences.
            Choose a unique username and a strong password. After admin verification you can log in with
            those credentials. The same name with father name, or the same mobile number, cannot be
            registered twice.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8 w-full min-w-0">
          {/* Login credentials */}
          <div className={cardClass}>
            <div className={sectionHeaderClass}>
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <KeyRound className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Login Credentials</h2>
                <p className="text-xs sm:text-sm text-gray-500 leading-snug">
                  Unique username + password (min 6 chars, upper, lower, digit)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              <div className="sm:col-span-2 min-w-0">
                <label htmlFor="username" className={labelClass}>
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative min-w-0">
                  <input
                    id="username"
                    type="text"
                    required
                    autoComplete="username"
                    value={form.username}
                    onChange={(e) => {
                      updateField('username', e.target.value.replace(/\s/g, ''))
                      clearFieldError('username')
                    }}
                    onBlur={handleUsernameBlur}
                    className={`${inputClass} pr-10`}
                    placeholder="e.g. ahmed.khan"
                    maxLength={64}
                  />
                  {checkingUsername && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
                  )}
                </div>
                {fieldErrors.username ? (
                  <p className="mt-1.5 text-sm text-red-600 break-words">{fieldErrors.username}</p>
                ) : (
                  <p className="mt-1.5 text-xs text-gray-500 leading-snug">
                    Letters, numbers, and . _ @ + - only. Must be unique.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => {
                    updateField('password', e.target.value)
                    clearFieldError('password')
                  }}
                  className={inputClass}
                  placeholder="Create a password"
                  minLength={6}
                />
                {fieldErrors.password && (
                  <p className="mt-1.5 text-sm text-red-600">{fieldErrors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={(e) => {
                    updateField('confirmPassword', e.target.value)
                    clearFieldError('confirmPassword')
                  }}
                  className={inputClass}
                  placeholder="Re-enter password"
                  minLength={6}
                />
                {fieldErrors.confirmPassword && (
                  <p className="mt-1.5 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          {/* Personal details */}
          <div className={cardClass}>
            <div className={sectionHeaderClass}>
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <User className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Personal Information</h2>
                <p className="text-xs sm:text-sm text-gray-500">Your basic identity details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              <div className="min-w-0">
                <label htmlFor="name" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={inputClass}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
              <div className="min-w-0">
                <label htmlFor="fatherName" className={labelClass}>
                  Father Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fatherName"
                  type="text"
                  required
                  value={form.fatherName}
                  onChange={(e) => updateField('fatherName', e.target.value)}
                  className={inputClass}
                  placeholder="Enter father's name"
                />
              </div>
            </div>

            <div className="mt-4 sm:mt-5 min-w-0">
              <label className={labelClass}>
                Profile Picture <span className="text-red-500">*</span>
              </label>
              <div className="rounded-xl sm:rounded-2xl border border-dashed border-primary-200 bg-primary-50/40 p-3 sm:p-5 overflow-hidden">
                <ProfileImageUpload
                  value={form.profileImageUrl}
                  onChange={(url) => {
                    updateField('profileImageUrl', url)
                    if (url) {
                      setFieldErrors((prev) => {
                        const next = { ...prev }
                        delete next.profileImageUrl
                        return next
                      })
                    }
                  }}
                  onError={(msg) => setFieldErrors((prev) => ({ ...prev, profileImageUrl: msg }))}
                  mode="create"
                  size="md"
                  shape="rounded"
                  forceVertical
                  showLabel={false}
                />
              </div>
              {fieldErrors.profileImageUrl && (
                <p className="mt-2 text-sm text-red-600 break-words">{fieldErrors.profileImageUrl}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className={cardClass}>
            <div className={sectionHeaderClass}>
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Contact Details</h2>
                <p className="text-xs sm:text-sm text-gray-500">Pakistan mobile format: 03XX-XXXXXXX</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              <div>
                <label htmlFor="mobileNumber" className={labelClass}>
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  required
                  inputMode="numeric"
                  value={form.mobileNumber}
                  onChange={(e) => {
                    updateField('mobileNumber', maskPakistanPhoneNumber(e.target.value))
                    setFieldErrors((prev) => {
                      const next = { ...prev }
                      delete next.mobileNumber
                      return next
                    })
                  }}
                  onBlur={() => {
                    const result = validatePakistanPhoneNumber(form.mobileNumber, true)
                    setFieldErrors((prev) => {
                      const next = { ...prev }
                      if (result.valid) {
                        delete next.mobileNumber
                      } else if (form.mobileNumber.trim()) {
                        next.mobileNumber = result.error || 'Invalid mobile number'
                      }
                      return next
                    })
                  }}
                  className={inputClass}
                  placeholder="03XX-XXXXXXX"
                />
                {fieldErrors.mobileNumber && (
                  <p className="mt-1.5 text-sm text-red-600">{fieldErrors.mobileNumber}</p>
                )}
              </div>
              <div>
                <label htmlFor="whatsAppNumber" className={labelClass}>
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="whatsAppNumber"
                  type="tel"
                  required
                  inputMode="numeric"
                  value={form.whatsAppNumber}
                  onChange={(e) => {
                    updateField('whatsAppNumber', maskPakistanPhoneNumber(e.target.value))
                    setFieldErrors((prev) => {
                      const next = { ...prev }
                      delete next.whatsAppNumber
                      return next
                    })
                  }}
                  onBlur={() => {
                    const result = validatePakistanPhoneNumber(form.whatsAppNumber, true)
                    setFieldErrors((prev) => {
                      const next = { ...prev }
                      if (result.valid) {
                        delete next.whatsAppNumber
                      } else if (form.whatsAppNumber.trim()) {
                        next.whatsAppNumber = result.error || 'Invalid WhatsApp number'
                      }
                      return next
                    })
                  }}
                  className={inputClass}
                  placeholder="03XX-XXXXXXX"
                />
                {fieldErrors.whatsAppNumber && (
                  <p className="mt-1.5 text-sm text-red-600">{fieldErrors.whatsAppNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Staff category */}
          <div className={cardClass}>
            <div className={sectionHeaderClass}>
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <Users className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Staff Category</h2>
                <p className="text-xs sm:text-sm text-gray-500">Select teaching or non-teaching</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              {PAKIANS_FACULTY_STAFF_CATEGORY_OPTIONS.map((option) => {
                const selected = form.staffCategory === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField('staffCategory', option.value)}
                    className={`rounded-xl sm:rounded-2xl border-2 p-3.5 sm:p-4 text-left transition-all touch-target min-h-[64px] sm:min-h-[72px] w-full min-w-0 ${
                      selected
                        ? 'border-primary-500 bg-primary-50 shadow-md ring-2 ring-primary-200'
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-bold text-gray-900 text-sm sm:text-base">{option.label}</p>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-snug break-words">
                      {option.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Role details */}
          <div className={cardClass}>
            <div className={sectionHeaderClass}>
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                {isTeaching ? <BookOpen className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  {isTeaching ? 'Teaching Details' : 'Non-Teaching Role'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 leading-snug">
                  {isTeaching
                    ? 'Wing, subject, and designation information'
                    : 'Your administrative or support role'}
                </p>
              </div>
            </div>

            {isTeaching ? (
              <div className="space-y-3 sm:space-y-5">
                <div className="min-w-0">
                  <p className={labelClass}>
                    Teacher / Wing Incharge <span className="text-red-500">*</span>
                  </p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3">
                    {PAKIANS_FACULTY_ROLE_TYPE_OPTIONS.map((option) => {
                      const selected = form.roleType === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateField('roleType', option.value)}
                          className={`rounded-xl border-2 px-3 sm:px-4 py-3 text-sm font-semibold transition touch-target min-h-[48px] w-full break-words ${
                            selected
                              ? 'border-primary-500 bg-primary-50 text-primary-800'
                              : 'border-gray-200 text-gray-700 hover:border-primary-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="min-w-0">
                  <label htmlFor="wing" className={labelClass}>
                    Wing <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="wing"
                    required
                    value={form.wing}
                    onChange={(e) => updateField('wing', e.target.value)}
                    className={`${inputClass} appearance-none bg-[length:1rem] pr-10`}
                  >
                    <option value="">Select wing</option>
                    {PAKIANS_FACULTY_WINGS.map((wing) => (
                      <option key={wing} value={wing}>
                        {wing}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="min-w-0">
                  <label htmlFor="subjectTaught" className={labelClass}>
                    Subject Taught <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subjectTaught"
                    type="text"
                    required
                    value={form.subjectTaught}
                    onChange={(e) => updateField('subjectTaught', e.target.value)}
                    className={inputClass}
                    placeholder="e.g. Mathematics — Boys Senior"
                  />
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    Mention class, wing, and section if applicable.
                  </p>
                </div>
              </div>
            ) : (
              <div className="min-w-0">
                <label htmlFor="roleName" className={labelClass}>
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="roleName"
                  type="text"
                  required
                  value={form.roleName}
                  onChange={(e) => updateField('roleName', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Office Assistant, Lab Attendant"
                />
              </div>
            )}
          </div>

          {/* Qualifications */}
          <div className={cardClass}>
            <div className={sectionHeaderClass}>
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Qualification &amp; Experience
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 leading-snug">
                  Academic background and years of experience
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              <div className="sm:col-span-2 min-w-0">
                <label htmlFor="highestQualification" className={labelClass}>
                  Highest Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  id="highestQualification"
                  type="text"
                  required
                  value={form.highestQualification}
                  onChange={(e) => updateField('highestQualification', e.target.value)}
                  className={inputClass}
                  placeholder="e.g. M.Sc Mathematics, B.Ed"
                />
              </div>
              <div className="min-w-0">
                <label htmlFor="experienceYears" className={labelClass}>
                  Total Experience (Years) <span className="text-red-500">*</span>
                </label>
                <input
                  id="experienceYears"
                  type="number"
                  required
                  min={0}
                  max={60}
                  inputMode="numeric"
                  value={form.experienceYears}
                  onChange={(e) => {
                    updateField('experienceYears', e.target.value)
                    setFieldErrors((prev) => {
                      const next = { ...prev }
                      delete next.experienceYears
                      return next
                    })
                  }}
                  className={inputClass}
                  placeholder="0"
                />
                {fieldErrors.experienceYears && (
                  <p className="mt-1.5 text-sm text-red-600 break-words">
                    {fieldErrors.experienceYears}
                  </p>
                )}
              </div>
            </div>
          </div>

          {submitError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 sm:px-4 py-3 text-sm text-red-700 break-words">
              {submitError}
            </div>
          )}

          <div className="pt-1 pb-2 sm:pb-0">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 sm:px-6 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl transition hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60 touch-target min-h-[52px]"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </span>
              ) : (
                <span className="break-words">Submit Faculty Registration</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
