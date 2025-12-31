import { Metadata } from 'next'
import GoldMedalsHero from '@/components/gold-medals/GoldMedalsHero'
import GoldMedalsDetails from '@/components/gold-medals/GoldMedalsDetails'
import GoldMedalsRecipients from '@/components/gold-medals/GoldMedalsRecipients'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Gold Medals',
  description: 'View the list of gold medal winners at Pak Wattan School & College of Sciences. Students who achieved gold medals for their exceptional academic performance.',
  keywords: 'gold medals, pak wattan gold medals, academic excellence, top students, pak wattan achievements',
  path: '/gold-medals',
})

export default function GoldMedals() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Gold Medals', url: 'https://pakwattan.edu.pk/gold-medals' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <GoldMedalsHero />
        <GoldMedalsDetails />
        <GoldMedalsRecipients />
      </div>
    </>
  )
}
