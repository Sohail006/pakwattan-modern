'use client'

import { Briefcase, Users, Award, Calendar, ArrowDown } from 'lucide-react'

const JobsHero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('job-application-form')
    if (formElement) {
      const offset = 100
      const elementPosition = formElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const jobBenefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Competitive Packages',
      description: 'Attractive salary and benefits'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Professional Growth',
      description: 'Continuous learning opportunities'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Session 2026-27',
      description: 'Join us for the upcoming academic year'
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Career Development',
      description: 'Advance your teaching career'
    }
  ]

  return (
    <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>

      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
                <Calendar className="w-4 h-4" />
                <span>Job Opportunities for Session 2026-27</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-josefin leading-tight">
                Join Our{' '}
                <span className="bg-gradient-to-r from-accent-300 to-white bg-clip-text text-transparent">
                  Teaching Team
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Pak Wattan School & College of Sciences is seeking passionate and dedicated educators to join our team for Academic Session 2026-27.
              </p>
              
              <p className="text-lg text-white/80 leading-relaxed">
                If you&apos;re committed to making a difference in students&apos; lives and contributing to educational excellence, we&apos;d love to hear from you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToForm}
                className="group bg-white text-primary-600 hover:bg-white/90 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Briefcase className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Apply Now
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {jobBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/80 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JobsHero
