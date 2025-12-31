'use client'

import { Calendar, MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react'
import { getCampuses, Campus } from '@/lib/api/campuses'
import { getActiveAdmissionSetting, type AdmissionSetting } from '@/lib/api/admissionSettings'
import { SCHOOL_INFO } from '@/lib/constants'
import { useState, useEffect } from 'react'
import { formatTestDate, formatTestDateRange, formatTestDuration } from '@/lib/utils'

const RelatedInfo = () => {
  const [mainCampus, setMainCampus] = useState<Campus | null>(null)
  const [admissionSetting, setAdmissionSetting] = useState<AdmissionSetting | null>(null)
  const [loadingTestDates, setLoadingTestDates] = useState(true)

  useEffect(() => {
    const fetchMainCampus = async () => {
      try {
        const data = await getCampuses(true)
        const sorted = data.sort((a, b) => {
          const priorityA = a.priority || 0
          const priorityB = b.priority || 0
          return priorityB - priorityA
        })
        setMainCampus(sorted.length > 0 ? sorted[0] : null)
      } catch (error) {
        console.error('[RelatedInfo] Failed to load campus:', error)
      }
    }

    fetchMainCampus()
  }, [])

  useEffect(() => {
    const fetchAdmissionSetting = async () => {
      try {
        setLoadingTestDates(true)
        const setting = await getActiveAdmissionSetting()
        setAdmissionSetting(setting)
      } catch (error) {
        console.error('[RelatedInfo] Failed to load admission setting:', error)
        setAdmissionSetting(null)
      } finally {
        setLoadingTestDates(false)
      }
    }

    fetchAdmissionSetting()
  }, [])

  const phone = mainCampus?.mobileNumber || mainCampus?.phone || SCHOOL_INFO.contact.phone
  const email = mainCampus?.email || SCHOOL_INFO.contact.email
  const address = mainCampus?.address || SCHOOL_INFO.contact.address

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto px-4 sm:px-0">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-gray-200">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 text-center">
              Related Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Test Date Info */}
              <div className="bg-primary-50 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">Test Dates</h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">Important dates to remember</p>
                  </div>
                </div>
                <div className="space-y-2 text-gray-700">
                  {loadingTestDates ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Loading test dates...</span>
                    </div>
                  ) : admissionSetting?.isTestScheduled && admissionSetting?.testStartDate ? (
                    <div className="space-y-2">
                      {/* Test Date(s) */}
                      <p>
                        <strong>Test Date:</strong>{' '}
                        {admissionSetting.testEndDate && 
                         admissionSetting.testStartDate !== admissionSetting.testEndDate
                          ? formatTestDateRange(admissionSetting.testStartDate, admissionSetting.testEndDate)
                          : formatTestDate(admissionSetting.testStartDate)
                        }
                      </p>
                      
                      {/* Test Time */}
                      {admissionSetting.defaultTestTime && (
                        <p>
                          <strong>Test Time:</strong> {admissionSetting.defaultTestTime}
                        </p>
                      )}
                      
                      {/* Test Venue */}
                      {admissionSetting.defaultTestVenue && (
                        <p>
                          <strong>Venue:</strong> {admissionSetting.defaultTestVenue}
                        </p>
                      )}
                      
                      {/* Test Duration */}
                      {admissionSetting.testDurationMinutes > 0 && (
                        <p className="text-sm text-gray-600">
                          Duration: {formatTestDuration(admissionSetting.testDurationMinutes)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      {admissionSetting?.isTestScheduled === false
                        ? 'Test dates not yet scheduled. Please check back later.'
                        : 'Test dates will be announced soon. Please check admission settings for updates.'
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-accent-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Contact Us</h3>
                    <p className="text-sm text-gray-600">For queries and information</p>
                  </div>
                </div>
                <div className="space-y-3 text-gray-700">
                  {phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <a 
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {phone}
                      </a>
                    </div>
                  )}
                  {email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <a 
                        href={`mailto:${email}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  )}
                  {address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Important Notes</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Bring your admit card on test day</li>
                    <li>• Arrive 30 minutes before test time</li>
                    <li>• Bring required stationery (pen, pencil, eraser)</li>
                    <li>• Mobile phones are not allowed in test hall</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RelatedInfo

