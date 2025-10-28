import WelcomeMessage from '@/components/home/WelcomeMessage'
import NewsAndEvents from '@/components/home/NewsAndEvents'
import DiscoverWonders from '@/components/home/DiscoverWonders'
import HSSCToppers from '@/components/home/HSSCToppers'
import UmrahTickets from '@/components/home/UmrahTickets'
import HajjTickets from '@/components/home/HajjTickets'
import LaptopDistribution from '@/components/home/LaptopDistribution'
import HonorableFounders from '@/components/home/HonorableFounders'
import GrowthOverYears from '@/components/home/GrowthOverYears'
import FooterCTA from '@/components/home/FooterCTA'
import Achievements from '@/components/home/Achievements'
import VideoMessages from '@/components/home/VideoMessages'
import AnnualDistribution from '@/components/home/AnnualDistribution'
import AnnualDistributionCeremony from '@/components/home/AnnualDistributionCeremony'
import BiseResults from '@/components/home/BiseResults'
import SSCBISE2024_25 from '@/components/home/SSCBISE2024_25'
import TopersHSSC from '@/components/home/TopersHSSC'
import BreakingNewsSidebar from '@/components/home/BreakingNewsSidebar'
import TopNewsMarquee from '@/components/home/TopNewsMarquee'
import HeroSection from '@/components/home/HeroSection'
import SSCBISE2024_25Detailed from '@/components/home/SSCBISE2024_25Detailed'
import AnnualDistributionCeremony2024_25 from '@/components/home/AnnualDistributionCeremony2024_25'
import BISEHSSCTopers from '@/components/home/BISEHSSCTopers'
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top News Marquee */}
      <TopNewsMarquee />

      {/* Hero Section with Video Background and Quick Links */}
      <HeroSection />

      
      {/* Breaking News Sidebar */}
      <BreakingNewsSidebar />
      
      {/* Welcome Message */}
      <WelcomeMessage />
      
      {/* Discover the Wonders of Pak Wattan */}
      <DiscoverWonders />
      
      {/* SSC BISE Results 2024-25 Detailed */}
      <SSCBISE2024_25Detailed />
      
      {/* Annual Distribution Ceremony 2024-25 */}
      <AnnualDistributionCeremony2024_25 />
      
      {/* BISE HSSC Toppers */}
      <BISEHSSCTopers />
      
      {/* Our Achievements */}
      <Achievements />
      
      {/* Video Messages */}
      <VideoMessages />
      
      {/* BISE Results */}
      <BiseResults />
      
      {/* SSC BISE Results 2024-25 */}
      <SSCBISE2024_25 />
      
      {/* Topers HSSC */}
      <TopersHSSC />
      
      {/* HSSC Toppers */}
      <HSSCToppers />
      
      {/* Umrah Tickets */}
      <UmrahTickets />
      
      {/* Hajj Tickets */}
      <HajjTickets />
      
      {/* Laptop Distribution */}
      <LaptopDistribution />
      
      {/* Annual Distribution */}
      <AnnualDistribution />
      
      {/* Annual Distribution Ceremony */}
      <AnnualDistributionCeremony />
      
      {/* Our Honorable Founders */}
      <HonorableFounders />
      
      {/* Growth Over Years */}
      <GrowthOverYears />
      
      {/* News and Events */}
      <NewsAndEvents />
      
     
      
     
                 
      {/* Footer CTA */}
      <FooterCTA />
    </div>
  )
}
