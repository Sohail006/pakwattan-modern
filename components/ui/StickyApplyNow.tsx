'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText } from 'lucide-react'

/**
 * Sticky Apply Now CTA. Hidden on admission (form has its own sticky) and dashboard.
 */
const StickyApplyNow = () => {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const hidden =
    pathname?.startsWith('/admission') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/admin')

  useEffect(() => {
    if (hidden) return
    const handleScroll = () => setIsVisible(window.scrollY > 480)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hidden])

  if (hidden || !isVisible) return null

  return (
    <>
      {/* Mobile: bottom bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden pointer-events-none">
        <div className="pointer-events-auto bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.18)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Link
            href="/admission"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-white text-primary-800 font-bold text-base py-3 min-h-[48px] shadow-lg active:scale-[0.98] transition-transform"
            aria-label="Apply now for admission"
          >
            <FileText className="w-5 h-5" />
            Apply Now — Admissions Open
          </Link>
        </div>
      </div>

      {/* Desktop: floating pill */}
      <div className="hidden md:block fixed bottom-6 left-6 z-50 animate-fade-in-up">
        <Link
          href="/admission"
          className="group flex items-center gap-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3.5 rounded-full shadow-2xl hover:shadow-primary-600/40 hover:from-primary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-accent-400 focus:ring-offset-2 font-semibold"
          aria-label="Apply now for admission"
        >
          <FileText className="w-5 h-5 group-hover:rotate-6 transition-transform" />
          Apply Now
        </Link>
      </div>
    </>
  )
}

export default StickyApplyNow
