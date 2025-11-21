// Sessions API endpoints
import { api, ApiError } from './client';

export interface Session {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface CreateSessionRequest {
  name: string;
  startYear: number;
  endYear: number;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  isActive?: boolean;
}

export interface UpdateSessionRequest extends Partial<CreateSessionRequest> {
  id: number;
}

/**
 * Get all sessions
 */
export async function getSessions(isActive?: boolean): Promise<Session[]> {
  try {
    const query = isActive !== undefined ? `?isActive=${isActive}` : '';
    return await api.get<Session[]>(`/api/sessions${query}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load sessions. Please refresh the page and try again.');
  }
}

/**
 * Get session by ID
 */
export async function getSessionById(id: number): Promise<Session> {
  try {
    return await api.get<Session>(`/api/sessions/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load session information. Please try again.');
  }
}

/**
 * Get current session
 */
export async function getCurrentSession(): Promise<Session> {
  try {
    return await api.get<Session>('/api/sessions/current');
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load current session. Please try again.');
  }
}

/**
 * Create new session
 */
export async function createSession(data: CreateSessionRequest): Promise<Session> {
  try {
    return await api.post<Session>('/api/sessions', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create session. Please check your input and try again.');
  }
}

/**
 * Update session
 */
export async function updateSession(data: UpdateSessionRequest): Promise<void> {
  try {
    const { id, ...updateData } = data;
    await api.put<void>(`/api/sessions/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update session information. Please check your input and try again.');
  }
}

/**
 * Delete session (soft delete)
 */
export async function deleteSession(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/sessions/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete session. Please try again.');
  }
}

