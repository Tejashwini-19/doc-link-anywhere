import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';
import { useToast } from '@/hooks/use-toast';

interface Hospital {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance?: number;
  address: string;
  phone: string;
  emergency: boolean;
}

interface LocationMapProps {
  hospitals: Hospital[];
  onHospitalSelect?: (hospital: Hospital) => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ hospitals, onHospitalSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapboxConfigured, setIsMapboxConfigured] = useState(false);
  const { location, loading, getCurrentLocation } = useLocation();
  const { toast } = useToast();

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Update hospital distances when location changes
  const hospitalsWithDistance = React.useMemo(() => {
    if (!location) return hospitals;
    
    return hospitals.map(hospital => ({
      ...hospital,
      distance: calculateDistance(
        location.latitude,
        location.longitude,
        hospital.latitude,
        hospital.longitude
      )
    })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [hospitals, location]);

  const initializeMap = async () => {
    if (!mapContainer.current || !isMapboxConfigured || !location) return;

    try {
      // Dynamically import mapbox-gl to avoid SSR issues
      const mapboxgl = await import('mapbox-gl');
      
      // Set access token
      mapboxgl.default.accessToken = mapboxToken;

      // Initialize map
      map.current = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [location.longitude, location.latitude],
        zoom: 13,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

      // Add user location marker
      new mapboxgl.default.Marker({ color: '#3B82F6' })
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new mapboxgl.default.Popup().setHTML('<h3>Your Location</h3>'))
        .addTo(map.current);

      // Add hospital markers
      hospitalsWithDistance.forEach((hospital) => {
        const color = hospital.emergency ? '#EF4444' : '#10B981';
        const marker = new mapboxgl.default.Marker({ color })
          .setLngLat([hospital.longitude, hospital.latitude])
          .setPopup(
            new mapboxgl.default.Popup().setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">${hospital.name}</h3>
                <p class="text-sm text-gray-600">${hospital.address}</p>
                <p class="text-sm">${hospital.distance?.toFixed(1)} km away</p>
                <p class="text-sm">📞 ${hospital.phone}</p>
                ${hospital.emergency ? '<span class="text-red-600 text-xs">🚨 Emergency Available</span>' : ''}
              </div>
            `)
          )
          .addTo(map.current);

        // Add click handler
        marker.getElement().addEventListener('click', () => {
          if (onHospitalSelect) {
            onHospitalSelect(hospital);
          }
        });
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: "Map Error",
        description: "Failed to load map. Please check your internet connection.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isMapboxConfigured && location) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isMapboxConfigured, location, hospitalsWithDistance]);

  const handleMapboxTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsMapboxConfigured(true);
      toast({
        title: "Mapbox Configured",
        description: "Map will now load with your location and nearby hospitals.",
      });
    }
  };

  const handleGetLocation = async () => {
    await getCurrentLocation();
  };

  const openDirections = (hospital: Hospital) => {
    if (location) {
      const url = `https://www.google.com/maps/dir/${location.latitude},${location.longitude}/${hospital.latitude},${hospital.longitude}`;
      window.open(url, '_blank');
    }
  };

  const callHospital = (hospital: Hospital) => {
    window.open(`tel:${hospital.phone}`, '_self');
  };

  if (!isMapboxConfigured) {
    return (
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-base">Configure Map</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To show an interactive map with hospital locations, please enter your Mapbox public token.
            Get yours at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              type="password"
            />
            <Button onClick={handleMapboxTokenSubmit} size="sm">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            Live Map
            <Button onClick={handleGetLocation} disabled={loading} size="sm" variant="outline">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
              {loading ? "Locating..." : "My Location"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {location ? (
            <div
              ref={mapContainer}
              className="w-full h-64 rounded-lg border border-border"
              style={{ minHeight: '256px' }}
            />
          ) : (
            <div className="aspect-square bg-accent/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click "My Location" to show nearby hospitals
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {location && (
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-base">Nearest Hospitals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {hospitalsWithDistance.slice(0, 3).map((hospital) => (
              <div key={hospital.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div className="flex-1">
                  <p className="text-sm font-medium">{hospital.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {hospital.distance?.toFixed(1)} km away
                    {hospital.emergency && " • 🚨 Emergency"}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => openDirections(hospital)}>
                    Directions
                  </Button>
                  <Button size="sm" variant="medical" onClick={() => callHospital(hospital)}>
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationMap;