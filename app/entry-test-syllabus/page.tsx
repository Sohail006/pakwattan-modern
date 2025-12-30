'use client'

import EntryTestSyllabusHero from '@/components/entry-test-syllabus/EntryTestSyllabusHero'
import GradeSyllabusTable from '@/components/entry-test-syllabus/GradeSyllabusTable'
import RelatedInfo from '@/components/entry-test-syllabus/RelatedInfo'

export default function EntryTestSyllabusPage() {
  return (
    <div className="min-h-screen">
      <EntryTestSyllabusHero />
      <div className="border-t border-gray-200"></div>
      <GradeSyllabusTable />
      <div className="border-t border-gray-200"></div>
      <RelatedInfo />
    </div>
  )
}

