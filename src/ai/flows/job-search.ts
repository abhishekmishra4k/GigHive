
'use server';

/**
 * @fileOverview Searches for external job gigs using the JSearch API.
 * 
 * - searchExternalGigs - A function to search for jobs based on a query.
 * - ExternalGigSearchInput - The input type for the searchExternalGigs function.
 * - ExternalGig - The structure for a single external gig.
 * - ExternalGigSearchOutput - The output type for the searchExternalGigs function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { Gig } from '@/lib/mock-data';

const ExternalGigSearchInputSchema = z.object({
  query: z.string().describe('The search query for jobs, e.g., "Web Developer in New York"'),
});
type ExternalGigSearchInput = z.infer<typeof ExternalGigSearchInputSchema>;

const ExternalGigSchema = z.object({
    id: z.string(),
    title: z.string().nullable(),
    company: z.string().nullable(),
    location: z.string().nullable(),
    description: z.string().nullable(),
    url: z.string().nullable(),
    image: z.string().nullable(),
    type: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
});
type ExternalGig = z.infer<typeof ExternalGigSchema>;

const ExternalGigSearchOutputSchema = z.object({
  gigs: z.array(ExternalGigSchema),
});
type ExternalGigSearchOutput = z.infer<typeof ExternalGigSearchOutputSchema>;

// This function is exported and called by the frontend.
export async function searchExternalGigs(input: ExternalGigSearchInput): Promise<ExternalGigSearchOutput> {
    return externalGigSearchFlow(input);
}


const externalGigSearchFlow = ai.defineFlow(
  {
    name: 'externalGigSearchFlow',
    inputSchema: ExternalGigSearchInputSchema,
    outputSchema: ExternalGigSearchOutputSchema,
  },
  async (input) => {
    const JSEARCH_API_URL = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(input.query)}&page=1&num_pages=1&employment_types=INTERN,CONTRACTOR,PARTTIME`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(JSEARCH_API_URL, options);
        if (!response.ok) {
            console.error('JSearch API request failed with status:', response.status);
            const errorBody = await response.text();
            console.error('Error Body:', errorBody);
            return { gigs: [] };
        }
        const result = await response.json();

        if (!result.data) {
          console.error('JSearch API did not return any data.');
          return { gigs: [] };
        }
        
        const gigs = result.data.map((job: any): Gig => ({
            id: job.job_id,
            title: job.job_title || "No title",
            company: job.employer_name || "N/A",
            location: `${job.job_city || ''}, ${job.job_state || ''}, ${job.job_country || ''}`.replace(/^, |, $/g, ''),
            description: job.job_description || "No description available.",
            type: job.job_employment_type ? (job.job_employment_type.charAt(0).toUpperCase() + job.job_employment_type.slice(1).toLowerCase()) as any : 'N/A',
            tags: [], // JSearch API doesn't provide tags in the same way
            image: job.employer_logo || 'https://placehold.co/600x400.png',
            url: job.job_google_link
        }));

        return { gigs };

    } catch (error) {
        console.error('Failed to fetch from JSearch API:', error);
        return { gigs: [] };
    }
  }
);
