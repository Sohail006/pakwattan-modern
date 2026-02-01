// Events API endpoints
import { api, ApiError } from './client';

// Simple in-memory cache for frequently-used read endpoints
const EVENTS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

type EventsCacheEntry<T> = {
  data: T;
  timestamp: number;
};

const eventsCache = new Map<string, EventsCacheEntry<unknown>>();

function getEventsCacheKey(path: string): string {
  return `events:${path}`;
}

function getEventsFromCache<T>(key: string): T | null {
  const entry = eventsCache.get(key) as EventsCacheEntry<T> | undefined;
  if (!entry) return null;
  const isExpired = Date.now() - entry.timestamp > EVENTS_CACHE_TTL_MS;
  if (isExpired) {
    eventsCache.delete(key);
    return null;
  }
  return entry.data;
}

function setEventsCache<T>(key: string, data: T) {
  eventsCache.set(key, { data, timestamp: Date.now() });
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO date string
  time?: string; // HH:mm:ss format
  endDate?: string;
  endTime?: string;
  location?: string;
  category: string;
  imageUrl?: string;
  isPublished: boolean;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt?: string;
  createdBy?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  time?: string;
  endDate?: string;
  endTime?: string;
  location?: string;
  category: string;
  imageUrl?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  displayOrder?: number;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: number;
}

export interface PaginatedEventsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  isPublished?: boolean;
  upcoming?: boolean; // Only future events
  startDate?: string;
  endDate?: string;
  search?: string;
  sortBy?: 'date' | 'title' | 'displayOrder';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedEventsResponse {
  data: Event[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

/**
 * Get all events with pagination and filters
 */
export async function getEvents(params?: PaginatedEventsParams): Promise<PaginatedEventsResponse> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.isPublished !== undefined) queryParams.append('isPublished', params.isPublished.toString());
    if (params?.upcoming) queryParams.append('upcoming', 'true');
    if (params?.startDate) queryParams.append('startDate', params.startDate);
    if (params?.endDate) queryParams.append('endDate', params.endDate);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const queryString = queryParams.toString();
    const path = `/api/events${queryString ? `?${queryString}` : ''}`;
    const cacheKey = getEventsCacheKey(path);

    const cached = getEventsFromCache<PaginatedEventsResponse>(cacheKey);
    if (cached) return cached;

    const result = await api.get<PaginatedEventsResponse>(path);
    setEventsCache(cacheKey, result);
    return result;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load events. Please try again.');
  }
}

/**
 * Get event by ID
 */
export async function getEventById(id: number): Promise<Event> {
  try {
    const path = `/api/events/${id}`;
    const cacheKey = getEventsCacheKey(path);

    const cached = getEventsFromCache<Event>(cacheKey);
    if (cached) return cached;

    const result = await api.get<Event>(path);
    setEventsCache(cacheKey, result);
    return result;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load event. Please try again.');
  }
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
  try {
    const path = `/api/events/upcoming?limit=${limit}`;
    const cacheKey = getEventsCacheKey(path);

    const cached = getEventsFromCache<Event[]>(cacheKey);
    if (cached) return cached;

    const result = await api.get<Event[]>(path);
    setEventsCache(cacheKey, result);
    return result;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load upcoming events. Please try again.');
  }
}

/**
 * Create new event
 */
export async function createEvent(data: CreateEventRequest): Promise<Event> {
  try {
    return await api.post<Event>('/api/events', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create event. Please check your input and try again.');
  }
}

/**
 * Update event
 */
export async function updateEvent(data: UpdateEventRequest): Promise<Event> {
  try {
    const { id, ...updateData } = data;
    return await api.put<Event>(`/api/events/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update event. Please check your input and try again.');
  }
}

/**
 * Delete event
 */
export async function deleteEvent(id: number): Promise<void> {
  try {
    await api.delete(`/api/events/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete event. Please try again.');
  }
}

