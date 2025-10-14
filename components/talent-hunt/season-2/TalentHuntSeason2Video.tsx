'use client'

import { useState } from 'react'
import { Calendar, Clock, Trophy, Play, Pause } from 'lucide-react'

const TalentHuntSeason2Video = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-800 to-accent-800">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Video Banner */}
          <div className="relative bg-gradient-to-br from-primary-900 to-accent-900 rounded-3xl overflow-hidden shadow-2xl">
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
                  <div className="text-center text-white">
                    <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-300" />
                    <h3 className="text-3xl font-bold mb-4">Talent Hunt Season-II</h3>
                    <p className="text-xl opacity-90 mb-2">10 Contest Streams</p>
                    <p className="text-lg opacity-80">Diverse talent areas covered</p>
                  </div>
                </div>
              </video>
              
              {/* No overlays - clean video */}
            </div>
          </div>
          
          {/* Video Description */}
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Talent Hunt Season-II Promotional Video
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
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
