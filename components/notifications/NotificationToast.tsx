'use client'

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, Bell } from 'lucide-react';
import { NotificationMessage } from '@/lib/signalr/hubConnection';

interface NotificationToastProps {
  notification: NotificationMessage;
  onClose: () => void;
  duration?: number;
}

export default function NotificationToast({
  notification,
  onClose,
  duration = 5000,
}: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'StudentCreated':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'StudentUpdated':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'StudentDeleted':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Bell className="w-5 h-5 text-primary-600" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'StudentCreated':
        return 'bg-green-50 border-green-200';
      case 'StudentUpdated':
        return 'bg-blue-50 border-blue-200';
      case 'StudentDeleted':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-primary-50 border-primary-200';
    }
  };

  const getTitle = () => {
    switch (notification.type) {
      case 'StudentCreated':
        return 'New Student Added';
      case 'StudentUpdated':
        return 'Student Updated';
      case 'StudentDeleted':
        return 'Student Deleted';
      default:
        return 'Notification';
    }
  };

  return (
    <div
      className={`${getBgColor()} border rounded-lg shadow-lg p-4 mb-3 flex items-start space-x-3 min-w-[300px] max-w-md animate-slide-in`}
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">{getTitle()}</h4>
        {(() => {
          const data = (notification.data && typeof notification.data === 'object')
            ? (notification.data as { name?: string; message?: string; gradeName?: string; sectionName?: string })
            : {} as { name?: string; message?: string; gradeName?: string; sectionName?: string };
          return (
            <>
              <p className="text-sm text-gray-700">
                {data.name || data.message || 'You have a new notification'}
              </p>
              {data.gradeName && (
                <p className="text-xs text-gray-500 mt-1">
                  Grade: {data.gradeName}
                  {data.sectionName && `, Section: ${data.sectionName}`}
                </p>
              )}
            </>
          );
        })()}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

