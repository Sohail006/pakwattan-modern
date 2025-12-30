'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Users, Award, BookOpen, GraduationCap, MessageCircle, Clock } from 'lucide-react'
import { getCampuses, Campus } from '@/lib/api/campuses'

const ContactInfo = () => {
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const data = await getCampuses(true) // Get only active campuses
        // Sort by priority (highest first), then by name
        const sorted = data.sort((a, b) => {
          const priorityA = a.priority || 0
          const priorityB = b.priority || 0
          if (priorityB !== priorityA) return priorityB - priorityA
          return a.name.localeCompare(b.name)
        })
        setCampuses(sorted)
      } catch (error) {
        console.error('[ContactInfo] Failed to load campuses:', error)
        // Keep empty array on error (graceful degradation)
      } finally {
        setLoading(false)
      }
    }

    fetchCampuses()
  }, [])

  const quickStats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: '3000+',
      label: 'Students',
      color: 'text-blue-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: '2000+',
      label: 'Awards',
      color: 'text-yellow-600'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: campuses.length.toString(),
      label: 'Campuses',
      color: 'text-green-600'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      value: '1353+',
      label: 'Alumni',
      color: 'text-purple-600'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Our Campuses</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            {campuses.length > 0 
              ? `Visit us at any of our ${campuses.length} campus${campuses.length > 1 ? 'es' : ''} located in Havelian, Abbottabad`
              : 'Visit us at our campuses located in Havelian, Abbottabad'
            }
          </p>
        </div>

        {/* Campus Cards */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-secondary-600">Loading campus information...</p>
          </div>
        ) : campuses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No campus information available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {campuses.map((campus) => (
              <div
                key={campus.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-secondary-100"
              >
                <div className="p-8">
                  <h3 className="text-xl font-bold text-secondary-800 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                    {campus.name}
                  </h3>
                  {campus.principalName && (
                    <p className="text-secondary-600 mb-4 text-sm">
                      Principal: {campus.principalName}
                    </p>
                  )}
                  
                  <div className="space-y-3">
                    {campus.address && (
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-secondary-700">{campus.address}</span>
                      </div>
                    )}
                    {campus.mobileNumber && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <a 
                          href={`tel:${campus.mobileNumber.replace(/\s/g, '')}`}
                          className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          {campus.mobileNumber}
                        </a>
                      </div>
                    )}
                    {!campus.mobileNumber && campus.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <a 
                          href={`tel:${campus.phone.replace(/\s/g, '')}`}
                          className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          {campus.phone}
                        </a>
                      </div>
                    )}
                    {campus.whatsAppNumber && (
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <a 
                          href={`https://wa.me/${campus.whatsAppNumber.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          WhatsApp: {campus.whatsAppNumber}
                        </a>
                      </div>
                    )}
                    {campus.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                        <a 
                          href={`mailto:${campus.email}`}
                          className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          {campus.email}
                        </a>
                      </div>
                    )}
                    {campus.officeHours && (
                      <div className="flex items-start space-x-3 pt-2 border-t border-gray-200">
                        <Clock className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-secondary-700">{campus.officeHours}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              By the Numbers
            </h3>
            <p className="text-secondary-600">
              Our impact in the community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-secondary-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-secondary-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
