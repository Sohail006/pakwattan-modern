import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Test Syllabus',
  description: 'Download test syllabi for admission and scholarship tests at Pak Wattan School & College of Sciences. Access PDF syllabi for all grades from Grade 6 to Matric.',
  keywords: 'test syllabus, admission test syllabus, scholarship test, entry test syllabus, pak wattan test, grade syllabus, download syllabus PDF',
  path: '/entry-test-syllabus',
})

export default function EntryTestSyllabusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

