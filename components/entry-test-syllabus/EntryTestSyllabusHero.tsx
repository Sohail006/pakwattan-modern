'use client'

import PageHero from '@/components/ui/PageHero'

const EntryTestSyllabusHero = () => {
  return (
    <PageHero
      title="Test model papers"
      description="Prepare for admission and scholarship tests with grade-wise model papers you can view online or download."
      imageSrc="/images/entry-test/entry-test-hero.jpg"
      imageAlt="Students preparing with Pak Wattan entry test model papers"
      primaryCta={{
        label: 'View Model Papers',
        href: '#syllabus-viewer',
        ariaLabel: 'Browse test model papers',
      }}
      secondaryCta={{
        label: 'Apply for Admission',
        href: '/admission',
      }}
    />
  )
}

export default EntryTestSyllabusHero
