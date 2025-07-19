'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { GigCard } from '@/components/gig-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Loader2, Search } from 'lucide-react';
import type { Gig } from '@/lib/mock-data';
import { searchExternalGigs } from '@/ai/flows/job-search';
import { Button } from '@/components/ui/button';

export default function GigsPage() {
  const [internalGigs, setInternalGigs] = useState<Gig[]>([]);
  const [externalGigs, setExternalGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  
  const allGigs = useMemo(() => [...internalGigs, ...externalGigs], [internalGigs, externalGigs]);

  const locations = useMemo(() => {
    if (!allGigs.length) return [];
    const uniqueLocations = [...new Set(allGigs.map(gig => gig.location).filter(Boolean))];
    return ['all', ...uniqueLocations];
  }, [allGigs]);

  const jobTypes = useMemo(() => {
    if (!allGigs.length) return [];
    const uniqueTypes = [...new Set(allGigs.map(gig => gig.type).filter(Boolean))];
    return ['all', ...uniqueTypes];
  }, [allGigs]);

  useEffect(() => {
    const fetchInternalGigs = async () => {
      try {
        const gigsCollection = collection(db, 'gigs');
        const gigsSnapshot = await getDocs(gigsCollection);
        const gigsList = gigsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gig));
        setInternalGigs(gigsList);
      } catch (error) {
        console.error("Error fetching internal gigs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternalGigs();
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery) return;
    setLoading(true);
    setExternalGigs([]); // Clear previous external results
    try {
      const result = await searchExternalGigs({ query: searchQuery });
      setExternalGigs(result.gigs as Gig[]);
    } catch (error) {
      console.error("Error fetching external gigs: ", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);
  
  const filteredGigs = useMemo(() => {
    return allGigs.filter(gig => {
      if (!gig) return false;
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = 
        !searchTerm ||
        (gig.title && gig.title.toLowerCase().includes(searchTermLower)) ||
        (gig.company && gig.company.toLowerCase().includes(searchTermLower)) ||
        (gig.tags && gig.tags.some(tag => tag.toLowerCase().includes(searchTermLower)));
        
      const matchesType = selectedType === 'all' || gig.type === selectedType;
      const matchesLocation = selectedLocation === 'all' || gig.location === selectedLocation;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [allGigs, searchTerm, selectedType, selectedLocation]);


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

      <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search all jobs (e.g., 'React developer in Remote')..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} disabled={loading && externalGigs.length === 0}>
          {loading && externalGigs.length === 0 ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
          Search
        </Button>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center">
         <div className="relative flex-grow">
          <span className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground font-semibold text-sm">Filter:</span>
          <Input 
            placeholder="Filter current results..." 
            className="pl-14" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
            <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                    {jobTypes.map(type => (
                      <SelectItem key={type} value={type}>{type === 'all' ? 'All Job Types' : type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                    {locations.map(location => (
                       <SelectItem key={location} value={location}>{location === 'all' ? 'All Locations' : location}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>
      
      {loading && allGigs.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      )}
    </div>
  );
}
