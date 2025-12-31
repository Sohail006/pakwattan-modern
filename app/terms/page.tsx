import { Metadata } from 'next'
import TermsOfService from '@/components/terms/TermsOfService'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Terms and Service for Pak Wattan School & College of Sciences, Havelian. Learn about our admission terms, academic policies, fee structure, and service conditions.',
  keywords: 'terms of service, pak wattan terms, school policies, admission terms, academic policies, service conditions',
  path: '/terms',
})

export default function Terms() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Terms of Service', url: 'https://pakwattan.edu.pk/terms' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <TermsOfService />
    </>
  )
}
