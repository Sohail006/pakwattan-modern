// SignalR Hub Connection Service
import * as signalR from '@microsoft/signalr';

// Use the same URL logic as API client
const HUB_URL = (() => {
  if (process.env.NEXT_PUBLIC_BACKEND_BASE_URL) {
    return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL.replace(/\/$/, '')}/notificationHub`;
  }
  if (typeof window !== 'undefined') {
    // Default to API HTTPS port if running locally
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'https://localhost:7210/notificationHub';
    }
  }
  // Fallback
  return 'http://localhost:5000/notificationHub';
})();

let connection: signalR.HubConnection | null = null;

export interface NotificationMessage {
  type: 'StudentCreated' | 'StudentUpdated' | 'StudentDeleted' | 'General';
  data: unknown;
  timestamp: string;
}

export type NotificationCallback = (message: NotificationMessage) => void;

/**
 * Create and configure SignalR connection
 */
export function createHubConnection(): signalR.HubConnection {
  if (connection && connection.state === signalR.HubConnectionState.Connected) {
    return connection;
  }

  // Log the URL being used for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[SignalR] Connecting to:', HUB_URL);
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl(HUB_URL, {
      accessTokenFactory: () => {
        // Get JWT token from localStorage
        if (typeof window !== 'undefined') {
          return localStorage.getItem('auth_token') || '';
        }
        return '';
      },
      // Don't skip negotiation for better compatibility
      transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents,
    })
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: retryContext => {
        // Exponential backoff: 0s, 2s, 10s, then stop
        if (retryContext.previousRetryCount === 0) return 0;
        if (retryContext.previousRetryCount === 1) return 2000;
        if (retryContext.previousRetryCount === 2) return 10000;
        // Stop retrying after 3 attempts to reduce console noise
        return null;
      }
    })
    .configureLogging(process.env.NODE_ENV === 'development' ? signalR.LogLevel.Warning : signalR.LogLevel.None)
    .build();
  
  // Suppress connection errors in the connection's error handler
  connection.onclose((error) => {
    if (error) {
      // Only log non-connection-refused errors
      const errorMessage = error.message || String(error);
      if (!errorMessage.includes('ERR_CONNECTION_REFUSED') && 
          !errorMessage.includes('Failed to fetch') &&
          !errorMessage.includes('ECONNREFUSED')) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[SignalR] Connection closed:', errorMessage);
        }
      }
    }
  });

  return connection;
}


/**
 * Start the SignalR connection
 */
export async function startConnection(): Promise<void> {
  if (!connection) {
    connection = createHubConnection();
  }

  if (connection.state === signalR.HubConnectionState.Connected) {
    return;
  }

  // Skip health check - SignalR will handle connection failures gracefully
  // Health check is optional and can cause console noise if endpoint doesn't exist
  // We'll let SignalR's own connection logic handle availability detection

  try {
    await connection.start();
    if (process.env.NODE_ENV === 'development') {
      console.log('[SignalR] Connection established');
    }
  } catch (error) {
    // Suppress connection refused errors - they're expected if API isn't running
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorString = String(error).toLowerCase();
    
    // Only log if it's not a connection refused error
    if (!errorString.includes('err_connection_refused') && 
        !errorString.includes('failed to fetch') &&
        !errorString.includes('econnrefused') &&
        !errorMessage.includes('ERR_CONNECTION_REFUSED')) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[SignalR] Connection failed (non-critical):', errorMessage);
      }
    }
    // Don't throw - allow the app to continue without SignalR
    // The connection will retry automatically due to withAutomaticReconnect (up to 3 times)
  }
}

/**
 * Stop the SignalR connection
 */
export async function stopConnection(): Promise<void> {
  if (connection && connection.state !== signalR.HubConnectionState.Disconnected) {
    try {
      await connection.stop();
      if (process.env.NODE_ENV === 'development') {
        console.debug('SignalR connection stopped');
      }
    } catch {
      // Silently handle stop errors
    }
  }
}

/**
 * Subscribe to notifications
 */
export function onNotification(callback: NotificationCallback): void {
  if (!connection) {
    // Silently return if connection not initialized
    return;
  }

  // Listen to all notification types
  connection.on('StudentCreated', (data: unknown) => {
    callback({
      type: 'StudentCreated',
      data,
      timestamp: new Date().toISOString(),
    });
  });

  connection.on('StudentUpdated', (data: unknown) => {
    callback({
      type: 'StudentUpdated',
      data,
      timestamp: new Date().toISOString(),
    });
  });

  connection.on('StudentDeleted', (data: unknown) => {
    callback({
      type: 'StudentDeleted',
      data,
      timestamp: new Date().toISOString(),
    });
  });

  // Generic notification handler
  connection.on('ReceiveNotification', (data: unknown) => {
    callback({
      type: 'General',
      data,
      timestamp: new Date().toISOString(),
    });
  });
}

/**
 * Remove notification listeners
 */
export function offNotification(): void {
  if (!connection) return;

  connection.off('StudentCreated');
  connection.off('StudentUpdated');
  connection.off('StudentDeleted');
  connection.off('ReceiveNotification');
}

/**
 * Join a group
 */
export async function joinGroup(groupName: string): Promise<void> {
  if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
    throw new Error('SignalR connection not established');
  }

  await connection.invoke('JoinGroup', groupName);
}

/**
 * Leave a group
 */
export async function leaveGroup(groupName: string): Promise<void> {
  if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
    throw new Error('SignalR connection not established');
  }

  await connection.invoke('LeaveGroup', groupName);
}

/**
 * Join student group
 */
export async function joinStudentGroup(studentId: number): Promise<void> {
  if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
    throw new Error('SignalR connection not established');
  }

  await connection.invoke('JoinStudentGroup', studentId);
}

/**
 * Join teacher group
 */
export async function joinTeacherGroup(teacherId: number): Promise<void> {
  if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
    throw new Error('SignalR connection not established');
  }

  await connection.invoke('JoinTeacherGroup', teacherId);
}

/**
 * Join admin group
 */
export async function joinAdminGroup(): Promise<void> {
  if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
    throw new Error('SignalR connection not established');
  }

  await connection.invoke('JoinAdminGroup');
}

/**
 * Get connection state
 */
export function getConnectionState(): signalR.HubConnectionState {
  return connection?.state || signalR.HubConnectionState.Disconnected;
}

