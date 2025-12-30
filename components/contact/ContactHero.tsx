'use client'

import { useState, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { getCampuses, Campus } from '@/lib/api/campuses'
import { SCHOOL_INFO } from '@/lib/constants'

const ContactHero = () => {
  const [mainCampus, setMainCampus] = useState<Campus | null>(null)

  useEffect(() => {
    const fetchMainCampus = async () => {
      try {
        const data = await getCampuses(true) // Get only active campuses
        // Get main campus (highest priority or first one)
        const sorted = data.sort((a, b) => {
          const priorityA = a.priority || 0
          const priorityB = b.priority || 0
          return priorityB - priorityA
        })
        setMainCampus(sorted.length > 0 ? sorted[0] : null)
      } catch (error) {
        console.error('[ContactHero] Failed to load main campus:', error)
        // Keep null on error (will use fallback from SCHOOL_INFO)
      }
    }

    fetchMainCampus()
  }, [])

  // Use main campus data if available, otherwise fallback to SCHOOL_INFO
  const address = mainCampus?.address || SCHOOL_INFO.contact.address
  const phone = mainCampus?.mobileNumber || mainCampus?.phone || SCHOOL_INFO.contact.phone
  const email = mainCampus?.email || SCHOOL_INFO.contact.email
  const officeHours = mainCampus?.officeHours || 'Monday - Friday: 8:00 AM - 4:00 PM | Saturday: 8:00 AM - 1:00 PM'

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: address
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: phone
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: email
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Hours',
      details: officeHours
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
                Get in{' '}
                <span className="text-gradient">
                  Touch
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                We&apos;d love to hear from you
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Have questions about our programs, admissions, or want to learn more about 
                Pak Wattan School & College of Sciences? We&apos;re here to help!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {phone && (
                <a 
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="btn-accent text-center"
                >
                  Call Now
                </a>
              )}
              <a 
                href="#contact-form"
                className="btn-secondary text-center"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Send Message
              </a>
            </div>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => (
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
                  {info.details}
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

export default ContactHero
