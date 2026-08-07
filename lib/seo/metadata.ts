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
  /** Set false to noindex/nofollow (auth, thank-you, etc.) */
  indexable?: boolean
  /** Override Open Graph / Twitter image dimensions when known */
  imageWidth?: number
  imageHeight?: number
}

export const SITE_NAME = 'Pak Wattan School & College of Sciences'
export const SITE_URL = 'https://pakwattan.edu.pk'
export const DEFAULT_IMAGE = '/images/logo/logo_150x150.png'
export const DEFAULT_KEYWORDS =
  'Pak Wattan, PWSCS, Havelian school, Abbottabad education, KPK schools, best school in Havelian, quality education Pakistan'

/**
 * Builds absolute URL for a site path or external URL.
 */
export function absoluteUrl(pathOrUrl = ''): string {
  if (!pathOrUrl) return SITE_URL
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${path}`
}

/**
 * Generates complete metadata: Title, Description, Keywords, Canonical,
 * Robots, Open Graph, and Twitter Cards.
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
  indexable = true,
  imageWidth = 150,
  imageHeight = 150,
}: PageMetadata): Metadata {
  const isHome = !path || path === '/'
  const fullTitle = isHome ? title : `${title} | ${SITE_NAME}`
  const url = absoluteUrl(isHome ? '/' : path)
  const imageUrl = absoluteUrl(image)
  const keywordString = keywords
    ? `${keywords}, ${DEFAULT_KEYWORDS}`
    : DEFAULT_KEYWORDS

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords: keywordString,
    authors: [{ name: author || SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    category: 'education',
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
          width: imageWidth,
          height: imageHeight,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
      locale: 'en_PK',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      // Logo is square; summary fits better than summary_large_image
      card: imageWidth >= 600 && imageHeight >= 314 ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
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
  indexable,
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
    indexable,
    imageWidth: 1200,
    imageHeight: 630,
  })
}
