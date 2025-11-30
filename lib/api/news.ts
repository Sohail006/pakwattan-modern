// News API endpoints
import { api, ApiError } from './client';

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
    return await api.get<PaginatedNewsResponse>(`/api/news${queryString ? `?${queryString}` : ''}`);
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
    return await api.get<News>(`/api/news/${id}`);
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
    return await api.get<News>(`/api/news/slug/${slug}`);
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
    return await api.get<News[]>(`/api/news/featured?limit=${limit}`);
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
    return await api.get<News[]>(`/api/news/marquee?limit=${limit}`);
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

