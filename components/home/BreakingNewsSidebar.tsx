'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { formatDate } from '@/lib/utils'
import { getFeaturedNews, getNews, News } from '@/lib/api/news'
import { ChevronRight, Filter, Loader2 } from 'lucide-react'

const BreakingNewsSidebar = () => {
  // Secondary navigation for sidebar
  const secondaryNavigation = [
    { 
      name: 'Programs', 
      href: '#',
      icon: '📚',
      description: 'Educational programs and activities',
      submenu: [
        { name: 'Pakians Coaching Academy', href: '/pakians-coaching-academy' },
        { name: 'Talent Hunt', href: '/talent-hunt' },
        { name: 'Registration Form', href: '/registration-form' },
      ]
    },
    { 
      name: 'Achievements', 
      href: '#',
      icon: '🏆',
      description: 'Our success stories and awards',
      submenu: [
        { name: 'Awards', href: '/awards' },
        { name: 'Gold Medals', href: '/gold-medals' },
        { name: 'Umrah Tickets', href: '/umrah-tickets' },
        { name: 'Hajj Tickets', href: '/hajj-tickets' },
        { name: 'Laptop Winners', href: '/laptop-winners' },
      ]
    },
    { 
      name: 'Facilities', 
      href: '/facilities',
      icon: '🏫',
      description: 'Our modern facilities and infrastructure',
      submenu: [
        { name: 'Medical', href: '/facilities#medical' },
        { name: 'Physical Training', href: '/facilities#physical-training' },
        { name: 'Science Lab', href: '/facilities#science-lab' },
        { name: 'Religious Training', href: '/facilities#religious-training' },
        { name: 'Class Rooms', href: '/facilities#class-rooms' },
        { name: 'Computer Lab', href: '/facilities#computer-lab' },
        { name: 'Security System', href: '/facilities#security' },
        { name: 'Smart Boards', href: '/facilities#smart-boards' },
      ]
    },
    { 
      name: 'Gallery', 
      href: '#',
      icon: '📸',
      description: 'Photos and videos of our activities',
      submenu: [
        { name: 'Photo Gallery', href: '/photo-gallery' },
        { name: 'Video Gallery', href: '/video-gallery' },
      ]
    },
  ]

  // News & Events state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [displayCount, setDisplayCount] = useState(2)
  const [newsItems, setNewsItems] = useState<News[]>([])
  const [loadingNews, setLoadingNews] = useState(true)

  // Fetch featured news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true)
        const data = await getFeaturedNews(20) // Get more items for filtering
        if (data.length > 0) {
          setNewsItems(data)
        } else {
          const published = await getNews({ isPublished: true, page: 1, pageSize: 20, sortBy: 'date', sortOrder: 'desc' })
          setNewsItems(published.data || [])
        }
      } catch (error) {
        console.error('Error fetching featured news:', error)
        setNewsItems([])
      } finally {
        setLoadingNews(false)
      }
    }

    fetchNews()
  }, [])

  // Get unique categories
  const categories = Array.from(new Set(newsItems.map(item => item.category).filter(Boolean))) as string[]

  // Filter and sort news items
  const filteredNewsItems = newsItems.filter(item => {
    if (selectedCategory) {
      return item.category === selectedCategory
    }
    return true
  })

  // Get items to display
  const displayedItems = showAll ? filteredNewsItems : filteredNewsItems.slice(0, displayCount)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
      <div className="grid grid-cols-1 items-start md:grid-cols-2">
        {/* News & Events */}
        <div className="border-gray-200 p-2 sm:p-2.5 md:border-r">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <h3 className="flex min-w-0 items-center text-sm font-bold text-primary-800">
              <span className="mr-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary-500 to-accent-500 text-[10px] text-white">
                📢
              </span>
              <span className="truncate">News & Events</span>
            </h3>
            {categories.length > 0 && (
              <button
                onClick={() => setSelectedCategory(selectedCategory ? null : categories[0])}
                className={`shrink-0 rounded-full p-1 transition-colors ${
                  selectedCategory
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-400 hover:bg-primary-50 hover:text-primary-600'
                }`}
                title="Toggle category filter"
                aria-label="Toggle category filter"
              >
                <Filter className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {categories.length > 0 && (
            <div className="mb-1.5 flex flex-nowrap gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] transition-colors ${
                  !selectedCategory
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] capitalize transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="max-h-[9.5rem] space-y-0.5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100">
            {loadingNews ? (
              <div className="flex items-center justify-center py-3">
                <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
              </div>
            ) : displayedItems.length > 0 ? (
              displayedItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group block rounded-r-md border-l-2 border-primary-500 py-1 pl-2 hover:bg-primary-50/70"
                >
                  <div className="flex items-center gap-1.5">
                    <h4 className="min-w-0 flex-1 truncate text-xs font-semibold text-gray-900 group-hover:text-primary-700">
                      {item.title}
                    </h4>
                    {item.category && (
                      <span className="shrink-0 rounded bg-accent-100 px-1 text-[9px] font-semibold uppercase text-accent-700">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium text-primary-700">
                    📅 {formatDate(item.date)}
                  </span>
                </Link>
              ))
            ) : (
              <div className="py-2 text-center text-xs text-gray-500">No news items found</div>
            )}
          </div>

          <div className="mt-1.5 flex items-center justify-between gap-2 border-t border-gray-100 pt-1">
            {filteredNewsItems.length > displayCount ? (
              <button
                onClick={() => {
                  if (showAll) {
                    setShowAll(false)
                    setDisplayCount(2)
                  } else {
                    setShowAll(true)
                    setDisplayCount(filteredNewsItems.length)
                  }
                }}
                className="text-[11px] font-semibold text-primary-600 hover:underline"
              >
                {showAll ? 'Show Less' : `View All (${filteredNewsItems.length})`}
              </button>
            ) : (
              <span />
            )}
            <Link
              href="/news"
              className="inline-flex items-center gap-0.5 text-[11px] font-medium text-primary-600 hover:underline"
            >
              All News
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="p-2 sm:p-2.5">
          <h3 className="mb-1.5 flex items-center text-sm font-bold text-primary-800">
            <span className="mr-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-accent-500 to-primary-500 text-[10px] text-white">
              🔗
            </span>
            Quick Links
          </h3>

          <div className="max-h-[9.5rem] space-y-0.5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100">
            {secondaryNavigation.map((item, index) => (
              <div key={index}>
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 rounded-md p-1 hover:bg-primary-50"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-primary-100 to-accent-100 text-xs">
                    {item.icon}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs font-semibold text-gray-900">
                    {item.name}
                  </span>
                </Link>
                {item.submenu && (
                  <div className="ml-7 flex flex-wrap gap-x-2 gap-y-0 pb-0.5">
                    {item.submenu.slice(0, 2).map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="text-[10px] text-gray-600 hover:text-primary-600 hover:underline"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreakingNewsSidebar
