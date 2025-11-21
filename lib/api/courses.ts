// Courses API endpoints
import { api, ApiError } from './client';

export interface Course {
  id: number;
  name: string;
  description?: string;
  code?: string;
  creditHours: number;
  isActive: boolean;
  createdAt: string;
  gradeId: number;
  grade?: {
    id: number;
    name: string;
  };
  teacherId: number;
  teacher?: {
    id: number;
    name: string;
  };
}

export interface CreateCourseRequest {
  name: string;
  description?: string;
  code?: string;
  creditHours: number;
  gradeId: number;
  teacherId: number;
  isActive?: boolean;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  id: number;
}

/**
 * Get all courses
 */
export async function getCourses(gradeId?: number, isActive?: boolean): Promise<Course[]> {
  try {
    const params = new URLSearchParams();
    if (gradeId !== undefined) params.append('gradeId', gradeId.toString());
    if (isActive !== undefined) params.append('isActive', isActive.toString());
    const query = params.toString();
    return await api.get<Course[]>(`/api/courses${query ? `?${query}` : ''}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load courses. Please refresh the page and try again.');
  }
}

/**
 * Get course by ID
 */
export async function getCourseById(id: number): Promise<Course> {
  try {
    return await api.get<Course>(`/api/courses/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load course information. Please try again.');
  }
}

/**
 * Create new course
 */
export async function createCourse(data: CreateCourseRequest): Promise<Course> {
  try {
    return await api.post<Course>('/api/courses', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create course. Please check your input and try again.');
  }
}

/**
 * Update course
 */
export async function updateCourse(data: UpdateCourseRequest): Promise<void> {
  try {
    const { id, ...updateData } = data;
    await api.put<void>(`/api/courses/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update course information. Please check your input and try again.');
  }
}

/**
 * Delete course (soft delete)
 */
export async function deleteCourse(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/courses/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete course. Please try again.');
  }
}

