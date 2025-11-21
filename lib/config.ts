// Configuration for YouTube API integration

export const YOUTUBE_CONFIG = {
  // YouTube API Key - Get from Google Cloud Console
  API_KEY: process.env.YOUTUBE_API_KEY || '',
  
  // Channel Configuration
  CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID || 'UCpakwattanSchoolCollege',
  CHANNEL_USERNAME: process.env.YOUTUBE_CHANNEL_USERNAME || '@pakwattanSchoolCollege',
  
  // Cache Configuration
  CACHE_DURATION: parseInt(process.env.YOUTUBE_CACHE_DURATION || '60'), // minutes
  
  // API Endpoints
  BASE_URL: 'https://www.googleapis.com/youtube/v3',
  
  // Default Settings
  DEFAULT_MAX_RESULTS: 10,
  MAX_RESULTS_LIMIT: 50,
}

// YouTube API Setup Instructions
export const YOUTUBE_SETUP_INSTRUCTIONS = {
  title: 'YouTube API Setup',
  steps: [
    '1. Go to Google Cloud Console (https://console.cloud.google.com/)',
    '2. Create a new project or select existing one',
    '3. Enable YouTube Data API v3',
    '4. Create credentials (API Key)',
    '5. Copy the API key to your .env.local file',
    '6. Set YOUTUBE_API_KEY=your_api_key_here'
  ],
  benefits: [
    'Real-time video fetching',
    'Automatic thumbnail generation',
    'View count and statistics',
    'Channel information',
    'Search functionality'
  ]
}

// Backend API configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5000',
}

// Fallback configuration when API is not available
export const FALLBACK_CONFIG = {
  enabled: true,
  videos: [
    {
      id: 'edf2-HxPxxs',
      title: 'MD Message - Managing Director',
      description: 'Message of Managing Director, Sardar Abdul Aqeel',
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
      description: 'Alhamdulillah! تقریب دستار فضیلت پاک وطن سکول اینڈ کالج آف سائنسز حویلیاں',
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
      description: 'Highlights from our annual sports day with various competitions and activities',
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
      description: 'Students showcasing their innovative science projects and experiments',
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
      description: 'Colorful cultural performances and traditional dances by students',
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
      description: 'Recognition of outstanding students and their achievements',
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
      description: 'Talented students participating in inter-school debate competition',
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
      description: 'Beautiful recitation of Quran and Naat by our students',
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
      description: 'Students showcasing their vocabulary skills and spelling abilities',
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
      description: 'Creative artwork, paintings, and handicrafts by students',
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
      description: 'Career guidance and counseling session for students',
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
      description: 'Annual scholarship test for deserving students',
      thumbnail: '/images/video-gallery/62.jpg',
      duration: '28:15',
      views: '3.1K',
      publishedAt: '2024-03-10T00:00:00Z',
      channelTitle: 'Pak Wattan School & College of Sciences',
      videoUrl: 'https://www.youtube.com/watch?v=ScholarshipTest2024'
    }
  ],
  channel: {
    id: 'UCpakwattanSchoolCollege',
    title: 'Pak Wattan School & College of Sciences',
    description: 'Official YouTube channel of Pak Wattan School & College of Sciences, Havelian',
    thumbnail: 'https://img.youtube.com/vi/edf2-HxPxxs/maxresdefault.jpg',
    subscriberCount: '1.2K',
    videoCount: '50+',
    channelUrl: 'https://www.youtube.com/@pakwattanSchoolCollege'
  }
}
