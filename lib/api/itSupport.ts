// IT Support API endpoints
import { api, ApiError } from './client';

export interface ITSupport {
  id: number;
  title: string;
  email: string;
  phone?: string;
  mobileNumber?: string;
  whatsAppNumber?: string;
  officeHours?: string;
  department?: string;
  description?: string;
  priority?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateITSupportRequest {
  title: string;
  email: string;
  phone?: string;
  mobileNumber?: string;
  whatsAppNumber?: string;
  officeHours?: string;
  department?: string;
  description?: string;
  priority?: number;
  isActive?: boolean;
}

export interface UpdateITSupportRequest extends Partial<CreateITSupportRequest> {
  id: number;
}

/**
 * Public IT Support interface (for public endpoints, no authentication required)
 * Only contains public contact information
 */
export interface ITSupportPublic {
  email: string;
  phone?: string;
  mobileNumber?: string;
  whatsAppNumber?: string;
  officeHours?: string;
}

/**
 * Get IT support information
 */
export async function getITSupport(): Promise<ITSupport[]> {
  try {
    return await api.get<ITSupport[]>('/api/it-support');
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load IT support information. Please refresh the page and try again.');
  }
}

/**
 * Get IT support by ID
 */
export async function getITSupportById(id: number): Promise<ITSupport> {
  try {
    return await api.get<ITSupport>(`/api/it-support/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load IT support information. Please try again.');
  }
}

/**
 * Create IT support entry
 */
export async function createITSupport(data: CreateITSupportRequest): Promise<ITSupport> {
  try {
    return await api.post<ITSupport>('/api/it-support', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create IT support entry. Please review all fields and try again.');
  }
}

/**
 * Update IT support entry
 */
export async function updateITSupport(data: UpdateITSupportRequest): Promise<void> {
  try {
    const { id, ...updateData } = data;
    await api.put<void>(`/api/it-support/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update IT support information. Please review all fields and try again.');
  }
}

/**
 * Delete IT support entry
 */
export async function deleteITSupport(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/it-support/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete IT support entry. Please try again or contact support if the problem persists.');
  }
}

/**
 * Get public IT support contact information (no authentication required)
 * Returns only active entries with public contact information
 */
export async function getITSupportPublic(): Promise<ITSupportPublic[]> {
  try {
    return await api.get<ITSupportPublic[]>('/api/it-support/public');
  } catch (error) {
    const apiError = error as ApiError;
    // Return empty array on error (graceful degradation)
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ITSupport API] Failed to load public IT Support info:', apiError.message);
    }
    return [];
  }
}
