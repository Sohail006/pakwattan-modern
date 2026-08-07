import StructuredData from '@/components/seo/StructuredData'
import NewsHero from '@/components/news/NewsHero'
import NewsListing from '@/components/news/NewsListing'
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo/structuredData'

export default function NewsPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'News', url: 'https://pakwattan.edu.pk/news' },
  ])
  const webPage = generateWebPageSchema({
    name: 'News & Announcements — Pak Wattan School & College of Sciences',
    description:
      'Latest news, announcements, and updates from Pak Wattan School & College of Sciences, Havelian.',
    url: 'https://pakwattan.edu.pk/news',
  })

  return (
    <>
      <StructuredData data={[breadcrumbs, webPage]} />
      <div className="min-h-screen pb-16 md:pb-0">
        <NewsHero />
        <NewsListing />
      </div>
    </>
  )
}
