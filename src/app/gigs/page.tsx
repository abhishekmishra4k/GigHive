'use client';

import { useState, useEffect, useMemo, FormEvent } from 'react';
import { GigCard } from '@/components/gig-card';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Loader2, Search } from 'lucide-react';
import type { Gig } from '@/lib/mock-data';
import { searchExternalGigs } from '@/ai/flows/job-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function GigsPage() {
  const [internalGigs, setInternalGigs] = useState<Gig[]>([]);
  const [externalGigs, setExternalGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('developer in Pune, India');

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      try {
        // Fetch internal gigs
        const gigsCollection = collection(db, 'gigs');
        const gigsSnapshot = await getDocs(gigsCollection);
        const gigsList = gigsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gig));
        setInternalGigs(gigsList);

        // Fetch external gigs with the initial query
        const externalResult = await searchExternalGigs({ query: submittedQuery });
        setExternalGigs(externalResult.gigs as Gig[]);

      } catch (error) {
        console.error("Error fetching gigs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [submittedQuery]);
  
  const handleSearch = async (e: FormEvent) => {
      e.preventDefault();
      setSubmittedQuery(searchQuery);
  }
  
  const allGigs = useMemo(() => [...internalGigs, ...externalGigs], [internalGigs, externalGigs]);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Discover Your Next Opportunity
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Browse through curated gigs and thousands of external jobs, all in one place.
        </p>
      </div>

       <form onSubmit={handleSearch} className="mb-8 flex max-w-2xl mx-auto items-center space-x-2">
            <Input 
                type="text"
                placeholder="Search for jobs (e.g., 'React Developer')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
            />
            <Button type="submit">
                <Search className="mr-2 h-4 w-4" /> Search
            </Button>
        </form>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allGigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      )}
    </div>
  );
}
