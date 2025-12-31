import { Metadata } from 'next'
import PrivacyPolicy from '@/components/privacy/PrivacyPolicy'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Pak Wattan School & College of Sciences, Havelian. Learn how we collect, use, store, and protect your personal information and data.',
  keywords: 'privacy policy, pak wattan privacy, data protection, information security, personal data, privacy rights',
  path: '/privacy',
})

export default function Privacy() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Privacy Policy', url: 'https://pakwattan.edu.pk/privacy' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <PrivacyPolicy />
    </>
  )
}
