import HeroSection from '@/components/home/HeroSection'
import TopNewsMarquee from '@/components/home/TopNewsMarquee'
import BreakingNewsSidebar from '@/components/home/BreakingNewsSidebar'
import WelcomeMessage from '@/components/home/WelcomeMessage'
import DiscoverWonders from '@/components/home/DiscoverWonders'
import SSCBISE2024_25 from '@/components/home/SSCBISE2024_25'
import AnnualDistributionCeremony from '@/components/home/AnnualDistributionCeremony'
import HSSCToppers from '@/components/home/HSSCToppers'
import UmrahTickets from '@/components/home/UmrahTickets'
import HajjTickets from '@/components/home/HajjTickets'
import LaptopDistribution from '@/components/home/LaptopDistribution'
import HonorableFounders from '@/components/home/HonorableFounders'
import Achievements from '@/components/home/Achievements'
import GrowthOverYears from '@/components/home/GrowthOverYears'
import NewsAndEvents from '@/components/home/NewsAndEvents'
import FooterCTA from '@/components/home/FooterCTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top News Marquee */}
      <TopNewsMarquee />
      
      {/* Hero Section with Breaking News and Banner Video */}
      <HeroSection />
      
      {/* Breaking News Sidebar */}
      <BreakingNewsSidebar />
      
      {/* Welcome Message */}
      <WelcomeMessage />
      
      {/* Discover the Wonders of Pak Wattan */}
      <DiscoverWonders />
      
      {/* SSC BISE Results 2024-25 */}
      <SSCBISE2024_25 />
      
      {/* Annual Distribution Ceremony 2024-25 */}
      <AnnualDistributionCeremony />
      
      {/* HSSC Toppers */}
      <HSSCToppers />
      
      {/* Umrah Tickets */}
      <UmrahTickets />
      
      {/* Hajj Tickets */}
      <HajjTickets />
      
      {/* Laptop Distribution */}
      <LaptopDistribution />
      
      {/* Our Honorable Founders */}
      <HonorableFounders />
      
      {/* Our Achievements */}
      <Achievements />
      
      {/* Growth Over Years */}
      <GrowthOverYears />
      
      {/* News and Events */}
      <NewsAndEvents />
      
      {/* Footer CTA */}
      <FooterCTA />
    </div>
  )
}
