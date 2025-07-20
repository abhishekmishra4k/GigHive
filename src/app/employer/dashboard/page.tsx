import { RecentJobs } from '@/components/employer/recent-jobs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function EmployerDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage your job posts and applicants.</p>
        </div>
        <Button asChild>
          <Link href="/post-a-gig">
            <PlusCircle className="mr-2 h-4 w-4" />
            Post a New Gig
          </Link>
        </Button>
      </div>
      <div className="space-y-8">
        <RecentJobs />
        {/* Other employer components can be added here */}
      </div>
    </div>
  );
}
