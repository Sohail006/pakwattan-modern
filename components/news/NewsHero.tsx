'use client'

import PageHero from '@/components/ui/PageHero'

const NewsHero = () => {
  return (
    <PageHero
      title="News & announcements"
      description="Campus updates, results, and important notices from Pak Wattan School & College of Sciences."
      imageSrc="/images/annual-ceremony/7.jpg"
      imageAlt="Pak Wattan community celebrating school achievements"
      primaryCta={{
        label: 'Browse News',
        href: '#news-listing',
        ariaLabel: 'Scroll to news listing',
      }}
      secondaryCta={{
        label: 'Contact Office',
        href: '/contact',
      }}
    />
  )
}

export default NewsHero
