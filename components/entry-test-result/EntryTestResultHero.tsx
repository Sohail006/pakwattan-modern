'use client'

import PageHero from '@/components/ui/PageHero'

const EntryTestResultHero = () => {
  return (
    <PageHero
      title="Entry test results"
      description="Check your scores and admission status online using your roll number or registration details."
      imageSrc="/images/entry-test/entry-test-hero.jpg"
      imageAlt="Students checking Pak Wattan entry test results"
      primaryCta={{
        label: 'Check Results',
        href: '#result-search',
        ariaLabel: 'Go to result search',
      }}
      secondaryCta={{
        label: 'Apply for Admission',
        href: '/admission',
      }}
    />
  )
}

export default EntryTestResultHero
