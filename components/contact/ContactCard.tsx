'use client'

import Image from 'next/image'
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone, User } from 'lucide-react'
import { Campus } from '@/lib/api/campuses'
import {
  mapsDirectionsUrl,
  MAP_PLACE_QUERY,
  toTelHref,
  toWhatsAppHref,
} from '@/lib/contact-utils'

type ContactCardProps = {
  campus: Campus
  photoSrc?: string
  featured?: boolean
}

const ContactCard = ({ campus, photoSrc, featured = false }: ContactCardProps) => {
  const phone = campus.mobileNumber || campus.phone
  const tel = toTelHref(phone)
  const wa = toWhatsAppHref(
    campus.whatsAppNumber || phone,
    'Assalam-o-Alaikum! I would like to inquire about Pak Wattan School & College.'
  )
  const directions = mapsDirectionsUrl(campus.address || MAP_PLACE_QUERY)

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-md hover:shadow-xl transition-all duration-300 ${
        featured ? 'border-accent-300 ring-1 ring-accent-200' : 'border-secondary-100'
      }`}
    >
      <div className="relative h-36 sm:h-40 bg-gradient-to-br from-primary-100 to-accent-100">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={`${campus.name} office`}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-primary-600/40">
            <MapPin className="w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-base sm:text-lg font-josefin drop-shadow-sm line-clamp-2">
            {campus.name}
          </h3>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        {campus.principalName && (
          <p className="flex items-center gap-2 text-xs sm:text-sm text-secondary-600">
            <User className="w-4 h-4 text-primary-600 shrink-0" />
            Principal: {campus.principalName}
          </p>
        )}

        {campus.address && (
          <p className="flex items-start gap-2 text-sm text-secondary-700">
            <MapPin className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
            <span>{campus.address}</span>
          </p>
        )}

        {phone && (
          <a href={tel || undefined} className="flex items-center gap-2 text-sm text-primary-700 hover:text-primary-800 font-medium">
            <Phone className="w-4 h-4 shrink-0" />
            {phone}
          </a>
        )}

        {campus.email && (
          <a href={`mailto:${campus.email}`} className="flex items-center gap-2 text-sm text-primary-700 hover:text-primary-800">
            <Mail className="w-4 h-4 shrink-0" />
            {campus.email}
          </a>
        )}

        {campus.officeHours && (
          <p className="flex items-start gap-2 text-sm text-secondary-600 whitespace-pre-line">
            <Clock className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
            <span>{campus.officeHours}</span>
          </p>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-lg bg-[#25D366] text-white text-xs sm:text-sm font-semibold hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          )}
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-lg bg-primary-600 text-white text-xs sm:text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Directions
          </a>
        </div>
      </div>
    </article>
  )
}

export default ContactCard
