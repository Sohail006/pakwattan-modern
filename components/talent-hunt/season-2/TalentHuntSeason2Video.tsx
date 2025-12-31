'use client'

import { useState } from 'react'
import { Trophy } from 'lucide-react'

const TalentHuntSeason2Video = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  // const handlePlayPause = () => {
  //   setIsPlaying(!isPlaying)
  // }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-primary-800 to-accent-800">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Video Banner */}
          <div className="relative bg-gradient-to-br from-primary-900 to-accent-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            {/* Video Container */}
            <div className="aspect-video relative bg-black">
              <video
                className="w-full h-full object-cover"
                poster="/images/talent-hunt/season-2-poster.jpg"
                controls={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                style={{ filter: 'brightness(1.1) contrast(1.2) saturate(1.1)' }}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/images/talent-hunt/talentHuntSeason2.mp4" type="video/mp4" />
                {/* Fallback content if video doesn't load */}
                <div className="w-full h-full bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <Trophy className="w-12 h-12 sm:w-16 sm:h-20 mx-auto mb-3 sm:mb-4 lg:mb-6 text-yellow-300" />
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 lg:mb-4 break-words">Talent Hunt Season-II</h3>
                    <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-1 sm:mb-2 break-words">10 Contest Streams</p>
                    <p className="text-sm sm:text-base lg:text-lg opacity-80 break-words">Diverse talent areas covered</p>
                  </div>
                </div>
              </video>
              
              {/* No overlays - clean video */}
            </div>
          </div>
          
          {/* Video Description */}
          <div className="mt-6 sm:mt-8 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 break-words">
              Talent Hunt Season-II Promotional Video
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed break-words px-4">
              Watch our promotional video to learn more about the 10 exciting contest streams 
              and how you can participate in the district-level talent hunt competition.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TalentHuntSeason2Video
