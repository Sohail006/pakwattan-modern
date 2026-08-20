'use client'

import { useState } from 'react'
import { User, Mail, Phone, BookOpen, CheckCircle, Award } from 'lucide-react'
import { API_CONFIG } from '@/lib/config'

const TalentHuntSeason2Registration = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    email: '',
    phone: '',
    grade: '',
    school: '',
    contestCategory: '',
    address: '',
    emergencyContact: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12'
  ]

  const contestCategories = [
    'Qirat & Naat Contest',
    'Declamation / Speech Contest',
    'Spelling Bee Contest',
    'Painting, Sketching & Calligraphy Contest',
    'Photography / Videography Contest'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/TalentHunt/season2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentName: formData.studentName,
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          email: formData.email,
          phone: formData.phone,
          grade: formData.grade,
          school: formData.school,
          contestCategory: formData.contestCategory,
          address: formData.address,
          emergencyContact: formData.emergencyContact,
        })
      })

      if (!response.ok) throw new Error('Unable to submit registration. Please check your information and try again.')
      setIsSubmitted(true)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unable to submit registration. Please check your information and try again.')
      // eslint-disable-next-line no-console
      console.error('Season-II registration error:', err)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 break-words">Registration Successful!</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 break-words">
                Thank you for registering for Talent Hunt Season-II. We have received your application and will contact you soon with further details.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-primary-50 rounded-lg p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-semibold text-primary-800 mb-2 break-words">What&apos;s Next?</h3>
                  <ul className="text-xs sm:text-sm text-primary-700 space-y-1">
                    <li className="break-words">• You will receive a confirmation email</li>
                    <li className="break-words">• Contest details will be shared closer to the date</li>
                    <li className="break-words">• Prepare for your chosen contest category</li>
                  </ul>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors duration-200 touch-target min-h-[44px] text-sm sm:text-base"
                >
                  Register Another Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-josefin mb-4 sm:mb-6 break-words">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Register for Talent Hunt Season-II
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed break-words">
            Join the district-level talent hunt competition and showcase your skills in one of our 10 exciting contest categories.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center break-words">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                Student Registration Form
              </h3>
              <p className="text-sm sm:text-base text-white/90 mt-1 sm:mt-2 break-words">Fill out the form below to register for Talent Hunt Season-II</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Student Name */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    Student Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                      placeholder="Enter student&apos;s full name"
                    />
                  </div>
                </div>

                {/* Father&apos;s Name */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    Father&apos;s Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                      placeholder="Enter father&apos;s name"
                    />
                  </div>
                </div>

                {/* Mother&apos;s Name */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    Mother&apos;s Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                      placeholder="Enter mother&apos;s name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Grade */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    Grade *
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-h-[44px]"
                    >
                      <option value="">Select Grade</option>
                      {grades.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* School */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                    placeholder="Enter school name"
                  />
                </div>

                {/* Contest Category */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    Contest Category *
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <select
                      name="contestCategory"
                      value={formData.contestCategory}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-h-[44px]"
                    >
                      <option value="">Select Contest Category</option>
                      {contestCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2 space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
                    placeholder="Enter complete address"
                  />
                </div>

                {/* Emergency Contact */}
                <div className="md:col-span-2 space-y-1.5 sm:space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 break-words">
                    Emergency Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-h-[44px]"
                      placeholder="Enter emergency contact number"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl touch-target min-h-[44px] text-sm sm:text-base"
                >
                  Register for Talent Hunt Season-II
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason2Registration
