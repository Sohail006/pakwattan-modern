'use client'

import { useState } from 'react'
import { User, Mail, Phone, Calendar, FileText, CheckCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    classApplying: '',
    previousSchool: '',
    address: '',
    phone: '',
    email: '',
    emergencyContact: '',
    medicalConditions: '',
    specialNeeds: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const classes = [
    'Play Group', 'Nursery', 'Prep', '1st', '2nd', '3rd', '4th', '5th',
    '6th', '7th', '8th', '9th', '10th', '1st Year', '2nd Year'
  ]

  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Admission Form</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Complete the form below to apply for admission. All fields marked with * are required.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Student Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-6 h-6 text-primary-600 mr-3" />
                  Student Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter student's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Class Applying For *
                    </label>
                    <select
                      name="classApplying"
                      value={formData.classApplying}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls, index) => (
                        <option key={index} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous School
                    </label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Name of previous school (if any)"
                    />
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-6 h-6 text-accent-600 mr-3" />
                  Parent/Guardian Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Father's Name *
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter father's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mother's Name *
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter mother's full name"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Phone className="w-6 h-6 text-green-600 mr-3" />
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Emergency Contact *
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter complete address"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-6 h-6 text-purple-600 mr-3" />
                  Additional Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Medical Conditions
                    </label>
                    <textarea
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Any medical conditions or allergies"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Needs
                    </label>
                    <textarea
                      name="specialNeeds"
                      value={formData.specialNeeds}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Any special educational needs"
                    />
                  </div>
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                  Required Documents Checklist
                </h3>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4 font-semibold">
                    Please ensure you have the following documents ready:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Birth Certificate (Form B)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      2 Passport Size Photos
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Father's CNIC Copy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Previous School Certificate
                    </li>
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Submit Application
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  By submitting this form, you agree to our terms and conditions.
                </p>
              </div>
            </form>
          </Card>
      </div>
      </Container>
    </section>
  )
}

export default AdmissionForm
