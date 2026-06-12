import { Metadata } from 'next'
import TalentHuntSeason3Hero from '@/components/talent-hunt/season-3/TalentHuntSeason3Hero'
import TalentHuntSeason3Details from '@/components/talent-hunt/season-3/TalentHuntSeason3Details'
import TalentHuntSeason3Registration from '@/components/talent-hunt/season-3/TalentHuntSeason3Registration'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Talent Hunt Season 3',
  description:
    'Talent Hunt with Pak Wattan Season 3 — district-wide talent development. Grand opening 25 July 2026 at Jalal Baba Auditorium, Abbottabad. Register as participant or institution.',
  keywords:
    'talent hunt season 3, pak wattan, havelian, district talent, poetry mushaira, science model, entrepreneur pitch, 2026-27',
  path: '/talent-hunt/season-3',
})

export default function TalentHuntSeason3Page() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Talent Hunt', url: 'https://pakwattan.edu.pk/talent-hunt' },
    { name: 'Season 3', url: 'https://pakwattan.edu.pk/talent-hunt/season-3' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <TalentHuntSeason3Hero />
        <TalentHuntSeason3Details />
        <TalentHuntSeason3Registration />
      </div>
    </>
  )
}
