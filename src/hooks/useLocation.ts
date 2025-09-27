import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { useToast } from '@/hooks/use-toast';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface UseLocationReturn {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<void>;
  watchLocation: () => Promise<void>;
  clearWatch: () => void;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<string | null>(null);
  const { toast } = useToast();

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Request permissions first
      const permissions = await Geolocation.requestPermissions();
      
      if (permissions.location === 'denied') {
        throw new Error('Location permission denied');
      }

      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      const locationData: LocationData = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy,
      };

      setLocation(locationData);
      toast({
        title: "Location Found",
        description: "Your current location has been detected.",
      });
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to get location';
      setError(errorMessage);
      toast({
        title: "Location Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const watchLocation = async () => {
    try {
      const permissions = await Geolocation.requestPermissions();
      
      if (permissions.location === 'denied') {
        throw new Error('Location permission denied');
      }

      const id = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
        (position, err) => {
          if (err) {
            setError(err.message);
            return;
          }

          if (position) {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
            });
          }
        }
      );

      setWatchId(id);
    } catch (err: any) {
      setError(err.message || 'Failed to watch location');
    }
  };

  const clearWatch = () => {
    if (watchId) {
      Geolocation.clearWatch({ id: watchId });
      setWatchId(null);
    }
  };

  useEffect(() => {
    return () => {
      clearWatch();
    };
  }, []);

  return {
    location,
    loading,
    error,
    getCurrentLocation,
    watchLocation,
    clearWatch,
  };
};