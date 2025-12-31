'use client'

import EntryTestSyllabusHero from '@/components/entry-test-syllabus/EntryTestSyllabusHero'
import GradeSyllabusTable from '@/components/entry-test-syllabus/GradeSyllabusTable'
import RelatedInfo from '@/components/entry-test-syllabus/RelatedInfo'
import StructuredData from '@/components/seo/StructuredData'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export default function EntryTestSyllabusPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Test Syllabus', url: 'https://pakwattan.edu.pk/entry-test-syllabus' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <EntryTestSyllabusHero />
        <div className="border-t border-gray-200"></div>
        <GradeSyllabusTable />
        <div className="border-t border-gray-200"></div>
        <RelatedInfo />
      </div>
    </>
  )
}

