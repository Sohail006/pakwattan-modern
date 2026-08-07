import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import VideoGalleryHero from '@/components/video-gallery/VideoGalleryHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { getFeaturedVideoSchemas } from '@/lib/seo/siteSchemas'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

const VideoGalleryGrid = dynamic(() => import('@/components/video-gallery/VideoGalleryGrid'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />,
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Video Gallery',
  description: 'Watch videos from Pak Wattan School & College of Sciences including events, ceremonies, student performances, and school activities.',
  keywords: 'video gallery, pak wattan videos, school videos, events videos, student performances, havelian school videos',
  path: '/video-gallery',
})

export default function VideoGallery() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Video Gallery', url: 'https://pakwattan.edu.pk/video-gallery' },
  ])
  const videos = getFeaturedVideoSchemas()
  return (
    <>
      <StructuredData data={[breadcrumbs, ...videos]} />
      <div className="min-h-screen">
        <VideoGalleryHero />
        <VideoGalleryGrid />
      </div>
    </>
  )
}
