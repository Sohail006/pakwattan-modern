// Authentication API endpoints and utilities
import { api, ApiError } from './client';

export interface LoginRequest {
  email: string;
  password: string;
  userType?: string; // Optional: student, parent, teacher, admin
}

export interface GuardianInfo {
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
  students?: StudentBasicInfo[];
}

export interface StudentBasicInfo {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    profileImageUrl?: string;
    isActive: boolean;
  };
  guardian?: GuardianInfo; // If user is a guardian
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  userType?: string;
  dateOfBirth?: string;
}

export interface RegisterResponse {
  userId: string;
  email: string;
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  expiresIn: number;
}

/**
 * Login user with email and password
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    // Debug: Log what we're sending
    if (process.env.NODE_ENV === 'development') {
      console.log('Login request payload:', JSON.stringify(credentials, null, 2));
    }
    
    const response = await api.post<LoginResponse>('/api/auth/login', credentials);
    
    // Store token if login successful
    if (response.token) {
      api.setAuthToken(response.token);
      // Also store user info and guardian info from response for easy access
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_info', JSON.stringify(response.user));
        if (response.refreshToken) {
          localStorage.setItem('refresh_token', response.refreshToken);
        }
        if (response.guardian) {
          localStorage.setItem('guardian_info', JSON.stringify(response.guardian));
        }
      }
    }
    
    return response;
  } catch (error) {
    // Check if it's an ApiError from the client
    if (error && typeof error === 'object' && 'message' in error) {
      const apiError = error as ApiError;
      const errorMessage = apiError.message || 'Unable to log in. Please check your credentials and try again.';
      if (process.env.NODE_ENV === 'development') {
        console.error('Login error:', errorMessage);
      }
      throw new Error(errorMessage);
    }
    // Handle other errors (network, etc.)
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Login failed. Please check your credentials and try again.');
  }
}

/**
 * Register new user
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>('/api/auth/register', data);
    return response;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to complete registration. Please check your information and try again.');
  }
}

/**
 * Logout user (clear token)
 */
export function logout(): void {
  api.removeAuthToken();
  // Clear user info and refresh token
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user_info');
    localStorage.removeItem('guardian_info');
    localStorage.removeItem('refresh_token');
  }
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

/**
 * Refresh authentication token
 */
export async function refreshToken(refreshTokenValue: string): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/api/auth/refresh', { refreshToken: refreshTokenValue });
    
    if (response.token) {
      api.setAuthToken(response.token);
      // Store refresh token if provided
      if (response.refreshToken && typeof window !== 'undefined') {
        localStorage.setItem('refresh_token', response.refreshToken);
      }
      // Update user info if provided
      if (response.user && typeof window !== 'undefined') {
        localStorage.setItem('user_info', JSON.stringify(response.user));
        if (response.guardian) {
          localStorage.setItem('guardian_info', JSON.stringify(response.guardian));
        }
      }
    }
    
    return response;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.message || 'Unable to refresh your session. Please log in again.');
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('auth_token');
}

/**
 * Get current user info from token (basic implementation)
 * For production, decode JWT or fetch from /api/auth/me endpoint
 * 
 * This function tries to get user info from:
 * 1. Stored user_info from login response (most reliable)
 * 2. JWT token payload (fallback)
 */
export function getCurrentUser(): Record<string, unknown> | null {
  if (typeof window === 'undefined') return null;
  
  // First, try to get user info from login response (most reliable)
  const storedUserInfo = localStorage.getItem('user_info');
  if (storedUserInfo) {
    try {
      const userInfo = JSON.parse(storedUserInfo);
      // Ensure it has roles array
      if (userInfo && typeof userInfo === 'object' && Array.isArray(userInfo.roles)) {
        return userInfo;
      }
    } catch {
      // Fall through to JWT decoding
    }
  }

  // Fallback: Decode JWT token
  const token = localStorage.getItem('auth_token');
  if (!token) return null;

  try {
    // Basic JWT decode (without verification - for client-side only)
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    // Extract roles from JWT claims
    // ASP.NET Identity uses ClaimTypes.Role which maps to:
    // "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    const roleClaimType = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    let roles: string[] = [];
    
    // Method 1: Check if roles exist as a simple array (if API adds them)
    if (payload.roles && Array.isArray(payload.roles)) {
      roles = payload.roles;
    }
    // Method 2: Check ASP.NET Identity claim type (single role)
    else if (payload[roleClaimType]) {
      const role = payload[roleClaimType];
      roles = Array.isArray(role) ? role : [role];
    }
    // Method 3: Check if role exists as simple 'role' key
    else if (payload.role) {
      roles = Array.isArray(payload.role) ? payload.role : [payload.role];
    }
    // Method 4: Extract all role-related claims (handle multiple roles)
    else {
      // Look for any key containing 'role' (case insensitive)
      Object.keys(payload).forEach(key => {
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('role') || lowerKey === 'role') {
          const roleValue = payload[key];
          if (typeof roleValue === 'string') {
            roles.push(roleValue);
          } else if (Array.isArray(roleValue)) {
            roles.push(...roleValue.filter(r => typeof r === 'string'));
          }
        }
      });
      
      // Also check for multiple claims with the same claim type (JWT standard)
      // Some JWT libraries handle multiple claims differently
      // Check all keys that might be role claims
      const allKeys = Object.keys(payload);
      allKeys.forEach(key => {
        if (key === roleClaimType || key.endsWith('/role')) {
          const value = payload[key];
          if (typeof value === 'string' && !roles.includes(value)) {
            roles.push(value);
          }
        }
      });
    }
    
    // Return payload with extracted roles
    return {
      ...payload,
      roles: roles.length > 0 ? roles : []
    };
  } catch {
    return null;
  }
}

/**
 * Get user roles from current user
 * Helper function to extract roles consistently
 */
export function getUserRoles(): string[] {
  const user = getCurrentUser();
  if (!user || typeof user !== 'object') return [];
  
  const roles = (user as Record<string, unknown>).roles;
  if (Array.isArray(roles)) {
    return roles.filter((r): r is string => typeof r === 'string');
  }
  
  return [];
}

