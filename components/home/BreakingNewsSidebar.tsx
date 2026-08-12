'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { formatTime, formatDate } from '@/lib/utils'
import { getFeaturedNews, News } from '@/lib/api/news'
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
  const [displayCount, setDisplayCount] = useState(3)
  const [newsItems, setNewsItems] = useState<News[]>([])
  const [loadingNews, setLoadingNews] = useState(true)

  // Fetch featured news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true)
        const data = await getFeaturedNews(20) // Get more items for filtering
        setNewsItems(data)
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
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Three Column Layout — equal-height columns */}
      <div className="grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-3">
        
        {/* Column 1: News & Events */}
        <div className="flex h-full flex-col border-gray-200 lg:border-r">
          <div className="flex h-full flex-col p-2.5 sm:p-3">
            <div className="mb-2 shrink-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm sm:text-base font-bold text-primary-800 flex items-center min-w-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-md flex items-center justify-center mr-1.5 sm:mr-2 shrink-0">
                    <span className="text-white text-[10px] sm:text-xs">📢</span>
                  </div>
                  <span className="truncate">News & Events</span>
                </h3>
                {categories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategory(selectedCategory ? null : categories[0])}
                    className={`p-1 rounded-full transition-all duration-200 shrink-0 ${
                      selectedCategory
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                    title="Toggle category filter"
                    aria-label="Toggle category filter"
                  >
                    <Filter className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              
              {categories.length > 0 && (
                <div className="mt-1.5 flex flex-nowrap gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`shrink-0 px-2 py-0.5 text-[11px] rounded-full transition-colors ${
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
                      className={`shrink-0 px-2 py-0.5 text-[11px] rounded-full transition-colors capitalize ${
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
            </div>
            
            <div className="min-h-0 flex-1 space-y-0.5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100">
              {loadingNews ? (
                <div className="flex items-center justify-center py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
                </div>
              ) : displayedItems.length > 0 ? (
                displayedItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="block group border-l-2 border-primary-500 pl-2 py-1.5 hover:bg-primary-50/70 transition-colors rounded-r-md"
                  >
                    <div className="flex items-start gap-1.5">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-semibold text-gray-900 text-xs group-hover:text-primary-700 transition-colors line-clamp-1 break-words">
                            {item.title}
                          </h4>
                          {item.category && (
                            <span className="px-1 py-0 bg-accent-100 text-accent-700 text-[9px] font-semibold rounded uppercase shrink-0">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-[11px] line-clamp-1 break-words mt-0.5">
                          {item.description}
                        </p>
                        <span className="inline-block mt-0.5 text-[10px] text-primary-700 font-medium">
                          📅 {formatDate(item.date)}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-600 transition-colors shrink-0 mt-0.5" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-3 text-gray-500 text-xs">
                  No news items found
                </div>
              )}
            </div>
            
            <div className="mt-auto shrink-0 space-y-1 border-t border-gray-100 pt-1.5">
              {filteredNewsItems.length > displayCount && (
                <button
                  onClick={() => {
                    if (showAll) {
                      setShowAll(false)
                      setDisplayCount(3)
                    } else {
                      setShowAll(true)
                      setDisplayCount(filteredNewsItems.length)
                    }
                  }}
                  className="w-full flex items-center justify-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
                >
                  <span>{showAll ? 'Show Less' : `View All (${filteredNewsItems.length})`}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAll ? 'rotate-90' : ''}`} />
                </button>
              )}
              <Link
                href="/news"
                className="flex items-center justify-center gap-0.5 text-[11px] sm:text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                <span>View All News & Events</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Column 2: Latest Reel + social fillers */}
        <div className="flex h-full flex-col border-gray-200 lg:border-r">
          <div className="flex h-full flex-col p-2.5 sm:p-3">
            <div className="mb-2 flex shrink-0 items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-bold text-primary-800 flex items-center min-w-0">
                <span className="text-base mr-1 shrink-0">🎬</span>
                Latest Reel
              </h3>
              <div className="flex items-center gap-1.5 shrink-0">
                {lastUpdated && (
                  <p className="text-[10px] text-gray-400 hidden sm:block">
                    {formatTime(lastUpdated)}
                  </p>
                )}
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-1 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Refresh latest reel"
                  aria-label="Refresh latest Facebook reel"
                  aria-busy={isRefreshing}
                >
                  <svg 
                    className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex min-h-0 flex-1 flex-col gap-2">
              {isLoading ? (
                <div className="flex flex-1 flex-col items-center justify-center py-6">
                  <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                  <p className="mt-2 text-xs text-gray-600">Loading reel...</p>
                </div>
              ) : error ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center py-4">
                  <p className="text-xs text-gray-600 mb-2">{error}</p>
                  <button
                    onClick={handleRefresh}
                    className="inline-flex items-center px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium rounded-md transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : latestPost ? (
                <div className="shrink-0 rounded-lg border border-gray-200 overflow-hidden">
                  {(latestPost.full_picture as string) && (
                    <div className="relative">
                      <Image
                        src={latestPost.full_picture as string}
                        alt="Facebook reel"
                        width={400}
                        height={120}
                        className="w-full h-24 sm:h-28 object-cover"
                      />
                      {(latestPost.isReel as boolean) && (
                        <div className="absolute top-1.5 right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                          REEL
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-2">
                    <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-1.5">
                      <span>👍 {((latestPost.likes as Record<string, unknown>)?.count as number) || 0}</span>
                      <span>💬 {((latestPost.comments as Record<string, unknown>)?.count as number) || 0}</span>
                      <span>🔄 {((latestPost.shares as Record<string, unknown>)?.count as number) || 0}</span>
                    </div>
                    <a
                      href={latestPost.permalink_url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-1.5 px-3 rounded-md text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <span>{latestPost.isReel ? 'Watch Reel' : 'View Post'}</span>
                      <span>🎬</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p className="text-xs mb-2">No recent posts available</p>
                </div>
              )}

              {/* Fills remaining column height */}
              <div className="mt-auto flex flex-1 flex-col justify-end gap-1.5 pt-1">
                <a
                  href="https://www.facebook.com/PAKWATTAN2020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-[#1877F2]/20 bg-[#1877F2]/5 px-2.5 py-2 transition-colors hover:bg-[#1877F2]/10"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1877F2] text-white">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold text-secondary-900">Follow on Facebook</span>
                    <span className="block text-[10px] text-secondary-600">Daily campus updates & reels</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#1877F2]" />
                </a>
                <Link
                  href="/video-gallery"
                  className="flex items-center gap-2 rounded-md border border-primary-100 bg-primary-50/60 px-2.5 py-2 transition-colors hover:bg-primary-50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-100 text-sm">🎥</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold text-secondary-900">Video Gallery</span>
                    <span className="block text-[10px] text-secondary-600">More school videos</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary-600" />
                </Link>
                <Link
                  href="/photo-gallery"
                  className="flex items-center gap-2 rounded-md border border-accent-100 bg-accent-50/50 px-2.5 py-2 transition-colors hover:bg-accent-50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent-100 text-sm">📸</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold text-secondary-900">Photo Gallery</span>
                    <span className="block text-[10px] text-secondary-600">Campus life moments</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-accent-700" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Quick Links + action fillers */}
        <div className="flex h-full flex-col">
          <div className="flex h-full flex-col p-2.5 sm:p-3">
            <div className="mb-2 shrink-0">
              <h3 className="text-sm sm:text-base font-bold text-primary-800 flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-accent-500 to-primary-500 rounded-md flex items-center justify-center mr-1.5 sm:mr-2 shrink-0">
                  <span className="text-white text-[10px] sm:text-xs">🔗</span>
                </div>
                Quick Links
              </h3>
            </div>
            
            <div className="min-h-0 flex-1 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100">
              {secondaryNavigation.map((item, index) => (
                <div key={index} className="group">
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 p-1.5 rounded-md hover:bg-primary-50 transition-colors"
                  >
                    <div className="w-7 h-7 bg-gradient-to-br from-primary-100 to-accent-100 rounded-md flex items-center justify-center shrink-0">
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors text-xs truncate">{item.name}</h4>
                    </div>
                    <svg className="w-3 h-3 text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  {item.submenu && (
                    <div className="ml-9 flex flex-wrap gap-x-2 gap-y-0.5 pb-0.5">
                      {item.submenu.slice(0, 3).map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="text-[11px] text-gray-600 hover:text-primary-600 hover:underline"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Fills remaining column height */}
            <div className="mt-auto shrink-0 space-y-1.5 border-t border-gray-100 pt-2">
              <Link
                href="/admission"
                className="flex w-full items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-primary-600 to-accent-600 px-3 py-2 text-xs font-bold text-white transition-opacity hover:opacity-95"
              >
                Apply Now
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <div className="grid grid-cols-2 gap-1.5">
                <Link
                  href="/scholarships"
                  className="rounded-md border border-primary-100 bg-primary-50/70 px-2 py-1.5 text-center text-[11px] font-semibold text-primary-800 hover:bg-primary-50"
                >
                  Scholarships
                </Link>
                <Link
                  href="/contact"
                  className="rounded-md border border-secondary-100 bg-secondary-50 px-2 py-1.5 text-center text-[11px] font-semibold text-secondary-800 hover:bg-secondary-100"
                >
                  Contact
                </Link>
              </div>
              <a
                href="https://wa.me/923348113302"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                WhatsApp 0334-8113302
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Mobile Optimized */}
      <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] sm:text-xs text-gray-600 truncate">
            <span className="font-semibold text-primary-600">Live Updates</span>
            <span className="hidden sm:inline"> · Auto-refreshing</span>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://www.facebook.com/PAKWATTAN2020"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600 transition-colors"
              title="Follow us on Facebook"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {lastUpdated && (
              <p className="text-[10px] text-gray-400 truncate">
                {formatTime(lastUpdated)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreakingNewsSidebar
