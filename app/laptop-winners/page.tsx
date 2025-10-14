import LaptopWinnersHero from '@/components/laptop-winners/LaptopWinnersHero'
import LaptopWinnersDetails from '@/components/laptop-winners/LaptopWinnersDetails'
import LaptopWinnersRecipients from '@/components/laptop-winners/LaptopWinnersRecipients'

export default function LaptopWinners() {
  return (
    <div className="min-h-screen">
      <LaptopWinnersHero />
      <LaptopWinnersDetails />
      <LaptopWinnersRecipients />
    </div>
  )
}
