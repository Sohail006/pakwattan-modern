import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Scholarship Results Announcement - Good Will Scholarship Test 2026–27',
  description:
    'The date for announcing Good Will Scholarship Test (2026–27) results will be shared soon. When results are published, you can check them on this website. Applicants will be notified by email and SMS.',
  keywords:
    'scholarship results, good will scholarship test 2026-27, scholarship test result, pak wattan scholarship result, result announcement',
  path: '/scholarship-result',
})

export default function ScholarshipResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

