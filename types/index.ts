// Shared types and interfaces for PakWattanModern application

export interface NavigationItem {
  name: string
  href: string
  submenu?: NavigationItem[]
  icon?: string
  description?: string
}

export interface QuickLink {
  icon: React.ReactNode
  title: string
  href: string
  description?: string
}

export interface Achievement {
  icon: React.ReactNode
  count: number
  label: string
  color: string
}

export interface Event {
  date: string
  month: string
  title: string
  description: string
  time: string
}

export interface VideoConfig {
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

export interface YouTubePlayerConfig {
  height: string
  width: string
  videoId: string
  playerVars: {
    controls: number
    showinfo: number
    modestbranding: number
    loop: number
    playlist: string
    autoplay: number
    mute: number
    rel: number
    fs: number
  }
  events: {
    onReady: (event: any) => void
  }
}

export interface User {
  id: string
  name: string
  email: string
  type: 'student' | 'teacher' | 'admin' | 'parent'
  avatar?: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  socialMedia: {
    facebook: string
    youtube: string
    twitter: string
  }
}

export interface SchoolInfo {
  name: string
  fullName: string
  established: number
  description: string
  logo: string
  contact: ContactInfo
}

// Component Props Types
export interface SectionProps {
  className?: string
  children: React.ReactNode
}

export interface CardProps {
  className?: string
  children: React.ReactNode
  hover?: boolean
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
  onClick?: () => void
  href?: string
  disabled?: boolean
  loading?: boolean
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Google Maps Types
export interface CampusLocation {
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  email: string
}

export interface MapMarker {
  position: { lat: number; lng: number }
  title: string
  infoWindow?: string
}

// Environment Variables Type
export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test'
  NEXT_PUBLIC_SITE_URL: string
  NEXT_PUBLIC_API_URL: string
  NEXT_PUBLIC_APP_NAME: string
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string
  YOUTUBE_API_KEY?: string
  YOUTUBE_CHANNEL_ID?: string
  NEXT_PUBLIC_GA_ID?: string
  DATABASE_URL?: string
  CUSTOM_KEY?: string
}
