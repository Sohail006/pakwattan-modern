'use client'

import Image from 'next/image'
import { API_CONFIG } from '@/lib/config'
import { useState, useEffect } from 'react'
import { getCampuses, Campus } from '@/lib/api/campuses'
import { SCHOOL_INFO } from '@/lib/constants'
import { Phone, Mail } from 'lucide-react'

const PakiansCoachingAcademyRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    program: '',
    message: '',
    paymentAttachment: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mainCampus, setMainCampus] = useState<Campus | null>(null)

  useEffect(() => {
    const fetchMainCampus = async () => {
      try {
        const data = await getCampuses(true) // Get only active campuses
        // Get main campus (highest priority or first one)
        const sorted = data.sort((a, b) => {
          const priorityA = a.priority || 0
          const priorityB = b.priority || 0
          return priorityB - priorityA
        })
        setMainCampus(sorted.length > 0 ? sorted[0] : null)
      } catch (error) {
        console.error('[PakiansCoachingAcademyRegistration] Failed to load main campus:', error)
        // Keep null on error (will use fallback from SCHOOL_INFO)
      }
    }

    fetchMainCampus()
  }, [])

  // Use main campus data if available, otherwise fallback to SCHOOL_INFO
  const phone = mainCampus?.mobileNumber || mainCampus?.phone || SCHOOL_INFO.contact.phone
  const email = mainCampus?.email || SCHOOL_INFO.contact.email
  const address = mainCampus?.address || SCHOOL_INFO.contact.address

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const form = new FormData()
      form.append('Name', `${formData.firstName} ${formData.lastName}`)
      form.append('MobileNumber', formData.phone)
      form.append('WhatsAppNumber', formData.phone)
      form.append('HighestQualification', '')
      form.append('PreferedCourse', formData.program)
      form.append('IsOnlinePayment', 'false')
      form.append('CreationDate', new Date().toISOString())
      if (formData.paymentAttachment) form.append('RegistrationFeePaymentAttachment', formData.paymentAttachment)

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/PakiansCoachingAcademy`, {
        method: 'POST',
        body: form
      })

      if (response.ok) {
        const result = await response.json()
        console.log('PCA registration successful:', result)
        setIsSubmitted(true)
      } else {
        throw new Error('Unable to submit registration. Please check your information and try again.')
      }
    } catch (error) {
      console.error('PCA registration error:', error)
      alert(error instanceof Error ? error.message : 'Unable to submit registration. Please check your information and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-green-600 text-3xl sm:text-4xl">✓</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-800 mb-3 sm:mb-4">
                Registration Successful!
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 break-words">
                Thank you for registering with Pakians Coaching Academy. We will contact you soon with further details.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary touch-target min-h-[44px]"
              >
                Register Another Student
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Registration & Admission
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto break-words">
            Join Pakians Coaching Academy and start your journey towards academic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Registration Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-4 sm:mb-6">Registration Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]" 
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]" 
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]" 
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Program of Interest</label>
                <select 
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px] bg-white"
                >
                  <option value="">Select Program</option>
                  <option value="Matric Preparation">Matric Preparation</option>
                  <option value="FSC Pre-Medical">FSC Pre-Medical</option>
                  <option value="FSC Pre-Engineering">FSC Pre-Engineering</option>
                  <option value="ICS/IT">ICS/IT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[120px] resize-y"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">Payment Attachment (optional)</label>
                <input 
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentAttachment: e.target.files?.[0] || null }))}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[44px]" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full btn-primary touch-target min-h-[44px] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-3 sm:space-y-4">
                {phone && (
                  <div className="flex items-center gap-2 min-w-0">
                    <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <a 
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-sm sm:text-base text-gray-700 hover:text-primary-600 active:text-primary-700 transition-colors break-all touch-target min-h-[44px] flex items-center"
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <a 
                      href={`mailto:${email}`}
                      className="text-sm sm:text-base text-gray-700 hover:text-primary-600 active:text-primary-700 transition-colors break-all touch-target min-h-[44px] flex items-center"
                    >
                      {email}
                    </a>
                  </div>
                )}
                {address && (
                  <div className="flex items-start space-x-2 sm:space-x-3 min-w-0">
                    <span className="text-primary-600 text-sm sm:text-base flex-shrink-0 mt-0.5">📍</span>
                    <span className="text-sm sm:text-base text-gray-700 break-words">{address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Academy Image */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
              <div className="relative h-48 sm:h-56 lg:h-64 w-full rounded-lg sm:rounded-xl overflow-hidden">
                <Image
                  src="/images/pakians-coaching-academy/pca-hero.jpg/SchoolName.png"
                  alt="Pakians Coaching Academy"
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-4 sm:mb-6">Admission Requirements</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-primary-600 mt-1 text-sm sm:text-base flex-shrink-0">✓</span>
                  <span className="text-sm sm:text-base text-gray-700 break-words">Completed application form</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-primary-600 mt-1 text-sm sm:text-base flex-shrink-0">✓</span>
                  <span className="text-sm sm:text-base text-gray-700 break-words">Previous academic records</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-primary-600 mt-1 text-sm sm:text-base flex-shrink-0">✓</span>
                  <span className="text-sm sm:text-base text-gray-700 break-words">Photocopy of CNIC/B-Form</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-primary-600 mt-1 text-sm sm:text-base flex-shrink-0">✓</span>
                  <span className="text-sm sm:text-base text-gray-700 break-words">Recent passport size photographs</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <span className="text-primary-600 mt-1 text-sm sm:text-base flex-shrink-0">✓</span>
                  <span className="text-sm sm:text-base text-gray-700 break-words">Admission test (if required)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PakiansCoachingAcademyRegistration
