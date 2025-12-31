import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import PakiansCoachingAcademyHero from '@/components/pakians-coaching-academy/PakiansCoachingAcademyHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const PakiansCoachingAcademyDetails = dynamic(() => import('@/components/pakians-coaching-academy/PakiansCoachingAcademyDetails'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const PakiansCoachingAcademyPrograms = dynamic(() => import('@/components/pakians-coaching-academy/PakiansCoachingAcademyPrograms'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const PakiansCoachingAcademyRegistration = dynamic(() => import('@/components/pakians-coaching-academy/PakiansCoachingAcademyRegistration'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Pakians Coaching Academy',
  description: 'Join Pakians Coaching Academy at Pak Wattan School & College of Sciences. Professional coaching programs for academic excellence and competitive exam preparation.',
  keywords: 'coaching academy, pakians coaching, tutoring, exam preparation, competitive exams, academic coaching, pak wattan coaching',
  path: '/pakians-coaching-academy',
})

export default function PakiansCoachingAcademy() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Pakians Coaching Academy', url: 'https://pakwattan.edu.pk/pakians-coaching-academy' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <PakiansCoachingAcademyHero />
        <PakiansCoachingAcademyDetails />
        <PakiansCoachingAcademyPrograms />
        <PakiansCoachingAcademyRegistration />
      </div>
    </>
  )
}
