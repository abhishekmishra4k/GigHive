'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getGigSuggestions } from '@/ai/flows/gig-suggestions';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Sparkles, Loader2, Lightbulb } from 'lucide-react';

const formSchema = z.object({
  skills: z.string().min(10, 'Please list at least one skill.'),
  interests: z.string().min(10, 'Please tell us about your interests.'),
  gigType: z.string({ required_error: 'Please select a gig type.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function AiSuggestionForm() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: '',
      interests: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const result = await getGigSuggestions({
        studentSkills: data.skills.split(',').map((s) => s.trim()),
        studentInterests: data.interests.split(',').map((i) => i.trim()),
        desiredGigType: data.gigType,
      });
      setSuggestions(result.suggestions);
    } catch (e) {
      setError('An unexpected error occurred. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Your Skills</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List your skills, separated by commas (e.g., React, Python, Graphic Design)"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Your Interests</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What are you passionate about? (e.g., Open Source, FinTech, Creative Writing)"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gigType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Desired Gig Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of gig you're looking for" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Get Gig Suggestions
              </>
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-headline text-2xl font-bold flex items-center">
            <Bot className="mr-3 h-7 w-7 text-primary" />
            Your Personalized Suggestions
          </h2>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <ul className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 mt-1 text-accent shrink-0" />
                    <span className="text-foreground/90">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
