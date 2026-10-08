import { Metadata } from 'next'
import NewsDetailClient from '@/components/news/NewsDetailClient'
import StructuredData from '@/components/seo/StructuredData'
import { getNewsBySlug } from '@/lib/api/news'
import { SITE_NAME, SITE_URL, generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo/structuredData'

type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params

  try {
    const item = await getNewsBySlug(slug)
    const description =
      item.description?.trim().slice(0, 160) ||
      `${item.title} — news from Pak Wattan School & College of Sciences, Havelian.`

    return generatePageMetadata({
      title: item.title,
      description,
      keywords: `${item.category || 'school news'}, Pak Wattan news, Havelian school updates`,
      path: `/news/${slug}`,
      image: item.imageUrl || undefined,
      type: 'article',
      publishedTime: item.date,
      modifiedTime: item.updatedAt || item.date,
      imageWidth: 1200,
      imageHeight: 630,
    })
  } catch {
    return generatePageMetadata({
      title: 'News Article',
      description:
        'School news and updates from Pak Wattan School & College of Sciences, Havelian.',
      path: `/news/${slug}`,
      indexable: false,
    })
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = params
  let schemas: object[] = []

  try {
    const item = await getNewsBySlug(slug)
    const pageUrl = `${SITE_URL}/news/${slug}`
    schemas = [
      generateBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: 'News', url: `${SITE_URL}/news` },
        { name: item.title, url: pageUrl },
      ]),
      generateArticleSchema({
        headline: item.title,
        description:
          item.description?.trim().slice(0, 300) ||
          `${item.title} — Pak Wattan School & College of Sciences, Havelian.`,
        image: item.imageUrl || undefined,
        datePublished: item.date,
        dateModified: item.updatedAt || item.date,
        author: { name: SITE_NAME, url: SITE_URL },
        publisher: {
          name: SITE_NAME,
          logo: `${SITE_URL}/images/logo/logo_150x150.png`,
        },
      }),
    ]
  } catch {
    // Client page still renders; skip schema when article is unavailable
  }

  return (
    <>
      {schemas.length > 0 && <StructuredData data={schemas} />}
      <NewsDetailClient />
    </>
  )
}
