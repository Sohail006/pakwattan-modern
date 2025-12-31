import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import TalentHuntHero from '@/components/talent-hunt/TalentHuntHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const TalentHuntOverview = dynamic(() => import('@/components/talent-hunt/TalentHuntOverview'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const TalentHuntSeasons = dynamic(() => import('@/components/talent-hunt/TalentHuntSeasons'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const TalentHuntContests = dynamic(() => import('@/components/talent-hunt/TalentHuntContests'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const TalentHuntRegistration = dynamic(() => import('@/components/talent-hunt/TalentHuntRegistration'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Talent Hunt',
  description: 'Join Talent Hunt with Pak Wattan - A vibrant platform to uncover hidden talents, build self-esteem, and inspire young minds to explore their full potential through various contests and competitions.',
  keywords: 'talent hunt, pak wattan, school competition, student talent, creativity, confidence, young minds, talent competition',
  path: '/talent-hunt',
})

export default function TalentHuntPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Talent Hunt', url: 'https://pakwattan.edu.pk/talent-hunt' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <TalentHuntHero />
        <TalentHuntOverview />
        <TalentHuntSeasons />
        <TalentHuntContests />
        <TalentHuntRegistration />
      </div>
    </>
  )
}
