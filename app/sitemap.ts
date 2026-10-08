import { MetadataRoute } from 'next'
import { getAllHouseIds } from '@/lib/houses-data'
import { getNews } from '@/lib/api/news'

const BASE_URL = 'https://pakwattan.edu.pk'

type Freq = MetadataRoute.Sitemap[number]['changeFrequency']

function entry(
  path: string,
  priority: number,
  changeFrequency: Freq,
  lastModified: string | Date = new Date().toISOString()
): MetadataRoute.Sitemap[number] {
  return {
    url: path === '/' ? BASE_URL : `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    entry('/', 1.0, 'daily', now),
    entry('/about', 0.9, 'monthly', now),
    entry('/faculty', 0.8, 'monthly', now),
    entry('/faqs', 0.8, 'monthly', now),
    entry('/admission', 0.9, 'weekly', now),
    entry('/registration-form', 0.85, 'weekly', now),
    entry('/contact', 0.8, 'monthly', now),
    entry('/facilities', 0.8, 'monthly', now),
    entry('/scholarships', 0.9, 'weekly', now),
    entry('/scholarship-result', 0.7, 'weekly', now),
    entry('/school-life', 0.7, 'monthly', now),
    entry('/entry-test-model-papers', 0.8, 'weekly', now),
    entry('/entry-test-result', 0.7, 'weekly', now),
    entry('/jobs', 0.8, 'weekly', now),
    entry('/news', 0.8, 'daily', now),
    entry('/video-gallery', 0.7, 'weekly', now),
    entry('/photo-gallery', 0.7, 'weekly', now),
    entry('/model-papers', 0.7, 'monthly', now),
    entry('/academic-syllabus', 0.7, 'monthly', now),
    entry('/yearly-academic-schedule', 0.7, 'monthly', now),
    entry('/pakians-coaching-academy', 0.7, 'monthly', now),
    entry('/pakians-events', 0.7, 'monthly', now),
    entry('/pakians-faculty-registration', 0.8, 'weekly', now),
    entry('/talent-hunt', 0.75, 'monthly', now),
    entry('/talent-hunt/season-1', 0.6, 'monthly', now),
    entry('/talent-hunt/season-2', 0.5, 'yearly', now),
    entry('/talent-hunt/season-3', 0.75, 'weekly', now),
    entry('/academic/montessori', 0.7, 'monthly', now),
    entry('/academic/primary-wing', 0.7, 'monthly', now),
    entry('/academic/boys-middle-wing', 0.7, 'monthly', now),
    entry('/academic/boys-senior-wing', 0.7, 'monthly', now),
    entry('/academic/girls-wing', 0.7, 'monthly', now),
    entry('/umrah-tickets', 0.6, 'monthly', now),
    entry('/hajj-tickets', 0.6, 'monthly', now),
    entry('/laptop-winners', 0.6, 'monthly', now),
    entry('/gold-medals', 0.6, 'monthly', now),
    entry('/awards', 0.7, 'monthly', now),
    entry('/terms', 0.4, 'yearly', now),
    entry('/privacy', 0.4, 'yearly', now),
  ]

  const housePages: MetadataRoute.Sitemap = getAllHouseIds().map((slug) =>
    entry(`/school-life/houses/${slug}`, 0.65, 'monthly', now)
  )

  let newsPages: MetadataRoute.Sitemap = []
  try {
    const news = await getNews({
      page: 1,
      pageSize: 100,
      isPublished: true,
      sortBy: 'date',
      sortOrder: 'desc',
    })
    newsPages = (news.data || [])
      .filter((item) => Boolean(item.slug))
      .map((item) =>
        entry(
          `/news/${item.slug}`,
          0.65,
          'weekly',
          item.updatedAt || item.date || now
        )
      )
  } catch {
    // API may be unavailable at build time — keep static/house URLs
  }

  return [...staticPages, ...housePages, ...newsPages]
}
