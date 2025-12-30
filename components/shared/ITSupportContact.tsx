'use client'

import { useState, useEffect } from 'react'
import { Mail, Phone, Clock } from 'lucide-react'
import { getITSupportPublic, ITSupportPublic } from '@/lib/api/itSupport'

interface ITSupportContactProps {
  /**
   * Display format: 'inline' shows email and phone on same line, 'stacked' shows vertically
   */
  displayFormat?: 'inline' | 'stacked'
  /**
   * Show office hours if available
   */
  showOfficeHours?: boolean
  /**
   * Custom className for styling
   */
  className?: string
  /**
   * Fallback email if API fails
   */
  fallbackEmail?: string
  /**
   * Fallback phone if API fails
   */
  fallbackPhone?: string
}

/**
 * Reusable component to display IT Support contact information
 * Fetches data from public API endpoint (no authentication required)
 */
export default function ITSupportContact({
  displayFormat = 'stacked',
  showOfficeHours = false,
  className = '',
  fallbackEmail = 'support@pakwattan.edu.pk',
  fallbackPhone = '+92-XXX-XXXXXXX'
}: ITSupportContactProps) {
  const [itSupport, setITSupport] = useState<ITSupportPublic | null>(null)

  useEffect(() => {
    const fetchITSupport = async () => {
      try {
        const data = await getITSupportPublic()
        // Get the first entry (they're already sorted by priority)
        if (data && data.length > 0) {
          setITSupport(data[0])
        }
      } catch (error) {
        // Silently fail and use fallback values
        if (process.env.NODE_ENV === 'development') {
          console.warn('[ITSupportContact] Failed to load IT Support:', error)
        }
      }
    }

    fetchITSupport()
  }, [])

  // Use API data if available, otherwise use fallback
  const email = itSupport?.email || fallbackEmail
  const phone = itSupport?.mobileNumber || itSupport?.phone || fallbackPhone
  const officeHours = itSupport?.officeHours

  if (displayFormat === 'inline') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm hover:underline transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{email}</span>
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-sm hover:underline transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>{phone}</span>
          </a>
        )}
        {showOfficeHours && officeHours && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            <span>{officeHours}</span>
          </div>
        )}
      </div>
    )
  }

  // Stacked format (default)
  return (
    <div className={`space-y-2 ${className}`}>
      {email && (
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 text-sm hover:underline transition-colors"
        >
          <Mail className="w-4 h-4 flex-shrink-0" />
          <span>{email}</span>
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="flex items-center gap-2 text-sm hover:underline transition-colors"
        >
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span>{phone}</span>
        </a>
      )}
      {showOfficeHours && officeHours && (
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>{officeHours}</span>
        </div>
      )}
    </div>
  )
}

