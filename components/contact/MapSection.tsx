'use client'

import { Navigation, Phone, RefreshCw } from 'lucide-react'
import { useCampuses } from '@/hooks/useCampuses'
import ContactCard from '@/components/contact/ContactCard'
import Container from '@/components/ui/Container'
import {
  CONTACT_OFFICE_PHOTOS,
  MAP_EMBED_SRC,
  MAP_PLACE_QUERY,
  mapsDirectionsUrl,
  toTelHref,
} from '@/lib/contact-utils'

const MapSection = () => {
  const { campuses, mainCampus, loading, error, refetch } = useCampuses(true)
  const directionsUrl = mapsDirectionsUrl(mainCampus?.address || MAP_PLACE_QUERY)
  const callHref = toTelHref(mainCampus?.mobileNumber || mainCampus?.phone)

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-white">
      <Container>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-3">
            Find Us on the <span className="text-gradient">Map</span>
          </h2>
          <p className="text-sm sm:text-base text-secondary-600 max-w-2xl mx-auto">
            {mainCampus?.address
              ? `Main campus: ${mainCampus.address}`
              : 'Locate Pak Wattan in Havelian and get turn-by-turn directions.'}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl border border-secondary-100 mb-6 sm:mb-8 bg-secondary-100">
          <div className="relative w-full h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px]">
            <iframe
              src={MAP_EMBED_SRC}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pak Wattan School and College of Sciences Location"
              aria-label="Map of Pak Wattan School in Havelian"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 sm:mb-10">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold shadow-lg hover:from-accent-600 hover:to-accent-700 transition-all"
          >
            <Navigation className="w-4 h-4" />
            Get Directions on Google Maps
          </a>
          {callHref && (
            <a
              href={callHref}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-xl bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Campus
            </a>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center gap-2 min-h-[40px] px-3 py-2 rounded-lg bg-amber-600 text-white font-semibold"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            <p className="mt-3 text-secondary-600 text-sm">Loading campus locations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {campuses.map((campus, index) => (
              <ContactCard
                key={campus.id || campus.name}
                campus={campus}
                photoSrc={CONTACT_OFFICE_PHOTOS[index % CONTACT_OFFICE_PHOTOS.length]?.src}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

export default MapSection
