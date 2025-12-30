// Coordinators API endpoints
import { api, ApiError } from './client';
import { Campus } from './campuses';

export interface Coordinator {
  id: number;
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phone?: string;
  mobileNumber?: string;
  whatsAppNumber?: string;
  campusId?: number;
  campus?: Campus;
  department?: string;
  officeLocation?: string;
  officeHours?: string;
  profileImageUrl?: string;
  priority?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCoordinatorRequest {
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phone?: string;
  mobileNumber?: string;
  whatsAppNumber?: string;
  campusId?: number;
  department?: string;
  officeLocation?: string;
  officeHours?: string;
  profileImageUrl?: string;
  priority?: number;
  isActive?: boolean;
}

export interface UpdateCoordinatorRequest extends Partial<CreateCoordinatorRequest> {
  id: number;
}

/**
 * Get all coordinators
 */
export async function getCoordinators(campusId?: number): Promise<Coordinator[]> {
  try {
    const query = campusId !== undefined ? `?campusId=${campusId}` : '';
    return await api.get<Coordinator[]>(`/api/coordinators${query}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load coordinators. Please refresh the page and try again.');
  }
}

/**
 * Get coordinator by ID
 */
export async function getCoordinatorById(id: number): Promise<Coordinator> {
  try {
    return await api.get<Coordinator>(`/api/coordinators/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load coordinator information. Please try again.');
  }
}

/**
 * Create coordinator
 */
export async function createCoordinator(data: CreateCoordinatorRequest): Promise<Coordinator> {
  try {
    return await api.post<Coordinator>('/api/coordinators', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create coordinator. Please review all fields and try again.');
  }
}

/**
 * Update coordinator
 */
export async function updateCoordinator(data: UpdateCoordinatorRequest): Promise<void> {
  try {
    const { id, ...updateData } = data;
    await api.put<void>(`/api/coordinators/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update coordinator information. Please review all fields and try again.');
  }
}

/**
 * Delete coordinator
 */
export async function deleteCoordinator(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/coordinators/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete coordinator. Please try again or contact support if the problem persists.');
  }
}
