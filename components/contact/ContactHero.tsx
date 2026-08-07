'use client'

import { MapPin, PhoneCall, Mail, Clock } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Container from '@/components/ui/Container'
import { useCampuses } from '@/hooks/useCampuses'
import { SCHOOL_INFO } from '@/lib/constants'
import { OFFICE_TIMINGS, toTelHref, toWhatsAppHref } from '@/lib/contact-utils'

const ContactHero = () => {
  const { mainCampus } = useCampuses(true)

  const address = mainCampus?.address || SCHOOL_INFO.contact.address
  const phone = mainCampus?.mobileNumber || mainCampus?.phone || SCHOOL_INFO.contact.phone
  const email = mainCampus?.email || SCHOOL_INFO.contact.email
  const waPhone = mainCampus?.whatsAppNumber || SCHOOL_INFO.contact.whatsapp || phone
  const waHref = toWhatsAppHref(
    waPhone,
    'Assalam-o-Alaikum! I would like to inquire about admissions at Pak Wattan.'
  )
  const telHref = toTelHref(phone)
  const hours =
    mainCampus?.officeHours || OFFICE_TIMINGS.map((t) => `${t.day}: ${t.hours}`).join(' · ')

  const details = [
    { icon: MapPin, title: 'Address', text: address },
    { icon: PhoneCall, title: 'Phone', text: phone },
    { icon: Mail, title: 'Email', text: email },
    { icon: Clock, title: 'Office Hours', text: hours },
  ]

  return (
    <>
      <PageHero
        title="We're here for parents and students"
        description="Admissions, scholarships, or a campus visit — reach our Havelian office anytime during working hours."
        imageSrc="/images/about-us/Picture5.jpg"
        imageAlt="Pak Wattan campus office and entrance"
        primaryCta={{
          label: waHref ? 'WhatsApp Us' : 'Send Message',
          href: waHref || '#contact-form',
          external: !!waHref,
          ariaLabel: waHref ? 'Chat on WhatsApp' : 'Scroll to contact form',
        }}
        secondaryCta={{
          label: 'Send Message',
          href: '#contact-form',
          ariaLabel: 'Scroll to contact form',
        }}
      />

      <section className="border-b border-secondary-100 bg-white py-6 sm:py-8" aria-label="Contact details">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {details.map((item) => {
              const Icon = item.icon
              const isPhone = item.title === 'Phone' && telHref
              const isEmail = item.title === 'Email' && email
              return (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary-500">
                      {item.title}
                    </p>
                    {isPhone ? (
                      <a href={telHref} className="text-sm font-medium text-secondary-900 hover:text-primary-700">
                        {item.text}
                      </a>
                    ) : isEmail ? (
                      <a
                        href={`mailto:${email}`}
                        className="text-sm font-medium text-secondary-900 hover:text-primary-700 break-all"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-secondary-800 whitespace-pre-line leading-relaxed">
                        {item.text}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}

export default ContactHero
