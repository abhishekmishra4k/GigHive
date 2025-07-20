'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { gigs as allGigs } from '@/lib/mock-data';
import type { Gig } from '@/lib/mock-data';

type FilterType = 'Today' | 'Weekly' | 'Monthly';

export function RecentJobs() {
  const [filter, setFilter] = useState<FilterType>('Today');

  const getStatusVariant = (status: 'Active' | 'Inactive'): 'default' | 'destructive' => {
    return status === 'Active' ? 'default' : 'destructive';
  };
  
  const getStatusClass = (status: 'Active' | 'Inactive') => {
      if (status === 'Active') {
          return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100';
      }
      return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100';
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline text-2xl">Recent Job Posts</CardTitle>
        <div className="flex items-center gap-2 rounded-full bg-secondary p-1">
          {(['Monthly', 'Weekly', 'Today'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                filter === f ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Job Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Openings</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allGigs.slice(0, 5).map((job: Gig) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell className="text-muted-foreground">{job.type}</TableCell>
                <TableCell className="text-muted-foreground">{job.openings?.toString().padStart(2, '0')}</TableCell>
                <TableCell className="text-muted-foreground">{job.applications?.toString().padStart(2, '0')}</TableCell>
                <TableCell className="text-right">
                  <Badge className={cn('capitalize', getStatusClass(job.status || 'Inactive'))}>
                    {job.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
