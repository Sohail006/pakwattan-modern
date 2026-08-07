import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ContactHero from '@/components/contact/ContactHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from '@/lib/seo/structuredData'
import { CONTACT_FAQS } from '@/lib/contact-utils'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

const ContactInfo = dynamic(() => import('@/components/contact/ContactInfo'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />,
})

const OfficeTimings = dynamic(() => import('@/components/contact/OfficeTimings'), {
  loading: () => <SkeletonLoader variant="card" className="my-6 h-28" />,
})

const OfficePhotos = dynamic(() => import('@/components/contact/OfficePhotos'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />,
})

const ContactForm = dynamic(() => import('@/components/contact/ContactForm'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />,
})

const MapSection = dynamic(() => import('@/components/contact/MapSection'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />,
})

const ContactFAQ = dynamic(() => import('@/components/contact/ContactFAQ'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />,
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us — Campus, WhatsApp & Directions',
  description:
    'Contact Pak Wattan in Havelian: campus phone numbers, WhatsApp, office timings, Google Maps directions, campus photos, and online message form.',
  keywords:
    'contact Pak Wattan, Pak Wattan phone, WhatsApp Havelian school, office hours, Google Maps Havelian, Azam Khan Road school',
  path: '/contact',
})

export default function ContactPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Contact Us', url: 'https://pakwattan.edu.pk/contact' },
  ])
  const faqSchema = generateFAQSchema(CONTACT_FAQS)
  const webPageSchema = generateWebPageSchema({
    name: 'Contact Pak Wattan School & College of Sciences',
    description:
      'Campus contact details, WhatsApp, office timings, and directions for Pak Wattan in Havelian.',
    url: 'https://pakwattan.edu.pk/contact',
  })

  return (
    <>
      <StructuredData data={[breadcrumbs, faqSchema, webPageSchema]} />
      <div className="min-h-screen pb-20 md:pb-0">
        <ContactHero />
        <ContactInfo />
        <OfficeTimings />
        <OfficePhotos />
        <ContactForm />
        <MapSection />
        <ContactFAQ />
      </div>
    </>
  )
}
