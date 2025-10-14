import HajjTicketsHero from '@/components/hajj-tickets/HajjTicketsHero'
import HajjTicketsDetails from '@/components/hajj-tickets/HajjTicketsDetails'
import HajjTicketsRecipients from '@/components/hajj-tickets/HajjTicketsRecipients'

export default function HajjTickets() {
  return (
    <div className="min-h-screen">
      <HajjTicketsHero />
      <HajjTicketsDetails />
      <HajjTicketsRecipients />
    </div>
  )
}
