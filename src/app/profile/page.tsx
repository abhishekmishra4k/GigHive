import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserCircle, Save } from 'lucide-react';

export default function ProfilePage() {
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="e.g., Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="e.g., Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                placeholder="e.g., Computer Science Student at University of Example"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Your Skills</Label>
              <Textarea
                id="skills"
                placeholder="List your skills, separated by commas (e.g., React, Node.js, Figma)"
                rows={4}
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
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
