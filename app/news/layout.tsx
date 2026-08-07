import { Metadata } from 'next'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'News & Announcements',
  description:
    'Stay updated with the latest news, announcements, and campus notices from Pak Wattan School & College of Sciences, Havelian.',
  keywords:
    'news, pak wattan news, school news, announcements, havelian school news, pak wattan updates',
  path: '/news',
})

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

