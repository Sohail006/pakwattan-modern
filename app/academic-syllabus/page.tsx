import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import AcademicSyllabusHero from '@/components/academic-syllabus/AcademicSyllabusHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const AcademicSyllabusDetails = dynamic(() => import('@/components/academic-syllabus/AcademicSyllabusDetails'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const AcademicSyllabusLevels = dynamic(() => import('@/components/academic-syllabus/AcademicSyllabusLevels'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Academic Syllabus',
  description: 'Explore the comprehensive academic syllabus for all grades at Pak Wattan School & College of Sciences. Detailed curriculum for Montessori, Primary, and Matric levels.',
  keywords: 'academic syllabus, curriculum, course outline, pak wattan syllabus, montessori syllabus, primary syllabus, matric syllabus',
  path: '/academic-syllabus',
})

export default function AcademicSyllabus() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Academic Syllabus', url: 'https://pakwattan.edu.pk/academic-syllabus' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <AcademicSyllabusHero />
        <AcademicSyllabusDetails />
        <AcademicSyllabusLevels />
      </div>
    </>
  )
}
