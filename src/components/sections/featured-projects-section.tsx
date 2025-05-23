import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import type { Project } from '@/types';
import { Github, PlayCircle, Youtube as YoutubeIcon, Tag, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Blog Generator',
    description: 'A Next.js application that uses AI to generate blog post content based on user prompts.',
    longDescription: 'This project showcases the integration of modern web technologies with cutting-edge AI. Built with Next.js for the frontend and a Python backend for AI processing, it allows users to generate unique blog posts in minutes.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'software interface',
    tags: ['Next.js', 'AI', 'TypeScript', 'Python'],
    demoUrl: '#',
    githubUrl: '#',
    youtubeUrl: '#',
  },
  {
    id: '2',
    title: 'E-commerce Analytics Dashboard',
    description: 'A responsive dashboard for visualizing e-commerce sales data and customer behavior.',
    longDescription: 'Track key metrics, understand sales trends, and gain insights into customer preferences with this powerful analytics dashboard. Features interactive charts and customizable reports.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'dashboard analytics',
    tags: ['React', 'Charts', 'Data Visualization', 'Node.js'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Mobile Fitness Tracker',
    description: 'A React Native app to track workouts, set fitness goals, and monitor progress.',
    longDescription: 'Achieve your fitness goals with this intuitive mobile app. Log workouts, track calories, monitor your progress over time, and stay motivated with personalized challenges.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mobile app fitness',
    tags: ['React Native', 'Mobile App', 'Firebase', 'Health'],
    youtubeUrl: '#',
  },
];

export function FeaturedProjectsSection() {
  return (
    <Container as="section" id="projects" className="section-fade-in">
      <div className="text-center mb-12">
        <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Projects</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore some of our top projects and get inspired for your next build.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
                data-ai-hint={project.imageHint}
              />
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
              <CardDescription className="text-sm mb-4 text-muted-foreground">{project.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" /> {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t bg-muted/30 flex flex-wrap gap-2 justify-start">
              {project.demoUrl && (
                <Link href={project.demoUrl} passHref legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <PlayCircle className="mr-2 h-4 w-4" /> Demo
                    </Button>
                  </a>
                </Link>
              )}
              {project.githubUrl && (
                <Link href={project.githubUrl} passHref legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Button>
                  </a>
                </Link>
              )}
              {project.youtubeUrl && (
                <Link href={project.youtubeUrl} passHref legacyBehavior>
                  <a target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <YoutubeIcon className="mr-2 h-4 w-4" /> Video
                    </Button>
                  </a>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  );
}
