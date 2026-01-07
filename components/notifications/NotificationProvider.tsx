'use client'

import { createContext, useContext, ReactNode } from 'react';
import { useSignalR, UseSignalROptions } from '@/hooks/useSignalR';
import { NotificationMessage } from '@/lib/signalr/hubConnection';
import { isSignalREnabled } from '@/lib/config';

interface NotificationContextType {
  isConnected: boolean;
  connectionError: string | null;
  notifications: NotificationMessage[];
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({
  children,
  options,
}: {
  children: ReactNode;
  options?: UseSignalROptions;
}) {
  // SignalR is optional - only connect if explicitly enabled via environment variable
  // Set NEXT_PUBLIC_ENABLE_SIGNALR=true to enable WebSocket notifications
  const signalREnabled = isSignalREnabled();
  
  // Only auto-connect if SignalR is enabled
  const signalR = useSignalR(options || { 
    autoConnect: signalREnabled, 
    joinAdminOnConnect: signalREnabled 
  });

  return (
    <NotificationContext.Provider value={signalR}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

