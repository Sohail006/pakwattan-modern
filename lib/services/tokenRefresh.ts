// Token Refresh Service
// Handles automatic token refresh with proactive and reactive strategies

import { api } from '../api/client';
import { refreshToken as refreshTokenApi, logout } from '../api/auth';

interface QueuedRequest {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
  retry: () => Promise<unknown>;
}

class TokenRefreshService {
  private refreshPromise: Promise<string> | null = null;
  private queuedRequests: QueuedRequest[] = [];
  private checkInterval: NodeJS.Timeout | null = null;
  private lastActivityTime: number = Date.now();
  private isRefreshing: boolean = false;
  private refreshThreshold: number = 10 * 60 * 1000; // 10 minutes before expiry
  private checkIntervalMs: number = 5 * 60 * 1000; // Check every 5 minutes
  private activityTimeout: number = 30 * 60 * 1000; // 30 minutes of inactivity

  constructor() {
    this.setupActivityTracking();
    this.startTokenMonitoring();
  }

  /**
   * Setup user activity tracking
   */
  private setupActivityTracking(): void {
    if (typeof window === 'undefined') return;

    const updateActivity = () => {
      this.lastActivityTime = Date.now();
    };

    // Track various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      window.addEventListener(event, updateActivity, { passive: true });
    });

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        updateActivity();
      }
    });
  }

  /**
   * Check if user is currently active
   */
  private isUserActive(): boolean {
    const timeSinceLastActivity = Date.now() - this.lastActivityTime;
    return timeSinceLastActivity < this.activityTimeout;
  }

  /**
   * Get token expiry time from JWT
   */
  private getTokenExpiry(token: string | null): number | null {
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000; // Convert to milliseconds
    } catch {
      return null;
    }
  }

  /**
   * Get time until token expires (in milliseconds)
   */
  private getTimeUntilExpiry(): number | null {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('auth_token');
    if (!token) return null;

    const expiryTime = this.getTokenExpiry(token);
    if (!expiryTime) return null;

    return expiryTime - Date.now();
  }

  /**
   * Start monitoring token expiry
   */
  private startTokenMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Clear existing interval
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    // Check token expiry periodically
    this.checkInterval = setInterval(() => {
      this.checkAndRefreshToken();
    }, this.checkIntervalMs);

    // Also check immediately
    this.checkAndRefreshToken();
  }

  /**
   * Check if token needs refresh and refresh if needed
   */
  private async checkAndRefreshToken(): Promise<void> {
    if (typeof window === 'undefined') return;
    if (this.isRefreshing) return;

    // Only refresh if user is active
    if (!this.isUserActive()) {
      return;
    }

    const timeUntilExpiry = this.getTimeUntilExpiry();
    if (!timeUntilExpiry) return;

    // Refresh if token expires in less than threshold (10 minutes)
    if (timeUntilExpiry < this.refreshThreshold && timeUntilExpiry > 0) {
      await this.refreshTokenSilently();
    }
  }

  /**
   * Refresh token silently (proactive refresh)
   */
  private async refreshTokenSilently(): Promise<void> {
    if (this.isRefreshing) {
      // Wait for existing refresh to complete
      if (this.refreshPromise) {
        await this.refreshPromise;
      }
      return;
    }

    try {
      this.isRefreshing = true;
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        return; // No refresh token available
      }

      // Show subtle notification for proactive refresh
      this.showNotification(
        'Refreshing your session...',
        'info'
      );

      this.refreshPromise = this.performRefresh(refreshToken, true);
      await this.refreshPromise;
    } catch (error) {
      console.error('Silent token refresh failed:', error);
      // Don't show error for silent refresh - will be handled on next API call
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * Perform the actual token refresh
   */
  private async performRefresh(refreshTokenValue: string, showNotification: boolean = false): Promise<string> {
    try {
      const response = await refreshTokenApi(refreshTokenValue);
      
      // Update tokens
      if (response.token) {
        api.setAuthToken(response.token);
        localStorage.setItem('auth_token', response.token);
      }
      
      if (response.refreshToken) {
        localStorage.setItem('refresh_token', response.refreshToken);
      }

      // Update user info if provided
      if (response.user && typeof window !== 'undefined') {
        localStorage.setItem('user_info', JSON.stringify(response.user));
        if (response.guardian) {
          localStorage.setItem('guardian_info', JSON.stringify(response.guardian));
        }
      }

      // Show success notification if requested (for proactive refresh)
      if (showNotification) {
        this.showRefreshSuccess();
      }

      // Process queued requests
      this.processQueuedRequests();

      return response.token;
    } catch (error) {
      // Process queued requests with error
      this.processQueuedRequestsWithError(error);
      throw error;
    }
  }

  /**
   * Queue a request to be retried after token refresh
   */
  public queueRequest<T>(retryFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queuedRequests.push({
        resolve: resolve as (value: unknown) => void,
        reject,
        retry: retryFn as () => Promise<unknown>,
      });
    });
  }

  /**
   * Process queued requests after successful refresh
   */
  private processQueuedRequests(): void {
    const requests = [...this.queuedRequests];
    this.queuedRequests = [];

    requests.forEach(({ resolve, retry }) => {
      retry()
        .then(resolve)
        .catch((error) => {
          // If retry fails, reject the promise
          const request = requests.find(r => r.resolve === resolve);
          if (request) {
            request.reject(error);
          }
        });
    });
  }

  /**
   * Process queued requests with error (refresh failed)
   */
  private processQueuedRequestsWithError(error: unknown): void {
    const requests = [...this.queuedRequests];
    this.queuedRequests = [];

    requests.forEach(({ reject }) => {
      reject(error);
    });
  }

  /**
   * Handle 401 error - attempt reactive refresh
   */
  public async handle401Error<T>(retryFn: () => Promise<T>): Promise<T> {
    // If already refreshing, queue the request
    if (this.isRefreshing && this.refreshPromise) {
      return this.queueRequest(retryFn) as Promise<T>;
    }

    try {
      this.isRefreshing = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // Show notification for reactive refresh
      this.showNotification(
        'Session expired. Refreshing...',
        'info'
      );

      this.refreshPromise = this.performRefresh(refreshToken, false);
      await this.refreshPromise;

      // Retry the original request
      return await retryFn();
    } catch (error) {
      // Refresh failed - logout user
      this.handleRefreshFailure();
      throw error;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * Handle refresh failure - logout user
   */
  private handleRefreshFailure(): void {
    if (typeof window === 'undefined') return;

    // Show notification
    this.showNotification(
      'Your session has expired. Redirecting to login...',
      'error'
    );

    // Logout and redirect after a delay
    setTimeout(() => {
      logout();
    }, 2000);
  }

  /**
   * Show success notification for token refresh
   */
  public showRefreshSuccess(): void {
    this.showNotification(
      'Session refreshed successfully',
      'success'
    );
  }

  /**
   * Show notification (toast)
   */
  private showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    if (typeof window === 'undefined') return;

    try {
      // Use toast service (dynamic import to avoid circular dependency)
      import('../utils/toast').then(({ toastService }) => {
        const duration = type === 'error' ? 5000 : 3000;
        
        switch (type) {
          case 'success':
            toastService.success(message, duration);
            break;
          case 'error':
            toastService.error(message, duration);
            break;
          case 'info':
          default:
            toastService.info(message, duration);
            break;
        }
      }).catch(() => {
        // Fallback: console log if toast service not available
        console.log(`[${type.toUpperCase()}] ${message}`);
      });
    } catch {
      // Fallback: console log if import fails
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  }

  /**
   * Stop monitoring (cleanup)
   */
  public stop(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}

// Create singleton instance
export const tokenRefreshService = new TokenRefreshService();

