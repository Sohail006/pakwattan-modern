'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { ZoomIn, X } from 'lucide-react'
import Container from '@/components/ui/Container'
import { CONTACT_OFFICE_PHOTOS } from '@/lib/contact-utils'

const OfficePhotos = () => {
  const [active, setActive] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="py-10 sm:py-12 bg-secondary-50">
      <Container>
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-josefin text-secondary-900 mb-2">
            Office & Campus Photos
          </h2>
          <p className="text-sm sm:text-base text-secondary-600">
            A quick look at our Havelian campuses and facilities.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CONTACT_OFFICE_PHOTOS.map((photo) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActive(photo.src)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <span className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
              </span>
            </button>
          ))}
        </div>
      </Container>

      {mounted &&
        active &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white flex items-center justify-center"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-5xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
              <Image src={active} alt="Office photo" fill className="object-contain" unoptimized />
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}

export default OfficePhotos
