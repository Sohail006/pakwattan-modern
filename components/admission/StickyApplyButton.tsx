'use client'

import { useState, useEffect } from 'react'
import { ArrowDown, FileText } from 'lucide-react'

const StickyApplyButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero; hide near form to avoid clutter
      const scrollPosition = window.scrollY
      const form = document.getElementById('admission-form')
      let nearForm = false
      if (form) {
        const formTop = form.getBoundingClientRect().top + window.scrollY
        nearForm = scrollPosition + window.innerHeight > formTop + 80
      }
      setIsVisible(scrollPosition > 600 && !nearForm)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const nameField = document.getElementById('name')
    if (nameField) {
      const offset = 120
      const elementPosition = nameField.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      setTimeout(() => {
        nameField.focus()
      }, 500)
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Mobile: full-width bottom bar (avoids collision with Back-to-top / WhatsApp) */}
      <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden pointer-events-none">
        <div className="pointer-events-auto bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.18)] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={scrollToForm}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-white text-primary-800 font-bold text-base py-3 min-h-[48px] shadow-lg active:scale-[0.98] transition-transform"
            aria-label="Scroll to student name field in admission form"
          >
            <FileText className="w-5 h-5" />
            Apply Now
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop / tablet: floating pill */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
        <button
          type="button"
          onClick={scrollToForm}
          className="group flex items-center gap-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Scroll to student name field in admission form"
        >
          <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold text-base lg:text-lg">Apply Now</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </>
  )
}

export default StickyApplyButton
