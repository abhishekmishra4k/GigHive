
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { db, storage } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Briefcase, Send, Link as LinkIcon, Linkedin, Image as ImageIcon, Upload, Loader2, DollarSign, BrainCircuit, SparklesIcon } from 'lucide-react';
import Image from 'next/image';
import type { Job } from '@/types';

const gigFormSchema = z.object({
  gigTitle: z.string().min(1, 'Gig title is required.'),
  companyName: z.string().min(1, 'Company name is required.'),
  location: z.string().min(1, 'Location is required.'),
  jobType: z.string({ required_error: 'Job type is required.' }),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
  applicationUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  skills: z.string().min(1, 'At least one skill is required.'),
  salary: z.string().optional(),
  experience: z.string().optional(),
  benefits: z.string().optional(),
}).refine(data => data.imageUrl || data.imageFile, {
  message: 'An image URL or file upload is required.',
  path: ['imageFile'], // Point error to the file upload part
});

type GigFormValues = z.infer<typeof gigFormSchema>;
type SubmissionStatus = 'idle' | 'uploading' | 'saving' | 'done' | 'error';


export default function PostGigPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<GigFormValues>({
    resolver: zodResolver(gigFormSchema),
    defaultValues: {
        gigTitle: '',
        companyName: '',
        location: '',
        description: '',
        skills: '',
        applicationUrl: '',
        linkedinUrl: '',
        imageUrl: '',
        salary: '',
        experience: '',
        benefits: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('imageFile', file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue('imageUrl', '', { shouldValidate: true }); // Clear URL field
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    form.setValue('imageUrl', url, { shouldValidate: true });
    if(url) {
        setImagePreview(url);
        form.setValue('imageFile', undefined, { shouldValidate: true }); // Clear file field
    } else if (!form.getValues('imageFile')) {
        setImagePreview(null);
    }
  }

  const handlePostGig: SubmitHandler<GigFormValues> = async (data) => {
    setSubmissionStatus('idle');
    try {
      let finalImageUrl = data.imageUrl || '';

      if (data.imageFile) {
        setSubmissionStatus('uploading');
        const storageRef = ref(storage, `gig-logos/${Date.now()}_${data.imageFile.name}`);
        await uploadBytes(storageRef, data.imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }
      
      setSubmissionStatus('saving');
      const newGig: Omit<Job, 'id'> = {
        title: data.gigTitle,
        company: data.companyName,
        location: data.location,
        type: data.jobType as Job['type'],
        description: data.description,
        tags: data.skills.split(',').map(s => s.trim()),
        image: finalImageUrl,
        url: data.applicationUrl,
        socials: {
            linkedin: data.linkedinUrl
        },
        salary: data.salary,
        experience: data.experience,
        benefits: data.benefits?.split(',').map(b => b.trim()),
        status: 'Active',
        applications: 0,
        openings: 1,
      };

      await addDoc(collection(db, 'gigs'), newGig);
      setSubmissionStatus('done');
      toast({
        title: 'Success!',
        description: 'Your gig has been posted.',
      });
      router.push('/employer/dashboard');

    } catch (error) {
      console.error("Error posting gig: ", error);
      setSubmissionStatus('error');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to post gig. Please try again.',
      });
    }
  };

  const isPosting = submissionStatus === 'uploading' || submissionStatus === 'saving';

  const getButtonContent = () => {
    switch (submissionStatus) {
      case 'uploading':
        return <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading logo...</>;
      case 'saving':
        return <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving gig...</>;
      case 'done':
        return <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Done!</>;
      default:
        return <><Send className="mr-2 h-4 w-4" /> Post Gig</>;
    }
  }


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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePostGig)} className="space-y-6">
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                    control={form.control}
                    name="gigTitle"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Gig Title</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., Social Media Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., Innovate Co." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>

               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., Remote or Mumbai, MH" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="jobType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select job type" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="part-time">Part-time</SelectItem>
                                    <SelectItem value="freelance">Freelance</SelectItem>
                                    <SelectItem value="internship">Internship</SelectItem>
                                    <SelectItem value="full-time">Full Time</SelectItem>
                                    <SelectItem value="contractor">Contractor</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Company Logo / Image</Label>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-grow">
                             <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="relative">
                                                <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                placeholder="Paste image URL here"
                                                className="pl-9"
                                                {...field}
                                                onChange={handleUrlChange}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <span className="flex-shrink text-xs text-muted-foreground">OR</span>
                        <FormField
                            control={form.control}
                            name="imageFile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <>
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
                                        </>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormMessage>{form.formState.errors.imageFile?.message}</FormMessage>
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
              
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Salary Range</FormLabel>
                             <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <FormControl>
                                <Input placeholder="e.g., ₹8,00,000 - ₹12,00,000 / year" className="pl-9" {...field} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <div className="relative">
                                <BrainCircuit className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <FormControl>
                                <Input placeholder="e.g., Entry Level, 2+ Years" className="pl-9" {...field} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="Describe the role, responsibilities, and what you're looking for."
                            rows={6}
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Required Skills</FormLabel>
                        <FormControl>
                        <Input
                            placeholder="List required skills, separated by commas (e.g., Marketing, SEO)"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Benefits</FormLabel>
                         <div className="relative">
                                <SparklesIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                               <FormControl>
                                <Input
                                    placeholder="List benefits, separated by commas (e.g., Health Insurance, Paid Time Off)"
                                    className="pl-9"
                                    {...field}
                                />
                                </FormControl>
                            </div>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="applicationUrl"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Application URL</FormLabel>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <FormControl>
                            <Input placeholder="https://example.com/apply" className="pl-9" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="linkedinUrl"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company LinkedIn URL</FormLabel>
                        <div className="relative">
                            <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <FormControl>
                            <Input placeholder="https://linkedin.com/company/example" className="pl-9" {...field} />
                            </FormControl>
                        </div>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit" disabled={isPosting}>
                        {getButtonContent()}
                    </Button>
                </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
