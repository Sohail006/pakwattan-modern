import { Metadata } from 'next'
import HajjTicketsHero from '@/components/hajj-tickets/HajjTicketsHero'
import HajjTicketsDetails from '@/components/hajj-tickets/HajjTicketsDetails'
import HajjTicketsRecipients from '@/components/hajj-tickets/HajjTicketsRecipients'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Hajj Tickets',
  description: 'Pak Wattan School & College of Sciences Hajj tickets program. View recipients and details of our Hajj tickets initiative for students and community.',
  keywords: 'hajj tickets, pak wattan hajj, hajj program, religious education, pak wattan religious programs',
  path: '/hajj-tickets',
})

export default function HajjTickets() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Hajj Tickets', url: 'https://pakwattan.edu.pk/hajj-tickets' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <HajjTicketsHero />
        <HajjTicketsDetails />
        <HajjTicketsRecipients />
      </div>
    </>
  )
}
