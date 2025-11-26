// Above-fold components - load immediately
import TopNewsMarquee from '@/components/home/TopNewsMarquee'
import HeroSection from '@/components/home/HeroSection'
import BreakingNewsSidebar from '@/components/home/BreakingNewsSidebar'
import WelcomeMessage from '@/components/home/WelcomeMessage'

// Below-fold components - lazy load for better performance
import dynamic from 'next/dynamic'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

const DiscoverWonders = dynamic(() => import('@/components/home/DiscoverWonders'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const SSCBISE2024_25Detailed = dynamic(() => import('@/components/home/SSCBISE2024_25Detailed'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const AnnualDistributionCeremony2024_25 = dynamic(() => import('@/components/home/AnnualDistributionCeremony2024_25'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const BISEHSSCTopers = dynamic(() => import('@/components/home/BISEHSSCTopers'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const Achievements = dynamic(() => import('@/components/home/Achievements'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const VideoMessages = dynamic(() => import('@/components/home/VideoMessages'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const BiseResults = dynamic(() => import('@/components/home/BiseResults'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const SSCBISE2024_25 = dynamic(() => import('@/components/home/SSCBISE2024_25'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const TopersHSSC = dynamic(() => import('@/components/home/TopersHSSC'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const HSSCToppers = dynamic(() => import('@/components/home/HSSCToppers'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const UmrahTickets = dynamic(() => import('@/components/home/UmrahTickets'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const HajjTickets = dynamic(() => import('@/components/home/HajjTickets'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const LaptopDistribution = dynamic(() => import('@/components/home/LaptopDistribution'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const AnnualDistribution = dynamic(() => import('@/components/home/AnnualDistribution'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const AnnualDistributionCeremony = dynamic(() => import('@/components/home/AnnualDistributionCeremony'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const HonorableFounders = dynamic(() => import('@/components/home/HonorableFounders'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const GrowthOverYears = dynamic(() => import('@/components/home/GrowthOverYears'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const NewsAndEvents = dynamic(() => import('@/components/home/NewsAndEvents'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const FooterCTA = dynamic(() => import('@/components/home/FooterCTA'), {
  loading: () => <SkeletonLoader variant="card" height="h-32" className="my-8" />
})
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Top News Marquee */}
      <ErrorBoundary>
        <TopNewsMarquee />
      </ErrorBoundary>

      {/* Hero Section with Video Background and Quick Links */}
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>

      
      {/* Breaking News Sidebar */}
      <ErrorBoundary>
        <BreakingNewsSidebar />
      </ErrorBoundary>
      
      {/* Welcome Message */}
      <ErrorBoundary>
        <WelcomeMessage />
      </ErrorBoundary>
      
      {/* Discover the Wonders of Pak Wattan */}
      <ErrorBoundary>
        <DiscoverWonders />
      </ErrorBoundary>
      
      {/* SSC BISE Results 2024-25 Detailed */}
      <ErrorBoundary>
        <SSCBISE2024_25Detailed />
      </ErrorBoundary>
      
      {/* Annual Distribution Ceremony 2024-25 */}
      <ErrorBoundary>
        <AnnualDistributionCeremony2024_25 />
      </ErrorBoundary>
      
      {/* BISE HSSC Toppers */}
      <ErrorBoundary>
        <BISEHSSCTopers />
      </ErrorBoundary>
      
      {/* Our Achievements */}
      <ErrorBoundary>
        <Achievements />
      </ErrorBoundary>
      
      {/* Video Messages */}
      <ErrorBoundary>
        <VideoMessages />
      </ErrorBoundary>
      
      {/* BISE Results */}
      <ErrorBoundary>
        <BiseResults />
      </ErrorBoundary>
      
      {/* SSC BISE Results 2024-25 */}
      <ErrorBoundary>
        <SSCBISE2024_25 />
      </ErrorBoundary>
      
      {/* Topers HSSC */}
      <ErrorBoundary>
        <TopersHSSC />
      </ErrorBoundary>
      
      {/* HSSC Toppers */}
      <ErrorBoundary>
        <HSSCToppers />
      </ErrorBoundary>
      
      {/* Umrah Tickets */}
      <ErrorBoundary>
        <UmrahTickets />
      </ErrorBoundary>
      
      {/* Hajj Tickets */}
      <ErrorBoundary>
        <HajjTickets />
      </ErrorBoundary>
      
      {/* Laptop Distribution */}
      <ErrorBoundary>
        <LaptopDistribution />
      </ErrorBoundary>
      
      {/* Annual Distribution */}
      <ErrorBoundary>
        <AnnualDistribution />
      </ErrorBoundary>
      
      {/* Annual Distribution Ceremony */}
      <ErrorBoundary>
        <AnnualDistributionCeremony />
      </ErrorBoundary>
      
      {/* Our Honorable Founders */}
      <ErrorBoundary>
        <HonorableFounders />
      </ErrorBoundary>
      
      {/* Growth Over Years */}
      <ErrorBoundary>
        <GrowthOverYears />
      </ErrorBoundary>
      
      {/* News and Events */}
      <ErrorBoundary>
        <NewsAndEvents />
      </ErrorBoundary>
      
      {/* Footer CTA */}
      <ErrorBoundary>
        <FooterCTA />
      </ErrorBoundary>
    </div>
  )
}
