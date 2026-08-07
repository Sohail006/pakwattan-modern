'use client'

import PageHero from '@/components/ui/PageHero'

const PhotoGalleryHero = () => {
  return (
    <PageHero
      title="Moments that matter"
      description="Ceremonies, achievements, and daily campus life — captured across our boys and girls campuses."
      imageSrc="/images/photo-gallery/photo-gallery-hero.jpg"
      imageAlt="Photo gallery from Pak Wattan School & College of Sciences"
      primaryCta={{
        label: 'Browse Photos',
        href: '#photo-gallery',
        ariaLabel: 'Scroll to photo gallery',
      }}
      secondaryCta={{
        label: 'Video Gallery',
        href: '/video-gallery',
      }}
    />
  )
}

export default PhotoGalleryHero
