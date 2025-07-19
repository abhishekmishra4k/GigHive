'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, Bot, LayoutDashboard, UserCircle, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Logo } from '../logo';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
  { href: '/gigs', label: 'Gigs', icon: Briefcase, public: true },
  { href: '/ai-suggestions', label: 'AI Suggestions', icon: Bot, public: true },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, public: false },
  { href: '/profile', label: 'Profile', icon: UserCircle, public: false },
];

export function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
      });
    }
  };
  
  const displayedNavLinks = navLinks.filter(link => link.public || !!user);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Logo />
          <span className="font-headline text-xl font-semibold">GigHive</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {displayedNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
             <Button onClick={handleLogout} variant="ghost">
                <LogOut className="mr-2" />
                Logout
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login/student">
                    <LogIn className="mr-2" />
                    Student Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup/student">
                  <UserPlus className="mr-2" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
          <Button asChild className="transition-transform hover:scale-105">
            <Link href="/post-a-gig">Post a Gig</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold">
                  <Logo />
                  <span className="font-headline text-xl font-semibold">GigHive</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {displayedNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 rounded-md p-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                  {user ? (
                     <button onClick={handleLogout} className="flex items-center gap-3 rounded-md p-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                  ) : (
                    <>
                    <Link
                        href="/login/student"
                        className="flex items-center gap-3 rounded-md p-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <LogIn className="h-5 w-5" />
                        Student Login
                      </Link>
                      <Link
                        href="/signup/student"
                        className="flex items-center gap-3 rounded-md p-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <UserPlus className="h-5 w-5" />
                        Sign Up
                      </Link>
                    </>
                  )}
                </nav>
                 <Button asChild className="w-full">
                  <Link href="/post-a-gig">Post a Gig</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
