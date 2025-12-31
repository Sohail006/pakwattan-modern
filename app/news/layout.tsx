import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'News',
  description: 'Stay updated with the latest news, events, and announcements from Pak Wattan School & College of Sciences. Read about school activities, achievements, and important updates.',
  keywords: 'news, pak wattan news, school news, announcements, events, havelian school news, pak wattan updates',
  path: '/news',
})

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

