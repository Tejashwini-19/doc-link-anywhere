import { useState, useEffect } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { useToast } from '@/hooks/use-toast';

interface NotificationOptions {
  title: string;
  body: string;
  iconColor?: string;
  attachments?: any[];
  actionTypeId?: string;
  extra?: any;
}

export const useNotifications = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkPermissions();
    
    // Listen for notification actions
    LocalNotifications.addListener('localNotificationActionPerformed', notification => {
      console.log('Notification action performed:', notification);
    });

    return () => {
      LocalNotifications.removeAllListeners();
    };
  }, []);

  const checkPermissions = async () => {
    try {
      const status = await LocalNotifications.checkPermissions();
      if (status.display === 'granted') {
        setPermissionGranted(true);
      } else {
        await requestPermissions();
      }
    } catch (error) {
      console.error('Error checking notification permissions:', error);
    }
  };

  const requestPermissions = async () => {
    try {
      const status = await LocalNotifications.requestPermissions();
      setPermissionGranted(status.display === 'granted');
      
      if (status.display === 'denied') {
        toast({
          title: "Notifications Disabled",
          description: "Please enable notifications in your device settings to receive health alerts.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  };

  const scheduleNotification = async (options: NotificationOptions, scheduleAt?: Date) => {
    if (!permissionGranted) {
      await requestPermissions();
      if (!permissionGranted) return;
    }

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: options.title,
            body: options.body,
            id: Date.now(),
            schedule: scheduleAt ? { at: scheduleAt } : undefined,
            sound: 'beep.wav',
            attachments: options.attachments,
            actionTypeId: options.actionTypeId,
            extra: options.extra,
          },
        ],
      });

      toast({
        title: "Notification Scheduled",
        description: options.title,
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
      toast({
        title: "Notification Error",
        description: "Failed to schedule notification",
        variant: "destructive",
      });
    }
  };

  const scheduleHealthReminder = async (message: string, scheduledTime: Date) => {
    await scheduleNotification(
      {
        title: "Swasthya Sathi - Health Reminder",
        body: message,
        iconColor: "#10B981",
        extra: { type: 'health_reminder' },
      },
      scheduledTime
    );
  };

  const scheduleEmergencyAlert = async (message: string) => {
    await scheduleNotification({
      title: "🚨 Emergency Alert - Swasthya Sathi",
      body: message,
      iconColor: "#EF4444",
      extra: { type: 'emergency' },
    });
  };

  return {
    permissionGranted,
    requestPermissions,
    scheduleNotification,
    scheduleHealthReminder,
    scheduleEmergencyAlert,
  };
};