/**
 * Pre-built site-wide JSON-LD graphs for Pak Wattan.
 */
import { SCHOOL_INFO, GOOGLE_RATING, PARENT_REVIEWS } from '@/lib/constants'
import {
  generateOrganizationSchema,
  generateSchoolSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateAggregateRatingSchema,
  generatePersonSchema,
  generateVideoObjectSchema,
  generateFAQSchema,
  type OrganizationInput,
} from '@/lib/seo/structuredData'

const SITE_URL = 'https://pakwattan.edu.pk'

export const SITE_ORG_INPUT: OrganizationInput = {
  name: SCHOOL_INFO.fullName,
  url: SITE_URL,
  logo: `${SITE_URL}${SCHOOL_INFO.logo}`,
  description: SCHOOL_INFO.description,
  email: SCHOOL_INFO.contact.email,
  telephone: '+92-992-811555',
  foundingDate: '2020-11-02',
  alternateName: ['Pak Wattan', 'PWSCS', 'Pak Wattan Havelian', 'Pak Wattan School Havelian'],
  contactPoint: {
    telephone: '+92-992-811555',
    contactType: 'Admissions',
    email: SCHOOL_INFO.contact.email,
    availableLanguage: ['English', 'Urdu'],
  },
  address: {
    streetAddress: 'Azam Khan Road, beside Mubarak Plaza',
    addressLocality: 'Havelian',
    addressRegion: 'Khyber Pakhtunkhwa',
    addressCountry: 'PK',
  },
  geo: {
    latitude: 34.05258,
    longitude: 73.15232,
  },
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '16:00',
    },
    {
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '13:00',
    },
  ],
  priceRange: 'PKR',
  sameAs: [
    SCHOOL_INFO.contact.socialMedia.facebook.replace('web.facebook.com', 'www.facebook.com'),
    SCHOOL_INFO.contact.socialMedia.youtube.split('?')[0],
    SCHOOL_INFO.contact.socialMedia.twitter,
    'https://www.youtube.com/@pakwattanSchoolCollege',
  ],
  aggregateRating: {
    ratingValue: GOOGLE_RATING.rating,
    reviewCount: GOOGLE_RATING.reviewCount,
  },
}

/** Global schemas for root layout */
export function getGlobalStructuredData(): object[] {
  return [
    generateOrganizationSchema(SITE_ORG_INPUT),
    generateSchoolSchema(SITE_ORG_INPUT),
    generateLocalBusinessSchema(SITE_ORG_INPUT),
    generateWebSiteSchema(
      SITE_URL,
      `${SITE_URL}/news?search={search_term_string}`
    ),
  ]
}

/** Homepage review + aggregate rating graph */
export function getHomeReviewSchema(): object {
  return generateAggregateRatingSchema({
    ratingValue: GOOGLE_RATING.rating,
    reviewCount: GOOGLE_RATING.reviewCount,
    reviews: PARENT_REVIEWS.map((r) => ({
      author: r.name,
      reviewBody: r.quote,
      reviewRating: r.rating,
    })),
  })
}

/** Leadership Person schemas for About */
export function getLeadershipPersonSchemas(): object[] {
  return [
    generatePersonSchema({
      name: 'Sardar Abdul Aqeel',
      jobTitle: 'Executive Director',
      description:
        'Managing director of Pak Wattan School & College of Sciences — educationist focused on affordable excellence in Havelian.',
      image: `${SITE_URL}/images/about-us/picture6.jpg`,
      url: `${SITE_URL}/about#leadership`,
      worksFor: SCHOOL_INFO.fullName,
    }),
    generatePersonSchema({
      name: 'Malik Ahsan Ali',
      jobTitle: 'Administration Cum Principal',
      description:
        'Principal of Pak Wattan School & College of Sciences — passionate educationist promoting discipline, knowledge, and student success.',
      image: `${SITE_URL}/images/about-us/Picture7.jpg`,
      url: `${SITE_URL}/about#leadership`,
      worksFor: SCHOOL_INFO.fullName,
    }),
  ]
}

/** Featured VideoObject list (real YouTube IDs only) */
export function getFeaturedVideoSchemas(): object[] {
  const videos = [
    {
      id: 'edf2-HxPxxs',
      name: 'Pak Wattan School & College of Sciences — Official Introduction',
      description: 'Official video introducing Pak Wattan School & College of Sciences, Havelian.',
      uploadDate: '2021-01-01',
    },
    {
      id: 'OH7yYQdmsDg',
      name: 'Pak Wattan Campus Highlights',
      description: 'Campus life and highlights from Pak Wattan School & College of Sciences.',
      uploadDate: '2022-01-01',
    },
    {
      id: 'B5HXn5sZRXM',
      name: 'Pak Wattan School Story',
      description: 'Discover Pak Wattan School & College of Sciences in Havelian, KPK.',
      uploadDate: '2023-01-01',
    },
  ]

  return videos.map((video) =>
    generateVideoObjectSchema({
      name: video.name,
      description: video.description,
      thumbnailUrl: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      uploadDate: video.uploadDate,
      publisherName: SCHOOL_INFO.fullName,
    })
  )
}

export { generateFAQSchema }
