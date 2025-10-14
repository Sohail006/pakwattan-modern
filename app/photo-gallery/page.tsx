import PhotoGalleryHero from '@/components/photo-gallery/PhotoGalleryHero'
import PhotoGalleryPhotos from '@/components/photo-gallery/PhotoGalleryPhotos'
import PhotoGalleryCategories from '@/components/photo-gallery/PhotoGalleryCategories'

export default function PhotoGallery() {
  return (
    <div className="min-h-screen">
      <PhotoGalleryHero />
      <PhotoGalleryPhotos />
      <PhotoGalleryCategories />
    </div>
  )
}
