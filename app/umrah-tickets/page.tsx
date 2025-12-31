import { Metadata } from 'next'
import UmrahTicketsHero from '@/components/umrah-tickets/UmrahTicketsHero'
import UmrahTicketsDetails from '@/components/umrah-tickets/UmrahTicketsDetails'
import UmrahTicketsRecipients from '@/components/umrah-tickets/UmrahTicketsRecipients'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Umrah Tickets',
  description: 'Pak Wattan School & College of Sciences Umrah tickets program. View recipients and details of our Umrah tickets initiative for students and community.',
  keywords: 'umrah tickets, pak wattan umrah, hajj umrah program, religious education, pak wattan religious programs',
  path: '/umrah-tickets',
})

export default function UmrahTickets() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Umrah Tickets', url: 'https://pakwattan.edu.pk/umrah-tickets' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <UmrahTicketsHero />
        <UmrahTicketsDetails />
        <UmrahTicketsRecipients />
      </div>
    </>
  )
}
