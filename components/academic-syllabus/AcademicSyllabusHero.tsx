'use client'

import PageHero from '@/components/ui/PageHero'

const AcademicSyllabusHero = () => {
  return (
    <PageHero
      title="Academic syllabus"
      description="A structured curriculum from foundations through senior board years — built for clarity, depth, and results."
      imageSrc="/images/academic-syllabus/syllabus-hero.jpg"
      imageAlt="Academic syllabus and learning materials at Pak Wattan"
      primaryCta={{
        label: 'Browse Levels',
        href: '#syllabus-levels',
        ariaLabel: 'Browse syllabus by academic level',
      }}
      secondaryCta={{
        label: 'Model Papers',
        href: '/model-papers',
      }}
    />
  )
}

export default AcademicSyllabusHero
