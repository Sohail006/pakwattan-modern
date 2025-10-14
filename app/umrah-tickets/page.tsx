import UmrahTicketsHero from '@/components/umrah-tickets/UmrahTicketsHero'
import UmrahTicketsDetails from '@/components/umrah-tickets/UmrahTicketsDetails'
import UmrahTicketsRecipients from '@/components/umrah-tickets/UmrahTicketsRecipients'

export default function UmrahTickets() {
  return (
    <div className="min-h-screen">
      <UmrahTicketsHero />
      <UmrahTicketsDetails />
      <UmrahTicketsRecipients />
    </div>
  )
}
