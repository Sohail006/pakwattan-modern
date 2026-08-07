'use client'

import PageHero from '@/components/ui/PageHero'

const PakiansCoachingAcademyHero = () => {
  return (
    <PageHero
      title="Pakians Coaching Academy (PCA)"
      description="Focused coaching that helps students strengthen concepts, sharpen exams skills, and chase academic goals with confidence."
      imageSrc="/images/pakians-coaching-academy/pca-hero.jpg/BannerImage1.jpg"
      imageAlt="Pakians Coaching Academy learning environment"
      primaryCta={{
        label: 'Explore Programs',
        href: '#pca-programs',
      }}
      secondaryCta={{
        label: 'Contact Us',
        href: '/contact',
      }}
    />
  )
}

export default PakiansCoachingAcademyHero
