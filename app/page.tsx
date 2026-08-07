// Above-fold components - load immediately
import TopNewsMarquee from '@/components/home/TopNewsMarquee'
import HeroSection from '@/components/home/HeroSection'
import BreakingNewsSidebar from '@/components/home/BreakingNewsSidebar'
import WelcomeMessage from '@/components/home/WelcomeMessage'
import StructuredData from '@/components/seo/StructuredData'
import { HOME_FAQS } from '@/lib/constants'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo/structuredData'

// Below-fold components - lazy load for better performance
import dynamic from 'next/dynamic'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

const Achievements = dynamic(() => import('@/components/home/Achievements'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const TrustBadges = dynamic(() => import('@/components/home/TrustBadges'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const GoogleRating = dynamic(() => import('@/components/home/GoogleRating'), {
  loading: () => <SkeletonLoader variant="card" className="my-6 h-40" />
})

const DiscoverWonders = dynamic(() => import('@/components/home/DiscoverWonders'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const SSCBISE2024_25Detailed = dynamic(() => import('@/components/home/SSCBISE2024_25Detailed'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const AnnualDistributionCeremony2024_25 = dynamic(() => import('@/components/home/AnnualDistributionCeremony2024_25'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const BISEHSSCTopers = dynamic(() => import('@/components/home/BISEHSSCTopers'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const BiseResults = dynamic(() => import('@/components/home/BiseResults'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const HSSCToppers = dynamic(() => import('@/components/home/HSSCToppers'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const UmrahTickets = dynamic(() => import('@/components/home/UmrahTickets'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const HajjTickets = dynamic(() => import('@/components/home/HajjTickets'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const LaptopDistribution = dynamic(() => import('@/components/home/LaptopDistribution'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const AnnualDistributionCeremony = dynamic(() => import('@/components/home/AnnualDistributionCeremony'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const GrowthOverYears = dynamic(() => import('@/components/home/GrowthOverYears'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const TestimonialsSlider = dynamic(() => import('@/components/home/TestimonialsSlider'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const ParentReviews = dynamic(() => import('@/components/home/ParentReviews'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const FAQSection = dynamic(() => import('@/components/home/FAQSection'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const NewsAndEvents = dynamic(() => import('@/components/home/NewsAndEvents'), {
  loading: () => <SkeletonLoader variant="section" className="my-6" />
})

const FooterCTA = dynamic(() => import('@/components/home/FooterCTA'), {
  loading: () => <SkeletonLoader variant="card" className="my-6 h-32" />
})

const SITE_URL = 'https://pakwattan.edu.pk'

export default function Home() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
  ])
  const faqSchema = generateFAQSchema(HOME_FAQS)

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <StructuredData data={[breadcrumbSchema, faqSchema]} />

      <ErrorBoundary>
        <TopNewsMarquee />
      </ErrorBoundary>

      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <BreakingNewsSidebar />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <WelcomeMessage />
      </ErrorBoundary>

      {/* Trust & social proof early */}
      <ErrorBoundary>
        <Achievements />
      </ErrorBoundary>

      <ErrorBoundary>
        <TrustBadges />
      </ErrorBoundary>

      <ErrorBoundary>
        <GoogleRating />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <DiscoverWonders />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <SSCBISE2024_25Detailed />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <AnnualDistributionCeremony2024_25 />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <BISEHSSCTopers />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <BiseResults />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <HSSCToppers />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <UmrahTickets />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <HajjTickets />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LaptopDistribution />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <AnnualDistributionCeremony />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <GrowthOverYears />
      </ErrorBoundary>

      <ErrorBoundary>
        <TestimonialsSlider />
      </ErrorBoundary>

      <ErrorBoundary>
        <ParentReviews />
      </ErrorBoundary>

      <ErrorBoundary>
        <FAQSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <NewsAndEvents />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <FooterCTA />
      </ErrorBoundary>
    </div>
  )
}
