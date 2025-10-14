import AboutHero from '@/components/about/AboutHero'
import BackgroundHistory from '@/components/about/BackgroundHistory'
import VisionMission from '@/components/about/VisionMission'
import Faculty from '@/components/about/Faculty'
import StaffEntryTest from '@/components/about/StaffEntryTest'
import PrizeDistribution from '@/components/about/PrizeDistribution'
import Admissions from '@/components/about/Admissions'
import WithdrawalPolicy from '@/components/about/WithdrawalPolicy'
import GrowthChart from '@/components/about/GrowthChart'
import DirectorMessage from '@/components/about/DirectorMessage'
import PrincipalMessage from '@/components/about/PrincipalMessage'

export const metadata = {
  title: 'About Us - Pak Wattan School & College of Sciences',
  description: 'Learn about Pak Wattan School & College of Sciences - our history, vision, mission, faculty, and commitment to providing quality education in Havelian, KPK.',
  keywords: 'about pak wattan, school history, vision mission, faculty, havelian school, kpk education',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <BackgroundHistory />
      <VisionMission />
      <Faculty />
      <StaffEntryTest />
      <PrizeDistribution />
      <Admissions />
      <WithdrawalPolicy />
      <GrowthChart />
      <DirectorMessage />
      <PrincipalMessage />
    </div>
  )
}
