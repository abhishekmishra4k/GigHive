
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Send, Link as LinkIcon, Linkedin, Image as ImageIcon } from 'lucide-react';

export default function PostGigPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Briefcase className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl">Post a New Gig</CardTitle>
              <CardDescription>
                Fill out the form below to find the perfect student talent for your project.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gigTitle">Gig Title</Label>
                <Input id="gigTitle" placeholder="e.g., Social Media Manager" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="e.g., Innovate Co." />
              </div>
            </div>
             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Remote or New York, NY" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type</Label>
                    <Select>
                        <SelectTrigger id="jobType">
                            <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="full-time">Full Time</SelectItem>
                            <SelectItem value="contractor">Contractor</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="imageUrl" placeholder="https://example.com/logo.png" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="applicationUrl">Application URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="applicationUrl" placeholder="https://example.com/apply" className="pl-9" />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="linkedinUrl">Company LinkedIn URL</Label>
               <div className="relative">
                 <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                 <Input id="linkedinUrl" placeholder="https://linkedin.com/company/example" className="pl-9" />
               </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and what you're looking for."
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Input
                id="skills"
                placeholder="List required skills, separated by commas (e.g., Marketing, SEO, Content Creation)"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Post Gig
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
