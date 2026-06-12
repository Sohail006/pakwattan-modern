'use client'

import { useState } from 'react'
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
} from '@/lib/talent-hunt-season3-data'
import TalentHuntPaymentFields from '@/components/talent-hunt/shared/TalentHuntPaymentFields'

type Tab = 'participant' | 'institution'

const grades = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
  'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
]

export default function TalentHuntSeason3Registration() {
  const [tab, setTab] = useState<Tab>('participant')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [receiptError, setReceiptError] = useState('')

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

  const handleParticipantChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setParticipant((p) => ({ ...p, [name]: value }))
  }

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInstitution((p) => ({ ...p, [name]: value }))
  }

  const validateParticipant = (): boolean => {
    setReceiptError('')
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
        focalPersonMobile: institution.focalPersonMobile,
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
      <section id="register" className="py-12 bg-gradient-to-br from-green-50 to-primary-50 scroll-mt-20">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Registration Submitted</h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering for Talent Hunt Season 3. Our team will verify your payment and contact you
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
    <section id="register" className="py-12 sm:py-16 bg-gradient-to-br from-primary-50 to-accent-50 scroll-mt-20">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold font-josefin text-gray-900 mb-3">
            Register for <span className="text-gradient">Season 3</span>
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
                    { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel' },
                  ].map(({ name, label, icon: Icon, type = 'text' }) => (
                    <div key={name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{label} *</label>
                      <div className="relative">
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type={type}
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
                      <option value="">Select Season 3 contest</option>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Emergency Contact *</label>
                    <input
                      name="emergencyContact"
                      type="tel"
                      required
                      value={participant.emergencyContact}
                      onChange={handleParticipantChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px]"
                    />
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Focal Person Mobile *</label>
                    <input
                      name="focalPersonMobile"
                      type="tel"
                      required
                      value={institution.focalPersonMobile}
                      onChange={handleInstitutionChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px]"
                    />
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
