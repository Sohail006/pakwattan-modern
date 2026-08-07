'use client'

import PageHero from '@/components/ui/PageHero'
import { SCHOOL_INFO } from '@/lib/constants'

const VideoGalleryHero = () => {
  return (
    <PageHero
      title="School life in motion"
      description="Events, performances, and campus stories — watch how Pakians learn, lead, and celebrate together."
      imageSrc="/images/video-gallery/video-gallery-hero.jpg"
      imageAlt="Video highlights from Pak Wattan School & College of Sciences"
      primaryCta={{
        label: 'Watch Videos',
        href: '#video-gallery',
        ariaLabel: 'Scroll to video gallery',
      }}
      secondaryCta={{
        label: 'YouTube Channel',
        href: SCHOOL_INFO.contact.socialMedia.youtube,
        external: true,
        ariaLabel: 'Open Pak Wattan YouTube channel in a new tab',
      }}
    />
  )
}

export default VideoGalleryHero
