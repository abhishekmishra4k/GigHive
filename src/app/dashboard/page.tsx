
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { applications } from '@/lib/mock-data';
import { useAuth } from '@/hooks/use-auth';
import { BarChart, Briefcase, FileText, Target, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import { DonutChart } from '@/components/charts/donut-chart';
import { SparklineChart } from '@/components/charts/sparkline-chart';

const chartData = [
  { status: 'Interviewing', value: 1, fill: 'var(--color-interviewing)' },
  { status: 'Offered', value: 1, fill: 'var(--color-offered)' },
  { status: 'Rejected', value: 1, fill: 'var(--color-rejected)' },
  { status: 'Pending', value: 1, fill: 'var(--color-pending)' },
];

const sparklineData = [
    { x: 1, y: 4 }, { x: 2, y: 8 }, { x: 3, y: 5 }, { x: 4, y: 10 }, { x: 5, y: 7 }, { x: 6, y: 12 },
];


export default function DashboardPage() {
  const { user } = useAuth();

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' | 'destructive' => {
    switch (status) {
      case 'Interviewing':
        return 'default';
      case 'Offered':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Interviewing': return <Target className="h-4 w-4" />;
        case 'Offered': return <CheckCircle className="h-4 w-4" />;
        case 'Pending': return <Clock className="h-4 w-4" />;
        case 'Rejected': return <FileText className="h-4 w-4" />;
        default: return <FileText className="h-4 w-4" />;
    }
  }

  const applicationsByStatus = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
  }, {} as Record<string, number>);

  const donutChartData = [
    { status: 'Interviewing', value: applicationsByStatus['Interviewing'] || 0, fill: 'hsl(var(--chart-1))' },
    { status: 'Offered', value: applicationsByStatus['Offered'] || 0, fill: 'hsl(var(--chart-2))' },
    { status: 'Rejected', value: applicationsByStatus['Rejected'] || 0, fill: 'hsl(var(--chart-3))' },
    { status: 'Pending', value: applicationsByStatus['Pending'] || 0, fill: 'hsl(var(--chart-4))' },
  ]

  const firstName = user?.displayName?.split(' ')[0] || 'Student';

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      {/* Welcome Header */}
      <Card className="flex items-center justify-between border-0 bg-primary/90 text-primary-foreground shadow-lg">
        <CardHeader className="flex-1">
          <p className="text-lg">Welcome to GigHive!</p>
          <CardTitle className="font-headline text-4xl font-bold">
            {firstName}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 pr-6">
            <Image 
                src="https://placehold.co/600x400.png"
                width={200}
                height={150}
                alt="Cartoonish illustration of a student applying for a job"
                className="hidden md:block rounded-md"
                data-ai-hint="student applying job cartoon"
            />
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Gigs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-2xl font-bold">1,204</div>
                    <p className="text-xs text-muted-foreground">+5% from last month</p>
                </div>
                <div className="h-10 w-20">
                    <SparklineChart data={sparklineData} color="hsl(var(--chart-1))" />
                </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications Sent</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-2xl font-bold">{applications.length}</div>
                    <p className="text-xs text-muted-foreground">+10% from last month</p>
                </div>
                 <div className="h-10 w-20">
                    <SparklineChart data={sparklineData.slice().reverse()} color="hsl(var(--chart-2))" />
                </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="flex items-start justify-between">
                <div>
                    <div className="text-2xl font-bold">{applicationsByStatus['Interviewing'] || 0}</div>
                    <p className="text-xs text-muted-foreground">+2 since last week</p>
                </div>
                 <div className="h-10 w-20">
                    <SparklineChart data={sparklineData} color="hsl(var(--chart-3))" />
                </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Received</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="flex items-start justify-between">
                <div>
                    <div className="text-2xl font-bold">{applicationsByStatus['Offered'] || 0}</div>
                    <p className="text-xs text-muted-foreground">Congrats!</p>
                </div>
                 <div className="h-10 w-20">
                    <SparklineChart data={sparklineData.slice(2)} color="hsl(var(--chart-4))" />
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
                <DonutChart data={donutChartData} />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>My Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gig Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Company</TableHead>
                  <TableHead className="hidden md:table-cell">Date Applied</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.slice(0, 5).map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.gigTitle}</TableCell>
                    <TableCell className="hidden sm:table-cell">{app.company}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(app.dateApplied).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getStatusVariant(app.status)} className="capitalize">
                         {app.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
