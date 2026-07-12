'use client'

import { useState } from 'react'
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Phone,
  User,
  Users,
} from 'lucide-react'
import ProfileImageUpload from '@/components/ui/ProfileImageUpload'
import { submitPakiansFacultyRegistration } from '@/lib/api/pakiansFaculty'
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
  Record<'mobileNumber' | 'whatsAppNumber' | 'profileImageUrl' | 'experienceYears', string>
>

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm sm:text-base text-gray-900 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:bg-gray-50'
const labelClass = 'mb-1.5 block text-sm font-semibold text-gray-800'

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
  })

  const isTeaching = form.staffCategory === 'Teaching'

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setSubmitError('')
  }

  const validatePhones = (): boolean => {
    const next: FieldErrors = {}
    const mobile = cleanPhoneNumber(form.mobileNumber)
    const whatsApp = cleanPhoneNumber(form.whatsAppNumber)

    const mobileValidation = validatePakistanPhoneNumber(mobile, true)
    if (!mobileValidation.valid) {
      next.mobileNumber = mobileValidation.error || 'Invalid mobile number'
    }

    const whatsAppValidation = validatePakistanPhoneNumber(whatsApp, true)
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
      <section className="py-10 sm:py-14">
        <div className="container-custom max-w-2xl">
          <div className="rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 sm:p-10 text-center shadow-xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-9 w-9 text-green-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Registration Received</h2>
            <p className="text-gray-600 leading-relaxed">
              Thank you for registering as Pak Wattan faculty. Our administration team will review your
              application and verify your details. You will be contacted if further information is needed.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="register" className="py-10 sm:py-14 bg-gradient-to-b from-slate-50 via-white to-primary-50/40">
      <div className="container-custom max-w-3xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary-800">
            <GraduationCap className="h-4 w-4" />
            Faculty Onboarding
          </span>
          <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 font-josefin">
            {PAKIANS_FACULTY_PAGE_TITLE}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Register as teaching or non-teaching staff at Pak Wattan School &amp; College of Sciences.
            All fields are mandatory. Duplicate registrations by name, mobile, or WhatsApp are not allowed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Personal details */}
          <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-7 shadow-lg shadow-primary-900/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                <p className="text-sm text-gray-500">Your basic identity details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
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
              <div>
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

            <div className="mt-5">
              <label className={labelClass}>
                Profile Picture <span className="text-red-500">*</span>
              </label>
              <div className="rounded-2xl border border-dashed border-primary-200 bg-primary-50/40 p-4 sm:p-5">
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
                  size="lg"
                  shape="rounded"
                  forceVertical
                />
              </div>
              {fieldErrors.profileImageUrl && (
                <p className="mt-2 text-sm text-red-600">{fieldErrors.profileImageUrl}</p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-7 shadow-lg shadow-primary-900/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Contact Details</h2>
                <p className="text-sm text-gray-500">Pakistan mobile format: 03XX-XXXXXXX</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label htmlFor="mobileNumber" className={labelClass}>
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  required
                  inputMode="numeric"
                  value={maskPakistanPhoneNumber(form.mobileNumber)}
                  onChange={(e) => {
                    updateField('mobileNumber', cleanPhoneNumber(e.target.value))
                    setFieldErrors((prev) => {
                      const next = { ...prev }
                      delete next.mobileNumber
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
                  value={maskPakistanPhoneNumber(form.whatsAppNumber)}
                  onChange={(e) => {
                    updateField('whatsAppNumber', cleanPhoneNumber(e.target.value))
                    setFieldErrors((prev) => {
                      const next = { ...prev }
                      delete next.whatsAppNumber
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
          <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-7 shadow-lg shadow-primary-900/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Staff Category</h2>
                <p className="text-sm text-gray-500">Select teaching or non-teaching</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {PAKIANS_FACULTY_STAFF_CATEGORY_OPTIONS.map((option) => {
                const selected = form.staffCategory === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField('staffCategory', option.value)}
                    className={`rounded-2xl border-2 p-4 text-left transition-all touch-target min-h-[72px] ${
                      selected
                        ? 'border-primary-500 bg-primary-50 shadow-md ring-2 ring-primary-200'
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <p className="font-bold text-gray-900">{option.label}</p>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">{option.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Role details */}
          <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-7 shadow-lg shadow-primary-900/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                {isTeaching ? <BookOpen className="h-5 w-5" /> : <Briefcase className="h-5 w-5" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {isTeaching ? 'Teaching Details' : 'Non-Teaching Role'}
                </h2>
                <p className="text-sm text-gray-500">
                  {isTeaching
                    ? 'Wing, subject, and designation information'
                    : 'Your administrative or support role'}
                </p>
              </div>
            </div>

            {isTeaching ? (
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <p className={labelClass}>
                    Teacher / Wing Incharge <span className="text-red-500">*</span>
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {PAKIANS_FACULTY_ROLE_TYPE_OPTIONS.map((option) => {
                      const selected = form.roleType === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => updateField('roleType', option.value)}
                          className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition touch-target min-h-[48px] ${
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

                <div>
                  <label htmlFor="wing" className={labelClass}>
                    Wing <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="wing"
                    required
                    value={form.wing}
                    onChange={(e) => updateField('wing', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select wing</option>
                    {PAKIANS_FACULTY_WINGS.map((wing) => (
                      <option key={wing} value={wing}>
                        {wing}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
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
                    placeholder="e.g. Mathematics — Boys Senior, Section A"
                  />
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
                    Mention class, wing, and section if applicable.
                  </p>
                </div>
              </div>
            ) : (
              <div>
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
                  placeholder="e.g. Office Assistant, Lab Attendant, Accountant"
                />
              </div>
            )}
          </div>

          {/* Qualifications */}
          <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-7 shadow-lg shadow-primary-900/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Qualification &amp; Experience</h2>
                <p className="text-sm text-gray-500">Academic background and years of experience</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="sm:col-span-2">
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
              <div>
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
                  <p className="mt-1.5 text-sm text-red-600">{fieldErrors.experienceYears}</p>
                )}
              </div>
            </div>
          </div>

          {submitError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 text-base sm:text-lg font-bold text-white shadow-xl transition hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60 touch-target min-h-[52px]"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting...
              </span>
            ) : (
              'Submit Faculty Registration'
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
