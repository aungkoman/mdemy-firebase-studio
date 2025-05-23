import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <Container as="section" className="pt-24 pb-16 text-center section-fade-in !min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <Zap className="h-16 w-16 text-primary mb-6 animate-pulse" />
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Unlock Your Potential with</span>
          <span className="block text-primary">mDemy Platform</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
          Access high-quality YouTube tutorials, ready-to-use source code, and diverse project listings. Perfect for students, junior developers, and business owners.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="#projects" passHref>
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              Explore Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#how-it-works" passHref>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-16 max-w-5xl mx-auto">
        <Image
          src="https://placehold.co/1200x600.png"
          alt="mDemy Platform Showcase"
          width={1200}
          height={600}
          className="rounded-xl shadow-2xl"
          priority
          data-ai-hint="technology learning"
        />
      </div>
    </Container>
  );
}
