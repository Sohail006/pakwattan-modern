import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import PhotoGalleryHero from '@/components/photo-gallery/PhotoGalleryHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const PhotoGalleryPhotos = dynamic(() => import('@/components/photo-gallery/PhotoGalleryPhotos'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const PhotoGalleryCategories = dynamic(() => import('@/components/photo-gallery/PhotoGalleryCategories'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Photo Gallery',
  description: 'Browse photos from Pak Wattan School & College of Sciences including events, ceremonies, student activities, and school life.',
  keywords: 'photo gallery, pak wattan photos, school photos, events photos, student activities, havelian school photos',
  path: '/photo-gallery',
})

export default function PhotoGallery() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Photo Gallery', url: 'https://pakwattan.edu.pk/photo-gallery' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <PhotoGalleryHero />
        <PhotoGalleryPhotos />
        <PhotoGalleryCategories />
      </div>
    </>
  )
}
