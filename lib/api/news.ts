// News API endpoints
import { api, ApiError } from './client';

// Simple in-memory cache for frequently-used read endpoints
const NEWS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const newsCache = new Map<string, CacheEntry<unknown>>();

function getCacheKey(path: string): string {
  return `news:${path}`;
}

function getFromCache<T>(key: string): T | null {
  const entry = newsCache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  const isExpired = Date.now() - entry.timestamp > NEWS_CACHE_TTL_MS;
  if (isExpired) {
    newsCache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache<T>(key: string, data: T) {
  newsCache.set(key, { data, timestamp: Date.now() });
}

export interface News {
  id: number;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category: string;
  imageUrl?: string;
  date: string;
  isPublished: boolean;
  isFeatured: boolean;
  isInMarquee: boolean;
  displayOrder: number;
  viewCount: number;
  createdAt: string;
  updatedAt?: string;
  createdBy?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateNewsRequest {
  title: string;
  slug?: string; // Optional - backend can auto-generate from title if not provided
  description: string;
  content?: string;
  category: string;
  imageUrl?: string;
  date: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  isInMarquee?: boolean;
  displayOrder?: number;
}

export interface UpdateNewsRequest extends Partial<CreateNewsRequest> {
  id: number;
}

export interface PaginatedNewsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  isPublished?: boolean;
  search?: string;
  sortBy?: 'date' | 'title' | 'displayOrder';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedNewsResponse {
  data: News[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

/**
 * Get all news with pagination and filters
 */
export async function getNews(params?: PaginatedNewsParams): Promise<PaginatedNewsResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.isPublished !== undefined) queryParams.append('isPublished', params.isPublished.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const queryString = queryParams.toString();
    const path = `/api/news${queryString ? `?${queryString}` : ''}`;
    const cacheKey = getCacheKey(path);

    const cached = getFromCache<PaginatedNewsResponse>(cacheKey);
    if (cached) return cached;

    const result = await api.get<PaginatedNewsResponse>(path);
    setCache(cacheKey, result);
    return result;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load news. Please try again.');
  }
}

/**
 * Get news by ID
 */
export async function getNewsById(id: number): Promise<News> {
  try {
    const path = `/api/news/${id}`;
    const cacheKey = getCacheKey(path);

    const cached = getFromCache<News>(cacheKey);
    if (cached) return cached;

    const result = await api.get<News>(path);
    setCache(cacheKey, result);
    return result;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load news item. Please try again.');
  }
}

/**
 * Get news by slug
 */
export async function getNewsBySlug(slug: string): Promise<News> {
  try {
    const path = `/api/news/slug/${slug}`;
    const cacheKey = getCacheKey(path);

    const cached = getFromCache<News>(cacheKey);
    if (cached) return cached;

    const result = await api.get<News>(path);
    setCache(cacheKey, result);
    return result;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load news item. Please try again.');
  }
}

/**
 * Get featured news
 */
export async function getFeaturedNews(limit: number = 5): Promise<News[]> {
  try {
    const path = `/api/news/featured?limit=${limit}`;
    const cacheKey = getCacheKey(path);

    const cached = getFromCache<News[]>(cacheKey);
    if (cached) return cached;

    const result = await api.get<News[]>(path);
    setCache(cacheKey, result);
    return result;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load featured news. Please try again.');
  }
}

/**
 * Get marquee news items
 */
export async function getMarqueeNews(limit: number = 10): Promise<News[]> {
  try {
    const path = `/api/news/marquee?limit=${limit}`;
    const cacheKey = getCacheKey(path);

    const cached = getFromCache<News[]>(cacheKey);
    if (cached) return cached;

    const result = await api.get<News[]>(path);
    setCache(cacheKey, result);
    return result;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load marquee news. Please try again.');
  }
}

/**
 * Create new news item
 */
export async function createNews(data: CreateNewsRequest): Promise<News> {
  try {
    return await api.post<News>('/api/news', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create news item. Please check your input and try again.');
  }
}

/**
 * Update news item
 */
export async function updateNews(data: UpdateNewsRequest): Promise<News> {
  try {
    const { id, ...updateData } = data;
    return await api.put<News>(`/api/news/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update news item. Please check your input and try again.');
  }
}

/**
 * Delete news item
 */
export async function deleteNews(id: number): Promise<void> {
  try {
    await api.delete(`/api/news/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete news item. Please try again.');
  }
}

/**
 * Upload image for news item
 */
export async function uploadNewsImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.postFormData<{ imageUrl: string }>(
      '/api/news/upload-image',
      formData
    );
    
    return response.imageUrl;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to upload image. Please ensure the file is a valid image and try again.');
  }
}

/**
 * Bulk delete news items
 */
export async function bulkDeleteNews(ids: number[]): Promise<void> {
  try {
    await api.post('/api/news/bulk-delete', { ids });
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete news items. Please try again.');
  }
}

/**
 * Bulk update news items (publish/unpublish)
 */
export async function bulkUpdateNews(ids: number[], updates: { isPublished?: boolean; category?: string }): Promise<void> {
  try {
    await api.post('/api/news/bulk-update', { ids, ...updates });
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update news items. Please try again.');
  }
}

