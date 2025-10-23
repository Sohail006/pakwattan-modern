'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

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
        throw new Error('API request failed')
      }
      
    } catch (error) {
      console.error('Error fetching latest Facebook reel:', error)
      setError('Unable to load latest reel')
      
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

  const newsItems = [
    {
      title: 'SPELL BEE CONTEST',
      description: 'Get ready to showcase your spelling skills and compete in our upcoming Spell Bee Contest.',
      date: '27th September 2025 (Saturday)'
    },
    {
      title: 'Free Speech in Pakistan: Illusion or Reality?',
      description: 'Join us for an exciting speech competition at Pak Wattan, aimed at discovering young orators and bold thinkers.',
      date: '23rd August 2025 (Saturday)'
    },
    {
      title: 'Qirat & Naat Competition',
      description: 'We warmly invite you to the Qirat & Naat competition at Pak Wattan — an inspiring event to showcase the beautiful voices and spiritual talents of our youth.',
      date: '12th July 2025 (Saturday)'
    },
    {
      title: 'Singing (National, Folk, Patriotic)',
      description: 'Join us at Pak Wattan for a vibrant Singing Competition featuring National, Folk, and Patriotic songs. Let the voices of our talented youth echo with pride and passion!',
      date: '15th November 2025 (Saturday)'
    },
    {
      title: 'Instrumental Music (Individual or Team)',
      description: 'Experience the rhythm and harmony at Pak Wattan\'s Instrumental Music Competition! Whether solo or in a team, showcase your musical talent in a celebration of creativity and sound.',
      date: '15th November 2025 (Saturday)'
    },
    {
      title: 'Quiz Competition',
      description: 'Get ready to challenge your knowledge! Separate syllabi have been prepared for Grades 6–7 and Grades 8–10. Participate individually or in teams and put your minds to the test in this exciting Quiz Competition at Pak Wattan.',
      date: '18th October 2025 (Saturday)'
    },
    {
      title: 'Spelling Bee Competition',
      description: 'Sharpen your spelling skills and join the exciting Spelling Bee Competition at Pak Wattan! A vocabulary list will be provided in advance to help participants prepare confidently.',
      date: '18th October 2025 (Saturday)'
    },
    {
      title: 'Handicrafts / DIY Crafts Competition',
      description: 'Unleash your creativity at Pak Wattan\'s Handicrafts & DIY Crafts Competition! Showcase your artistic talent through handmade creations and innovative do-it-yourself projects.',
      date: '13th December 2025 (Saturday)'
    },
    {
      title: 'Creative Writing (Story, Essay, Poem)',
      description: 'Let your imagination flow at Pak Wattan\'s Creative Writing Competition! Whether it\'s a story, an essay, or a poem, this is your chance to express your thoughts and creativity through words.',
      date: '13th September 2025 (Saturday)'
    },
    {
      title: 'Painting / Sketching / Calligraphy',
      description: 'Let your creativity shine at Pak Wattan\'s Art Competition! Whether you love painting, sketching, or calligraphy, this is the perfect opportunity to showcase your artistic talent and imagination.',
      date: '13th September 2025 (Saturday)'
    },
    {
      title: 'Career Counseling Seminar',
      description: 'Students get ready for the Career Counseling Seminar which is going to be held in Pak Wattan',
      date: '1st May, 2025 (Thursday)'
    },
    {
      title: 'Scholarship/ Entry Test (Grade XI)',
      description: 'Great opportunity for students to secure scholarship and fullfil their dreams.',
      date: '10th May, 2025 (Saturday)'
    },
    {
      title: 'Dastar Bandi',
      description: 'A significant milestone for our young students as they receive their Dastar Bandi.',
      date: '14th December, 2024 (Saturday)'
    },
    {
      title: 'Montessori Sports Gala',
      description: 'Get ready for an action-packed weekend of sports, fun, and friendship.',
      date: '18th & 19th November, 2024'
    },
    {
      title: 'Montessori Graduation Ceremony',
      description: 'Montessori Graduation Ceremony will be held on.',
      date: 'On January, 2025'
    },
    {
      title: 'Board Result Ceremony',
      description: 'Celebrating academic excellence and honoring outstanding achievements.',
      date: '15th February, 2025 (Saturday)'
    },
    {
      title: 'Scholarship Test',
      description: 'An opportunity for deserving students to secure scholarships and pursue their dreams.',
      date: '23rd March, 2025 (Sunday)'
    },
    {
      title: 'Annual Distribution Ceremony',
      description: 'Recognizing and rewarding outstanding performances and achievements.',
      date: '20th April, 2025 (Sunday)'
    }
  ]

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Three Column Layout - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        
        {/* Column 1: News & Events - Mobile Optimized */}
        <div className="lg:border-r border-gray-200">
          <div className="p-3 sm:p-4">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-primary-800 mb-2 flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                  <span className="text-white text-xs sm:text-sm">📢</span>
                </div>
                News & Events
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm ml-8 sm:ml-11">Latest announcements and updates</p>
            </div>
            
            <div className="space-y-1 sm:space-y-2 max-h-48 sm:max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100">
              {newsItems.slice(0, 4).map((item, index) => (
                <div key={index} className="group border-l-4 border-primary-500 pl-3 sm:pl-4 py-2 sm:py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300 rounded-r-lg hover:shadow-sm">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <span className="text-primary-600 text-xs sm:text-sm">📢</span>
                    </div>
                           <div className="flex-1 min-w-0 flex-text-fix">
                             <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm group-hover:text-primary-700 transition-colors duration-300 mobile-card-text">{item.title}</h4>
                             <p className="text-gray-600 mb-2 sm:mb-3 leading-relaxed text-xs mobile-text-container">{item.description}</p>
                             <div className="flex items-center space-x-2">
                               <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full group-hover:bg-primary-200 transition-colors duration-200 text-no-overlap">
                                 📅 {item.date}
                               </span>
                             </div>
                           </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Facebook Latest Post - Mobile Optimized */}
        <div className="lg:border-r border-gray-200">
          <div className="p-3 sm:p-4">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="text-base sm:text-lg font-bold text-primary-800 flex items-center">
                  <span className="text-lg sm:text-xl mr-1 sm:mr-2">🎬</span>
                  Latest Reel
                </h3>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2 sm:p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
                  title="Refresh latest reel"
                >
                  <svg 
                    className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-1 sm:space-y-0">
                <p className="text-gray-600 text-xs sm:text-sm">
                  <a 
                    href="https://www.facebook.com/PAKWATTAN2020" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
                  >
                    <span className="hidden sm:inline">Pak Wattan Facebook Page</span>
                    <span className="sm:hidden">Facebook Page</span>
                  </a>
                </p>
                {lastUpdated && (
                  <p className="text-xs text-gray-400">
                    Updated {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
            
            <div className="max-h-60 sm:max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary-200 rounded-full"></div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 font-medium">Loading latest reel...</p>
                  <p className="text-xs text-gray-400 mt-1">This may take a moment</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Unable to Load Reel</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{error}</p>
                  <div className="space-y-2">
                    <button
                      onClick={handleRefresh}
                      className="inline-flex items-center px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 touch-target"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Try Again
                    </button>
                    <div>
                      <a
                        href="https://www.facebook.com/PAKWATTAN2020"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium hover:underline touch-target"
                      >
                        <span className="hidden sm:inline">View on Facebook</span>
                        <span className="sm:hidden">Facebook</span>
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ) : latestPost ? (
                <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  {/* Post Header - Mobile Optimized */}
                  <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white font-bold text-xs sm:text-sm">PW</span>
                    </div>
                           <div className="flex-1 min-w-0 flex-text-fix">
                              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm text-no-overlap">{(latestPost.from as Record<string, unknown>).name as string}</h4>
                             <p className="text-xs text-gray-500 text-no-overlap">
                                {new Date(latestPost.created_time as string).toLocaleDateString('en-US', {
                                 month: 'short',
                                 day: 'numeric',
                                 hour: '2-digit',
                                 minute: '2-digit'
                               })}
                             </p>
                           </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="text-primary-500">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </div>
                      {isRefreshing && (
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-primary-300 border-t-primary-600 rounded-full animate-spin"></div>
                      )}
                    </div>
                  </div>
                  
                         {/* Post Content - Mobile Optimized */}
                         <div className="p-3 sm:p-4">
                           <p className="text-gray-800 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 mobile-text-container">
                              {latestPost.message as string}
                           </p>
                    
                    {/* Post Image/Reel - Mobile Responsive */}
                    {(latestPost.full_picture as string) && (
                      <div className="mb-3 sm:mb-4 rounded-lg overflow-hidden relative group/image">
                        <Image
                          src={latestPost.full_picture as string}
                          alt="Facebook post"
                          width={400}
                          height={144}
                          className="w-full h-24 sm:h-36 object-cover group-hover/image:scale-105 transition-transform duration-500"
                        />
                        {(latestPost.isReel as boolean) && (
                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 sm:space-x-1.5 shadow-lg">
                            <span className="text-xs sm:text-sm">🎬</span>
                            <span className="hidden sm:inline">REEL</span>
                            <span className="sm:hidden">R</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Engagement Stats - Mobile Optimized */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4 sm:mb-6">
                      <div className="flex items-center space-x-3 sm:space-x-6">
                        <span className="flex items-center space-x-1 sm:space-x-1.5 hover:text-blue-600 transition-colors duration-200 cursor-pointer touch-target">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-50 rounded-full flex items-center justify-center">
                            <span className="text-blue-500 text-xs">👍</span>
                          </div>
                          <span className="font-medium text-xs sm:text-sm">{((latestPost.likes as Record<string, unknown>)?.count as number) || 0}</span>
                        </span>
                        <span className="flex items-center space-x-1 sm:space-x-1.5 hover:text-gray-700 transition-colors duration-200 cursor-pointer touch-target">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-50 rounded-full flex items-center justify-center">
                            <span className="text-gray-500 text-xs">💬</span>
                          </div>
                          <span className="font-medium text-xs sm:text-sm">{((latestPost.comments as Record<string, unknown>)?.count as number) || 0}</span>
                        </span>
                        <span className="flex items-center space-x-1 sm:space-x-1.5 hover:text-green-600 transition-colors duration-200 cursor-pointer touch-target">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-50 rounded-full flex items-center justify-center">
                            <span className="text-green-500 text-xs">🔄</span>
                          </div>
                          <span className="font-medium text-xs sm:text-sm">{((latestPost.shares as Record<string, unknown>)?.count as number) || 0}</span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Action Button - Mobile Optimized */}
                      <a
                        href={latestPost.permalink_url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-center transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 touch-target"
                    >
                      <span>{latestPost.isReel ? 'Watch Reel' : 'View Post'}</span>
                      {latestPost.isReel ? (
                        <span className="text-sm sm:text-lg">🎬</span>
                      ) : (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📘</div>
                  <p className="text-sm mb-4">No recent posts available</p>
                  <a
                    href="https://www.facebook.com/PAKWATTAN2020"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Visit Facebook Page
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Quick Links - Mobile Optimized */}
        <div>
          <div className="p-3 sm:p-4">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-primary-800 mb-2 flex items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-accent-500 to-primary-500 rounded-lg flex items-center justify-center mr-2 sm:mr-3">
                  <span className="text-white text-xs sm:text-sm">🔗</span>
                </div>
                Quick Links
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm ml-8 sm:ml-11">Navigate quickly to key sections</p>
            </div>
            
            <div className="space-y-1 sm:space-y-2 max-h-48 sm:max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100">
              {secondaryNavigation.map((item, index) => (
                <div key={index} className="group">
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300 hover:shadow-sm touch-target"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-300 group-hover:scale-105 flex-shrink-0">
                      <span className="text-sm sm:text-lg">{item.icon}</span>
                    </div>
                           <div className="flex-1 min-w-0 flex-text-fix">
                             <h4 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors duration-300 text-xs sm:text-sm text-no-overlap mobile-card-text">{item.name}</h4>
                             <p className="text-xs text-gray-600 hidden sm:block mobile-text-container">{item.description}</p>
                           </div>
                    <div className="text-primary-400 group-hover:text-primary-600 transition-colors duration-300 group-hover:translate-x-1 flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                  
                  {/* Submenu - Mobile Optimized */}
                  {item.submenu && (
                    <div className="ml-4 sm:ml-5 space-y-0.5 sm:space-y-1">
                      {item.submenu.slice(0, 2).map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="group/sub flex items-center space-x-1.5 sm:space-x-2 py-1.5 sm:py-2 px-2 sm:px-3 text-xs text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 rounded-md sm:rounded-lg hover:shadow-sm touch-target"
                        >
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary-400 rounded-full opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200 flex-shrink-0"></div>
                                 <span className="font-medium text-no-overlap text-xs">{subItem.name}</span>
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
      
      {/* Footer - Mobile Optimized */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full animate-pulse"></div>
                   <p className="text-xs text-gray-600 text-no-overlap">
                     <span className="font-semibold text-primary-600">Live Updates</span>
                     <span className="hidden sm:inline"> - Auto-refreshing content</span>
                   </p>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href="https://www.facebook.com/PAKWATTAN2020"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary-600 transition-colors duration-200 touch-target"
              title="Follow us on Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {lastUpdated && (
                     <p className="text-xs text-gray-400 text-no-overlap">
                       <span className="hidden sm:inline">Last updated: </span>
                       <span className="sm:hidden">Updated: </span>
                       {lastUpdated.toLocaleTimeString()}
                     </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreakingNewsSidebar
