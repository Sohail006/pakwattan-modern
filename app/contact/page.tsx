import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ContactHero from '@/components/contact/ContactHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const ContactInfo = dynamic(() => import('@/components/contact/ContactInfo'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ContactForm = dynamic(() => import('@/components/contact/ContactForm'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const MapSection = dynamic(() => import('@/components/contact/MapSection'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Pak Wattan School & College of Sciences. Find our contact information, location, office hours, and send us a message. We are located in Havelian, KPK.',
  keywords: 'contact pak wattan, school contact, havelian school contact, pak wattan address, school phone number, pak wattan email, school location',
  path: '/contact',
})

export default function ContactPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Contact Us', url: 'https://pakwattan.edu.pk/contact' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <ContactHero />
        <ContactInfo />
        <ContactForm />
        <MapSection />
      </div>
    </>
  )
}
