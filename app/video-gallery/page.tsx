import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import VideoGalleryHero from '@/components/video-gallery/VideoGalleryHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const LatestVideos = dynamic(() => import('@/components/video-gallery/LatestVideos'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const VideoGalleryVideos = dynamic(() => import('@/components/video-gallery/VideoGalleryVideos'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const VideoGalleryCategories = dynamic(() => import('@/components/video-gallery/VideoGalleryCategories'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
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
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <VideoGalleryHero />
        <LatestVideos />
        <VideoGalleryVideos />
        <VideoGalleryCategories />
      </div>
    </>
  )
}
