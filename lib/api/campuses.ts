// Campuses API endpoints
import { api, ApiError } from './client';

export interface Campus {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  principalName?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateCampusRequest {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  principalName?: string;
  isActive?: boolean;
}

export interface UpdateCampusRequest extends Partial<CreateCampusRequest> {
  id: number;
}

/**
 * Get all campuses
 */
export async function getCampuses(isActive?: boolean): Promise<Campus[]> {
  try {
    const query = isActive !== undefined ? `?isActive=${isActive}` : '';
    return await api.get<Campus[]>(`/api/campuses${query}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load campuses. Please refresh the page and try again.');
  }
}

/**
 * Get campus by ID
 */
export async function getCampusById(id: number): Promise<Campus> {
  try {
    return await api.get<Campus>(`/api/campuses/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load campus information. Please try again.');
  }
}

/**
 * Create new campus
 */
export async function createCampus(data: CreateCampusRequest): Promise<Campus> {
  try {
    return await api.post<Campus>('/api/campuses', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create campus. Please check your input and try again.');
  }
}

/**
 * Update campus
 */
export async function updateCampus(data: UpdateCampusRequest): Promise<void> {
  try {
    const { id, ...updateData } = data;
    await api.put<void>(`/api/campuses/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update campus information. Please check your input and try again.');
  }
}

/**
 * Delete campus (soft delete)
 */
export async function deleteCampus(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/campuses/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete campus. Please try again.');
  }
}

