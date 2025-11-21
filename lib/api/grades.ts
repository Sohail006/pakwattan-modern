// Grades API endpoints
import { api, ApiError } from './client';

export interface Grade {
  id: number;
  name: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface CreateGradeRequest {
  name: string;
  description?: string;
  order: number;
  isActive?: boolean;
}

export interface UpdateGradeRequest extends Partial<CreateGradeRequest> {
  id: number;
}

/**
 * Get all grades
 */
export async function getGrades(isActive?: boolean): Promise<Grade[]> {
  try {
    const query = isActive !== undefined ? `?isActive=${isActive}` : '';
    return await api.get<Grade[]>(`/api/grades${query}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load grades. Please refresh the page and try again.');
  }
}

/**
 * Get grade by ID
 */
export async function getGradeById(id: number): Promise<Grade> {
  try {
    return await api.get<Grade>(`/api/grades/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load grade information. Please try again.');
  }
}

/**
 * Create new grade
 */
export async function createGrade(data: CreateGradeRequest): Promise<Grade> {
  try {
    return await api.post<Grade>('/api/grades', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create grade. Please check your input and try again.');
  }
}

/**
 * Update grade
 */
export async function updateGrade(data: UpdateGradeRequest): Promise<void> {
  try {
    const { id, ...updateData } = data;
    await api.put<void>(`/api/grades/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update grade information. Please check your input and try again.');
  }
}

/**
 * Delete grade (soft delete)
 */
export async function deleteGrade(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/grades/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete grade. Please try again.');
  }
}

