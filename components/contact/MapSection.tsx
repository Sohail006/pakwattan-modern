'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { MapPin, Navigation, Phone, Mail } from 'lucide-react'
import { CampusLocation } from '@/types'

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  // Campus locations
  const campuses: CampusLocation[] = useMemo(() => [
    {
      name: 'Main Campus (Boys Wing)',
      address: 'Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan',
      lat: 34.053221,
      lng: 73.152673,
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com'
    },
    {
      name: 'Primary Section',
      address: 'Gohar Market, Main Havelian City, Abbottabad, KPK, Pakistan',
      lat: 34.053221,
      lng: 73.152673,
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com'
    },
    {
      name: 'Girls Campus',
      address: 'Havelian, Abbottabad, KPK, Pakistan',
      lat: 34.053221,
      lng: 73.152673,
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com'
    }
  ], [])

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
        // Show demo mode without API key
        setMapError(true)
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        if (window.google && window.google.maps) {
          initializeMap()
        } else {
          setMapError(true)
        }
      }
      script.onerror = () => {
        setMapError(true)
      }
      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: { lat: 34.053221, lng: 73.152673 },
        mapTypeId: 'roadmap' as any,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      // Add markers for each campus
      campuses.forEach((campus, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: campus.lat, lng: campus.lng },
          map: map,
          title: campus.name,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#24744f" stroke="#fff" stroke-width="2"/>
                <path d="M20 8c-4.4 0-8 3.6-8 8 0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="#fff"/>
              </svg>
            `)}`,
            scaledSize: { width: 40, height: 40 },
            anchor: { x: 20, y: 40 }
          }
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #24744f; font-size: 16px; font-weight: bold;">${campus.name}</h3>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; line-height: 1.4;">${campus.address}</p>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="color: #24744f;">📞</span>
                  <a href="tel:${campus.phone}" style="color: #24744f; text-decoration: none; font-size: 14px;">${campus.phone}</a>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="color: #24744f;">✉️</span>
                  <a href="mailto:${campus.email}" style="color: #24744f; text-decoration: none; font-size: 14px;">${campus.email}</a>
                </div>
              </div>
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })
      })

      setIsMapLoaded(true)
    }

    loadGoogleMaps()
  }, [campuses])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            Find Us on the <span className="text-gradient">Map</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Visit our campuses located in Havelian, Abbottabad. Click on markers for detailed information.
          </p>
        </div>

        {/* Interactive Map */}
        <div className="bg-secondary-100 rounded-2xl overflow-hidden shadow-xl mb-8">
          <div className="aspect-video relative">
            {mapError ? (
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                    Interactive Map Preview
                  </h3>
                  <p className="text-secondary-600 mb-4">
                    To enable the interactive Google Maps, please add your Google Maps API key to the environment variables.
                  </p>
                  <div className="bg-white/80 rounded-lg p-4 mb-4 text-left">
                    <p className="text-sm text-secondary-700 mb-2">
                      <strong>Setup Instructions:</strong>
                    </p>
                    <ol className="text-xs text-secondary-600 space-y-1 list-decimal list-inside">
                      <li>Get API key from Google Cloud Console</li>
                      <li>Add to .env.local: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key</li>
                      <li>Restart the development server</li>
                    </ol>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Havelian,Abbottabad,KPK,Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center space-x-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            ) : (
              <>
                {!isMapLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                        Loading Map...
                      </h3>
                      <p className="text-secondary-600">
                        Please wait while we load the interactive map
                      </p>
                    </div>
                  </div>
                )}
                <div 
                  ref={mapRef} 
                  className="w-full h-full"
                  style={{ minHeight: '400px' }}
                />
              </>
            )}
          </div>
        </div>

        {/* Campus Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {campuses.map((campus) => (
            <div key={campus.name} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-800 mb-1">
                    {campus.name}
                  </h3>
                  <p className="text-sm text-secondary-600 leading-relaxed">
                    {campus.address}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <a 
                    href={`tel:${campus.phone}`}
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {campus.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <a 
                    href={`mailto:${campus.email}`}
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {campus.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              Need Directions?
            </h3>
            <p className="text-secondary-600 mb-6">
              Get turn-by-turn directions to any of our campuses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://maps.google.com/?q=Havelian,Abbottabad,KPK,Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
              <a
                href="tel:03180821377"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection
