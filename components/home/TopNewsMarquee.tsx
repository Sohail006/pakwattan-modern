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
        const news = await getMarqueeNews(10)
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
      <div className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400 text-black py-1 pt-14 text-base font-bold shadow-lg relative overflow-hidden">
        <Container className="text-center">
          <div className="flex items-center justify-center py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        </Container>
      </div>
    )
  }

  if (marqueeItems.length === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400 text-black py-1 pt-14 text-base font-bold shadow-lg relative overflow-hidden">
      <Container className="text-center">
        <div className="overflow-hidden relative">
          {/* Enhanced gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-accent-400 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-accent-400 to-transparent z-10"></div>
          
          {/* Pause on hover for better UX */}
          <div className="hover:pause-animation">
            <div className="animate-marquee whitespace-nowrap">
              {marqueeItems.map((item, index) => (
                <span key={index} className="inline-block mr-12 px-3 py-0.5 bg-white/20 rounded-full">
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
