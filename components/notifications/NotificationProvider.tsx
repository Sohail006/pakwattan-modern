'use client'

import { createContext, useContext, ReactNode } from 'react';
import { useSignalR, UseSignalROptions } from '@/hooks/useSignalR';
import { NotificationMessage } from '@/lib/signalr/hubConnection';

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
  // SignalR is optional - app works fine without it
  // Only auto-connect if explicitly enabled (default: true, but fails gracefully)
  const signalR = useSignalR(options || { 
    autoConnect: true, 
    joinAdminOnConnect: true 
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

