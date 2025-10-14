import GoldMedalsHero from '@/components/gold-medals/GoldMedalsHero'
import GoldMedalsDetails from '@/components/gold-medals/GoldMedalsDetails'
import GoldMedalsRecipients from '@/components/gold-medals/GoldMedalsRecipients'

export default function GoldMedals() {
  return (
    <div className="min-h-screen">
      <GoldMedalsHero />
      <GoldMedalsDetails />
      <GoldMedalsRecipients />
    </div>
  )
}
