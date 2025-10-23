// YouTube API integration for fetching latest videos
// Note: This requires a YouTube Data API key

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  publishedAt: string
  channelTitle: string
  videoUrl: string
}

export interface YouTubeChannel {
  id: string
  title: string
  description: string
  thumbnail: string
  subscriberCount: string
  videoCount: string
  channelUrl: string
}

// YouTube API configuration
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || ''
const CHANNEL_ID = 'UCpakwattanSchoolCollege' // Replace with actual channel ID
const CHANNEL_USERNAME = '@pakwattanSchoolCollege'

// Fallback videos when API is not available
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: 'edf2-HxPxxs',
    title: 'MD Message - Managing Director',
    description: 'Message of Managing Director, Sardar Abdul Aqeel - The Pakwattan School & College of Sciences, Havelian',
    thumbnail: 'https://img.youtube.com/vi/edf2-HxPxxs/maxresdefault.jpg',
    duration: '10:25',
    views: '2.5K',
    publishedAt: '2024-01-15T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=edf2-HxPxxs'
  },
  {
    id: 'OH7yYQdmsDg',
    title: 'Graduation Ceremony - Dastar-e-Fazilat',
    description: 'Alhamdulillah! تقریب دستار فضیلت پاک وطن سکول اینڈ کالج آف سائنسز حویلیاں حفاظ کرام کے اعزاز میں بابرکت تقریب کا انعقاد',
    thumbnail: 'https://img.youtube.com/vi/OH7yYQdmsDg/maxresdefault.jpg',
    duration: '15:30',
    views: '3.2K',
    publishedAt: '2023-12-20T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=OH7yYQdmsDg'
  },
  {
    id: 'AnnualSportsDay2024',
    title: 'Annual Sports Day 2024',
    description: 'Highlights from our annual sports day with various competitions, races, and athletic activities showcasing student talent and sportsmanship',
    thumbnail: '/images/video-gallery/53.jpg',
    duration: '8:45',
    views: '1.8K',
    publishedAt: '2024-03-15T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=AnnualSportsDay2024'
  },
  {
    id: 'ScienceFair2024',
    title: 'Science Fair Exhibition 2024',
    description: 'Students showcasing their innovative science projects, experiments, and scientific discoveries in our annual science fair',
    thumbnail: '/images/video-gallery/54.jpg',
    duration: '12:30',
    views: '2.1K',
    publishedAt: '2024-02-20T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=ScienceFair2024'
  },
  {
    id: 'CulturalDay2024',
    title: 'Cultural Day Celebration 2024',
    description: 'Colorful cultural performances, traditional dances, music, and artistic expressions by our talented students',
    thumbnail: '/images/video-gallery/55.jpg',
    duration: '18:15',
    views: '3.5K',
    publishedAt: '2024-01-10T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=CulturalDay2024'
  },
  {
    id: 'PrizeDistribution2023',
    title: 'Annual Prize Distribution Ceremony 2023',
    description: 'Recognition of outstanding students, academic achievements, and special awards in our annual prize distribution ceremony',
    thumbnail: '/images/video-gallery/56.jpg',
    duration: '25:45',
    views: '4.2K',
    publishedAt: '2023-12-05T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=PrizeDistribution2023'
  },
  {
    id: 'DebateCompetition2024',
    title: 'Inter-School Debate Competition 2024',
    description: 'Talented students participating in inter-school debate competition, showcasing their oratory skills and critical thinking',
    thumbnail: '/images/video-gallery/57.jpg',
    duration: '22:30',
    views: '1.9K',
    publishedAt: '2024-01-25T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=DebateCompetition2024'
  },
  {
    id: 'QiratCompetition2024',
    title: 'Qirat & Naat Competition 2024',
    description: 'Beautiful recitation of Quran and Naat by our students in the annual Qirat and Naat competition',
    thumbnail: '/images/video-gallery/58.jpg',
    duration: '16:20',
    views: '2.8K',
    publishedAt: '2024-02-10T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=QiratCompetition2024'
  },
  {
    id: 'SpellingBee2024',
    title: 'Spelling Bee Competition 2024',
    description: 'Students showcasing their vocabulary skills and spelling abilities in our annual spelling bee competition',
    thumbnail: '/images/video-gallery/59.jpg',
    duration: '14:35',
    views: '1.5K',
    publishedAt: '2024-03-05T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=SpellingBee2024'
  },
  {
    id: 'ArtCompetition2024',
    title: 'Art & Craft Competition 2024',
    description: 'Creative artwork, paintings, and handicrafts by students in our annual art and craft competition',
    thumbnail: '/images/video-gallery/60.jpg',
    duration: '11:45',
    views: '1.7K',
    publishedAt: '2024-02-28T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=ArtCompetition2024'
  },
  {
    id: 'CareerCounseling2024',
    title: 'Career Counseling Seminar 2024',
    description: 'Career guidance and counseling session for students to help them choose the right career path and educational goals',
    thumbnail: '/images/video-gallery/61.jpg',
    duration: '35:20',
    views: '2.3K',
    publishedAt: '2024-01-30T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=CareerCounseling2024'
  },
  {
    id: 'ScholarshipTest2024',
    title: 'Scholarship Test 2024',
    description: 'Annual scholarship test for deserving students to secure financial assistance for their education',
    thumbnail: '/images/video-gallery/62.jpg',
    duration: '28:15',
    views: '3.1K',
    publishedAt: '2024-03-10T00:00:00Z',
    channelTitle: 'Pak Wattan School & College of Sciences',
    videoUrl: 'https://www.youtube.com/watch?v=ScholarshipTest2024'
  }
]

// Format duration from ISO 8601 to readable format
function formatDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return '0:00'
  
  const hours = parseInt(match[1] || '0')
  const minutes = parseInt(match[2] || '0')
  const seconds = parseInt(match[3] || '0')
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// Format view count
function formatViewCount(viewCount: string): string {
  const count = parseInt(viewCount)
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

// Fetch channel information
export async function getChannelInfo(): Promise<YouTubeChannel | null> {
  if (!YOUTUBE_API_KEY) {
    return {
      id: CHANNEL_ID,
      title: 'Pak Wattan School & College of Sciences',
      description: 'Official YouTube channel of Pak Wattan School & College of Sciences, Havelian',
      thumbnail: 'https://img.youtube.com/vi/edf2-HxPxxs/maxresdefault.jpg',
      subscriberCount: '1.2K',
      videoCount: '50+',
      channelUrl: `https://www.youtube.com/${CHANNEL_USERNAME}`
    }
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch channel info')
    }
    
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      const channel = data.items[0]
      return {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        thumbnail: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default?.url,
        subscriberCount: formatViewCount(channel.statistics.subscriberCount),
        videoCount: formatViewCount(channel.statistics.videoCount),
        channelUrl: `https://www.youtube.com/channel/${channel.id}`
      }
    }
  } catch (error) {
    console.error('Error fetching channel info:', error)
  }
  
  return null
}

// Fetch latest videos from channel
export async function getLatestVideos(maxResults: number = 10): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.log('YouTube API key not provided, using fallback videos')
    return FALLBACK_VIDEOS.slice(0, maxResults)
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch videos')
    }
    
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      // Get video details for each video
      const videoIds = data.items.map((item: Record<string, unknown>) => (item.id as Record<string, unknown>).videoId).join(',')
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      )
      
      if (detailsResponse.ok) {
        const detailsData = await detailsResponse.json()
        
        return detailsData.items.map((video: Record<string, unknown>) => ({
          id: video.id,
          title: (video.snippet as Record<string, unknown>).title as string,
          description: (video.snippet as Record<string, unknown>).description as string,
          thumbnail: (((video.snippet as Record<string, unknown>).thumbnails as Record<string, unknown>).high as Record<string, unknown>)?.url || (((video.snippet as Record<string, unknown>).thumbnails as Record<string, unknown>).default as Record<string, unknown>)?.url,
          duration: formatDuration((video.contentDetails as Record<string, unknown>).duration as string),
          views: formatViewCount((video.statistics as Record<string, unknown>).viewCount as string),
          publishedAt: (video.snippet as Record<string, unknown>).publishedAt as string,
          channelTitle: (video.snippet as Record<string, unknown>).channelTitle as string,
          videoUrl: `https://www.youtube.com/watch?v=${video.id}`
        }))
      }
    }
  } catch (error) {
    console.error('Error fetching videos:', error)
  }
  
  // Return fallback videos if API fails
  return FALLBACK_VIDEOS.slice(0, maxResults)
}

// Search videos by query
export async function searchVideos(query: string, maxResults: number = 10): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    return FALLBACK_VIDEOS.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.description.toLowerCase().includes(query.toLowerCase())
    ).slice(0, maxResults)
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to search videos')
    }
    
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      const videoIds = data.items.map((item: Record<string, unknown>) => (item.id as Record<string, unknown>).videoId).join(',')
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      )
      
      if (detailsResponse.ok) {
        const detailsData = await detailsResponse.json()
        
        return detailsData.items.map((video: Record<string, unknown>) => ({
          id: video.id,
          title: (video.snippet as Record<string, unknown>).title as string,
          description: (video.snippet as Record<string, unknown>).description as string,
          thumbnail: (((video.snippet as Record<string, unknown>).thumbnails as Record<string, unknown>).high as Record<string, unknown>)?.url || (((video.snippet as Record<string, unknown>).thumbnails as Record<string, unknown>).default as Record<string, unknown>)?.url,
          duration: formatDuration((video.contentDetails as Record<string, unknown>).duration as string),
          views: formatViewCount((video.statistics as Record<string, unknown>).viewCount as string),
          publishedAt: (video.snippet as Record<string, unknown>).publishedAt as string,
          channelTitle: (video.snippet as Record<string, unknown>).channelTitle as string,
          videoUrl: `https://www.youtube.com/watch?v=${video.id}`
        }))
      }
    }
  } catch (error) {
    console.error('Error searching videos:', error)
  }
  
  return []
}

// Get video categories
export function getVideoCategories(): string[] {
  return [
    'all',
    'events',
    'academic',
    'sports',
    'cultural',
    'achievements',
    'announcements',
    'ceremonies'
  ]
}

// Categorize video based on title and description
export function categorizeVideo(video: YouTubeVideo): string {
  const title = video.title.toLowerCase()
  // const description = video.description.toLowerCase()
  
  if (title.includes('sports') || title.includes('athletic') || title.includes('game')) {
    return 'sports'
  } else if (title.includes('graduation') || title.includes('ceremony') || title.includes('prize')) {
    return 'ceremonies'
  } else if (title.includes('message') || title.includes('announcement') || title.includes('news')) {
    return 'announcements'
  } else if (title.includes('academic') || title.includes('study') || title.includes('education')) {
    return 'academic'
  } else if (title.includes('cultural') || title.includes('performance') || title.includes('dance')) {
    return 'cultural'
  } else if (title.includes('award') || title.includes('achievement') || title.includes('success')) {
    return 'achievements'
  }
  
  return 'events'
}
