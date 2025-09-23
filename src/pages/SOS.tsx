import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  AlertTriangle, 
  ArrowLeft, 
  Phone,
  MapPin,
  Users,
  Heart,
  Timer,
  Navigation,
  Shield,
  Activity,
  Siren,
  UserPlus,
  Edit
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SOS = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "John Smith", relation: "Father", phone: "+1-234-567-8901" },
    { id: 2, name: "Mary Smith", relation: "Mother", phone: "+1-234-567-8902" },
    { id: 3, name: "Sarah Johnson", relation: "Sister", phone: "+1-234-567-8903" }
  ]);

  const handleSOSActivation = () => {
    setIsEmergencyActive(true);
    // TODO: Implement actual SOS logic
    console.log('SOS ACTIVATED - Emergency services and contacts notified');
  };

  const emergencyServices = [
    { name: "Emergency (911)", number: "911", type: "emergency" },
    { name: "Police", number: "101", type: "police" },
    { name: "Fire Department", number: "102", type: "fire" },
    { name: "Ambulance", number: "108", type: "ambulance" }
  ];

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
            <div className="p-2 rounded-full bg-gradient-to-r from-emergency to-destructive">
              <AlertTriangle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Emergency SOS</h1>
              <p className="text-xs text-muted-foreground">Instant help & location sharing</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!isEmergencyActive ? (
          <div className="space-y-6">
            {/* SOS Button */}
            <Card className="shadow-floating border-0 bg-gradient-to-r from-emergency/10 to-destructive/10">
              <CardContent className="p-8 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-emergency to-destructive flex items-center justify-center shadow-floating cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
                     onClick={handleSOSActivation}>
                  <Siren className="h-16 w-16 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-destructive">Emergency SOS</h2>
                <p className="text-muted-foreground mb-6">
                  Press and hold the button above for 3 seconds to activate emergency services
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 justify-center">
                    <Phone className="h-4 w-4 text-emergency" />
                    <span>Calls ambulance</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <MapPin className="h-4 w-4 text-emergency" />
                    <span>Shares live location</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Users className="h-4 w-4 text-emergency" />
                    <span>Alerts family</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Emergency Services */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Emergency Services
                </CardTitle>
                <CardDescription>
                  Quick access to emergency contact numbers
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {emergencyServices.map((service) => (
                  <Button
                    key={service.name}
                    variant="outline"
                    className="h-auto p-4 justify-between hover:bg-emergency/5 hover:border-emergency/20"
                  >
                    <div className="text-left">
                      <p className="font-semibold">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.number}</p>
                    </div>
                    <Phone className="h-4 w-4 text-emergency" />
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Emergency Contacts
                  </div>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </CardTitle>
                <CardDescription>
                  These contacts will be notified during an emergency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                        <Heart className="h-4 w-4 text-healing-green" />
                      </div>
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.relation} • {contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Medical Information
                </CardTitle>
                <CardDescription>
                  Critical information for emergency responders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Input id="bloodType" placeholder="e.g., O+" />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input id="allergies" placeholder="e.g., Penicillin, Nuts" />
                  </div>
                  <div>
                    <Label htmlFor="medications">Current Medications</Label>
                    <Input id="medications" placeholder="List current medications" />
                  </div>
                  <div>
                    <Label htmlFor="conditions">Medical Conditions</Label>
                    <Input id="conditions" placeholder="e.g., Diabetes, Hypertension" />
                  </div>
                </div>
                <Button variant="healing" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Save Medical Information
                </Button>
              </CardContent>
            </Card>

            {/* Location Settings */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div>
                    <p className="font-medium">GPS Location Sharing</p>
                    <p className="text-sm text-muted-foreground">Allow sharing precise location during emergencies</p>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div>
                    <p className="font-medium">Background Location</p>
                    <p className="text-sm text-muted-foreground">Track location even when app is closed</p>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <Navigation className="h-4 w-4 mr-2" />
                  Test Current Location
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Emergency Active State */
          <div className="space-y-6">
            <Card className="shadow-floating border-0 bg-gradient-to-r from-emergency/20 to-destructive/20 border-emergency/30">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-emergency flex items-center justify-center animate-pulse">
                  <Siren className="h-12 w-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-emergency">Emergency Services Activated</h2>
                <p className="text-muted-foreground mb-4">
                  Help is on the way. Stay calm and stay safe.
                </p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Timer className="h-4 w-4 text-emergency" />
                  <span className="text-emergency font-medium">Response time: 8-12 minutes</span>
                </div>
                <Button variant="destructive" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Cancel Emergency
                </Button>
              </CardContent>
            </Card>

            {/* Status Updates */}
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Emergency Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-success">Emergency services contacted</p>
                    <p className="text-sm text-muted-foreground">Ambulance dispatched - ETA 10 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-success">Emergency contacts notified</p>
                    <p className="text-sm text-muted-foreground">3 contacts received your location</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-success">Location shared</p>
                    <p className="text-sm text-muted-foreground">Live tracking active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default SOS;