import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  ArrowLeft, 
  Search, 
  Navigation,
  Phone,
  Clock,
  Star,
  Bed,
  Ambulance,
  Filter,
  Route,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LocationMap from '@/components/LocationMap';
import { useLocation } from '@/hooks/useLocation';
import { useNotifications } from '@/hooks/useNotifications';

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { location, loading, getCurrentLocation } = useLocation();
  const { scheduleEmergencyAlert } = useNotifications();

  const mockHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      type: "Multi-specialty",
      latitude: 28.6139,
      longitude: 77.2090,
      rating: 4.5,
      status: "available",
      beds: 15,
      waitTime: "10-15 min",
      emergency: true,
      phone: "+91-11-2345-6789",
      address: "123 Medical Center Dr, New Delhi",
      specialties: ["Emergency", "Cardiology", "Neurology"]
    },
    {
      id: 2,
      name: "Central Primary Health Center",
      type: "PHC",
      latitude: 28.6129,
      longitude: 77.2295,
      rating: 4.2,
      status: "busy",
      beds: 5,
      waitTime: "25-30 min",
      emergency: false,
      phone: "+91-11-2345-6790",
      address: "456 Health St, New Delhi",
      specialties: ["General Medicine", "Pediatrics"]
    },
    {
      id: 3,
      name: "MediCare Emergency Center",
      type: "Emergency",
      latitude: 28.6169,
      longitude: 77.2085,
      rating: 4.8,
      status: "available",
      beds: 8,
      waitTime: "5-10 min",
      emergency: true,
      phone: "+91-11-2345-6791",
      address: "789 Emergency Ave, New Delhi",
      specialties: ["Emergency", "Trauma", "Critical Care"]
    },
    {
      id: 4,
      name: "Community Health Clinic",
      type: "Clinic",
      latitude: 28.6149,
      longitude: 77.2190,
      rating: 4.0,
      status: "full",
      beds: 0,
      waitTime: "45+ min",
      emergency: false,
      phone: "+91-11-2345-6792",
      address: "321 Community Rd, New Delhi",
      specialties: ["General Medicine", "Preventive Care"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'busy': return 'bg-warning text-warning-foreground';
      case 'full': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'full': return 'Full';
      default: return 'Unknown';
    }
  };

  const filters = [
    { id: 'all', label: 'All Facilities' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'hospital', label: 'Hospitals' },
    { id: 'phc', label: 'PHCs' },
    { id: 'clinic', label: 'Clinics' }
  ];

  const handleEmergencyCall = async (hospital: any) => {
    await scheduleEmergencyAlert(`Emergency call initiated to ${hospital.name}`);
    window.open(`tel:${hospital.phone}`, '_self');
  };

  const handleCall = (hospital: any) => {
    window.open(`tel:${hospital.phone}`, '_self');
  };

  const handleUseLocation = async () => {
    await getCurrentLocation();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-secondary">
      {/* Header */}
      <header className="bg-surface/95 backdrop-blur-sm border-b border-border shadow-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-healing-green to-medical-green-light">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Find Hospital</h1>
              <p className="text-xs text-muted-foreground">Nearby healthcare facilities</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search and Filters */}
        <Card className="shadow-floating border-0 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hospitals, specialties, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="medical" size="sm" onClick={handleUseLocation} disabled={loading}>
                <Navigation className="h-4 w-4 mr-2" />
                {loading ? "Getting Location..." : "Use My Location"}
              </Button>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "medical" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="whitespace-nowrap"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hospital List */}
          <div className="lg:col-span-2 space-y-4">
            {mockHospitals.map((hospital) => (
              <Card key={hospital.id} className="shadow-card border-0 hover:shadow-floating transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {hospital.name}
                        {hospital.emergency && (
                          <Badge variant="destructive" className="text-xs">
                            <Heart className="h-3 w-3 mr-1" />
                            Emergency
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span>{hospital.type}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {location ? 
                            `${((Math.sqrt(Math.pow(hospital.latitude - location.latitude, 2) + Math.pow(hospital.longitude - location.longitude, 2)) * 111).toFixed(1))} km` :
                            'Distance unknown'
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          {hospital.rating}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(hospital.status)}>
                      {getStatusText(hospital.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{hospital.address}</p>
                  
                  {/* Availability Info */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-primary" />
                      <span>{hospital.beds} beds available</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{hospital.waitTime} wait</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="medical" size="sm" className="flex-1">
                      <Route className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCall(hospital)}>
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    {hospital.emergency && (
                      <Button variant="emergency" size="sm" onClick={() => handleEmergencyCall(hospital)}>
                        <Ambulance className="h-4 w-4 mr-1" />
                        Emergency
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map & Quick Actions */}
          <div className="space-y-6">
            {/* Interactive Map */}
            <LocationMap 
              hospitals={mockHospitals} 
              onHospitalSelect={(hospital) => {
                console.log('Selected hospital:', hospital);
              }}
            />

            {/* Quick Actions */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="emergency" className="w-full" size="sm" onClick={() => handleEmergencyCall({ name: 'Emergency Services', phone: '108' })}>
                  <Ambulance className="h-4 w-4 mr-2" />
                  Call Emergency (108)
                </Button>
                <Button variant="healing" className="w-full" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </CardContent>
            </Card>

            {/* Live Status Legend */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-base">Live Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-sm">Available - Quick service</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-sm">Busy - Moderate wait</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span className="text-sm">Full - Long wait/referral</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hospitals;