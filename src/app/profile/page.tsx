'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserCircle, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [headline, setHeadline] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login/student');
    }
    if (user) {
      // Pre-fill form with user data if available
      const nameParts = user.displayName?.split(' ') || [];
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      // In a real app, you'd fetch the rest of the profile from a database like Firestore
    }
  }, [user, loading, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // In a real application, you would save this data to your database (e.g., Firestore).
    // For this prototype, we'll just simulate a save.
    setTimeout(() => {
      toast({
        title: 'Profile Saved!',
        description: 'Your information has been updated.',
      });
      setIsSaving(false);
    }, 1500);
  };
  
  if (loading || !user) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <UserCircle className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl">Your Profile</CardTitle>
              <CardDescription>
                Keep your profile updated to get the best gig recommendations.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="e.g., Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="e.g., Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                placeholder="e.g., Computer Science Student at University of Example"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Your Skills</Label>
              <Textarea
                id="skills"
                placeholder="List your skills, separated by commas (e.g., React, Node.js, Figma)"
                rows={4}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                This helps our AI find the perfect gigs for you.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Your Interests</Label>
              <Textarea
                id="interests"
                placeholder="What are you passionate about? (e.g., Open Source, Mobile Development, AI)"
                rows={4}
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
