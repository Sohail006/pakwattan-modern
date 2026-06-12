import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import TalentHuntSeason3Hero from '@/components/talent-hunt/season-3/TalentHuntSeason3Hero'
import StructuredData from '@/components/seo/StructuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

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
  title: 'Talent Hunt Season 3',
  description:
    'Talent Hunt with Pak Wattan Season 3 — DREAM • DARE • DEVELOP. District-wide literary, science, entrepreneurship and sports competitions. Grand opening 25 July 2026 at Jalal Baba Auditorium, Abbottabad.',
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
        <TalentHuntSeason3Registration />
        <TalentHuntSeason3Details />
      </div>
    </>
  )
}
