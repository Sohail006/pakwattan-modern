'use client'

import Image from 'next/image'
import { API_CONFIG } from '@/lib/config'
import { useState } from 'react'

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
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 text-4xl">✓</span>
              </div>
              <h2 className="text-3xl font-bold text-primary-800 mb-4">
                Registration Successful!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for registering with Pakians Coaching Academy. We will contact you soon with further details.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary"
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
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Registration & Admission
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join Pakians Coaching Academy and start your journey towards academic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-primary-800 mb-6">Registration Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Program of Interest</label>
                <select 
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Program</option>
                  <option value="Matric Preparation">Matric Preparation</option>
                  <option value="FSC Pre-Medical">FSC Pre-Medical</option>
                  <option value="FSC Pre-Engineering">FSC Pre-Engineering</option>
                  <option value="ICS/IT">ICS/IT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Attachment (optional)</label>
                <input 
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFormData(prev => ({ ...prev, paymentAttachment: e.target.files?.[0] || null }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-primary-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-primary-600">📞</span>
                  <span className="text-gray-700">0318 0821377</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-primary-600">📧</span>
                  <span className="text-gray-700">pakwattan2020@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-primary-600">📍</span>
                  <span className="text-gray-700">Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan</span>
                </div>
              </div>
            </div>

            {/* Academy Image */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="relative h-64 w-full rounded-xl overflow-hidden">
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

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-800 mb-6">Admission Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Completed application form</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Previous academic records</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Photocopy of CNIC/B-Form</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Recent passport size photographs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Admission test (if required)</span>
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
