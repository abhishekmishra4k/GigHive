'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { ListFilter, Search, Loader2 } from 'lucide-react';
import type { Gig } from '@/lib/mock-data';

export default function GigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  
  const locations = useMemo(() => {
    if (!gigs.length) return [];
    const uniqueLocations = [...new Set(gigs.map(gig => gig.location))];
    return ['all', ...uniqueLocations];
  }, [gigs]);

  const jobTypes = useMemo(() => {
    if (!gigs.length) return [];
    const uniqueTypes = [...new Set(gigs.map(gig => gig.type))];
    return ['all', ...uniqueTypes];
  }, [gigs]);


  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const gigsCollection = collection(db, 'gigs');
        const gigsSnapshot = await getDocs(gigsCollection);
        const gigsList = gigsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Gig));
        setGigs(gigsList);
      } catch (error) {
        console.error("Error fetching gigs: ", error);
        // Handle error appropriately, maybe show a toast
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);
  
  const filteredGigs = useMemo(() => {
    return gigs.filter(gig => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = 
        gig.title.toLowerCase().includes(searchTermLower) ||
        gig.company.toLowerCase().includes(searchTermLower) ||
        gig.tags.some(tag => tag.toLowerCase().includes(searchTermLower));
        
      const matchesType = selectedType === 'all' || gig.type === selectedType;
      const matchesLocation = selectedLocation === 'all' || gig.location === selectedLocation;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [gigs, searchTerm, selectedType, selectedLocation]);


  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Discover Your Next Opportunity
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Browse through hundreds of curated gigs, from part-time jobs to freelance projects, tailored for students like you.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by title, company, or keyword..." 
            className="pl-10" 
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
      
      {loading ? (
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
