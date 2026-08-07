import { Metadata } from 'next'
import AboutHero from '@/components/about/AboutHero'
import AboutTabs from '@/components/about/AboutTabs'
import Statistics from '@/components/ui/Statistics'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { getLeadershipPersonSchemas } from '@/lib/seo/siteSchemas'

const ABOUT_STATS = [
  { label: 'Established', end: 2020, displayOverride: '2020' },
  { label: 'Students', end: 3000, suffix: '+' },
  { label: 'Awards', end: 1100, suffix: '+' },
  { label: 'Campuses', end: 4 },
]

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us — History, Vision, Faculty & Leadership',
  description:
    'Discover Pak Wattan School & College of Sciences: our history since 2020, vision and mission, faculty departments, leadership messages, and Havelian Circle achievements.',
  keywords:
    'about Pak Wattan, Pak Wattan history, school vision mission, faculty Havelian, leadership messages, school achievements KPK',
  path: '/about',
})

export default function AboutPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'About Us', url: 'https://pakwattan.edu.pk/about' },
  ])
  const people = getLeadershipPersonSchemas()

  return (
    <>
      <StructuredData data={[breadcrumbs, ...people]} />
      <div className="min-h-screen pb-16 md:pb-0">
        <AboutHero />
        <Statistics
          items={ABOUT_STATS}
          title="Pak Wattan at a Glance"
          subtitle="Trusted by families across Havelian and beyond"
          variant="light"
        />
        <AboutTabs />
      </div>
    </>
  )
}
