// Students API endpoints
import { api, ApiError } from './client';

export interface Student {
  id: number;
  name: string;
  fatherName: string;
  email: string;
  phone?: string;
  whatsApp?: string;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Active' | 'Inactive' | 'Suspended' | 'Graduated' | 'Transferred';
  address?: string;
  previousSchool?: string;
  profileImageUrl?: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt?: string;
  isActive: boolean;
  gradeId: number;
  gradeName?: string; // Flat property from DTO
  sectionId: number;
  sectionName?: string; // Flat property from DTO
  campusId: number;
  campusName?: string; // Flat property from DTO
  sessionId: number;
  sessionName?: string; // Flat property from DTO
  guardianId: number;
  guardianName?: string; // Flat property from DTO
  // Legacy nested properties for backward compatibility (optional)
  grade?: {
    id: number;
    name: string;
  };
  section?: {
    id: number;
    name: string;
  };
  campus?: {
    id: number;
    name: string;
  };
  session?: {
    id: number;
    name: string;
  };
  guardian?: {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    whatsApp?: string;
    relation: string;
    address?: string;
    cnic?: string;
    occupation?: string;
  };
}

export interface CreateStudentRequest {
  name: string;
  fatherName: string;
  email: string;
  phone?: string;
  whatsApp?: string;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Active' | 'Inactive' | 'Suspended' | 'Graduated' | 'Transferred';
  address?: string;
  previousSchool?: string;
  profileImageUrl?: string;
  dateOfBirth: string | Date; // Can accept string (ISO) or Date object
  gradeId: number;
  sectionId: number;
  campusId: number;
  sessionId: number;
  guardianId: number; // Required
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  id: number;
  guardianId?: number; // Optional in update
}

export interface SearchStudentsParams {
  name?: string;
  gradeId?: number;
  sectionId?: number;
}

export interface PaginatedStudentsParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  gradeId?: number;
  sectionId?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * Get all active students
 */
export async function getStudents(): Promise<Student[]> {
  try {
    return await api.get<Student[]>('/api/students');
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load students. Please refresh the page and try again.');
  }
}

/**
 * Get paginated students with filters and sorting
 */
export async function getStudentsPaginated(params: PaginatedStudentsParams): Promise<PaginatedResponse<Student>> {
  try {
    const queryParams = new URLSearchParams();
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.pageSize !== undefined) queryParams.append('pageSize', params.pageSize.toString());
    if (params.searchTerm) queryParams.append('searchTerm', params.searchTerm);
    if (params.gradeId !== undefined) queryParams.append('gradeId', params.gradeId.toString());
    if (params.sectionId !== undefined) queryParams.append('sectionId', params.sectionId.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const queryString = queryParams.toString();
    return await api.get<PaginatedResponse<Student>>(`/api/students/paginated${queryString ? `?${queryString}` : ''}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load students. Please refresh the page and try again.');
  }
}

/**
 * Get student by ID
 */
export async function getStudentById(id: number): Promise<Student> {
  try {
    return await api.get<Student>(`/api/students/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load student information. Please try again.');
  }
}

/**
 * Create new student
 */
export async function createStudent(data: CreateStudentRequest): Promise<Student> {
  try {
    // Ensure dateOfBirth is in ISO format
    let dateOfBirth: string;
    if (data.dateOfBirth instanceof Date) {
      dateOfBirth = data.dateOfBirth.toISOString();
    } else if (typeof data.dateOfBirth === 'string') {
      // If it's already an ISO string, use it; otherwise parse it
      if (data.dateOfBirth.includes('T')) {
        dateOfBirth = data.dateOfBirth;
      } else {
        // It's a date string (YYYY-MM-DD), convert to ISO
        const date = new Date(data.dateOfBirth);
        if (isNaN(date.getTime())) {
          throw new Error('Invalid date of birth');
        }
        dateOfBirth = date.toISOString();
      }
    } else {
      throw new Error('Invalid date of birth format');
    }

    // Clean up the payload - remove undefined values and ensure all required fields are present
    const payload: Record<string, unknown> = {
      name: data.name,
      fatherName: data.fatherName,
      email: data.email,
      gender: data.gender,
      status: data.status,
      dateOfBirth,
      gradeId: data.gradeId,
      sectionId: data.sectionId,
      campusId: data.campusId,
      sessionId: data.sessionId,
      guardianId: data.guardianId,
    };

    // Add optional fields only if they have values
    if (data.phone) payload.phone = data.phone;
    if (data.whatsApp) payload.whatsApp = data.whatsApp;
    if (data.address) payload.address = data.address;
    if (data.previousSchool) payload.previousSchool = data.previousSchool;
    if (data.profileImageUrl) payload.profileImageUrl = data.profileImageUrl;

    return await api.post<Student>('/api/students', payload);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create student. Please check your input and try again.');
  }
}

/**
 * Update student
 */
export async function updateStudent(data: UpdateStudentRequest): Promise<void> {
  try {
    const { id, ...updateData } = data;
    // Ensure dateOfBirth is in ISO format if provided
    if (updateData.dateOfBirth) {
      if (updateData.dateOfBirth instanceof Date) {
        updateData.dateOfBirth = updateData.dateOfBirth.toISOString();
      } else if (typeof updateData.dateOfBirth === 'string') {
        // If it's already an ISO string, use it; otherwise parse it
        if (!updateData.dateOfBirth.includes('T')) {
          // It's a date string (YYYY-MM-DD), convert to ISO
          const date = new Date(updateData.dateOfBirth);
          if (isNaN(date.getTime())) {
            throw new Error('Invalid date of birth');
          }
          updateData.dateOfBirth = date.toISOString();
        }
      } else {
        throw new Error('Invalid date of birth format');
      }
    }
    await api.put<void>(`/api/students/${id}`, updateData);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update student information. Please check your input and try again.');
  }
}

/**
 * Delete student (soft delete)
 */
export async function deleteStudent(id: number): Promise<void> {
  try {
    await api.delete<void>(`/api/students/${id}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete student. Please try again.');
  }
}

/**
 * Upload profile image for a student
 */
export async function uploadStudentProfileImage(studentId: number, file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.postFormData<{ imageUrl: string }>(
      `/api/students/${studentId}/profile-image`,
      formData
    )
    
    return response.imageUrl
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to upload profile image. Please ensure the file is a valid image and try again.')
  }
}

/**
 * Upload profile image for a new student (before creation)
 */
export async function uploadStudentProfileImageTemp(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.postFormData<{ imageUrl: string }>(
      '/api/students/upload-profile-image',
      formData
    )
    
    return response.imageUrl
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to upload profile image. Please ensure the file is a valid image and try again.')
  }
}

/**
 * Search students
 */
export async function searchStudents(params: SearchStudentsParams): Promise<Student[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params.name) queryParams.append('name', params.name);
    if (params.gradeId) queryParams.append('gradeId', params.gradeId.toString());
    if (params.sectionId) queryParams.append('sectionId', params.sectionId.toString());

    const queryString = queryParams.toString();
    return await api.get<Student[]>(`/api/students/search${queryString ? `?${queryString}` : ''}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to search students. Please check your search criteria and try again.');
  }
}

/**
 * Check if email already exists for a student
 */
export async function checkEmailExists(email: string, excludeStudentId?: number): Promise<boolean> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('email', email);
    if (excludeStudentId) {
      queryParams.append('excludeId', excludeStudentId.toString());
    }

    const response = await api.get<{ exists: boolean }>(`/api/students/check-email?${queryParams.toString()}`);
    return response.exists;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to verify email availability. Please try again.');
  }
}

