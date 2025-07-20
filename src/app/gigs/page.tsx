
'use client';

import { useState, useEffect, useMemo, FormEvent } from 'react';
import { GigCard } from '@/components/gig-card';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Loader2, Search } from 'lucide-react';
import type { Job } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function GigsPage() {
  const [gigs, setGigs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      try {
        const gigsCollection = collection(db, 'gigs');
        const gigsSnapshot = await getDocs(gigsCollection);
        const gigsList = gigsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
        setGigs(gigsList);
      } catch (error) {
        console.error("Error fetching gigs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);
  
  const filteredGigs = useMemo(() => {
    if (!searchQuery) {
      return gigs;
    }
    return gigs.filter(gig => 
        gig.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [gigs, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Discover Your Next Opportunity
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Browse through curated gigs posted by our partners.
        </p>
      </div>

       <div className="mb-8 flex max-w-2xl mx-auto items-center space-x-2">
            <Input 
                type="text"
                placeholder="Search by title, company, location, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
            />
            <Button type="submit" variant="ghost" size="icon" disabled>
                <Search className="h-5 w-5" /> 
            </Button>
        </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGigs.length > 0 ? filteredGigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          )) : (
            <div className="col-span-full text-center text-muted-foreground">
              No gigs found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
