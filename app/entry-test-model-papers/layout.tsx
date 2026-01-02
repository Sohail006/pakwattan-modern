import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Model Papers',
  description: 'Download model papers for admission and scholarship tests at Pak Wattan School & College of Sciences. Access PDF model papers for all grades from Grade 6 to Matric.',
  keywords: 'model papers, admission test model papers, scholarship test, entry test model papers, pak wattan test, grade model papers, download model papers PDF',
  path: '/entry-test-model-papers',
})

export default function EntryTestSyllabusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

