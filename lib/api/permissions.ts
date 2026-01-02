// Permissions Management API endpoints

import { api, ApiError } from './client';
import type {
  Permission,
  RolePermission,
  UserPermission,
  AssignPermissionRequest,
  BulkAssignPermissionRequest,
} from '@/lib/types/permissions';

/**
 * Get all available permissions (Admin only)
 * @param options - Optional query parameters
 * @param options.category - Filter by category
 * @param options.isActive - Filter by active status (true/false)
 */
export async function getPermissions(options?: {
  category?: string;
  isActive?: boolean;
}): Promise<Permission[]> {
  try {
    const params = new URLSearchParams();
    if (options?.category) {
      params.append('category', options.category);
    }
    if (options?.isActive !== undefined) {
      params.append('isActive', String(options.isActive));
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? `/api/permissions?${queryString}` : '/api/permissions';
    
    return await api.get<Permission[]>(endpoint);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load permissions. Please refresh the page and try again.');
  }
}

/**
 * Get permission by ID (Admin only)
 */
export async function getPermissionById(permissionId: number): Promise<Permission> {
  try {
    return await api.get<Permission>(`/api/permissions/${permissionId}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load permission. Please try again.');
  }
}

/**
 * Get permissions for a specific role (Admin only)
 */
export async function getRolePermissions(roleName: string): Promise<RolePermission[]> {
  try {
    return await api.get<RolePermission[]>(`/api/permissions/roles/${encodeURIComponent(roleName)}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load role permissions. Please try again.');
  }
}

/**
 * Get permissions for a specific user (Admin only)
 * Returns both role-based and custom user permissions
 */
export async function getUserPermissions(userId: string): Promise<UserPermission[]> {
  try {
    return await api.get<UserPermission[]>(`/api/permissions/users/${userId}`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load user permissions. Please try again.');
  }
}

/**
 * Get effective permissions for a user (combines role + user permissions)
 * This is what the user actually has access to
 */
export async function getUserEffectivePermissions(userId: string): Promise<string[]> {
  try {
    return await api.get<string[]>(`/api/permissions/users/${userId}/effective`);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to load effective permissions. Please try again.');
  }
}

/**
 * Assign permission to a role (Admin only)
 */
export async function assignRolePermission(
  roleName: string,
  data: AssignPermissionRequest
): Promise<{ message: string }> {
  try {
    return await api.post<{ message: string }>(
      `/api/permissions/roles/${encodeURIComponent(roleName)}`,
      data
    );
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to assign permission to role. Please try again.');
  }
}

/**
 * Bulk assign permissions to a role (Admin only)
 */
export async function bulkAssignRolePermissions(
  roleName: string,
  data: BulkAssignPermissionRequest
): Promise<{ message: string; assigned: number }> {
  try {
    return await api.post<{ message: string; assigned: number }>(
      `/api/permissions/roles/${encodeURIComponent(roleName)}/bulk`,
      data
    );
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to bulk assign permissions. Please try again.');
  }
}

/**
 * Assign permission to a user (Admin only)
 * This creates a custom permission override for the user
 */
export async function assignUserPermission(
  userId: string,
  data: AssignPermissionRequest
): Promise<{ message: string }> {
  try {
    return await api.post<{ message: string }>(`/api/permissions/users/${userId}`, data);
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to assign permission to user. Please try again.');
  }
}

/**
 * Bulk assign permissions to a user (Admin only)
 */
export async function bulkAssignUserPermissions(
  userId: string,
  data: BulkAssignPermissionRequest
): Promise<{ message: string; assigned: number }> {
  try {
    return await api.post<{ message: string; assigned: number }>(
      `/api/permissions/users/${userId}/bulk`,
      data
    );
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to bulk assign permissions. Please try again.');
  }
}

/**
 * Remove user permission override (Admin only)
 * This removes a custom permission, user will fall back to role permissions
 */
export async function removeUserPermission(
  userId: string,
  permissionId: number
): Promise<{ message: string }> {
  try {
    return await api.delete<{ message: string }>(
      `/api/permissions/users/${userId}/${permissionId}`
    );
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to remove user permission. Please try again.');
  }
}

/**
 * Get current user's permissions
 * Returns permissions from JWT token or fetches from API
 */
export async function getCurrentUserPermissions(): Promise<string[]> {
  try {
    // First try to get from JWT token (faster)
    const user = getCurrentUserFromToken();
    if (user?.permissions && Array.isArray(user.permissions)) {
      return user.permissions;
    }
    
    // Fallback: fetch from API
    return await api.get<string[]>('/api/permissions/me');
  } catch (error) {
    const apiError = error as ApiError;
    // If API call fails, return empty array (fail secure)
    console.warn('Unable to fetch user permissions:', apiError.message);
    return [];
  }
}

/**
 * Helper to get current user from token
 */
function getCurrentUserFromToken(): { permissions?: string[] } | null {
  if (typeof window === 'undefined') return null;
  
  const token = localStorage.getItem('auth_token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      permissions: payload.permissions || payload.perm || [],
    };
  } catch {
    return null;
  }
}

