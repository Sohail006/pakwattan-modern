import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import TalentHuntHero from '@/components/talent-hunt/TalentHuntHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'

const TalentHuntSeason3Hub = dynamic(() => import('@/components/talent-hunt/TalentHuntSeason3Hub'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />,
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Talent Hunt',
  description:
    `${TALENT_HUNT_SEASON3_TITLE} is now open (2026–27). District-wide talent development. View past seasons and register for the current season.`,
  keywords: 'talent hunt with pak wattan season 3, pak wattan, havelian, student talent, district competition',
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
        <TalentHuntSeason3Hub />
      </div>
    </>
  )
}
