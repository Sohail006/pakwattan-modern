'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { X, ZoomIn } from 'lucide-react'
import { ABOUT_GALLERY } from '@/lib/about-data'

const AboutImageGallery = () => {
  const [active, setActive] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {ABOUT_GALLERY.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(image.src)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-secondary-100 shadow-md hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </button>
        ))}
      </div>

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
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-secondary-900 flex items-center justify-center"
              onClick={() => setActive(null)}
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-5xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
              <Image src={active} alt="Gallery image" fill className="object-contain" unoptimized />
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default AboutImageGallery
