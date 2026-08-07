'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Calendar, ChevronRight, Loader2, Search } from 'lucide-react'
import { getNews, News } from '@/lib/api/news'
import Container from '@/components/ui/Container'
import { formatDate } from '@/lib/utils'

export default function NewsListing() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newsItems, setNewsItems] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get('search') || params.get('q')
    if (fromUrl) setSearchQuery(fromUrl)
  }, [])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getNews({
          page: 1,
          pageSize: 100,
          isPublished: true,
          category: selectedCategory || undefined,
          search: searchQuery || undefined,
          sortBy: 'date',
          sortOrder: 'desc',
        })
        setNewsItems(response.data || [])
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err instanceof Error ? err.message : 'Failed to load news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [selectedCategory, searchQuery])

  const categories = Array.from(
    new Set(newsItems.map((item) => item.category).filter(Boolean))
  ) as string[]

  const filteredNewsItems = useMemo(() => {
    if (!searchQuery) return newsItems
    const q = searchQuery.toLowerCase()
    return newsItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    )
  }, [newsItems, searchQuery])

  return (
    <section id="news-listing" className="scroll-mt-20 bg-secondary-50 py-10 sm:py-14">
      <Container>
        <div className="mb-8 max-w-2xl">
          <h2 className="font-josefin text-2xl sm:text-3xl font-bold text-secondary-900 mb-2">
            Latest updates
          </h2>
          <p className="text-sm sm:text-base text-secondary-600">
            Search announcements or filter by category. For campus events and competitions, visit{' '}
            <Link href="/pakians-events" className="font-semibold text-primary-700 hover:underline">
              Pakians Events
            </Link>
            .
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl">
            <label htmlFor="news-search" className="sr-only">
              Search news and announcements
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-400"
              aria-hidden
            />
            <input
              id="news-search"
              type="search"
              name="search"
              placeholder="Search news and announcements…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              className="w-full rounded-xl border border-secondary-200 bg-white py-3 pl-11 pr-4 text-secondary-900 placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
          </div>

          <div
            role="group"
            aria-label="Filter by category"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                !selectedCategory
                  ? 'bg-primary-700 text-white'
                  : 'border border-secondary-200 bg-white text-secondary-700 hover:border-primary-300 hover:text-primary-800'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[40px] rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-700 text-white'
                    : 'border border-secondary-200 bg-white text-secondary-700 hover:border-primary-300 hover:text-primary-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-6 text-sm text-secondary-600" aria-live="polite">
          Showing{' '}
          <span className="font-semibold text-primary-700">{filteredNewsItems.length}</span> news
          item{filteredNewsItems.length !== 1 ? 's' : ''}
        </p>

        {loading && (
          <div className="flex items-center justify-center py-16" role="status">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" aria-hidden />
            <span className="ml-3 text-secondary-600">Loading news…</span>
          </div>
        )}

        {error && !loading && (
          <div className="py-12 text-center">
            <h3 className="mb-2 text-xl font-semibold text-secondary-900">Error loading news</h3>
            <p className="mb-4 text-secondary-600">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="min-h-[44px] rounded-xl bg-primary-700 px-5 py-2.5 font-semibold text-white hover:bg-primary-600"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredNewsItems.length > 0 && (
          <ul className="divide-y divide-secondary-200 border-y border-secondary-200 bg-white">
            {filteredNewsItems.map((item) => (
              <li key={item.id}>
                <NewsRow item={item} />
              </li>
            ))}
          </ul>
        )}

        {!loading && !error && filteredNewsItems.length === 0 && (
          <div className="py-12 text-center">
            <h3 className="mb-2 text-xl font-semibold text-secondary-900">No news found</h3>
            <p className="mb-4 text-secondary-600">Try adjusting your search or filter criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
              className="min-h-[44px] rounded-xl bg-primary-700 px-5 py-2.5 font-semibold text-white hover:bg-primary-600"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/admission"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-accent-500 px-6 font-bold text-secondary-900 hover:bg-accent-400"
          >
            Apply for Admission
          </Link>
          <Link
            href="/pakians-events"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-primary-200 bg-white px-6 font-semibold text-primary-800 hover:bg-primary-50"
          >
            View Events
          </Link>
        </div>
      </Container>
    </section>
  )
}

function NewsRow({ item }: { item: News }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group flex flex-col gap-2 px-4 py-5 transition-colors hover:bg-primary-50/50 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-5"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-700">
          {item.category && <span>{item.category}</span>}
          <span className="inline-flex items-center gap-1 font-medium normal-case tracking-normal text-secondary-500">
            <Calendar className="h-3.5 w-3.5" aria-hidden />
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          </span>
        </div>
        <h3 className="font-josefin text-lg font-bold text-secondary-900 group-hover:text-primary-800 sm:text-xl">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-secondary-600 sm:text-base">{item.description}</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary-700">
        Read more
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  )
}
