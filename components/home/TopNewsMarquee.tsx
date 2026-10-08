'use client'

import { useState, useEffect, useRef, useCallback, type CSSProperties } from 'react'
import { getMarqueeNews } from '@/lib/api/news'
import Container from '@/components/ui/Container'
import { Loader2 } from 'lucide-react'

/** Target scroll speed in px/sec — slower on narrow screens for readability */
function getReadableSpeedPxPerSec(viewportWidth: number) {
  if (viewportWidth < 480) return 28
  if (viewportWidth < 768) return 36
  return 48
}

const TopNewsMarquee = () => {
  const [marqueeItems, setMarqueeItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [durationSec, setDurationSec] = useState(60)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMarqueeNews = async () => {
      try {
        setLoading(true)
        const news = await getMarqueeNews(50)
        setMarqueeItems(news.map((item) => item.title))
      } catch (error) {
        console.error('Error fetching marquee news:', error)
        setMarqueeItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchMarqueeNews()
  }, [])

  const measureDuration = useCallback(() => {
    const track = trackRef.current
    if (!track || marqueeItems.length === 0) return

    // Track contains two copies; one loop distance is half the scroll width
    const loopWidth = track.scrollWidth / 2
    if (loopWidth <= 0) return

    const speed = getReadableSpeedPxPerSec(window.innerWidth)
    const seconds = Math.max(40, Math.min(180, loopWidth / speed))
    setDurationSec(seconds)
  }, [marqueeItems.length])

  useEffect(() => {
    if (loading || marqueeItems.length === 0) return

    measureDuration()
    const onResize = () => measureDuration()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [loading, marqueeItems, measureDuration])

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

  const renderItems = (keyPrefix: string) =>
    marqueeItems.map((item, index) => (
      <span
        key={`${keyPrefix}-${index}`}
        className="inline-flex shrink-0 items-center mr-6 sm:mr-12 px-2.5 sm:px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm"
      >
        {item}
      </span>
    ))

  return (
    <div className="bg-gradient-to-r from-accent-400 via-accent-500 to-accent-400 text-black py-1 pt-14 sm:pt-16 text-sm sm:text-base font-bold shadow-lg relative overflow-hidden">
      <Container className="text-center px-4">
        <div
          className="overflow-hidden relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onTouchCancel={() => setPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-accent-400 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-accent-400 to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className={`animate-marquee whitespace-nowrap${paused ? ' is-paused' : ''}`}
            style={{ '--marquee-duration': `${durationSec}s` } as CSSProperties}
            aria-label="Latest school news"
          >
            {renderItems('a')}
            {renderItems('b')}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TopNewsMarquee
