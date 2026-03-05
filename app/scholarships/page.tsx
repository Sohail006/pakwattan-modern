import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ScholarshipsHero from '@/components/scholarships/ScholarshipsHero'
import ScholarshipNotice from '@/components/scholarships/ScholarshipNotice'
import StructuredData from '@/components/seo/StructuredData'
import { 
  scholarshipStats, 
  allScholarshipSessions 
} from '@/lib/scholarship-data'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const ScholarshipStats = dynamic(() => import('@/components/scholarships/ScholarshipStats'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ScholarshipDataTables = dynamic(() => import('@/components/scholarships/ScholarshipDataTables'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ScholarshipTypes = dynamic(() => import('@/components/scholarships/ScholarshipTypes'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ScholarshipApplicationProcess = dynamic(() => import('@/components/scholarships/ScholarshipApplicationProcess'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Scholarships',
  description: 'Learn about our scholarship programs including Pakians Scholarship, Merit Based Scholarship, Orphans Scholarship, Special child Scholarship, and Hafiz ul Quran Scholarship. 15 lacs scholarship program with detailed criteria and application process.',
  keywords: 'scholarships, pak wattan scholarships, merit based scholarship, orphans scholarship, special child scholarship, hafiz ul quran scholarship, pakians scholarship, 15 lacs scholarship, march 23rd test, pak wattan financial aid',
  path: '/scholarships',
})

export default function ScholarshipsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Scholarships', url: 'https://pakwattan.edu.pk/scholarships' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <ScholarshipsHero />
        <ScholarshipStats stats={scholarshipStats} />
        <ScholarshipTypes />
        <ScholarshipNotice />
        <ScholarshipDataTables sessions={allScholarshipSessions} />
        <ScholarshipApplicationProcess />
      </div>
    </>
  )
}
