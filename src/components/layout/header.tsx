import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpenText } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <BookOpenText className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-primary">mDemy</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="#how-it-works" passHref>
            <Button variant="ghost" className="text-sm font-medium">How It Works</Button>
          </Link>
          <Link href="#projects" passHref>
            <Button variant="ghost" className="text-sm font-medium">Projects</Button>
          </Link>
          <Link href="#testimonials" passHref>
            <Button variant="ghost" className="text-sm font-medium">Testimonials</Button>
          </Link>
          <Link href="#cta" passHref>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Code
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
