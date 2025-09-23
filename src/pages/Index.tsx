import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users, Clock } from 'lucide-react';
import heroImage from '@/assets/healthcare-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-secondary">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gradient-to-r from-primary to-trust-blue">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Swasthya Sathi</h1>
          </div>
          <Link to="/login">
            <Button variant="medical">Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-trust-blue bg-clip-text text-transparent">
            Your Health, Our Priority
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Complete healthcare platform with AI-powered symptom checking, hospital finder, 
            telemedicine, medical records, and emergency SOS features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button variant="medical" size="lg" className="w-full sm:w-auto">
                <Heart className="h-4 w-4 mr-2" />
                Start Your Health Journey
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Dashboard Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-16 shadow-floating">
          <img 
            src={heroImage} 
            alt="Modern healthcare facility" 
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="shadow-card border-0 text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-trust-blue flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">Your health data is encrypted and protected</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-healing-green to-medical-green-light flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Expert Doctors</h3>
              <p className="text-sm text-muted-foreground">Connect with certified healthcare professionals</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-trust-blue to-primary flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Available</h3>
              <p className="text-sm text-muted-foreground">Round-the-clock emergency and consultation services</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card border-0 text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emergency to-destructive flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Emergency SOS</h3>
              <p className="text-sm text-muted-foreground">Instant emergency response and family alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="shadow-floating border-0 bg-gradient-to-r from-primary/10 to-trust-blue/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Take Control of Your Health?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who trust Swasthya Sathi for their medical needs
            </p>
            <Link to="/login">
              <Button variant="medical" size="lg">
                <Heart className="h-4 w-4 mr-2" />
                Create Your Health ID
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 Swasthya Sathi. Your trusted health companion.</p>
      </footer>
    </div>
  );
};

export default Index;
