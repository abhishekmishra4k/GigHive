
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Send, Link as LinkIcon, Linkedin, Image as ImageIcon, Upload } from 'lucide-react';
import Image from 'next/image';

export default function PostGigPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


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
              <Label htmlFor="imageUrl">Company Logo / Image</Label>
               <div className="flex items-center gap-4">
                <div className="relative flex-grow">
                    <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                    id="imageUrl"
                    placeholder="Paste image URL here"
                    className="pl-9"
                    onChange={handleUrlChange}
                    />
                </div>
                <div className="relative flex items-center">
                    <span className="flex-shrink text-xs text-muted-foreground">OR</span>
                </div>
                <div>
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                  <Label
                    htmlFor="imageUpload"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Label>
                </div>
              </div>
            </div>

            {imagePreview && (
              <div className="space-y-2">
                <Label>Image Preview</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 p-4">
                  <Image
                    src={imagePreview}
                    alt="Image preview"
                    width={300}
                    height={200}
                    className="max-h-[200px] w-auto rounded-md object-contain"
                  />
                </div>
              </div>
            )}

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
