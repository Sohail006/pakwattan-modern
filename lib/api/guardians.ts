// Guardians API endpoints
import { api, ApiError } from './client';

export type GuardianRelation = 'Father' | 'Mother' | 'Brother' | 'Sister' | 'Guardian';

export interface Guardian {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  whatsApp?: string;
  relation: GuardianRelation;
  address?: string;
  cnic?: string;
  occupation?: string;
  userId: string;
  isActive: boolean;
  studentCount: number;
  students?: StudentBasic[];
}

export interface StudentBasic {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface CreateGuardianRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  whatsApp?: string;
  relation: GuardianRelation;
  address?: string;
  cnic?: string;
  occupation?: string;
  isActive?: boolean;
  studentId?: number; // Optional: Link to student during creation
}

export interface UpdateGuardianRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  whatsApp?: string;
  relation?: GuardianRelation;
  address?: string;
  cnic?: string;
  occupation?: string;
  isActive?: boolean;
}

/**
 * Get all guardians
 */
export async function getGuardians(): Promise<Guardian[]> {
  try {
    return await api.get<Guardian[]>('/api/guardians');
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load guardians. Please refresh the page and try again.');
  }
}

/**
 * Get guardian by ID
 */
export async function getGuardianById(id: number): Promise<Guardian> {
  try {
    return await api.get<Guardian>(`/api/guardians/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load guardian information. Please try again.');
  }
}

/**
 * Get guardian by User ID
 */
export async function getGuardianByUserId(userId: string): Promise<Guardian> {
  try {
    return await api.get<Guardian>(`/api/guardians/user/${userId}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load guardian information. Please try again.');
  }
}

/**
 * Create new guardian
 */
export async function createGuardian(data: CreateGuardianRequest): Promise<Guardian> {
  try {
    return await api.post<Guardian>('/api/guardians', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create guardian. Please check your input and try again.');
  }
}

/**
 * Update guardian
 */
export async function updateGuardian(id: number, data: UpdateGuardianRequest): Promise<void> {
  try {
    await api.put<void>(`/api/guardians/${id}`, data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update guardian information. Please check your input and try again.');
  }
}

/**
 * Delete guardian (soft delete)
 */
export async function deleteGuardian(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/guardians/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete guardian. Please try again.');
  }
}

/**
 * Link guardian to student
 */
export async function linkGuardianToStudent(guardianId: number, studentId: number): Promise<void> {
  try {
    await api.post<void>(`/api/guardians/${guardianId}/students/${studentId}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to link guardian to student. The guardian or student may not exist, or they may already be linked.');
  }
}

/**
 * Get all students for a guardian
 */
export async function getGuardianStudents(guardianId: number): Promise<StudentBasic[]> {
  try {
    return await api.get<StudentBasic[]>(`/api/guardians/${guardianId}/students`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load students for this guardian. Please try again.');
  }
}

/**
 * Check if email already exists for a guardian
 */
export async function checkGuardianEmailExists(email: string, excludeGuardianId?: number): Promise<boolean> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('email', email);
    if (excludeGuardianId) {
      queryParams.append('excludeId', excludeGuardianId.toString());
    }

    const response = await api.get<{ exists: boolean }>(`/api/guardians/check-email?${queryParams.toString()}`);
    return response.exists;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to verify email availability. Please try again.');
  }
}

