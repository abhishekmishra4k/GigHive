'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

export default function StudentSignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Passwords do not match.",
      });
      return;
    }
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Success",
        description: "Account created successfully! Welcome.",
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || user) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto flex h-screen items-center justify-center px-4 md:px-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Create Student Account</CardTitle>
          <CardDescription>
            Join GigHive and start your journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" /> Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2" /> Sign Up
                </>
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login/student" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
