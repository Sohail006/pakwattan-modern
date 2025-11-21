// React Hook for SignalR Connection
import { useEffect, useState, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import {
  createHubConnection,
  startConnection,
  stopConnection,
  onNotification,
  offNotification,
  getConnectionState,
  NotificationMessage,
  joinAdminGroup,
  joinStudentGroup,
  joinTeacherGroup,
} from '@/lib/signalr/hubConnection';
import { isAuthenticated, getCurrentUser } from '@/lib/api/auth';

export interface UseSignalROptions {
  autoConnect?: boolean;
  joinAdminOnConnect?: boolean;
  studentId?: number;
  teacherId?: number;
}

export function useSignalR(options: UseSignalROptions = {}) {
  const { autoConnect = true, joinAdminOnConnect = false, studentId, teacherId } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  // Handle incoming notifications
  const handleNotification = useCallback((message: NotificationMessage) => {
    setNotifications((prev) => [message, ...prev.slice(0, 49)]); // Keep last 50 notifications
    
    // Optional: Show browser notification if page is not focused
    if (typeof window !== 'undefined' && document.hidden && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        const data = (message.data && typeof message.data === 'object')
          ? (message.data as { message?: string })
          : {} as { message?: string };
        new Notification('Pak Wattan Notification', {
          body: data.message || 'You have a new notification',
          icon: '/images/logo/logo_150x150.png',
        });
      }
    }
  }, []);

  // Connect to SignalR
  const connect = useCallback(async () => {
    if (!isAuthenticated()) {
      // Silently skip if not authenticated
      return;
    }

    try {
      setConnectionError(null);
      createHubConnection();
      await startConnection();
      setIsConnected(true);

      // Subscribe to notifications
      onNotification(handleNotification);

      // Join appropriate groups
      const user = getCurrentUser();
      const roles: string[] = (() => {
        const maybe = user as Record<string, unknown> | null;
        const extracted = maybe && Array.isArray((maybe as any).roles)
          ? ((maybe as any).roles as unknown[]).filter((r): r is string => typeof r === 'string')
          : [];
        return extracted;
      })();

      if (joinAdminOnConnect || roles.includes('Admin')) {
        await joinAdminGroup();
      }

      if (studentId) {
        await joinStudentGroup(studentId);
      }

      if (teacherId) {
        await joinTeacherGroup(teacherId);
      }
    } catch (error: unknown) {
      // SignalR connection failures are non-critical - app can function without it
      // Only log in development mode to reduce console noise
      if (process.env.NODE_ENV === 'development') {
        console.debug('SignalR connection unavailable (notifications disabled)');
      }
      const message = error instanceof Error ? error.message : 'Unable to connect to real-time notifications. The app will continue to work, but you may not receive live updates.';
      setConnectionError(message);
      setIsConnected(false);
      // Don't throw - allow app to continue without SignalR
    }
  }, [joinAdminOnConnect, studentId, teacherId, handleNotification]);

  // Disconnect from SignalR
  const disconnect = useCallback(async () => {
    try {
      offNotification();
      await stopConnection();
      setIsConnected(false);
      setNotifications([]);
    } catch (error) {
      // Silently handle disconnect errors
      if (process.env.NODE_ENV === 'development') {
        console.debug('SignalR disconnect error (ignored):', error);
      }
    }
  }, []);

  // Clear notifications
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Auto-connect on mount if enabled (only if authenticated)
  useEffect(() => {
    if (autoConnect && isAuthenticated()) {
      // Delay connection to avoid blocking initial render and reduce console noise
      // SignalR is optional - app works fine without it
      const timer = setTimeout(() => {
        connect().catch(() => {
          // Silently handle connection failures - SignalR is optional
          // Errors are already handled in the connect function and suppressed
        });
      }, 3000); // 3 second delay to let page load first and reduce noise

      return () => {
        clearTimeout(timer);
        disconnect();
      };
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  // Update connection state
  useEffect(() => {
    if (!autoConnect) return;

    const interval = setInterval(() => {
      const state = getConnectionState();
      setIsConnected(state === signalR.HubConnectionState.Connected);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoConnect]);

  return {
    isConnected,
    connectionError,
    notifications,
    connect,
    disconnect,
    clearNotifications,
  };
}

