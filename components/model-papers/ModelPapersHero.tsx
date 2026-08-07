'use client'

import PageHero from '@/components/ui/PageHero'

const ModelPapersHero = () => {
  return (
    <PageHero
      title="Model papers — Session 2025–26"
      description="Practice papers aligned with the latest curriculum and examination patterns to sharpen board readiness."
      imageSrc="/images/academic-syllabus/syllabus-hero.jpg"
      imageAlt="Model papers for exam preparation at Pak Wattan"
      primaryCta={{
        label: 'View Papers',
        href: '#model-papers',
        ariaLabel: 'Browse model papers',
      }}
      secondaryCta={{
        label: 'Academic Syllabus',
        href: '/academic-syllabus',
      }}
    />
  )
}

export default ModelPapersHero
