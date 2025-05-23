import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Rocket, DownloadCloud } from 'lucide-react';
import Link from 'next/link';

export function CtaSection() {
  return (
    <Container as="section" id="cta" className="text-center section-fade-in">
      <div className="bg-gradient-to-r from-primary to-accent p-8 sm:p-12 lg:p-16 rounded-xl shadow-2xl">
        <Rocket className="h-12 w-12 text-primary-foreground mx-auto mb-6" />
        <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
          Ready to Build Something Amazing?
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg text-primary-foreground/90">
          Get instant access to our library of premium source code, tutorials, and project guides. Start your next project with mDemy today!
        </p>
        <div className="mt-10">
          <Link href="#" passHref>
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <DownloadCloud className="mr-2 h-5 w-5" />
              Get Instant Access
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
