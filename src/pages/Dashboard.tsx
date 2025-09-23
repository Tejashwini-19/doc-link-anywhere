import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Stethoscope, 
  MapPin, 
  Video, 
  FileText, 
  AlertTriangle,
  Heart,
  User,
  Bell,
  Settings,
  Activity
} from 'lucide-react';
import heroImage from '@/assets/healthcare-hero.jpg';

const Dashboard = () => {
  const userName = "John Doe"; // TODO: Get from auth context
  const healthId = "HL-2024-789456"; // TODO: Get from user profile

  const services = [
    {
      title: "Check Symptoms",
      description: "AI-powered symptom analysis with voice & text input",
      icon: Stethoscope,
      href: "/symptoms",
      variant: "medical" as const,
      color: "bg-gradient-to-br from-primary to-trust-blue"
    },
    {
      title: "Find Hospital",
      description: "Nearby PHCs & hospitals with live availability",
      icon: MapPin,
      href: "/hospitals",
      variant: "healing" as const,
      color: "bg-gradient-to-br from-healing-green to-medical-green-light"
    },
    {
      title: "Telemedicine",
      description: "Video consultation & e-prescription services",
      icon: Video,
      href: "/telemedicine",
      variant: "medical" as const,
      color: "bg-gradient-to-br from-trust-blue to-primary"
    },
    {
      title: "My Records",
      description: "Upload, scan, or sync your medical history",
      icon: FileText,
      href: "/records",
      variant: "healing" as const,
      color: "bg-gradient-to-br from-medical-green to-healing-green"
    },
    {
      title: "Emergency SOS",
      description: "Instant ambulance & family alert with live location",
      icon: AlertTriangle,
      href: "/sos",
      variant: "emergency" as const,
      color: "bg-gradient-to-br from-emergency to-destructive"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-secondary">
      {/* Header */}
      <header className="bg-surface/95 backdrop-blur-sm border-b border-border shadow-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-primary to-trust-blue">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">HealthCare+</h1>
              <p className="text-xs text-muted-foreground">Your Health Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-accent">
                <User className="h-4 w-4 text-accent-foreground" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{healthId}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-floating">
          <div 
            className="h-48 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-trust-blue/80" />
            <div className="relative h-full flex items-center justify-center text-center p-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Welcome back, {userName.split(' ')[0]}!
                </h2>
                <p className="text-white/90 mb-4">
                  Your health is our priority. How can we help you today?
                </p>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Activity className="h-3 w-3 mr-1" />
                  Health ID: {healthId}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-card border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <p className="text-sm text-muted-foreground">Emergency Support</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-healing-green mb-1">500+</div>
              <p className="text-sm text-muted-foreground">Partner Hospitals</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-trust-blue mb-1">100k+</div>
              <p className="text-sm text-muted-foreground">Trusted Users</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} to={service.href}>
                <Card className="h-full hover:shadow-floating transition-all duration-300 transform hover:scale-[1.02] border-0 group cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      variant={service.variant} 
                      className="w-full group-hover:shadow-lg transition-all duration-300"
                      size="sm"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest health interactions and appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Stethoscope className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Symptom Check Completed</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-healing-green/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-healing-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Medical Record Uploaded</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <Badge variant="secondary">Processed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;