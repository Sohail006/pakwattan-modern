import { Metadata } from 'next'
import TalentHuntPastSeasonBanner from '@/components/talent-hunt/shared/TalentHuntPastSeasonBanner'
import TalentHuntSeason2Hero from '@/components/talent-hunt/season-2/TalentHuntSeason2Hero'
import TalentHuntSeason2Video from '@/components/talent-hunt/season-2/TalentHuntSeason2Video'
import TalentHuntSeason2Details from '@/components/talent-hunt/season-2/TalentHuntSeason2Details'
import TalentHuntSeason2Contests from '@/components/talent-hunt/season-2/TalentHuntSeason2Contests'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Talent Hunt Season-II (Archive)',
  description:
    'Archive: Talent Hunt Season-II with Pak Wattan (2025–26). District-level talent hunt — completed. Season 3 is now open for registration.',
  keywords: 'talent hunt season 2, archive, pak wattan, 2025-26, past season',
  path: '/talent-hunt/season-2',
})

export default function TalentHuntSeason2Page() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Talent Hunt', url: 'https://pakwattan.edu.pk/talent-hunt' },
    { name: 'Season-II (Archive)', url: 'https://pakwattan.edu.pk/talent-hunt/season-2' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <TalentHuntPastSeasonBanner />
      <div className="min-h-screen">
        <TalentHuntSeason2Hero />
        <TalentHuntSeason2Video />
        <TalentHuntSeason2Details />
        <TalentHuntSeason2Contests />
      </div>
    </>
  )
}
