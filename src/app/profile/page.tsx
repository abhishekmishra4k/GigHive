
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserCircle, Save, Loader2, MapPin } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [headline, setHeadline] = useState('');
  const [city, setCity] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login/student');
    }
    if (user) {
      const fetchProfile = async () => {
        setIsFetching(true);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setHeadline(data.headline || '');
            setCity(data.city || '');
            setSkills(Array.isArray(data.skills) ? data.skills.join(', ') : '');
            setInterests(Array.isArray(data.interests) ? data.interests.join(', ') : '');
          }
        } catch (error) {
           toast({
            variant: "destructive",
            title: 'Error',
            description: 'Failed to fetch profile data.',
          });
        } finally {
            setIsFetching(false);
        }
      };
      fetchProfile();
    }
  }, [user, loading, router, toast]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    
    try {
        const userDocRef = doc(db, 'users', user.uid);
        const profileData = {
            firstName,
            lastName,
            headline,
            city,
            skills: skills.split(',').map(s => s.trim()).filter(Boolean),
            interests: interests.split(',').map(i => i.trim()).filter(Boolean),
        };
        await updateDoc(userDocRef, profileData);

        const displayName = `${firstName} ${lastName}`.trim();
        if (user.displayName !== displayName) {
            await updateProfile(user, { displayName });
        }

        toast({
            title: 'Profile Saved!',
            description: 'Your information has been successfully updated.',
        });
    } catch (error) {
        toast({
            variant: "destructive",
            title: 'Save Failed',
            description: 'Could not save your profile. Please try again.',
        });
    } finally {
        setIsSaving(false);
    }
  };
  
  if (loading || isFetching || !user) {
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
                placeholder="e.g., Computer Science Student at IIT Bombay"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="city">City</Label>
               <div className="relative">
                 <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                 <Input
                    id="city"
                    placeholder="e.g., Bengaluru, KA"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="pl-9"
                  />
               </div>
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
