// API Client for PakWattanAPI Backend
// Centralized API service layer with JWT authentication support
import { getApiBaseUrl } from '@/lib/config';

const API_BASE_URL = getApiBaseUrl();

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  /**
   * Get authentication token from localStorage
   */
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  /**
   * Set authentication token in localStorage
   */
  setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  /**
   * Remove authentication token from localStorage
   */
  removeAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Get default headers with authentication
   */
  private getHeaders(customHeaders?: HeadersInit): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Merge custom headers if provided
    if (customHeaders) {
      if (customHeaders instanceof Headers) {
        customHeaders.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(customHeaders)) {
        customHeaders.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, customHeaders);
      }
    }

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API response with automatic token refresh on 401
   */
  private async handleResponse<T>(response: Response, retryFn?: () => Promise<Response>): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    
    let data: unknown;
    try {
      if (isJson) {
        const text = await response.text();
        if (!text) {
          data = {};
        } else {
          try {
            data = JSON.parse(text);
          } catch (parseError) {
            // If JSON parsing fails, throw a more helpful error
            const errorPos = parseError instanceof Error && parseError.message.includes('position') 
              ? parseInt(parseError.message.match(/position (\d+)/)?.[1] || '0')
              : 0;
            
            const startPos = Math.max(0, errorPos - 100);
            const endPos = Math.min(text.length, errorPos + 100);
            const context = text.substring(startPos, endPos);
            
            // Only show detailed error in development
            if (process.env.NODE_ENV === 'development') {
              throw new Error(
                `Invalid JSON response from server: ${parseError instanceof Error ? parseError.message : 'Unknown error'}. ` +
                `Response length: ${text.length} characters. ` +
                `Context around error (position ${errorPos}): ...${context}...`
              );
            } else {
              throw new Error(
                'The server returned an invalid response. Please try again or contact support if the problem persists.'
              );
            }
          }
        }
      } else {
        const text = await response.text();
        data = text ? { message: text } : {};
      }
    } catch (error) {
      // If it's already an Error we threw, re-throw it
      if (error instanceof Error) {
        throw error;
      }
      // Otherwise, wrap it
      if (process.env.NODE_ENV === 'development') {
        throw new Error(`Unable to process server response. Please try again. Error: ${error}`);
      } else {
        throw new Error('Unable to process the server response. Please try again or contact support if the problem persists.');
      }
    }

    if (!response.ok) {
      // Handle 401 Unauthorized - attempt token refresh
      if (response.status === 401 && retryFn) {
        try {
          // Import token refresh service dynamically to avoid circular dependency
          const { tokenRefreshService } = await import('../services/tokenRefresh');
          
          // Attempt to refresh token and retry request
          return await tokenRefreshService.handle401Error(async () => {
            const retryResponse = await retryFn();
            return this.handleResponse<T>(retryResponse);
          });
        } catch {
          // Refresh failed - show error and let it propagate
          const body = data as { message?: string; error?: string; errors?: Record<string, string[]> };
          const error: ApiError = {
            message: body?.message || body?.error || 'Your session has expired. Please sign in again to continue.',
            statusCode: response.status,
            errors: body?.errors,
          };
          throw error;
        }
      }

      const body = data as {
        message?: string;
        error?: string;
        detail?: string;
        title?: string;
        errors?: Record<string, string[]>;
      };

      // ASP.NET ProblemDetails: `detail` often has the real DB/SQL reason; `message` may be the generic EF wrapper.
      let errorMessage = body?.message || body?.error || body?.title;
      const detail = body?.detail?.trim();
      if (detail && detail !== errorMessage) {
        errorMessage = errorMessage ? `${errorMessage}\n\n${detail}` : detail;
      }
      if (!errorMessage && detail) {
        errorMessage = detail;
      }
      
      if (!errorMessage) {
        errorMessage = response.status === 400 
          ? 'The request was invalid. Please review your input and try again.'
          : response.status === 401
          ? 'Your session has expired. Please sign in again to continue.'
          : response.status === 403
          ? 'You do not have permission to perform this action. Please contact an administrator if you believe this is an error.'
          : response.status === 404
          ? 'The requested resource could not be found. It may have been deleted or moved.'
          : response.status === 409
          ? 'This resource has been modified by another user. Please refresh the page and try again.'
          : response.status === 422
          ? 'The information you provided is invalid. Please check all fields and try again.'
          : response.status === 500
          ? 'A server error occurred. Our team has been notified. Please try again in a few moments or contact support if the issue persists.'
          : response.status === 503
          ? 'The service is temporarily unavailable. Please try again in a few moments.'
          : `An error occurred (${response.status}). Please try again or contact support if the problem continues.`;
      }
      
      const error: ApiError = {
        message: errorMessage,
        statusCode: response.status,
        errors: body?.errors,
      };
      throw error;
    }

    return data as T;
  }

  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(customHeaders),
      });

      const retryFn = () => fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(customHeaders),
      });

      return this.handleResponse<T>(response, retryFn);
    } catch (error) {
      // Handle network errors (fetch failures, CORS, etc.)
      if (error instanceof TypeError) {
        // CORS errors or connection refused
        const errorMessage = error.message.toLowerCase();
        const isCorsError = errorMessage.includes('cors') || 
                           errorMessage.includes('access-control') ||
                           (errorMessage.includes('failed to fetch') && typeof window !== 'undefined' && window.location.protocol === 'https:');
        
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || isCorsError) {
          let message: string;
          
          if (isCorsError || (typeof window !== 'undefined' && window.location.protocol === 'https:' && this.baseUrl.startsWith('http:'))) {
            if (process.env.NODE_ENV === 'development') {
              message = `Unable to connect to server at ${this.baseUrl}\n\nPossible issues:\n1. CORS: The API server needs to allow requests from ${typeof window !== 'undefined' ? window.location.origin : 'your domain'}\n2. Mixed Content: HTTPS frontend cannot call HTTP API. Consider using HTTPS for the API server.\n\nPlease check the API server CORS configuration to allow requests from your frontend domain.`;
            } else {
              message = 'Unable to connect to the server. Please check your internet connection and try again. If the problem persists, contact support.';
            }
          } else {
            message = 'Unable to connect to the server. Please check your internet connection and ensure the service is available.';
          }
          
          throw {
            message: message,
            statusCode: 0,
          } as ApiError;
        }
      }
      throw error;
    }
  }

  /**
   * Generic POST request
   */
  async post<T>(endpoint: string, data?: unknown, customHeaders?: HeadersInit): Promise<T> {
    try {
      const body = data ? JSON.stringify(data) : undefined;
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(customHeaders),
        body,
      });

      const retryFn = () => fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(customHeaders),
        body,
      });

      return this.handleResponse<T>(response, retryFn);
    } catch (error) {
      // Handle network errors (fetch failures, CORS, etc.)
      if (error instanceof TypeError) {
        // CORS errors or connection refused
        const errorMessage = error.message.toLowerCase();
        const isCorsError = errorMessage.includes('cors') || 
                           errorMessage.includes('access-control') ||
                           (errorMessage.includes('failed to fetch') && typeof window !== 'undefined' && window.location.protocol === 'https:');
        
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || isCorsError) {
          let message: string;
          
          if (isCorsError || (typeof window !== 'undefined' && window.location.protocol === 'https:' && this.baseUrl.startsWith('http:'))) {
            if (process.env.NODE_ENV === 'development') {
              message = `Unable to connect to server at ${this.baseUrl}\n\nPossible issues:\n1. CORS: The API server needs to allow requests from ${typeof window !== 'undefined' ? window.location.origin : 'your domain'}\n2. Mixed Content: HTTPS frontend cannot call HTTP API. Consider using HTTPS for the API server.\n\nPlease check the API server CORS configuration to allow requests from your frontend domain.`;
            } else {
              message = 'Unable to connect to the server. Please check your internet connection and try again. If the problem persists, contact support.';
            }
          } else {
            message = 'Unable to connect to the server. Please check your internet connection and ensure the service is available.';
          }
          
          throw {
            message: message,
            statusCode: 0,
          } as ApiError;
        }
      }
      throw error;
    }
  }

  /**
   * Generic PUT request
   */
  async put<T>(endpoint: string, data?: unknown, customHeaders?: HeadersInit): Promise<T> {
    try {
      const body = data ? JSON.stringify(data) : undefined;
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(customHeaders),
        body,
      });

      const retryFn = () => fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(customHeaders),
        body,
      });

      return this.handleResponse<T>(response, retryFn);
    } catch (error) {
      // Handle network errors (fetch failures, CORS, etc.)
      if (error instanceof TypeError) {
        // CORS errors or connection refused
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('cors')) {
          let message: string;
          if (errorMessage.includes('cors')) {
            if (process.env.NODE_ENV === 'development') {
              message = `Unable to connect to server at ${this.baseUrl}. This might be a CORS issue. Please check the API server CORS configuration.`;
            } else {
              message = 'Unable to connect to the server. Please check your internet connection and try again.';
            }
          } else {
            message = 'Unable to connect to the server. Please check your internet connection and ensure the service is available.';
          }
          throw {
            message: message,
            statusCode: 0,
          } as ApiError;
        }
      }
      throw error;
    }
  }

  /**
   * Generic DELETE request
   */
  async delete<T>(endpoint: string, customHeaders?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(customHeaders),
      });

      const retryFn = () => fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(customHeaders),
      });

      return this.handleResponse<T>(response, retryFn);
    } catch (error) {
      // Handle network errors (fetch failures, CORS, etc.)
      if (error instanceof TypeError) {
        // CORS errors or connection refused
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('cors')) {
          let message: string;
          if (errorMessage.includes('cors')) {
            if (process.env.NODE_ENV === 'development') {
              message = `Unable to connect to server at ${this.baseUrl}. This might be a CORS issue. Please check the API server CORS configuration.`;
            } else {
              message = 'Unable to connect to the server. Please check your internet connection and try again.';
            }
          } else {
            message = 'Unable to connect to the server. Please check your internet connection and ensure the service is available.';
          }
          throw {
            message: message,
            statusCode: 0,
          } as ApiError;
        }
      }
      throw error;
    }
  }

  /**
   * POST request for file uploads (FormData)
   */
  async postFormData<T>(endpoint: string, formData: FormData, customHeaders?: HeadersInit): Promise<T> {
    const headers: Record<string, string> = {};
    
    // Don't set Content-Type for FormData - browser will set it with boundary
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Merge any custom headers
    if (customHeaders) {
      if (customHeaders instanceof Headers) {
        customHeaders.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(customHeaders)) {
        customHeaders.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, customHeaders);
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const retryFn = () => fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      return this.handleResponse<T>(response, retryFn);
    } catch (error) {
      // Handle network errors (fetch failures, CORS, etc.)
      if (error instanceof TypeError) {
        // CORS errors or connection refused
        const errorMessage = error.message.toLowerCase();
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('cors')) {
          let message: string;
          if (errorMessage.includes('cors')) {
            if (process.env.NODE_ENV === 'development') {
              message = `Unable to connect to server at ${this.baseUrl}. This might be a CORS issue. Please check the API server CORS configuration.`;
            } else {
              message = 'Unable to connect to the server. Please check your internet connection and try again.';
            }
          } else {
            message = 'Unable to connect to the server. Please check your internet connection and ensure the service is available.';
          }
          throw {
            message: message,
            statusCode: 0,
          } as ApiError;
        }
      }
      throw error;
    }
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Log API base URL in development for debugging
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  console.log('[API Client] Base URL:', API_BASE_URL);
}

// Export convenience methods
export const api = {
  get: <T>(endpoint: string, headers?: HeadersInit) => apiClient.get<T>(endpoint, headers),
  post: <T>(endpoint: string, data?: unknown, headers?: HeadersInit) => apiClient.post<T>(endpoint, data, headers),
  put: <T>(endpoint: string, data?: unknown, headers?: HeadersInit) => apiClient.put<T>(endpoint, data, headers),
  delete: <T>(endpoint: string, headers?: HeadersInit) => apiClient.delete<T>(endpoint, headers),
  postFormData: <T>(endpoint: string, formData: FormData, headers?: HeadersInit) => 
    apiClient.postFormData<T>(endpoint, formData, headers),
  setAuthToken: (token: string) => apiClient.setAuthToken(token),
  removeAuthToken: () => apiClient.removeAuthToken(),
};

