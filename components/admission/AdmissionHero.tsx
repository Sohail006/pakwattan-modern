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

      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold font-josefin leading-tight">
                Join Our{' '}
                <span className="text-gradient">
                  Community
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Admissions Open for Academic Year 2025-26
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Become part of Pakistan&apos;s leading educational institution. We welcome 
                students from all backgrounds and provide quality education with 
                affordable expenses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToForm}
                className="btn-accent text-center"
                aria-label="Scroll to student name field in admission form"
              >
                Apply Now
              </button>
              <button 
                onClick={scrollToProcess}
                className="btn-secondary text-center"
                aria-label="Learn more about admission process"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Admission Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {admissionInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-accent-500/20 rounded-full animate-bounce-slow delay-1000"></div>
    </section>
  )
}

export default AdmissionHero
