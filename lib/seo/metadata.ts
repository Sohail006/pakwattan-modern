import { Metadata } from 'next'

export interface PageMetadata {
  title: string
  description: string
  keywords?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

const SITE_NAME = 'Pak Wattan School & College of Sciences'
const SITE_URL = 'https://pakwattan.edu.pk'
const DEFAULT_IMAGE = '/images/logo/logo_150x150.png'
const DEFAULT_KEYWORDS = 'Pak Wattan, Havelian school, Abbottabad education, KPK schools, best school in Pakistan, quality education'

/**
 * Generates complete metadata for a page
 */
export function generateMetadata({
  title,
  description,
  keywords,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: PageMetadata): Metadata {
  const fullTitle = path ? `${title} - ${SITE_NAME}` : title
  const url = path ? `${SITE_URL}${path}` : SITE_URL
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return {
    title: fullTitle,
    description,
    keywords: keywords || DEFAULT_KEYWORDS,
    authors: [{ name: author || SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Generates metadata for article/blog pages
 */
export function generateArticleMetadata({
  title,
  description,
  keywords,
  path,
  image,
  publishedTime,
  modifiedTime,
  author,
}: Omit<PageMetadata, 'type'>): Metadata {
  return generateMetadata({
    title,
    description,
    keywords,
    path,
    image,
    type: 'article',
    publishedTime,
    modifiedTime,
    author,
  })
}

