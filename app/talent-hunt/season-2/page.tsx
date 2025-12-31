import { Metadata } from 'next'
import TalentHuntSeason2Hero from '@/components/talent-hunt/season-2/TalentHuntSeason2Hero'
import TalentHuntSeason2Video from '@/components/talent-hunt/season-2/TalentHuntSeason2Video'
import TalentHuntSeason2Details from '@/components/talent-hunt/season-2/TalentHuntSeason2Details'
import TalentHuntSeason2Contests from '@/components/talent-hunt/season-2/TalentHuntSeason2Contests'
import TalentHuntSeason2Registration from '@/components/talent-hunt/season-2/TalentHuntSeason2Registration'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Talent Hunt Season-II',
  description: 'Talent Hunt Season-II with Pak Wattan - Expanded to district level in 2025-26, featuring 10 exciting contest streams including singing, dancing, poetry, and more.',
  keywords: 'talent hunt season 2, pak wattan, district level, 10 contests, 2025-26, talent competition, student talent',
  path: '/talent-hunt/season-2',
})

export default function TalentHuntSeason2Page() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Talent Hunt', url: 'https://pakwattan.edu.pk/talent-hunt' },
    { name: 'Season-II', url: 'https://pakwattan.edu.pk/talent-hunt/season-2' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <TalentHuntSeason2Hero />
        <TalentHuntSeason2Video />
        <TalentHuntSeason2Details />
        <TalentHuntSeason2Contests />
        <TalentHuntSeason2Registration />
      </div>
    </>
  )
}
