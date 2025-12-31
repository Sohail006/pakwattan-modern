import { Metadata } from 'next'
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
import YouTubeVideo from '@/components/about/YouTubeVideo'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about Pak Wattan School & College of Sciences - our history, vision, mission, faculty, and commitment to providing quality education in Havelian, KPK since 2020.',
  keywords: 'about pak wattan, school history, vision mission, faculty, havelian school, kpk education, pak wattan story',
  path: '/about',
})

export default function AboutPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'About Us', url: 'https://pakwattan.edu.pk/about' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
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
        <YouTubeVideo />
        <DirectorMessage />
        <PrincipalMessage />
      </div>
    </>
  )
}
