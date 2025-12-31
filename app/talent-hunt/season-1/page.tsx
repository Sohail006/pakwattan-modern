import { Metadata } from 'next'
import TalentHuntSeason1Hero from '@/components/talent-hunt/season-1/TalentHuntSeason1Hero'
import TalentHuntSeason1Details from '@/components/talent-hunt/season-1/TalentHuntSeason1Details'
import TalentHuntSeason1Results from '@/components/talent-hunt/season-1/TalentHuntSeason1Results'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Talent Hunt Season-I',
  description: 'Talent Hunt Season-I with Pak Wattan - The remarkable success of Season-I featured talented participants exclusively from Pak Wattan. View results and highlights.',
  keywords: 'talent hunt season 1, pak wattan, school competition, student talent, 2024-25, talent hunt results',
  path: '/talent-hunt/season-1',
})

export default function TalentHuntSeason1Page() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Talent Hunt', url: 'https://pakwattan.edu.pk/talent-hunt' },
    { name: 'Season-I', url: 'https://pakwattan.edu.pk/talent-hunt/season-1' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <TalentHuntSeason1Hero />
        <TalentHuntSeason1Details />
        <TalentHuntSeason1Results />
      </div>
    </>
  )
}
