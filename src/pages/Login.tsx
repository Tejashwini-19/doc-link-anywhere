import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Heart, Shield, UserPlus } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [healthId, setHealthId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log('Auth submitted:', { isLogin, email, healthId });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-primary to-trust-blue">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">HealthCare+</h1>
          </div>
          <p className="text-muted-foreground">Your trusted health companion</p>
        </div>

        <Card className="shadow-floating border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isLogin ? 'Welcome Back' : 'Join HealthCare+'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to access your health dashboard' 
                : 'Create your account and Health ID'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="healthId" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Health ID {!isLogin ? '(Optional - we can create one for you)' : ''}
                </Label>
                <Input
                  id="healthId"
                  type="text"
                  placeholder={isLogin ? "Enter your Health ID" : "Link existing Health ID (optional)"}
                  value={healthId}
                  onChange={(e) => setHealthId(e.target.value)}
                  required={isLogin}
                />
                {!isLogin && (
                  <p className="text-xs text-muted-foreground">
                    Leave blank and we'll create a secure Health ID for you
                  </p>
                )}
              </div>

              <Button type="submit" variant="medical" className="w-full" size="lg">
                {isLogin ? (
                  <>
                    <Heart className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="mt-1"
              >
                {isLogin ? 'Create new account' : 'Sign in instead'}
              </Button>
            </div>

            {isLogin && (
              <div className="mt-4 text-center">
                <Button variant="link" size="sm">
                  Forgot your password?
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;