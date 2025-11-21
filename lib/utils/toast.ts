// Simple Toast Notification System
// Provides global toast notifications for token refresh and other messages

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

class ToastService {
  private listeners: Set<(toasts: ToastMessage[]) => void> = new Set();
  private toasts: ToastMessage[] = [];

  /**
   * Subscribe to toast updates
   */
  subscribe(listener: (toasts: ToastMessage[]) => void): () => void {
    this.listeners.add(listener);
    // Immediately call with current toasts
    listener([...this.toasts]);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Show a toast notification
   */
  show(message: string, type: ToastType = 'info', duration: number = 3000): void {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast: ToastMessage = {
      id,
      message,
      type,
      duration,
    };

    this.toasts.push(toast);
    this.notifyListeners();

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  /**
   * Remove a toast
   */
  remove(id: string): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notifyListeners();
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.toasts = [];
    this.notifyListeners();
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      listener([...this.toasts]);
    });
  }

  // Convenience methods
  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration || 5000);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }
}

export const toastService = new ToastService();

// Global function for easy access
if (typeof window !== 'undefined') {
  (window as unknown as { showToast?: (message: string, type: ToastType) => void }).showToast = (message: string, type: ToastType = 'info') => {
    toastService.show(message, type);
  };
}

