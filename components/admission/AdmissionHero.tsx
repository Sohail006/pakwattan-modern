'use client'

import { GraduationCap, Users, Calendar, Award } from 'lucide-react'

const AdmissionHero = () => {
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

  const scrollToProcess = () => {
    const processElement = document.getElementById('admission-process')
    if (processElement) {
      processElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  const admissionInfo = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Quality Education',
      description: 'Excellence in academics with modern teaching methods'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Experienced Faculty',
      description: 'Qualified teachers dedicated to student success'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Academic Year',
      description: '2025-26 admissions now open'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Scholarships',
      description: 'Merit-based and need-based scholarships available'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container-custom relative z-10 py-8 sm:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-josefin leading-tight break-words">
                Join Our{' '}
                <span className="text-gradient">
                  Community
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed break-words">
                Admissions Open for Academic Year 2025-26
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed break-words">
                Become part of Pakistan&apos;s leading educational institution. We welcome 
                students from all backgrounds and provide quality education with 
                affordable expenses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={scrollToForm}
                className="btn-accent text-center touch-target min-h-[44px] text-sm sm:text-base"
                aria-label="Scroll to student name field in admission form"
              >
                Apply Now
              </button>
              <button 
                onClick={scrollToProcess}
                className="btn-secondary text-center touch-target min-h-[44px] text-sm sm:text-base"
                aria-label="Learn more about admission process"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Admission Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {admissionInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:bg-white/20 active:bg-white/15 transition-all duration-300 group"
              >
                <div className="text-white mb-2 sm:mb-3 lg:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1 sm:mb-2 truncate">
                  {info.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed break-words">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/10 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-accent-500/20 rounded-full animate-bounce-slow delay-1000"></div>
    </section>
  )
}

export default AdmissionHero
