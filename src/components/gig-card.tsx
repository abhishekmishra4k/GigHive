import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Gig } from '@/lib/mock-data';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type GigCardProps = {
  gig: Gig;
};

export function GigCard({ gig }: GigCardProps) {
  return (
    <Card className="flex h-full transform flex-col overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={gig.image}
          alt={gig.title}
          fill
          className="object-cover"
          data-ai-hint="work desk"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline">{gig.title}</CardTitle>
        <CardDescription className="flex items-center gap-4 pt-2">
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" /> {gig.company}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {gig.location}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{gig.type}</Badge>
          {gig.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="#">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
