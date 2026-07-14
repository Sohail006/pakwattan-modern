'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PhoneCall, Mail, MapPin, Facebook, Youtube, Twitter, Code } from 'lucide-react'
import { SCHOOL_INFO, MAIN_NAVIGATION, DEVELOPER_INFO } from '@/lib/constants'
import { getCampuses, Campus } from '@/lib/api/campuses'
import Container from '@/components/ui/Container'

const Footer = () => {
  const [mainCampus, setMainCampus] = useState<Campus | null>(null)

  useEffect(() => {
    const fetchMainCampus = async () => {
      try {
        const data = await getCampuses(true) // Get only active campuses
        // Get main campus (highest priority or first one)
        const sorted = data.sort((a, b) => {
          const priorityA = a.priority || 0
          const priorityB = b.priority || 0
          return priorityB - priorityA
        })
        setMainCampus(sorted.length > 0 ? sorted[0] : null)
      } catch (error) {
        console.error('[Footer] Failed to load main campus:', error)
        // Keep null on error (will use fallback from SCHOOL_INFO)
      }
    }

    fetchMainCampus()
  }, [])

  // Use main campus data if available, otherwise fallback to SCHOOL_INFO
  const address = mainCampus?.address || SCHOOL_INFO.contact.address
  const phone = mainCampus?.mobileNumber || mainCampus?.phone || SCHOOL_INFO.contact.phone
  const email = mainCampus?.email || SCHOOL_INFO.contact.email
  const telHref = phone ? `tel:${phone.replace(/[\s-]/g, '')}` : ''

  return (
    <footer className="bg-secondary-800 text-white">
      <Container className="py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src={SCHOOL_INFO.logo}
                alt={SCHOOL_INFO.name}
                width={50}
                height={50}
                className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
                priority
              />
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white font-josefin truncate">
                  {SCHOOL_INFO.name}
                </h3>
                <p className="text-xs sm:text-sm text-secondary-300 truncate">
                  {SCHOOL_INFO.fullName}
                </p>
              </div>
            </div>
            <p className="text-secondary-300 text-xs sm:text-sm leading-relaxed break-words">
              {SCHOOL_INFO.description}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href={SCHOOL_INFO.contact.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 active:bg-primary-800 transition-colors touch-target"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SCHOOL_INFO.contact.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 active:bg-red-800 transition-colors touch-target"
                aria-label="Visit our YouTube channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={SCHOOL_INFO.contact.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 active:bg-blue-600 transition-colors touch-target"
                aria-label="Visit our Twitter page"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-base sm:text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-0.5">
              {MAIN_NAVIGATION.slice(0, 5).map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm sm:text-base text-secondary-300 hover:text-white transition-colors block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Links */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-base sm:text-lg font-semibold text-white">Academic</h4>
            <ul className="space-y-0.5">
              <li>
                <Link 
                  href="/academic/montessori" 
                  className="text-sm sm:text-base text-secondary-300 hover:text-white transition-colors block py-0.5"
                >
                  Montessori
                </Link>
              </li>
              <li>
                <Link 
                  href="/academic/primary-wing" 
                  className="text-sm sm:text-base text-secondary-300 hover:text-white transition-colors block py-0.5"
                >
                  Primary Wing
                </Link>
              </li>
              <li>
                <Link 
                  href="/academic/boys-middle-wing" 
                  className="text-sm sm:text-base text-secondary-300 hover:text-white transition-colors block py-0.5"
                >
                  Boys Middle Wing
                </Link>
              </li>
              <li>
                <Link 
                  href="/academic/boys-senior-wing" 
                  className="text-sm sm:text-base text-secondary-300 hover:text-white transition-colors block py-0.5"
                >
                  Boys Senior Wing
                </Link>
              </li>
              <li>
                <Link 
                  href="/academic/girls-wing" 
                  className="text-sm sm:text-base text-secondary-300 hover:text-white transition-colors block py-0.5"
                >
                  Girls Wing
                </Link>
              </li>
              <li>
                <Link 
                  href="/talent-hunt" 
                  className="text-sm sm:text-base text-secondary-300 hover:text-white transition-colors block py-0.5"
                >
                  Talent Hunt
                </Link>
              </li>
              <li>
                <Link 
                  href="/awards" 
                  className="text-sm sm:text-base text-secondary-300 hover:text-white transition-colors block py-0.5"
                >
                  Awards
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-base sm:text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-1.5">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-secondary-300 text-xs sm:text-sm break-words leading-snug">
                    {address}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneCall className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden />
                <a 
                  href={telHref}
                  className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base break-all"
                  aria-label={`Call landline ${phone}`}
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href={`mailto:${email}`}
                  className="text-secondary-300 hover:text-white transition-colors text-sm sm:text-base break-all"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
            <p className="text-secondary-400 text-xs sm:text-sm px-4 sm:px-0">
              © 2024 Pak Wattan School & College of Sciences. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6">
              {/* Developer Credit - Prominent */}
              <Link
                href={DEVELOPER_INFO.url}
                className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 active:text-primary-200 transition-colors font-medium text-xs sm:text-sm group touch-target min-h-[44px]"
              >
                {DEVELOPER_INFO.showIcon && (
                  <Code className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                )}
                <span className="break-words">
                  {DEVELOPER_INFO.text} <span className="text-white font-semibold">{DEVELOPER_INFO.name}</span>
                </span>
              </Link>
              <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm">
                <Link 
                  href="/privacy" 
                  className="text-secondary-400 hover:text-white transition-colors touch-target min-h-[44px] flex items-center"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/terms" 
                  className="text-secondary-400 hover:text-white transition-colors touch-target min-h-[44px] flex items-center"
                >
                  Terms and Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
