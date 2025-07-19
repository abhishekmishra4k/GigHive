import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Search, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-background py-20 md:py-32">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
          <div className="space-y-6 text-center md:text-left animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Find Your Next Buzz-Worthy Gig
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Gighive Lite is your personal career launchpad. We connect talented students with exciting freelance projects and part-time jobs, powered by AI.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button asChild size="lg" className="transition-transform hover:scale-105">
                <Link href="/gigs">
                  Explore Gigs <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="transition-transform hover:scale-105">
                <Link href="/post-a-gig">I&apos;m an Employer</Link>
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center animate-in fade-in zoom-in-90 duration-1000">
             <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl animate-glow"></div>
            <Image
              src="https://storage.googleapis.com/mona-prod-generative-assets/e6406e00-a0e4-4d1a-821f-a3ac244e8574/hero-image.png"
              alt="A vibrant illustration of diverse students using laptops and phones"
              width={600}
              height={600}
              className="rounded-xl shadow-2xl relative z-10"
              data-ai-hint="students technology"
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-secondary py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Getting started is as easy as 1, 2, 3.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="transform text-center transition-all hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Target className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">1. Create Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build a profile that showcases your unique skills and interests to attract the best opportunities.
                </p>
              </CardContent>
            </Card>
            <Card className="transform text-center transition-all hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Search className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">2. Discover Gigs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse a curated list of gigs or get personalized recommendations from our smart AI assistant.
                </p>
              </CardContent>
            </Card>
            <Card className="transform text-center transition-all hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <ArrowRight className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline">3. Apply & Get Hired</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Apply to gigs that excite you and start building your professional experience and network.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/600x400.png"
              alt="AI robot helping a person"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl"
              data-ai-hint="ai robot"
            />
          </div>
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-accent/20 px-4 py-1 text-sm font-semibold text-accent-foreground">
              AI-Powered Suggestions
            </div>
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Let Our AI Find Your Perfect Match
            </h2>
            <p className="text-lg text-muted-foreground">
              Tired of endless scrolling? Our intelligent assistant analyzes your profile to suggest gigs that align with your skills and passions. Spend less time searching and more time doing what you love.
            </p>
            <Button asChild variant="link" className="p-0 text-lg">
              <Link href="/ai-suggestions">
                Try AI Suggestions Now <Bot className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto text-center px-4 md:px-6">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Ready to Find Top Talent?</h2>
            <p className="mt-4 text-lg text-primary-foreground/80 mx-auto max-w-2xl">
              Post a gig on Gighive Lite and connect with a pool of ambitious and skilled students eager to make an impact.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8 transition-transform hover:scale-105">
                <Link href="/post-a-gig">
                  Post a Gig for Free
                </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
