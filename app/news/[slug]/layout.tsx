import { Metadata } from 'next'
import { generateArticleMetadata } from '@/lib/seo/metadata'

// This will be enhanced with dynamic metadata in the page component
export const metadata: Metadata = generateArticleMetadata({
  title: 'News Article',
  description: 'Read the latest news article from Pak Wattan School & College of Sciences.',
  keywords: 'news, pak wattan news, school news',
  path: '/news',
})

export default function NewsDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

