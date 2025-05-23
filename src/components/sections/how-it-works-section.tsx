import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Youtube, Code2, Briefcase, Lightbulb } from 'lucide-react';

const steps = [
  {
    icon: <Youtube className="h-10 w-10 text-primary mb-4" />,
    title: 'Expert YouTube Tutorials',
    description: 'Learn from curated, high-quality tutorials covering a wide range of technologies and concepts, designed for all skill levels.',
  },
  {
    icon: <Code2 className="h-10 w-10 text-primary mb-4" />,
    title: 'Free & Premium Source Code',
    description: 'Accelerate your development with access to both free and premium, production-ready source code snippets and complete project templates.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary mb-4" />,
    title: 'Diverse Project Listings',
    description: 'Explore a variety of real-world project ideas and listings to build your portfolio, gain practical experience, and showcase your skills.',
  },
];

export function HowItWorksSection() {
  return (
    <Container as="section" id="how-it-works" className="bg-secondary/30 section-fade-in">
      <div className="text-center mb-12">
        <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How mDemy Empowers You</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Our platform is designed to provide you with the resources you need to learn, build, and grow.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardHeader className="items-center text-center">
              {step.icon}
              <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base">{step.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
