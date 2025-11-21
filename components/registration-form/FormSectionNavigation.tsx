'use client'

import { useState, useEffect } from 'react'
import { User, GraduationCap, Phone, Info, Award, ChevronUp } from 'lucide-react'

interface FormSection {
  id: string
  label: string
  icon: React.ReactNode
}

// Move sections outside component since it's a constant
const FORM_SECTIONS: FormSection[] = [
  { id: 'basic-information', label: 'Basic Info', icon: <User className="w-4 h-4" /> },
  { id: 'academic-information', label: 'Academic', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'contact-information', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
  { id: 'additional-information', label: 'Additional', icon: <Info className="w-4 h-4" /> },
  { id: 'scholarship-information', label: 'Scholarship', icon: <Award className="w-4 h-4" /> },
]

const FormSectionNavigation = () => {
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById('admission-form')
      if (!formElement) return

      const formRect = formElement.getBoundingClientRect()
      const isInForm = formRect.top <= 100 && formRect.bottom > 0
      setIsVisible(isInForm)

      if (isInForm) {
        // Determine active section
        for (let i = FORM_SECTIONS.length - 1; i >= 0; i--) {
          const element = document.getElementById(FORM_SECTIONS[i].id)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 150) {
              setActiveSection(FORM_SECTIONS[i].id)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 120
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsExpanded(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className="sticky top-20 z-30 mb-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        {/* Mobile: Collapsible */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            aria-label="Toggle form sections"
          >
            <span className="text-sm font-semibold text-gray-700">
              {activeSection ? FORM_SECTIONS.find(s => s.id === activeSection)?.label || 'Form Sections' : 'Form Sections'}
            </span>
            <ChevronUp className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          {isExpanded && (
            <div className="border-t border-gray-200 p-2 space-y-1">
              {FORM_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop: Always visible horizontal */}
        <div className="hidden lg:flex items-center justify-around p-2">
          {FORM_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md text-xs transition-all duration-200 min-w-[80px] ${
                activeSection === section.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600'
              }`}
              aria-label={`Navigate to ${section.label} section`}
            >
              <span className={activeSection === section.id ? 'text-white' : 'text-primary-600'}>
                {section.icon}
              </span>
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FormSectionNavigation

