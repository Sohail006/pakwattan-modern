'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Play } from 'lucide-react'

// Declare YouTube API types
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

const NewsAndEvents = () => {
  const [mdMessagePlayer, setMdMessagePlayer] = useState<any>(null)
  const [graduationPlayer, setGraduationPlayer] = useState<any>(null)
  const [isYouTubeLoaded, setIsYouTubeLoaded] = useState(false)

  const events = [
    {
      date: '26',
      month: 'June, 2024',
      title: 'SUMMER TIMING',
      description: 'Summer morning timing of PWSCS is:',
      time: '07:30 am – 02:10 pm'
    },
    {
      date: '26',
      month: 'June, 2024',
      title: 'WINTER TIMING',
      description: 'Winter timing of PWSCS is:',
      time: '08:00 am – 01:45 pm'
    },
    {
      date: '23',
      month: 'March, 2024',
      title: 'SCHOLARSHIP TEST',
      description: 'Girls Campus Havelian',
      time: '08:30 AM'
    }
  ]

  useEffect(() => {
    // Set up YouTube API ready callback
    window.onYouTubeIframeAPIReady = () => {
      setIsYouTubeLoaded(true)
    }

    // Load YouTube API if not already loaded
    if (!window.YT) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/player_api'
      script.async = true
      document.head.appendChild(script)
    } else {
      setIsYouTubeLoaded(true)
    }

    return () => {
      // Cleanup
      if (mdMessagePlayer) {
        mdMessagePlayer.destroy()
      }
      if (graduationPlayer) {
        graduationPlayer.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (isYouTubeLoaded && window.YT && window.YT.Player) {
      // Initialize MD Message Player
      const mdPlayer = new window.YT.Player('md-message-player', {
        height: '315',
        width: '100%',
        videoId: 'edf2-HxPxxs',
        playerVars: {
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          loop: 1,
          playlist: 'edf2-HxPxxs',
          autoplay: 1,
          mute: 1,
          rel: 0,
          fs: 0
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo()
            event.target.setVolume(0)
          }
        }
      })
      setMdMessagePlayer(mdPlayer)

      // Initialize Graduation Ceremony Player
      const gradPlayer = new window.YT.Player('graduation-player', {
        height: '315',
        width: '100%',
        videoId: 'OH7yYQdmsDg',
        playerVars: {
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          loop: 1,
          playlist: 'OH7yYQdmsDg',
          autoplay: 1,
          mute: 1,
          rel: 0,
          fs: 0
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo()
            event.target.setVolume(0)
          }
        }
      })
      setGraduationPlayer(gradPlayer)
    }
  }, [isYouTubeLoaded])

  return (
    <section className="py-12 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4">
            News and <span className="text-gradient">Events</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MD Message */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Play className="w-5 h-5 mr-2" />
                MD Message
              </h3>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {!isYouTubeLoaded ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-gray-600 text-sm">Loading video...</p>
                    </div>
                  </div>
                ) : (
                  <div id="md-message-player" className="w-full h-full"></div>
                )}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Message of Managing Director, <span className="font-semibold text-primary-600">Sardar Abdul Aqeel</span> - 
                The Pakwattan School & College of Sciences, Havelian
              </p>
            </div>
          </div>

          {/* Graduation Ceremony */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-accent-500 to-primary-500 p-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Graduation Ceremony
              </h3>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {!isYouTubeLoaded ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-gray-600 text-sm">Loading video...</p>
                    </div>
                  </div>
                ) : (
                  <div id="graduation-player" className="w-full h-full"></div>
                )}
              </div>
              <div className="text-gray-600 text-sm space-y-2">
                <p className="font-semibold text-accent-600">Alhamdulillah!</p>
                <p className="text-xs leading-relaxed">
                  تقریب دستار فضیلت پاک وطن سکول اینڈ کالج آف سائنسز حویلیاں
                  حفاظ کرام کے اعزاز میں بابرکت تقریب کا انعقاد
                </p>
                <p className="text-xs text-gray-500 italic">
                  (The blessed ceremony of Dastar-e-Fazilat of Pak Watan School and College of Sciences Havelian was held in honor of the Huffaz)
                </p>
              </div>
            </div>
          </div>

          {/* News & Events */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                News & Events
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100">
                {events.map((event, index) => (
                  <div key={index} className="flex space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-lg flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-sm font-bold">{event.date}</span>
                        <span className="text-xs">{event.month.split(',')[0]}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-primary-700 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {event.description}
                      </p>
                      <div className="flex items-center text-xs text-primary-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsAndEvents
