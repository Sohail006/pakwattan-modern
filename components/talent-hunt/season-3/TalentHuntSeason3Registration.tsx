'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { Award, Building2, CheckCircle, Phone, User } from 'lucide-react'
import {
  submitTalentHuntSeason3Registration,
  type TalentHuntSeason3SubmitRequest,
} from '@/lib/api/talentHuntSeason3'
import {
  TALENT_HUNT_GENDER_OPTIONS,
  TALENT_HUNT_INSTITUTION_FEE,
  TALENT_HUNT_PARTICIPANT_FEE,
  TALENT_HUNT_SEASON3_REGISTRATION_CONTESTS,
  TALENT_HUNT_SEASON3_TITLE,
} from '@/lib/talent-hunt-season3-data'
import TalentHuntPaymentFields from '@/components/talent-hunt/shared/TalentHuntPaymentFields'
import {
  cleanPhoneNumber,
  maskPakistanPhoneNumber,
  validatePakistanPhoneNumber,
} from '@/lib/utils'

type Tab = 'participant' | 'institution'

type ParticipantFieldErrors = Partial<Record<'phone' | 'emergencyContact', string>>
type InstitutionFieldErrors = Partial<Record<'focalPersonMobile', string>>

const grades = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
]

function tabFromHash(hash: string): Tab {
  const normalized = hash.toLowerCase()
  if (normalized.includes('institution')) return 'institution'
  return 'participant'
}

function scrollToRegistrationHash(hash: string) {
  if (!hash || hash === '#') return
  const target = document.querySelector(hash)
  target?.scrollIntoView({ behavior: 'instant', block: 'start' })
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getHashTab(): Tab {
  const hash = window.location.hash
  if (!hash || !hash.includes('register')) return 'participant'
  return tabFromHash(hash)
}

export default function TalentHuntSeason3Registration() {
  const hashTab = useSyncExternalStore(subscribeToHash, getHashTab, () => 'participant' as Tab)
  const [tab, setTab] = useState<Tab>(hashTab)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [receiptError, setReceiptError] = useState('')
  const [participantFieldErrors, setParticipantFieldErrors] = useState<ParticipantFieldErrors>({})
  const [institutionFieldErrors, setInstitutionFieldErrors] = useState<InstitutionFieldErrors>({})

  const [participant, setParticipant] = useState({
    studentName: '',
    fatherName: '',
    gender: '',
    phone: '',
    grade: '',
    school: '',
    contestCategory: '',
    address: '',
    emergencyContact: '',
    paymentMethod: 0,
    transactionReceiptUrl: null as string | null,
  })

  const contestGroups = TALENT_HUNT_SEASON3_REGISTRATION_CONTESTS.reduce<
    Record<string, (typeof TALENT_HUNT_SEASON3_REGISTRATION_CONTESTS)[number][]>
  >((groups, contest) => {
    if (!groups[contest.group]) groups[contest.group] = []
    groups[contest.group].push(contest)
    return groups
  }, {})

  const [institution, setInstitution] = useState({
    institutionName: '',
    focalPersonName: '',
    focalPersonMobile: '',
    transactionReceiptUrl: null as string | null,
  })

  useEffect(() => {
    setTab(hashTab)
  }, [hashTab])

  useEffect(() => {
    const hash = window.location.hash
    if (!hash || !hash.includes('register')) return
    requestAnimationFrame(() => scrollToRegistrationHash(hash))
  }, [hashTab])

  const clearParticipantFieldError = (name: keyof ParticipantFieldErrors) => {
    setParticipantFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const clearInstitutionFieldError = (name: keyof InstitutionFieldErrors) => {
    setInstitutionFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleParticipantChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name === 'phone' || name === 'emergencyContact') {
      clearParticipantFieldError(name)
      setParticipant((p) => ({ ...p, [name]: maskPakistanPhoneNumber(value) }))
      return
    }
    setParticipant((p) => ({ ...p, [name]: value }))
  }

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'focalPersonMobile') {
      clearInstitutionFieldError('focalPersonMobile')
      setInstitution((p) => ({ ...p, focalPersonMobile: maskPakistanPhoneNumber(value) }))
      return
    }
    setInstitution((p) => ({ ...p, [name]: value }))
  }

  const validateParticipantPhones = (): boolean => {
    const phoneError = validatePakistanPhoneNumber(participant.phone, true).error
    const emergencyError = validatePakistanPhoneNumber(participant.emergencyContact, true).error
    const errors: ParticipantFieldErrors = {}
    if (phoneError) errors.phone = phoneError
    if (emergencyError) errors.emergencyContact = emergencyError
    setParticipantFieldErrors(errors)
    return !phoneError && !emergencyError
  }

  const validateInstitutionPhone = (): boolean => {
    const mobileError = validatePakistanPhoneNumber(institution.focalPersonMobile, true).error
    setInstitutionFieldErrors(mobileError ? { focalPersonMobile: mobileError } : {})
    return !mobileError
  }

  const validateParticipant = (): boolean => {
    setReceiptError('')
    if (!validateParticipantPhones()) return false
    if (
      (participant.paymentMethod === 0 || participant.paymentMethod === 1) &&
      !participant.transactionReceiptUrl
    ) {
      setReceiptError('Please upload your payment receipt.')
      return false
    }
    return true
  }

  const validateInstitution = (): boolean => {
    setReceiptError('')
    if (!validateInstitutionPhone()) return false
    if (!institution.transactionReceiptUrl) {
      setReceiptError('Bank transfer receipt is required for institution registration.')
      return false
    }
    return true
  }

  const handleSubmitParticipant = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateParticipant()) return
    setIsSubmitting(true)
    try {
      const payload: TalentHuntSeason3SubmitRequest = {
        registrationType: 'Participant',
        ...participant,
        phone: cleanPhoneNumber(participant.phone),
        emergencyContact: cleanPhoneNumber(participant.emergencyContact),
        registrationFee: TALENT_HUNT_PARTICIPANT_FEE,
        transactionReceiptUrl: participant.transactionReceiptUrl,
      }
      await submitTalentHuntSeason3Registration(payload)
      setIsSubmitted(true)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Registration failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitInstitution = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateInstitution()) return
    setIsSubmitting(true)
    try {
      const payload: TalentHuntSeason3SubmitRequest = {
        registrationType: 'Institution',
        institutionName: institution.institutionName,
        focalPersonName: institution.focalPersonName,
        focalPersonMobile: cleanPhoneNumber(institution.focalPersonMobile),
        paymentMethod: 1,
        transactionReceiptUrl: institution.transactionReceiptUrl!,
        registrationFee: TALENT_HUNT_INSTITUTION_FEE,
      }
      await submitTalentHuntSeason3Registration(payload)
      setIsSubmitted(true)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Registration failed.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-12 bg-gradient-to-br from-green-50 to-primary-50">
        <div id="register" className="scroll-mt-24" aria-hidden="true" />
        <div id="register-institution" className="scroll-mt-24" aria-hidden="true" />
        <div id="register-participant" className="scroll-mt-24" aria-hidden="true" />
        <div className="container-custom max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Registration Submitted</h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering for {TALENT_HUNT_SEASON3_TITLE}. Our team will verify your payment and contact you
              with further details.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false)
                setTab('participant')
              }}
              className="btn-primary min-h-[44px]"
            >
              Submit Another Registration
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div id="register" className="scroll-mt-24" aria-hidden="true" />
      <div id="register-participant" className="scroll-mt-24" aria-hidden="true" />
      <div id="register-institution" className="scroll-mt-24" aria-hidden="true" />
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold font-josefin text-gray-900 mb-3">
            Register for <span className="text-gradient">{TALENT_HUNT_SEASON3_TITLE}</span>
          </h2>
          <p className="text-gray-600">Choose participant or institution registration below.</p>
        </div>

        <div className="flex rounded-xl bg-white p-1 shadow-sm border border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => setTab('participant')}
            className={`flex-1 rounded-lg py-3 text-sm font-semibold transition-colors min-h-[44px] ${
              tab === 'participant' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Participant (PKR {TALENT_HUNT_PARTICIPANT_FEE}/-)
          </button>
          <button
            type="button"
            onClick={() => setTab('institution')}
            className={`flex-1 rounded-lg py-3 text-sm font-semibold transition-colors min-h-[44px] ${
              tab === 'institution' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Institution (PKR {TALENT_HUNT_INSTITUTION_FEE}/-)
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {tab === 'participant' ? (
            <>
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-5 sm:p-6 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Award className="h-5 w-5" /> Participant Registration
                </h3>
                <p className="text-sm text-white/90 mt-1">Fee: PKR {TALENT_HUNT_PARTICIPANT_FEE}/- per participant</p>
              </div>
              <form onSubmit={handleSubmitParticipant} className="p-5 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'studentName', label: 'Student Name', icon: User },
                    { name: 'fatherName', label: "Father's Name", icon: User },
                  ].map(({ name, label, icon: Icon }) => (
                    <div key={name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{label} *</label>
                      <div className="relative">
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name={name}
                          required
                          value={participant[name as keyof typeof participant] as string}
                          onChange={handleParticipantChange}
                          className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px] text-base"
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <label htmlFor="participant-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="participant-phone"
                        type="tel"
                        name="phone"
                        required
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="03XX-XXXXXXX"
                        value={participant.phone}
                        onChange={handleParticipantChange}
                        onBlur={validateParticipantPhones}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg min-h-[44px] text-base ${
                          participantFieldErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        aria-invalid={!!participantFieldErrors.phone}
                        aria-describedby={participantFieldErrors.phone ? 'participant-phone-error' : undefined}
                      />
                    </div>
                    {participantFieldErrors.phone && (
                      <p id="participant-phone-error" className="mt-1 text-sm text-red-600" role="alert">
                        {participantFieldErrors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Gender *</label>
                    <select
                      name="gender"
                      required
                      value={participant.gender}
                      onChange={handleParticipantChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px] bg-white"
                    >
                      <option value="">Select Gender</option>
                      {TALENT_HUNT_GENDER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Grade *</label>
                    <select
                      name="grade"
                      required
                      value={participant.grade}
                      onChange={handleParticipantChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px] bg-white"
                    >
                      <option value="">Select Grade</option>
                      {grades.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">School Name *</label>
                    <input
                      name="school"
                      required
                      value={participant.school}
                      onChange={handleParticipantChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Contest Category *</label>
                    <select
                      name="contestCategory"
                      required
                      value={participant.contestCategory}
                      onChange={handleParticipantChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px] bg-white"
                    >
                      <option value="">Select contest</option>
                      {Object.entries(contestGroups).map(([group, contests]) => (
                        <optgroup key={group} label={group}>
                          {contests.map((contest) => (
                            <option key={contest.value} value={contest.value}>
                              {contest.value} — {contest.date}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={participant.address}
                      onChange={handleParticipantChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="emergency-contact" className="block text-sm font-semibold text-gray-700 mb-1">
                      Emergency Contact *
                    </label>
                    <input
                      id="emergency-contact"
                      name="emergencyContact"
                      type="tel"
                      required
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="03XX-XXXXXXX"
                      value={participant.emergencyContact}
                      onChange={handleParticipantChange}
                      onBlur={validateParticipantPhones}
                      className={`w-full px-3 py-2.5 border rounded-lg min-h-[44px] ${
                        participantFieldErrors.emergencyContact ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      aria-invalid={!!participantFieldErrors.emergencyContact}
                      aria-describedby={
                        participantFieldErrors.emergencyContact ? 'emergency-contact-error' : undefined
                      }
                    />
                    {participantFieldErrors.emergencyContact && (
                      <p id="emergency-contact-error" className="mt-1 text-sm text-red-600" role="alert">
                        {participantFieldErrors.emergencyContact}
                      </p>
                    )}
                  </div>
                </div>

                <TalentHuntPaymentFields
                  feeAmount={TALENT_HUNT_PARTICIPANT_FEE}
                  paymentMethod={participant.paymentMethod}
                  onPaymentMethodChange={(v) => setParticipant((p) => ({ ...p, paymentMethod: v }))}
                  transactionReceiptUrl={participant.transactionReceiptUrl}
                  onReceiptChange={(url) => setParticipant((p) => ({ ...p, transactionReceiptUrl: url }))}
                  disabled={isSubmitting}
                  receiptError={receiptError}
                  byHandDescription={`Pay PKR ${TALENT_HUNT_PARTICIPANT_FEE}/- in cash at the event venue on your competition date.`}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary min-h-[48px] disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting…' : 'Register Participant'}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="bg-gradient-to-r from-emerald-600 to-primary-600 p-5 sm:p-6 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Building2 className="h-5 w-5" /> Institution Registration
                </h3>
                <p className="text-sm text-white/90 mt-1">
                  Fee: PKR {TALENT_HUNT_INSTITUTION_FEE}/- — bank transfer only (receipt required)
                </p>
              </div>
              <form onSubmit={handleSubmitInstitution} className="p-5 sm:p-8 space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Institution Name *</label>
                    <input
                      name="institutionName"
                      required
                      value={institution.institutionName}
                      onChange={handleInstitutionChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Focal Person Name *</label>
                    <input
                      name="focalPersonName"
                      required
                      value={institution.focalPersonName}
                      onChange={handleInstitutionChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="focal-person-mobile" className="block text-sm font-semibold text-gray-700 mb-1">
                      Focal Person Mobile *
                    </label>
                    <input
                      id="focal-person-mobile"
                      name="focalPersonMobile"
                      type="tel"
                      required
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="03XX-XXXXXXX"
                      value={institution.focalPersonMobile}
                      onChange={handleInstitutionChange}
                      onBlur={validateInstitutionPhone}
                      className={`w-full px-3 py-2.5 border rounded-lg min-h-[44px] ${
                        institutionFieldErrors.focalPersonMobile ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      aria-invalid={!!institutionFieldErrors.focalPersonMobile}
                      aria-describedby={
                        institutionFieldErrors.focalPersonMobile ? 'focal-person-mobile-error' : undefined
                      }
                    />
                    {institutionFieldErrors.focalPersonMobile && (
                      <p id="focal-person-mobile-error" className="mt-1 text-sm text-red-600" role="alert">
                        {institutionFieldErrors.focalPersonMobile}
                      </p>
                    )}
                  </div>
                </div>

                <TalentHuntPaymentFields
                  feeAmount={TALENT_HUNT_INSTITUTION_FEE}
                  paymentMethod={1}
                  onPaymentMethodChange={() => {}}
                  transactionReceiptUrl={institution.transactionReceiptUrl}
                  onReceiptChange={(url) => setInstitution((p) => ({ ...p, transactionReceiptUrl: url }))}
                  allowedMethods={[1]}
                  disabled={isSubmitting}
                  receiptError={receiptError}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary min-h-[48px] disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting…' : 'Register Institution'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
