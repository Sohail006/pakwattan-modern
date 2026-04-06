import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Scholarship Test Result 2026-27 — Pak Wattan Havelian',
  description:
    'Pak Wattan School & College of Sciences Havelian: official Good Will scholarship test result 2026-27. Class-wise merit lists (1st–9th), roll numbers, and marks — published on the school website for students and parents in Abbottabad & KPK.',
  keywords:
    'Pak Wattan scholarship result 2026-27, Pak Wattan School Havelian scholarship result, scholarship test result 2026 27, Good Will scholarship test result, Pak Wattan College Havelian merit list, my school scholarship result Havelian, Abbottabad school scholarship result, KPK scholarship test result, class wise scholarship result 1st to 9th, Pak Wattan official result',
  path: '/scholarship-result',
})

export default function ScholarshipResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

