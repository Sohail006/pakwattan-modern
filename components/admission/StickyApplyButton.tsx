'use client'

import { useState, useEffect } from 'react'
import { ArrowDown, FileText } from 'lucide-react'

const StickyApplyButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approximately 600px)
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 600)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const nameField = document.getElementById('name')
    if (nameField) {
      const offset = 120 // Offset for sticky headers/navigation
      const elementPosition = nameField.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Focus the input field after scrolling
      setTimeout(() => {
        nameField.focus()
      }, 500) // Wait for scroll animation to complete
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={scrollToForm}
        className="group flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-full shadow-2xl hover:shadow-3xl hover:from-primary-700 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Scroll to student name field in admission form"
      >
        <FileText className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-semibold text-sm sm:text-base lg:text-lg hidden sm:inline">Apply Now</span>
        <span className="font-semibold text-sm sm:hidden">Apply</span>
        <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-y-1 transition-transform duration-300 hidden sm:block" />
      </button>
    </div>
  )
}

export default StickyApplyButton

