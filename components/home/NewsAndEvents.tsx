'use client'

import { useEffect, useState } from 'react'
import { Calendar, Clock, Play, Loader2 } from 'lucide-react'
import { getEvents, Event } from '@/lib/api/events'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { useYouTube } from '@/hooks/useYouTube'
import { YouTubePlayerConfig, YouTubePlayer } from '@/types'
import { YOUTUBE_VIDEOS } from '@/lib/constants'

const NewsAndEvents = () => {
  const { isLoaded, createPlayer } = useYouTube()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [mdMessagePlayer, setMdMessagePlayer] = useState<YouTubePlayer | null>(null)
  const [graduationPlayer, setGraduationPlayer] = useState<YouTubePlayer | null>(null)

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        // Get all published events, sorted by date (most recent first)
        // This shows both upcoming and recent events
        const response = await getEvents({
          page: 1,
          pageSize: 5,
          isPublished: true,
          sortBy: 'date',
          sortOrder: 'desc'
        })
        setEvents(response.data || [])
      } catch (error) {
        console.error('Error fetching events:', error)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    if (isLoaded && createPlayer) {
      // Initialize MD Message Player (only if not already created)
      if (!mdMessagePlayer && document.getElementById('md-message-player')) {
        const mdPlayerConfig: YouTubePlayerConfig = {
          height: '315',
          width: '100%',
          videoId: YOUTUBE_VIDEOS.MD_MESSAGE,
          playerVars: {
            controls: 1,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            playlist: YOUTUBE_VIDEOS.MD_MESSAGE,
            autoplay: 1,
            mute: 1,
            rel: 0,
            fs: 1
          },
          events: {
            onReady: (event) => {
              // Ensure video plays and is muted
              event.target.playVideo()
              event.target.setVolume(0)
              console.log('MD Message video player ready - autoplay muted')
            }
          }
        }
        const mdPlayer = createPlayer('md-message-player', mdPlayerConfig)
        if (mdPlayer) {
          setMdMessagePlayer(mdPlayer)
        }
      }

      // Initialize Graduation Ceremony Player (only if not already created)
      if (!graduationPlayer && document.getElementById('graduation-player')) {
        const gradPlayerConfig: YouTubePlayerConfig = {
          height: '315',
          width: '100%',
          videoId: YOUTUBE_VIDEOS.GRADUATION_CEREMONY,
          playerVars: {
            controls: 1,
            showinfo: 0,
            modestbranding: 1,
            loop: 1,
            playlist: YOUTUBE_VIDEOS.GRADUATION_CEREMONY,
            autoplay: 1,
            mute: 1,
            rel: 0,
            fs: 1
          },
          events: {
            onReady: (event) => {
              // Ensure video plays and is muted
              event.target.playVideo()
              event.target.setVolume(0)
              console.log('Graduation Ceremony video player ready - autoplay muted')
            }
          }
        }
        const gradPlayer = createPlayer('graduation-player', gradPlayerConfig)
        if (gradPlayer) {
          setGraduationPlayer(gradPlayer)
        }
      }
    }
  }, [isLoaded, createPlayer, mdMessagePlayer, graduationPlayer])

  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-gradient-to-br from-primary-50 to-accent-50">
      <Container>
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-3 sm:mb-4 break-words">
            News and <span className="text-gradient">Events</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* MD Message */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="truncate">MD Message</span>
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                {!isLoaded ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-gray-600 text-xs sm:text-sm">Loading video...</p>
                    </div>
                  </div>
                ) : (
                  <div id="md-message-player" className="w-full h-full"></div>
                )}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed break-words">
                Message of Managing Director, <span className="font-semibold text-primary-600">Sardar Abdul Aqeel</span> - 
                The Pakwattan School & College of Sciences, Havelian
              </p>
            </div>
          </Card>

          {/* Graduation Ceremony */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-accent-500 to-primary-500 p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="truncate">Graduation Ceremony</span>
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                {!isLoaded ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-gray-600 text-xs sm:text-sm">Loading video...</p>
                    </div>
                  </div>
                ) : (
                  <div id="graduation-player" className="w-full h-full"></div>
                )}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm space-y-1.5 sm:space-y-2">
                <p className="font-semibold text-accent-600 break-words">Alhamdulillah!</p>
                <p className="text-xs leading-relaxed break-words">
                  تقریب دستار فضیلت پاک وطن سکول اینڈ کالج آف سائنسز حویلیاں
                  حفاظ کرام کے اعزاز میں بابرکت تقریب کا انعقاد
                </p>
                <p className="text-xs text-gray-500 italic break-words">
                  (The blessed ceremony of Dastar-e-Fazilat of Pak Watan School and College of Sciences Havelian was held in honor of the Huffaz)
                </p>
              </div>
            </div>
          </Card>

          {/* News & Events */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="truncate">News & Events</span>
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-6 sm:py-8">
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-primary-600" />
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100">
                  {events.map((event) => {
                    const eventDate = new Date(event.date)
                    return (
                      <div key={event.id} className="flex space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-primary-50 active:bg-primary-100 transition-colors group">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-lg flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <span className="text-xs sm:text-sm font-bold">{eventDate.getDate()}</span>
                            <span className="text-xs">{eventDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 group-hover:text-primary-700 transition-colors break-words">
                            {event.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-2 break-words">
                            {event.description}
                          </p>
                          {event.time && (
                            <div className="flex items-center text-xs text-primary-600">
                              <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                              <span>{event.time.substring(0, 5)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <p className="text-xs sm:text-sm break-words">No upcoming events</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  )
}

export default NewsAndEvents
