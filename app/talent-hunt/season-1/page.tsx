import TalentHuntSeason1Hero from '@/components/talent-hunt/season-1/TalentHuntSeason1Hero'
import TalentHuntSeason1Details from '@/components/talent-hunt/season-1/TalentHuntSeason1Details'
import TalentHuntSeason1Results from '@/components/talent-hunt/season-1/TalentHuntSeason1Results'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talent Hunt Season-I - Pak Wattan School & College of Sciences',
  description: 'Talent Hunt Season-I with Pak Wattan - The remarkable success of Season-I featured talented participants exclusively from Pak Wattan.',
  keywords: 'talent hunt season 1, pak wattan, school competition, student talent, 2024-25',
}

export default function TalentHuntSeason1Page() {
  return (
    <div className="min-h-screen">
      <TalentHuntSeason1Hero />
      <TalentHuntSeason1Details />
      <TalentHuntSeason1Results />
    </div>
  )
}
