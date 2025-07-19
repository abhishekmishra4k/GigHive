import { GigCard } from '@/components/gig-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { gigs } from '@/lib/mock-data';
import { ListFilter, Search } from 'lucide-react';

export default function GigsPage() {
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
          <Input placeholder="Search by title, company, or keyword..." className="pl-10" />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
            <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="new-york">New York, NY</SelectItem>
                    <SelectItem value="austin">Austin, TX</SelectItem>
                    <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gigs.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </div>
    </div>
  );
}
