'use client'

import { useState, useEffect } from 'react'
import { FileText, ListChecks, DollarSign, ArrowRight } from 'lucide-react'

const QuickNavigation = () => {
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const sections = [
    { id: 'admission-process', label: 'Process', icon: <FileText className="w-4 h-4" /> },
    { id: 'admission-requirements', label: 'Requirements', icon: <ListChecks className="w-4 h-4" /> },
    { id: 'fee-structure', label: 'Fees', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'admission-form', label: 'Apply Now', icon: <ArrowRight className="w-4 h-4" /> },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Offset for better detection
      
      // Show navigation after scrolling past hero
      setIsVisible(scrollPosition > 600)

      // Determine active section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(sections[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollToSection = (sectionId: string) => {
    // Special handling for "Apply Now" - scroll to Student Name field
    if (sectionId === 'admission-form') {
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
        return
      }
    }
    
    // Default behavior for other sections
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Offset for fixed header if any
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (!isVisible) return null

  return (
    <nav 
      className="fixed top-1/2 right-4 -translate-y-1/2 z-40 hidden lg:block"
      aria-label="Quick navigation"
    >
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-2 space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
            }`}
            aria-label={`Navigate to ${section.label}`}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            <span className={activeSection === section.id ? 'text-white' : 'text-primary-600'}>
              {section.icon}
            </span>
            <span className="text-sm font-medium whitespace-nowrap">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default QuickNavigation

