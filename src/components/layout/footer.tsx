import Link from 'next/link';
import { Logo } from '../logo';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-headline text-lg font-semibold">GigHive</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GigHive. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
             <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact Us
            </Link>
            <Link href="https://github.com/abhishekmishra4k/GigHive" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
