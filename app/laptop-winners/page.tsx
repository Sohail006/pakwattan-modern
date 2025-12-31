import { Metadata } from 'next'
import LaptopWinnersHero from '@/components/laptop-winners/LaptopWinnersHero'
import LaptopWinnersDetails from '@/components/laptop-winners/LaptopWinnersDetails'
import LaptopWinnersRecipients from '@/components/laptop-winners/LaptopWinnersRecipients'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Laptop Winners',
  description: 'View the list of laptop winners at Pak Wattan School & College of Sciences. Students who received laptops for their outstanding academic performance.',
  keywords: 'laptop winners, pak wattan laptops, student laptops, academic achievement, pak wattan awards',
  path: '/laptop-winners',
})

export default function LaptopWinners() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Laptop Winners', url: 'https://pakwattan.edu.pk/laptop-winners' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <LaptopWinnersHero />
        <LaptopWinnersDetails />
        <LaptopWinnersRecipients />
      </div>
    </>
  )
}
