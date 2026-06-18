import { api, ApiError } from './client'

export interface GalleryVideo {
  id: number
  youtubeUrl: string
  youtubeVideoId: string
  title: string
  description?: string
  thumbnailUrl?: string
  category: string
  displayOrder: number
  isPublished: boolean
  isFeatured: boolean
  duration?: string
  publishedAt?: string
  createdAt: string
  updatedAt?: string
  videoUrl: string
  embedUrl: string
}

export interface CreateGalleryVideoRequest {
  youtubeUrl: string
  title?: string
  description?: string
  category?: string
  displayOrder?: number
  isPublished?: boolean
  isFeatured?: boolean
}

export interface UpdateGalleryVideoRequest extends Partial<CreateGalleryVideoRequest> {
  id: number
}

export interface GalleryVideoQuery {
  page?: number
  pageSize?: number
  category?: string
  isPublished?: boolean
  isFeatured?: boolean
  search?: string
  sortBy?: 'displayOrder' | 'title' | 'createdAt' | 'publishedAt'
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedGalleryVideos {
  data: GalleryVideo[]
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export async function getGalleryVideos(query: GalleryVideoQuery = {}): Promise<PaginatedGalleryVideos> {
  try {
    const params = new URLSearchParams()
    if (query.page) params.set('page', String(query.page))
    if (query.pageSize) params.set('pageSize', String(query.pageSize))
    if (query.category) params.set('category', query.category)
    if (query.isPublished !== undefined) params.set('isPublished', String(query.isPublished))
    if (query.isFeatured !== undefined) params.set('isFeatured', String(query.isFeatured))
    if (query.search) params.set('search', query.search)
    if (query.sortBy) params.set('sortBy', query.sortBy)
    if (query.sortOrder) params.set('sortOrder', query.sortOrder)

    const qs = params.toString()
    return await api.get<PaginatedGalleryVideos>(`/api/gallery-videos${qs ? `?${qs}` : ''}`)
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to load gallery videos.')
  }
}

export async function getFeaturedGalleryVideos(limit = 8): Promise<GalleryVideo[]> {
  try {
    return await api.get<GalleryVideo[]>(`/api/gallery-videos/featured?limit=${limit}`)
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to load featured videos.')
  }
}

export async function createGalleryVideo(data: CreateGalleryVideoRequest): Promise<GalleryVideo> {
  try {
    return await api.post<GalleryVideo>('/api/gallery-videos', data)
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to add gallery video.')
  }
}

export async function updateGalleryVideo(data: UpdateGalleryVideoRequest): Promise<GalleryVideo> {
  try {
    const { id, ...payload } = data
    return await api.put<GalleryVideo>(`/api/gallery-videos/${id}`, payload)
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to update gallery video.')
  }
}

export async function deleteGalleryVideo(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/gallery-videos/${id}`)
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to delete gallery video.')
  }
}

export const GALLERY_VIDEO_CATEGORIES = [
  { id: 'events', label: 'School Events' },
  { id: 'academic', label: 'Academic' },
  { id: 'sports', label: 'Sports' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'announcements', label: 'Announcements' },
] as const
