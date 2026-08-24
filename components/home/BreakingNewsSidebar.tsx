'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { formatTime, formatDate } from '@/lib/utils'
import { getFeaturedNews, getNews, News } from '@/lib/api/news'
import { ChevronRight, Filter, Loader2 } from 'lucide-react'

// Facebook SDK types
declare global {
  interface Window {
    FB: {
      init: (config: Record<string, unknown>) => void
      api: (path: string, callback: (response: Record<string, unknown>) => void) => void
    }
  }
}

const BreakingNewsSidebar = () => {
  const [latestPost, setLatestPost] = useState<Record<string, unknown> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Fetch latest reel from Facebook
  const fetchLatestReel = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true)
      }
      
      // Use our API route to fetch the latest reel (bypasses CORS)
      const response = await fetch('/api/facebook-latest-post')
      
      if (response.ok) {
        const reelData = await response.json()
        setLatestPost(reelData)
        setLastUpdated(new Date())
        setError(null)
      } else {
        throw new Error('Unable to fetch the latest Facebook post. Please try again later.')
      }
      
    } catch (error) {
      console.error('Error fetching latest Facebook reel:', error)
      setError('Unable to load the latest Facebook post. Please try again later.')
      
      // Fallback: Show a sample latest reel
      const fallbackReel = {
        id: 'reel-fallback',
        message: '🎬 Check out our latest reel from Pak Wattan School & College of Sciences! Our students showcase their amazing talents and achievements in this inspiring video. Don\'t miss out on the latest updates from our educational community! #PakWattan #Education #StudentLife #Reels #Latest',
        created_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        full_picture: '/images/facebook-post.jpg',
        permalink_url: 'https://www.facebook.com/PAKWATTAN2020',
        likes: { count: 156 },
        comments: { count: 23 },
        shares: { count: 18 },
        from: {
          name: 'Pak Wattan School & College of Sciences',
          id: 'PAKWATTAN2020'
        },
        isReel: true
      }
      
      setLatestPost(fallbackReel)
      setLastUpdated(new Date())
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchLatestReel()
    
    // Refresh every 30 minutes to get the latest reel
    const refreshInterval = setInterval(() => fetchLatestReel(true), 30 * 60 * 1000)
    
    return () => clearInterval(refreshInterval)
  }, [])

  // Manual refresh function
  const handleRefresh = () => {
    fetchLatestReel(true)
  }
  
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
      <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3">
        {/* News & Events */}
        <div className="border-gray-200 p-2 sm:p-2.5 lg:border-r">
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

        {/* Latest Reel */}
        <div className="border-gray-200 p-2 sm:p-2.5 lg:border-r">
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <h3 className="flex items-center text-sm font-bold text-primary-800">
              <span className="mr-1">🎬</span>
              Latest Reel
            </h3>
            <div className="flex items-center gap-1">
              {lastUpdated && (
                <p className="hidden text-[10px] text-gray-400 sm:block">{formatTime(lastUpdated)}</p>
              )}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="rounded-full p-1 text-gray-400 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-50"
                title="Refresh latest reel"
                aria-label="Refresh latest Facebook reel"
                aria-busy={isRefreshing}
              >
                <svg
                  className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
            </div>
          ) : error ? (
            <div className="py-2 text-center">
              <p className="mb-1 text-[11px] text-gray-600">{error}</p>
              <button
                onClick={handleRefresh}
                className="rounded-md bg-primary-600 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-primary-700"
              >
                Try Again
              </button>
            </div>
          ) : latestPost ? (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              {(latestPost.full_picture as string) && (
                <div className="relative">
                  <Image
                    src={latestPost.full_picture as string}
                    alt="Facebook reel"
                    width={400}
                    height={88}
                    className="h-20 w-full object-cover sm:h-[5.5rem]"
                  />
                  {(latestPost.isReel as boolean) && (
                    <div className="absolute right-1.5 top-1.5 rounded bg-gradient-to-r from-red-500 to-pink-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      REEL
                    </div>
                  )}
                </div>
              )}
              <div className="space-y-1 p-1.5">
                <div className="flex items-center gap-2.5 text-[10px] text-gray-500">
                  <span>👍 {((latestPost.likes as Record<string, unknown>)?.count as number) || 0}</span>
                  <span>💬 {((latestPost.comments as Record<string, unknown>)?.count as number) || 0}</span>
                  <span>🔄 {((latestPost.shares as Record<string, unknown>)?.count as number) || 0}</span>
                </div>
                <a
                  href={latestPost.permalink_url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-1 rounded-md bg-gradient-to-r from-primary-600 to-accent-600 py-1.5 text-[11px] font-semibold text-white"
                >
                  {latestPost.isReel ? 'Watch Reel' : 'View Post'} 🎬
                </a>
              </div>
            </div>
          ) : (
            <p className="py-2 text-center text-[11px] text-gray-500">No recent posts</p>
          )}

          <a
            href="https://www.facebook.com/PAKWATTAN2020"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 flex items-center gap-2 rounded-md border border-[#1877F2]/20 bg-[#1877F2]/5 px-2 py-1.5 hover:bg-[#1877F2]/10"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#1877F2] text-white">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-secondary-900">
              Follow on Facebook
            </span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#1877F2]" />
          </a>
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

          <div className="mt-1.5 space-y-1 border-t border-gray-100 pt-1.5">
            <Link
              href="/admission"
              className="flex w-full items-center justify-center gap-1 rounded-md bg-gradient-to-r from-primary-600 to-accent-600 py-1.5 text-[11px] font-bold text-white"
            >
              Apply Now
              <ChevronRight className="h-3 w-3" />
            </Link>
            <div className="grid grid-cols-2 gap-1">
              <Link
                href="/contact"
                className="rounded-md border border-secondary-100 bg-secondary-50 py-1 text-center text-[10px] font-semibold text-secondary-800 hover:bg-secondary-100"
              >
                Contact
              </Link>
              <a
                href="https://wa.me/923180821377"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-emerald-200 bg-emerald-50 py-1 text-center text-[10px] font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreakingNewsSidebar
