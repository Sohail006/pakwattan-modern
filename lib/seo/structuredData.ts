/**
 * Structured Data (JSON-LD) generators for SEO.
 * Covers: Organization, School, LocalBusiness, Breadcrumb, VideoObject,
 * FAQ, Person, Review, WebSite, SearchAction.
 */

export interface OrganizationInput {
  name: string
  url: string
  logo?: string
  description?: string
  email?: string
  telephone?: string
  foundingDate?: string
  alternateName?: string[]
  contactPoint?: {
    telephone?: string
    contactType?: string
    email?: string
    availableLanguage?: string[]
  }
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  sameAs?: string[]
  geo?: {
    latitude: number
    longitude: number
  }
  openingHours?: Array<{
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  priceRange?: string
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface Article {
  headline: string
  description: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: {
    name: string
    url?: string
  }
  publisher?: {
    name: string
    logo?: string
  }
}

export interface PersonInput {
  name: string
  jobTitle: string
  description?: string
  image?: string
  url?: string
  worksFor?: string
  sameAs?: string[]
}

export interface ReviewInput {
  author: string
  reviewBody: string
  reviewRating: number
  datePublished?: string
}

export interface VideoObjectInput {
  name: string
  description: string
  thumbnailUrl: string
  contentUrl: string
  embedUrl?: string
  uploadDate?: string
  duration?: string
  publisherName?: string
}

/** Organization (also used as base for School / EducationalOrganization) */
export function generateOrganizationSchema(org: OrganizationInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${org.url}#organization`,
    name: org.name,
    url: org.url,
    ...(org.alternateName && { alternateName: org.alternateName }),
    ...(org.description && { description: org.description }),
    ...(org.email && { email: org.email }),
    ...(org.telephone && { telephone: org.telephone }),
    ...(org.foundingDate && { foundingDate: org.foundingDate }),
    ...(org.logo && {
      logo: {
        '@type': 'ImageObject',
        url: org.logo,
      },
      image: org.logo,
    }),
    ...(org.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: org.contactPoint.telephone,
        contactType: org.contactPoint.contactType || 'customer service',
        email: org.contactPoint.email,
        availableLanguage: org.contactPoint.availableLanguage || ['English', 'Urdu'],
        areaServed: 'PK',
      },
    }),
    ...(org.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: org.address.streetAddress,
        addressLocality: org.address.addressLocality,
        addressRegion: org.address.addressRegion,
        postalCode: org.address.postalCode,
        addressCountry: org.address.addressCountry || 'PK',
      },
    }),
    ...(org.sameAs && { sameAs: org.sameAs }),
  }
}

/**
 * School schema (schema.org/School) — specialized EducationalOrganization.
 */
export function generateSchoolSchema(org: OrganizationInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'School',
    '@id': `${org.url}#school`,
    name: org.name,
    url: org.url,
    ...(org.alternateName && { alternateName: org.alternateName }),
    ...(org.description && { description: org.description }),
    ...(org.email && { email: org.email }),
    ...(org.telephone && { telephone: org.telephone }),
    ...(org.foundingDate && { foundingDate: org.foundingDate }),
    ...(org.logo && {
      logo: {
        '@type': 'ImageObject',
        url: org.logo,
      },
      image: org.logo,
    }),
    ...(org.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: org.address.streetAddress,
        addressLocality: org.address.addressLocality,
        addressRegion: org.address.addressRegion,
        postalCode: org.address.postalCode,
        addressCountry: org.address.addressCountry || 'PK',
      },
    }),
    ...(org.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: org.geo.latitude,
        longitude: org.geo.longitude,
      },
    }),
    ...(org.sameAs && { sameAs: org.sameAs }),
    ...(org.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: org.aggregateRating.ratingValue,
        reviewCount: org.aggregateRating.reviewCount,
        bestRating: org.aggregateRating.bestRating ?? 5,
        worstRating: org.aggregateRating.worstRating ?? 1,
      },
    }),
    parentOrganization: {
      '@id': `${org.url}#organization`,
    },
  }
}

/**
 * LocalBusiness schema for maps / local SEO.
 */
export function generateLocalBusinessSchema(org: OrganizationInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    additionalType: 'https://schema.org/LocalBusiness',
    '@id': `${org.url}#localbusiness`,
    name: org.name,
    url: org.url,
    ...(org.description && { description: org.description }),
    ...(org.telephone && { telephone: org.telephone }),
    ...(org.email && { email: org.email }),
    ...(org.priceRange && { priceRange: org.priceRange }),
    ...(org.logo && { image: org.logo }),
    ...(org.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: org.address.streetAddress,
        addressLocality: org.address.addressLocality,
        addressRegion: org.address.addressRegion,
        postalCode: org.address.postalCode,
        addressCountry: org.address.addressCountry || 'PK',
      },
    }),
    ...(org.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: org.geo.latitude,
        longitude: org.geo.longitude,
      },
    }),
    ...(org.openingHours && {
      openingHoursSpecification: org.openingHours.map((slot) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: slot.dayOfWeek,
        opens: slot.opens,
        closes: slot.closes,
      })),
    }),
    ...(org.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: org.aggregateRating.ratingValue,
        reviewCount: org.aggregateRating.reviewCount,
        bestRating: org.aggregateRating.bestRating ?? 5,
        worstRating: org.aggregateRating.worstRating ?? 1,
      },
    }),
    ...(org.sameAs && { sameAs: org.sameAs }),
  }
}

/** BreadcrumbList */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/** Article */
export function generateArticleSchema(article: Article): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    ...(article.image && {
      image: {
        '@type': 'ImageObject',
        url: article.image,
      },
    }),
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(article.author && {
      author: {
        '@type': 'Person',
        name: article.author.name,
        ...(article.author.url && { url: article.author.url }),
      },
    }),
    ...(article.publisher && {
      publisher: {
        '@type': 'Organization',
        name: article.publisher.name,
        ...(article.publisher.logo && {
          logo: {
            '@type': 'ImageObject',
            url: article.publisher.logo,
          },
        }),
      },
    }),
  }
}

/** FAQPage */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/** Person (leadership, faculty) */
export function generatePersonSchema(person: PersonInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    ...(person.description && { description: person.description }),
    ...(person.image && { image: person.image }),
    ...(person.url && { url: person.url }),
    ...(person.worksFor && {
      worksFor: {
        '@type': 'Organization',
        name: person.worksFor,
        url: 'https://pakwattan.edu.pk',
      },
    }),
    ...(person.sameAs && { sameAs: person.sameAs }),
  }
}

/** Single Review */
export function generateReviewSchema(
  review: ReviewInput,
  itemName = 'Pak Wattan School & College of Sciences'
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'School',
      name: itemName,
      url: 'https://pakwattan.edu.pk',
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.reviewRating,
      bestRating: 5,
      worstRating: 1,
    },
    ...(review.datePublished && { datePublished: review.datePublished }),
  }
}

/** AggregateRating + optional reviews ItemList for a School */
export function generateAggregateRatingSchema(opts: {
  ratingValue: number
  reviewCount: number
  reviews?: ReviewInput[]
  itemName?: string
  itemUrl?: string
}): object {
  const itemName = opts.itemName || 'Pak Wattan School & College of Sciences'
  const itemUrl = opts.itemUrl || 'https://pakwattan.edu.pk'

  return {
    '@context': 'https://schema.org',
    '@type': 'School',
    '@id': `${itemUrl}#reviews`,
    name: itemName,
    url: itemUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: opts.ratingValue,
      reviewCount: opts.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    ...(opts.reviews &&
      opts.reviews.length > 0 && {
        review: opts.reviews.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.author },
          reviewBody: r.reviewBody,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.reviewRating,
            bestRating: 5,
            worstRating: 1,
          },
          ...(r.datePublished && { datePublished: r.datePublished }),
        })),
      }),
  }
}

/** VideoObject */
export function generateVideoObjectSchema(video: VideoObjectInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    contentUrl: video.contentUrl,
    ...(video.embedUrl && { embedUrl: video.embedUrl }),
    ...(video.uploadDate && { uploadDate: video.uploadDate }),
    ...(video.duration && { duration: video.duration }),
    publisher: {
      '@type': 'Organization',
      name: video.publisherName || 'Pak Wattan School & College of Sciences',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pakwattan.edu.pk/images/logo/logo_150x150.png',
      },
    },
  }
}

/** WebPage */
export function generateWebPageSchema(opts: {
  name: string
  description: string
  url: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: 'en-PK',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://pakwattan.edu.pk#website',
      name: 'Pak Wattan School & College of Sciences',
      url: 'https://pakwattan.edu.pk',
    },
    about: {
      '@id': 'https://pakwattan.edu.pk#school',
    },
  }
}

/**
 * WebSite + optional SearchAction (JSON-LD potentialAction).
 */
export function generateWebSiteSchema(siteUrl: string, searchUrl?: string): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: 'Pak Wattan School & College of Sciences',
    alternateName: ['Pak Wattan Havelian', 'PWSCS', 'Pak Wattan School'],
    inLanguage: 'en-PK',
    publisher: {
      '@id': `${siteUrl}#organization`,
    },
  }

  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    }
  }

  return schema
}

/** @deprecated alias kept for older Organization type usage */
export type Organization = OrganizationInput
