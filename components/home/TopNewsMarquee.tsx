'use client'

import { useState, useEffect } from 'react'
import { getMarqueeNews } from '@/lib/api/news'
import Container from '@/components/ui/Container'
import { Loader2 } from 'lucide-react'

const TopNewsMarquee = () => {
  const [marqueeItems, setMarqueeItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarqueeNews = async () => {
      try {
        setLoading(true)
        const news = await getMarqueeNews(50)
        // Convert news items to display strings
        const items = news.map(item => item.title)
        setMarqueeItems(items)
      } catch (error) {
        console.error('Error fetching marquee news:', error)
        setMarqueeItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchMarqueeNews()
  }, [])

  if (loading) {
    return (
      <div
        className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400 text-black py-1 pt-14 sm:pt-16 text-sm sm:text-base font-bold shadow-lg relative overflow-hidden"
        role="status"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading latest news"
      >
        <Container className="text-center px-4">
          <div className="flex items-center justify-center py-2">
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
          </div>
        </Container>
      </div>
    )
  }

  if (marqueeItems.length === 0) {
    return (
      <div
        className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400 text-black py-1 pt-14 sm:pt-16 text-sm sm:text-base font-bold shadow-lg relative overflow-hidden min-h-[3rem]"
        aria-hidden
      />
    )
  }

  return (
    <div className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400 text-black py-1 pt-14 sm:pt-16 text-sm sm:text-base font-bold shadow-lg relative overflow-hidden">
      <Container className="text-center px-4">
        <div className="overflow-hidden relative">
          {/* Enhanced gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-accent-400 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-accent-400 to-transparent z-10"></div>
          
          {/* Pause on hover for better UX */}
          <div className="hover:pause-animation">
            <div className="animate-marquee whitespace-nowrap">
              {marqueeItems.map((item, index) => (
                <span key={`marquee-${index}`} className="inline-block mr-6 sm:mr-12 px-2 sm:px-3 py-0.5 bg-white/20 rounded-full text-xs sm:text-sm break-words">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TopNewsMarquee
