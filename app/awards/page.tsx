import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import AwardsHero from '@/components/awards/AwardsHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const AwardsGallery = dynamic(() => import('@/components/awards/AwardsGallery'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const AwardsAchievements = dynamic(() => import('@/components/awards/AwardsAchievements'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Awards',
  description: 'Celebrate our achievements and awards at Pak Wattan School & College of Sciences. View our award gallery, recognition, and student achievements.',
  keywords: 'awards, pak wattan awards, school awards, achievements, recognition, havelian school awards, student achievements',
  path: '/awards',
})

export default function AwardsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Awards', url: 'https://pakwattan.edu.pk/awards' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <AwardsHero />
        <AwardsGallery />
        <AwardsAchievements />
      </div>
    </>
  )
}
