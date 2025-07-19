import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Gig } from '@/lib/mock-data';
import { MapPin, Briefcase, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type GigCardProps = {
  gig: Gig;
};

export function GigCard({ gig }: GigCardProps) {
  const isExternal = !!gig.url;

  return (
    <Card className="flex h-full transform flex-col overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl">
      <CardHeader>
        <div className="flex items-start gap-4">
           <Avatar className="h-12 w-12 border">
             <AvatarImage src={gig.image || ''} alt={`${gig.company} logo`} />
             <AvatarFallback>{gig.company?.charAt(0) || 'C'}</AvatarFallback>
           </Avatar>
          <div className="flex-grow">
            <CardTitle className="font-headline mb-1 text-xl">{gig.title}</CardTitle>
            <div className="space-y-2 text-sm text-muted-foreground">
               <div className="flex items-center gap-2">
                 <Briefcase className="h-4 w-4 shrink-0" />
                 <span>{gig.company}</span>
               </div>
               <div className="flex items-center gap-2">
                 <MapPin className="h-4 w-4 shrink-0" />
                 <span>{gig.location}</span>
               </div>
            </div>
          </div>
            {isExternal && (
                <Badge variant="secondary">External</Badge>
            )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {gig.type && <Badge variant="secondary">{gig.type}</Badge>}
          {gig.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={gig.url || '#'} target={isExternal ? '_blank' : '_self'} rel={isExternal ? 'noopener noreferrer' : ''}>
            {isExternal ? 'Apply Now' : 'View Details'}
            {isExternal ? <ExternalLink className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
