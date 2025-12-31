'use client'

import { useState } from 'react'
import { API_CONFIG } from '@/lib/config'
import { User, Phone, School, Upload, CheckCircle, Calendar } from 'lucide-react'

const TalentHuntRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    gender: '',
    grade: '',
    age: '',
    schoolName: '',
    mobileNumber: '',
    whatsAppNumber: '',
    eventToParticipate: '',
    isOnlinePayment: false,
    paymentAttachment: null as File | null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]

  const gradeOptions = [
    { value: '1', label: 'Grade 1' },
    { value: '2', label: 'Grade 2' },
    { value: '3', label: 'Grade 3' },
    { value: '4', label: 'Grade 4' },
    { value: '5', label: 'Grade 5' },
    { value: '6', label: 'Grade 6' },
    { value: '7', label: 'Grade 7' },
    { value: '8', label: 'Grade 8' },
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' }
  ]

  const eventOptions = [
    'Singing',
    'Dancing',
    'Poetry Recitation',
    'Art & Craft',
    'Drama/Acting',
    'Musical Instruments',
    'Debate',
    'Essay Writing',
    'Quiz Competition',
    'Sports'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      paymentAttachment: e.target.files?.[0] || null
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const form = new FormData()
      form.append('Name', formData.name)
      form.append('FatherName', formData.fatherName)
      form.append('Age', String(parseInt(formData.age)))
      form.append('GenderID', String(formData.gender === 'male' ? 1 : 2))
      form.append('GradeID', String(parseInt(formData.grade)))
      form.append('SchoolName', formData.schoolName)
      form.append('MobileNumber', formData.mobileNumber)
      form.append('WhatsAppNumber', formData.whatsAppNumber)
      form.append('EventToParticiPate', formData.eventToParticipate)
      form.append('IsOnlinePayment', String(formData.isOnlinePayment))
      if (formData.paymentAttachment) form.append('PaymentAttachment', formData.paymentAttachment)
      form.append('CreationDate', new Date().toISOString())

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/TalentHunt`, {
        method: 'POST',
        body: form
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Talent Hunt registration successful:', result)
        setIsSubmitted(true)
      } else {
        throw new Error('Unable to complete registration. Please check your information and try again.')
      }
    } catch (error) {
      console.error('Talent Hunt registration error:', error)
      alert(error instanceof Error ? error.message : 'Unable to complete registration. Please check your information and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="section-padding bg-gradient-to-br from-green-50 to-primary-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-800 mb-3 sm:mb-4 break-words">
                Registration Successful!
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-secondary-600 mb-4 sm:mb-6 break-words">
                You have successfully registered for Talent Hunt Season-II with Pak Wattan. 
                Event date will be announced soon. Pak Wattan Administration will contact you for event details.
              </p>
              <div className="bg-primary-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="text-sm sm:text-base text-primary-800 font-semibold break-words">
                  <strong>Note:</strong> To access our School&apos;s Scholarship Test syllabus and model papers, please visit our school.
                </p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary touch-target min-h-[44px] text-sm sm:text-base"
              >
                Register Another Participant
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
            Register for <span className="text-gradient">Talent Hunt Season-II</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto leading-relaxed break-words">
            Join the district&apos;s most exciting talent hunt program and showcase your unique abilities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center break-words">
                Registration Form
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    Student Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px]"
                    placeholder="Enter student&apos;s full name"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    Father&apos;s Name *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px]"
                    placeholder="Enter father&apos;s full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px] bg-white"
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                    Grade *
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px] bg-white"
                  >
                    <option value="">Select Grade</option>
                    {gradeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    min="5"
                    max="18"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px]"
                    placeholder="Enter age"
                  />
                </div>
              </div>

              {/* School Information */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                  <School className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                  School Name *
                </label>
                <input
                  type="text"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px]"
                  placeholder="Enter school name"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px]"
                    placeholder="Enter mobile number"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsAppNumber"
                    value={formData.whatsAppNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px]"
                    placeholder="Enter WhatsApp number"
                  />
                </div>
              </div>

              {/* Event Selection */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                  Event to Participate *
                </label>
                <select
                  name="eventToParticipate"
                  value={formData.eventToParticipate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px] bg-white"
                >
                  <option value="">Select Event</option>
                  {eventOptions.map(event => (
                    <option key={event} value={event}>
                      {event}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Information */}
              <div className="bg-primary-50 rounded-lg p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-secondary-800 mb-3 sm:mb-4 break-words">
                  Payment Information
                </h4>
                
                <div className="flex items-center space-x-2 sm:space-x-4 mb-3 sm:mb-4">
                  <input
                    type="checkbox"
                    name="isOnlinePayment"
                    checked={formData.isOnlinePayment}
                    onChange={handleInputChange}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 border-secondary-300 rounded focus:ring-primary-500 flex-shrink-0"
                  />
                  <label className="text-xs sm:text-sm font-medium text-secondary-700 break-words">
                    I have made online payment
                  </label>
                </div>

                {formData.isOnlinePayment && (
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-secondary-700 mb-1.5 sm:mb-2 break-words">
                      <Upload className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                      Payment Receipt *
                    </label>
                    <input
                      type="file"
                      name="paymentAttachment"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 min-h-[44px]"
                    />
                    <p className="text-xs sm:text-sm text-secondary-600 mt-1 break-words">
                      Upload payment receipt (Image or PDF)
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary touch-target min-h-[44px] text-sm sm:text-base ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Registering...' : 'Register for Talent Hunt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntRegistration
