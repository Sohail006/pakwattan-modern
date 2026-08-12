// Above-fold components - load immediately
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import TopNewsMarquee from '@/components/home/TopNewsMarquee'
import HeroSection from '@/components/home/HeroSection'
import HeroQuickLinks from '@/components/home/HeroQuickLinks'
import BreakingNewsSidebar from '@/components/home/BreakingNewsSidebar'
import WelcomeMessage from '@/components/home/WelcomeMessage'
import StructuredData from '@/components/seo/StructuredData'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { HOME_FAQS } from '@/lib/constants'
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@/lib/seo/structuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { getHomeReviewSchema, getFeaturedVideoSchemas } from '@/lib/seo/siteSchemas'

export const metadata: Metadata = generatePageMetadata({
  title: 'Pak Wattan School & College of Sciences | Best School in Havelian',
  description:
    'Pak Wattan School & College of Sciences, Havelian — 6th consecutive year as SSC Havelian Circle top school. Quality education, scholarships, Montessori to FSc since 2020.',
  keywords:
    'best school in Havelian, Pak Wattan Havelian, SSC circle topper, FSc college Havelian, scholarships Havelian, Montessori Havelian, Abbottabad board school',
  path: '/',
})

// Below-fold components - lazy load for better performance
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
  const reviewSchema = getHomeReviewSchema()
  const videoSchemas = getFeaturedVideoSchemas()

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <StructuredData data={[breadcrumbSchema, faqSchema, reviewSchema, ...videoSchemas]} />

      <ErrorBoundary>
        <TopNewsMarquee />
      </ErrorBoundary>

      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <HeroQuickLinks />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <BreakingNewsSidebar />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <WelcomeMessage />
      </ErrorBoundary>

      <ErrorBoundary>
        <SSCBISE2024_25Detailed />
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
