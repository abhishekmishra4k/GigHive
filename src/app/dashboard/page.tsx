import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { applications, gigs, applicants } from '@/lib/mock-data';
import { FileText, Users, Building } from 'lucide-react';

export default function DashboardPage() {
  const getStatusVariant = (status: string): 'default' | 'secondary' | 'outline' | 'destructive' => {
      switch (status) {
          case 'Interviewing':
              return 'default';
          case 'Offered':
              return 'default'; // A more distinct color could be used.
          case 'Pending':
              return 'secondary';
          case 'Rejected':
              return 'destructive'
          default:
              return 'outline'
      }
  }

  const employerGigs = gigs.filter(gig => Object.keys(applicants).includes(gig.id));

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-8 space-y-2">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Manage your gigs and applications all in one place.
        </p>
      </div>

      <Tabs defaultValue="student" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="student">
            <FileText className="mr-2 h-4 w-4" /> Student View
          </TabsTrigger>
          <TabsTrigger value="employer">
            <Building className="mr-2 h-4 w-4" /> Employer View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
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
        </TabsContent>

        <TabsContent value="employer" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Applicant Management</CardTitle>
              <CardDescription>Review applicants for your posted gigs.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {employerGigs.map(gig => (
                <AccordionItem key={gig.id} value={`item-${gig.id}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex w-full items-center justify-between pr-4">
                        <span className='font-semibold'>{gig.title} - <span className='text-muted-foreground font-normal'>{gig.company}</span></span>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{applicants[gig.id]?.length || 0} Applicants</span>
                        </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                         <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Skills</TableHead>
                                <TableHead>Applied On</TableHead>
                            </TableRow>
                         </TableHeader>
                         <TableBody>
                            {applicants[gig.id]?.map(applicant => (
                                <TableRow key={applicant.id}>
                                    <TableCell>{applicant.name}</TableCell>
                                    <TableCell>{applicant.email}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-wrap gap-1'>
                                            {applicant.skills.map(skill => <Badge variant="secondary" key={skill}>{skill}</Badge>)}
                                        </div>
                                    </TableCell>
                                    <TableCell>{new Date(applicant.applicationDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                         </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
