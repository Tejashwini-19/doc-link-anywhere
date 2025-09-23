import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Video, 
  ArrowLeft, 
  Calendar,
  Clock,
  Star,
  UserCheck,
  Stethoscope,
  FileText,
  Shield,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Telemedicine = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    { id: 'all', label: 'All Doctors', count: 45 },
    { id: 'general', label: 'General Medicine', count: 15 },
    { id: 'pediatrics', label: 'Pediatrics', count: 8 },
    { id: 'cardiology', label: 'Cardiology', count: 6 },
    { id: 'dermatology', label: 'Dermatology', count: 7 },
    { id: 'psychiatry', label: 'Psychiatry', count: 9 }
  ];

  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      rating: 4.9,
      experience: 12,
      price: 50,
      nextAvailable: "Today 2:30 PM",
      isOnline: true,
      languages: ["English", "Spanish"],
      education: "MD, Harvard Medical School",
      consultations: 1250,
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiology",
      rating: 4.8,
      experience: 15,
      price: 80,
      nextAvailable: "Tomorrow 10:00 AM",
      isOnline: false,
      languages: ["English", "Mandarin"],
      education: "MD, Johns Hopkins",
      consultations: 890,
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      rating: 4.9,
      experience: 8,
      price: 60,
      nextAvailable: "Today 4:15 PM",
      isOnline: true,
      languages: ["English", "Spanish"],
      education: "MD, Mayo Clinic",
      consultations: 650,
      avatar: "/api/placeholder/64/64"
    },
    {
      id: 4,
      name: "Dr. David Kumar",
      specialty: "Dermatology",
      rating: 4.7,
      experience: 10,
      price: 70,
      nextAvailable: "Today 6:00 PM",
      isOnline: true,
      languages: ["English", "Hindi"],
      education: "MD, Stanford Medicine",
      consultations: 420,
      avatar: "/api/placeholder/64/64"
    }
  ];

  const getAvailabilityColor = (isOnline: boolean) => {
    return isOnline ? 'bg-success' : 'bg-muted-foreground';
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
            <div className="p-2 rounded-full bg-gradient-to-r from-trust-blue to-primary">
              <Video className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Telemedicine</h1>
              <p className="text-xs text-muted-foreground">Video consultation & e-prescription</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <Card className="shadow-floating border-0 mb-6 bg-gradient-to-r from-trust-blue/10 to-primary/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">Connect with Healthcare Experts</h2>
                <p className="text-muted-foreground mb-4">
                  Get instant medical consultation from certified doctors via video call
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-success" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Digital Prescription</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-healing-green" />
                    <span>Available 24/7</span>
                  </div>
                </div>
              </div>
              <Button variant="medical" size="lg">
                <Video className="h-4 w-4 mr-2" />
                Start Consultation
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Specialty Filter */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-0 sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">Specialties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {specialties.map((specialty) => (
                  <Button
                    key={specialty.id}
                    variant={selectedSpecialty === specialty.id ? "medical" : "ghost"}
                    className="w-full justify-between text-left"
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty.id)}
                  >
                    <span>{specialty.label}</span>
                    <span className="text-xs">{specialty.count}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Doctor List */}
          <div className="lg:col-span-3 space-y-4">
            {mockDoctors.map((doctor) => (
              <Card key={doctor.id} className="shadow-card border-0 hover:shadow-floating transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Doctor Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getAvailabilityColor(doctor.isOnline)}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-4 w-4 fill-current text-yellow-500" />
                              <span className="font-semibold">{doctor.rating}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{doctor.consultations} consultations</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {doctor.experience} years exp.
                          </Badge>
                          {doctor.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                          {doctor.isOnline && (
                            <Badge variant="success" className="text-xs">
                              <div className="w-2 h-2 bg-current rounded-full mr-1" />
                              Online
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{doctor.education}</p>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>Next: {doctor.nextAvailable}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">${doctor.price}</span>
                            <span className="text-muted-foreground">per consultation</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator orientation="vertical" className="hidden md:block" />

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      <Button variant="medical" size="sm" className="w-full">
                        <Video className="h-4 w-4 mr-2" />
                        Video Call
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full">
                        <UserCheck className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <Card className="shadow-card border-0 mt-8">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">Need immediate assistance?</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with our on-call doctors available 24/7
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="emergency">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Call
                </Button>
                <Button variant="healing">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Quick Consultation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Telemedicine;