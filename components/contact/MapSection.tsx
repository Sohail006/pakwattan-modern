'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Phone, Mail } from 'lucide-react'
import { getCampuses, Campus } from '@/lib/api/campuses'

const MapSection = () => {
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [loading, setLoading] = useState(true)
  const [mainCampus, setMainCampus] = useState<Campus | null>(null)

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
        // Get main campus (highest priority or first one)
        setMainCampus(sorted.length > 0 ? sorted[0] : null)
      } catch (error) {
        console.error('[MapSection] Failed to load campuses:', error)
        // Keep empty array on error (graceful degradation)
      } finally {
        setLoading(false)
      }
    }

    fetchCampuses()
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            Find Us on the <span className="text-gradient">Map</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            {mainCampus 
              ? `Visit our main campus located at ${mainCampus.address || 'Havelian, Abbottabad'}. View the map below for our exact location.`
              : 'Visit our campuses located in Havelian, Abbottabad. View the map below for our exact location.'
            }
          </p>
        </div>

        {/* Google Maps Embed */}
        <div className="bg-secondary-100 rounded-2xl overflow-hidden shadow-xl mb-6 sm:mb-8">
          <div className="aspect-video relative w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.9665027710457!2d73.15231645927724!3d34.052579608411705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de35a5c79e4a3b%3A0xe10972f181f577f5!2sPak%20Wattan%20School%20And%20College%20of%20Sciences%2CHavelian!5e1!3m2!1sen!2s!4v1764491327824!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title="Pak Wattan School and College of Sciences Location"
              aria-label="Interactive map showing Pak Wattan School and College of Sciences location in Havelian, Abbottabad"
            />
          </div>
        </div>

        {/* Campus Information Cards */}
        {loading ? (
          <div className="text-center py-12 mb-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-secondary-600">Loading campus information...</p>
          </div>
        ) : campuses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl mb-8">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No campus information available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {campuses.slice(0, 3).map((campus) => (
              <div key={campus.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-800 mb-1">
                      {campus.name}
                    </h3>
                    {campus.address && (
                      <p className="text-sm text-secondary-600 leading-relaxed">
                        {campus.address}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {campus.mobileNumber && (
                    <div className="flex items-center space-x-2">
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
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <a 
                        href={`tel:${campus.phone.replace(/\s/g, '')}`}
                        className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {campus.phone}
                      </a>
                    </div>
                  )}
                  {campus.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                      <a 
                        href={`mailto:${campus.email}`}
                        className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        {campus.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="text-center px-4 sm:px-0">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-3 sm:mb-4">
              Need Directions?
            </h3>
            <p className="text-sm sm:text-base text-secondary-600 mb-4 sm:mb-6 break-words">
              Get turn-by-turn directions to any of our campuses
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://maps.google.com/?q=Havelian,Abbottabad,KPK,Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center space-x-2 touch-target min-h-[44px]"
                aria-label="Get directions to Pak Wattan School on Google Maps"
              >
                <Navigation className="w-4 h-4 flex-shrink-0" />
                <span>Get Directions</span>
              </a>
              {mainCampus && (mainCampus.mobileNumber || mainCampus.phone) && (
                <a
                  href={`tel:${(mainCampus.mobileNumber || mainCampus.phone || '').replace(/\s/g, '')}`}
                  className="btn-secondary inline-flex items-center justify-center space-x-2 touch-target min-h-[44px]"
                  aria-label={`Call ${mainCampus.mobileNumber || mainCampus.phone}`}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>Call Us</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection
