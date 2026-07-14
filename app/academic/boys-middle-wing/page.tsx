import { Metadata } from 'next'
import AcademicWingPage from '@/components/academic/shared/AcademicWingPage'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { getAcademicWingBySlug } from '@/lib/academic-wings'

const wing = getAcademicWingBySlug('boys-middle-wing')

export const dynamic = 'force-dynamic'

export const metadata: Metadata = generatePageMetadata({
  title: wing.seo.title,
  description: wing.seo.description,
  keywords: wing.seo.keywords,
  path: wing.path,
})

export default async function BoysMiddleWingPage() {
  return <AcademicWingPage wing={wing} />
}
