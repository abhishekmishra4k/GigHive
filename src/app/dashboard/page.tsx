import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { applications } from '@/lib/mock-data';
import { FileText } from 'lucide-react';

export default function DashboardPage() {
  const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' | 'destructive' => {
      switch (status) {
          case 'Interviewing':
              return 'default';
          case 'Offered':
              return 'default'; 
          case 'Pending':
              return 'secondary';
          case 'Rejected':
              return 'destructive'
          default:
              return 'outline'
      }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-8 space-y-2">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Manage your gigs and applications all in one place.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <CardTitle>My Applications</CardTitle>
          </div>
          <CardDescription>
            Track the status of all your gig applications.
          </CardDescription>
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
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.gigTitle}</TableCell>
                  <TableCell className="hidden sm:table-cell">{app.company}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(app.dateApplied).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
