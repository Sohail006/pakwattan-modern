// User Management API endpoints

import { api, ApiError } from './client';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  profileImageUrl?: string;
  isActive: boolean;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: string; // Admin, Staff, Teacher, Student, Parent
  isActive?: boolean;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImageUrl?: string;
  isActive?: boolean;
}

export interface AssignRoleRequest {
  role: string;
}

export interface RemoveRoleRequest {
  role: string;
}

export interface ActivateUserResponse {
  message: string;
}

export interface DeactivateUserResponse {
  message: string;
}

export interface ActivityLog {
  id: number;
  userId: string;
  userName: string;
  action: string;
  targetUserId?: string;
  targetUserName?: string;
  description?: string;
  ipAddress?: string;
  createdAt: string;
  metadata?: string;
}

/**
 * Get all users (Admin and Staff only)
 */
export async function getUsers(): Promise<User[]> {
  try {
    return await api.get<User[]>('/api/users');
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load users. Please refresh the page and try again.');
  }
}

/**
 * Get user by ID (Admin and Staff only)
 */
export async function getUserById(userId: string): Promise<User> {
  try {
    return await api.get<User>(`/api/users/${userId}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load user information. Please try again.');
  }
}

/**
 * Activate a user account (Admin and Staff only)
 */
export async function activateUser(userId: string): Promise<ActivateUserResponse> {
  try {
    return await api.post<ActivateUserResponse>(`/api/users/${userId}/activate`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to activate user account. Please try again.');
  }
}

/**
 * Deactivate a user account (Admin and Staff only)
 */
export async function deactivateUser(userId: string): Promise<DeactivateUserResponse> {
  try {
    return await api.post<DeactivateUserResponse>(`/api/users/${userId}/deactivate`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to deactivate user account. Please try again.');
  }
}

/**
 * Create a new user (Admin and Staff only)
 */
export async function createUser(data: CreateUserRequest): Promise<User> {
  try {
    return await api.post<User>('/api/users', data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to create user account. Please check your input and try again.');
  }
}

/**
 * Update a user (Admin and Staff only)
 */
export async function updateUser(userId: string, data: UpdateUserRequest): Promise<{ message: string }> {
  try {
    return await api.put<{ message: string }>(`/api/users/${userId}`, data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to update user information. Please check your input and try again.');
  }
}

/**
 * Delete a user (Admin only)
 */
export async function deleteUser(userId: string): Promise<{ message: string }> {
  try {
    return await api.delete<{ message: string }>(`/api/users/${userId}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to delete user account. Please try again.');
  }
}

/**
 * Assign a role to a user (Admin only)
 */
export async function assignRole(userId: string, role: string): Promise<{ message: string }> {
  try {
    return await api.post<{ message: string }>(`/api/users/${userId}/roles`, { role });
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to assign role to user. Please try again.');
  }
}

/**
 * Remove a role from a user (Admin only)
 */
export async function removeRole(userId: string, role: string): Promise<{ message: string }> {
  try {
    // DELETE with body - need custom fetch since delete doesn't support body in standard API
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://localhost:7210'
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    
    const response = await fetch(`${baseUrl}/api/users/${userId}/roles`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({ role }),
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unable to remove role from user' }))
      throw { message: error.message || 'Unable to remove role from user', statusCode: response.status } as ApiError
    }
    
    return await response.json()
  } catch (error) {
    const apiError = error as ApiError
    throw new Error(apiError.message || 'Unable to remove role from user. Please try again.')
  }
}

/**
 * Get activity logs (Admin only)
 */
export async function getActivityLogs(limit: number = 100): Promise<ActivityLog[]> {
  try {
    return await api.get<ActivityLog[]>(`/api/users/activity-logs?limit=${limit}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load activity logs. Please try again.');
  }
}

/**
 * Get activity logs for a specific user (Admin only)
 */
export async function getUserActivityLogs(userId: string, limit: number = 50): Promise<ActivityLog[]> {
  try {
    return await api.get<ActivityLog[]>(`/api/users/${userId}/activity-logs?limit=${limit}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load user activity logs. Please try again.');
  }
}

