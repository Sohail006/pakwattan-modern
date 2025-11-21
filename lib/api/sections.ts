// Sections API endpoints
import { api, ApiError } from './client';

export interface Section {
  id: number;
  name: string;
  description?: string;
  capacity: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateSectionRequest {
  name: string;
  description?: string;
  capacity: number;
  isActive?: boolean;
}

export interface UpdateSectionRequest extends Partial<CreateSectionRequest> {
  id: number;
}

/**
 * Get all sections
 */
export async function getSections(isActive?: boolean): Promise<Section[]> {
  try {
    const query = isActive !== undefined ? `?isActive=${isActive}` : '';
    return await api.get<Section[]>(`/api/sections${query}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load sections. Please refresh the page and try again.');
  }
}

/**
 * Get section by ID
 */
export async function getSectionById(id: number): Promise<Section> {
  try {
    return await api.get<Section>(`/api/sections/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load section information. Please try again.');
  }
}

/**
 * Create new section
 */
export async function createSection(data: CreateSectionRequest): Promise<Section> {
  try {
    return await api.post<Section>('/api/sections', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create section. Please check your input and try again.');
  }
}

/**
 * Update section
 */
export async function updateSection(data: UpdateSectionRequest): Promise<void> {
  try {
    const { id, ...updateData } = data;
    await api.put<void>(`/api/sections/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update section information. Please check your input and try again.');
  }
}

/**
 * Delete section (soft delete)
 */
export async function deleteSection(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/sections/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete section. Please try again.');
  }
}

