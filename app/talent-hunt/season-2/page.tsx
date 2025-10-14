import TalentHuntSeason2Hero from '@/components/talent-hunt/season-2/TalentHuntSeason2Hero'
import TalentHuntSeason2Video from '@/components/talent-hunt/season-2/TalentHuntSeason2Video'
import TalentHuntSeason2Details from '@/components/talent-hunt/season-2/TalentHuntSeason2Details'
import TalentHuntSeason2Contests from '@/components/talent-hunt/season-2/TalentHuntSeason2Contests'
import TalentHuntSeason2Registration from '@/components/talent-hunt/season-2/TalentHuntSeason2Registration'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Talent Hunt Season-II - Pak Wattan School & College of Sciences',
  description: 'Talent Hunt Season-II - Expanded to district level in 2025-26, featuring 10 exciting contest streams.',
  keywords: 'talent hunt season 2, pak wattan, district level, 10 contests, 2025-26',
}

export default function TalentHuntSeason2Page() {
  return (
    <div className="min-h-screen">
      <TalentHuntSeason2Hero />
      <TalentHuntSeason2Video />
      <TalentHuntSeason2Details />
      <TalentHuntSeason2Contests />
      <TalentHuntSeason2Registration />
    </div>
  )
}
