import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import StructuredData from '@/components/seo/StructuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { PAKIANS_FACULTY_PAGE_TITLE } from '@/lib/pakians-faculty-data'

const PakiansFacultyRegistrationForm = dynamic(
  () => import('@/components/pakians-faculty/PakiansFacultyRegistrationForm'),
  {
    loading: () => (
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom max-w-3xl">
          <SkeletonLoader variant="section" className="min-h-[520px]" />
        </div>
      </section>
    ),
  }
)

export const metadata: Metadata = generatePageMetadata({
  title: PAKIANS_FACULTY_PAGE_TITLE,
  description:
    'Register as teaching or non-teaching faculty at Pak Wattan School & College of Sciences, Havelian. Submit your profile, qualifications, and experience online.',
  keywords:
    'pak wattan faculty registration, pakians faculty, teaching jobs havelian, school staff registration, pak wattan careers',
  path: '/pakians-faculty-registration',
})

export default function PakiansFacultyRegistrationPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: PAKIANS_FACULTY_PAGE_TITLE, url: 'https://pakwattan.edu.pk/pakians-faculty-registration' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <PakiansFacultyRegistrationForm />
    </>
  )
}
