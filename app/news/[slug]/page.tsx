import { Metadata } from 'next'
import NewsDetailClient from '@/components/news/NewsDetailClient'
import { getNewsBySlug } from '@/lib/api/news'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'

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

export default function NewsDetailPage() {
  return <NewsDetailClient />
}
