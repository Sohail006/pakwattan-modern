'use client'

import { Users, Award, BookOpen, GraduationCap, RefreshCw } from 'lucide-react'
import { useCampuses } from '@/hooks/useCampuses'
import ContactCard from '@/components/contact/ContactCard'
import { CONTACT_OFFICE_PHOTOS } from '@/lib/contact-utils'
import Container from '@/components/ui/Container'

const ContactInfo = () => {
  const { campuses, loading, error, usingFallback, refetch } = useCampuses(true)

  const quickStats = [
    { icon: Users, value: '3000+', label: 'Students', color: 'text-blue-600' },
    { icon: Award, value: '2000+', label: 'Awards', color: 'text-yellow-600' },
    { icon: BookOpen, value: String(Math.max(campuses.length, 1)), label: 'Campuses', color: 'text-green-600' },
    { icon: GraduationCap, value: '1353+', label: 'Alumni', color: 'text-purple-600' },
  ]

  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-white">
      <Container>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-3">
            <span className="text-gradient">Our Campuses</span>
          </h2>
          <p className="text-sm sm:text-base text-secondary-600 max-w-2xl mx-auto">
            Visit any campus in Havelian — call, WhatsApp, or get directions in one tap.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center gap-2 min-h-[40px] px-3 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
            <p className="mt-4 text-secondary-600">Loading campus information...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {campuses.map((campus, index) => (
              <ContactCard
                key={campus.id || campus.name}
                campus={campus}
                featured={index === 0 && !usingFallback}
                photoSrc={CONTACT_OFFICE_PHOTOS[index % CONTACT_OFFICE_PHOTOS.length]?.src}
              />
            ))}
          </div>
        )}

        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-5 sm:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-secondary-800 mb-2">By the Numbers</h3>
            <p className="text-sm text-secondary-600">Our impact in the community</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickStats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-full bg-white shadow-md flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-secondary-800 mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-secondary-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ContactInfo
