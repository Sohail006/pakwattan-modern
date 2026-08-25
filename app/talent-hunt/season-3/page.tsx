import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import TalentHuntSeason3Hero from '@/components/talent-hunt/season-3/TalentHuntSeason3Hero'
import TalentHuntSeason3About from '@/components/talent-hunt/season-3/TalentHuntSeason3About'
import StructuredData from '@/components/seo/StructuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { TALENT_HUNT_SEASON3_PERIOD, TALENT_HUNT_SEASON3_TITLE } from '@/lib/talent-hunt-season3-data'

const TalentHuntSeason3Registration = dynamic(
  () => import('@/components/talent-hunt/season-3/TalentHuntSeason3Registration'),
  {
    loading: () => (
      <section className="py-12 sm:py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom max-w-4xl">
          <SkeletonLoader variant="section" className="min-h-[520px]" />
        </div>
      </section>
    ),
  }
)

const TalentHuntSeason3Details = dynamic(
  () => import('@/components/talent-hunt/season-3/TalentHuntSeason3Details'),
  {
    loading: () => (
      <div className="container-custom py-10">
        <SkeletonLoader variant="section" className="min-h-[360px]" />
      </div>
    ),
  }
)

export const metadata: Metadata = generatePageMetadata({
  title: TALENT_HUNT_SEASON3_TITLE,
  description:
    `${TALENT_HUNT_SEASON3_TITLE} — DREAM • DARE • DEVELOP (${TALENT_HUNT_SEASON3_PERIOD}). Six streams: Poetry, Drama & Skit, Storytelling, Science Models, Young Entrepreneurs Pitch, and Sports Gala. Opening 25 July 2026 at Jalal Baba Auditorium, Abbottabad.`,
  keywords:
    'talent hunt with pak wattan season 3, poetry mushaira 22 august 2026, drama skit, storytelling, science model, young entrepreneurs pitch, sports gala january 2027, pak wattan havelian',
  path: '/talent-hunt/season-3',
})

export default function TalentHuntSeason3Page() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Talent Hunt', url: 'https://pakwattan.edu.pk/talent-hunt' },
    { name: TALENT_HUNT_SEASON3_TITLE, url: 'https://pakwattan.edu.pk/talent-hunt/season-3' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <TalentHuntSeason3Hero />
        <TalentHuntSeason3About />
        <TalentHuntSeason3Registration />
        <TalentHuntSeason3Details />
      </div>
    </>
  )
}
