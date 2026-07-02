import { Metadata } from 'next'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import PakiansEventsHero from '@/components/pakians-events/PakiansEventsHero'
import PakiansEventsContent from '@/components/pakians-events/PakiansEventsContent'

export const metadata: Metadata = generatePageMetadata({
  title: 'Pakians Events',
  description:
    'Academic and co-curricular exposure at Pak Wattan — national symposiums, MUN, declamation competitions, youth summits, business pitch events, and leadership conferences.',
  keywords:
    'pakians events, pak wattan events, MPMUN, declamation competition, umeed youth summit, fakhar-e-hazara, havelian, abbottabad',
  path: '/pakians-events',
})

export default function PakiansEventsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Pakians Events', url: 'https://pakwattan.edu.pk/pakians-events' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <PakiansEventsHero />
        <PakiansEventsContent />
      </div>
    </>
  )
}
