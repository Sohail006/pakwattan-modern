import VideoGalleryHero from '@/components/video-gallery/VideoGalleryHero'
import VideoGalleryVideos from '@/components/video-gallery/VideoGalleryVideos'
import VideoGalleryCategories from '@/components/video-gallery/VideoGalleryCategories'
import LatestVideos from '@/components/video-gallery/LatestVideos'

export default function VideoGallery() {
  return (
    <div className="min-h-screen">
      <VideoGalleryHero />
      <LatestVideos />
      <VideoGalleryVideos />
      <VideoGalleryCategories />
    </div>
  )
}
