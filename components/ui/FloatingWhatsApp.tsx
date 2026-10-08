'use client'

import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SCHOOL_INFO } from '@/lib/constants'

const FloatingWhatsApp = () => {
  const pathname = usePathname()
  const hidden = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')

  if (hidden) return null

  const phone = SCHOOL_INFO.contact.whatsapp || '03180821377'
  const digits = phone.replace(/\D/g, '')
  const international = digits.startsWith('0') ? `92${digits.slice(1)}` : digits
  const href = `https://wa.me/${international}?text=${encodeURIComponent(
    'Assalam-o-Alaikum! I would like to inquire about admissions at Pak Wattan School & College.'
  )}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed z-50 bottom-24 left-4 right-auto sm:bottom-24 sm:left-auto sm:right-8 group"
    >
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" aria-hidden />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-green-600/40 hover:bg-[#20bd5a] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300">
        <MessageCircle className="w-7 h-7 fill-current" />
      </span>
      <span className="pointer-events-none absolute left-full ml-3 sm:left-auto sm:right-full sm:ml-0 sm:mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-secondary-900 text-white text-xs font-medium px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        Chat on WhatsApp
      </span>
    </a>
  )
}

export default FloatingWhatsApp
