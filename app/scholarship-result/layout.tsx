import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Scholarship Result Announcement - Good Will Scholarship Test 2026-27',
  description: 'Scholarship Result will be announced on 28th March 2026. Check your Good Will Scholarship Test 2026-27 results online. All applicants will be notified via email and SMS.',
  keywords: 'scholarship result, good will scholarship test 2026-27, scholarship test result, pak wattan scholarship result, result announcement, march 28 2026',
  path: '/scholarship-result',
})

export default function ScholarshipResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

