import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import EntryTestResultHero from '@/components/entry-test-result/EntryTestResultHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const EntryTestResultDetails = dynamic(() => import('@/components/entry-test-result/EntryTestResultDetails'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const EntryTestResultSearch = dynamic(() => import('@/components/entry-test-result/EntryTestResultSearch'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Entry Test Results',
  description: 'Check your entry test results for admission to Pak Wattan School & College of Sciences. Search by roll number or name to view your test results.',
  keywords: 'entry test results, admission test results, test results, pak wattan results, check results, roll number search',
  path: '/entry-test-result',
})

export default function EntryTestResult() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Entry Test Results', url: 'https://pakwattan.edu.pk/entry-test-result' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <EntryTestResultHero />
        <EntryTestResultDetails />
        <EntryTestResultSearch />
      </div>
    </>
  )
}
