'use client'

import { NEWS_MARQUEE_ITEMS } from '@/lib/constants'
import Container from '@/components/ui/Container'

const TopNewsMarquee = () => {
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
              {NEWS_MARQUEE_ITEMS.map((item, index) => (
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
