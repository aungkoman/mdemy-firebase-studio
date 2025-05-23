
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import type { Project } from '@/types';
import { Github, PlayCircle, Youtube as YoutubeIcon, Tag, Rocket, ArrowRight, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

async function getFeaturedProjects(): Promise<Project[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
  try {
    const res = await fetch(`${baseUrl}/api/projects`, { cache: 'no-store' }); 
    if (!res.ok) {
      console.error('Failed to fetch featured projects:', res.status);
      // Try to get more details if possible, without crashing
      try {
        const errorText = await res.text();
        console.error('Error details:', errorText);
      } catch (textError) {
        // Ignore if can't read text
      }
      return []; 
    }
    const allProjects: Project[] = await res.json();
    return allProjects.slice(0, 3); 
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export async function FeaturedProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <Container as="section" id="projects" className="section-fade-in">
      <div className="text-center mb-12">
        <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Projects</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore some of our top projects. More available on our <Link href="/projects" className="underline hover:text-primary">projects page</Link>.
        </p>
      </div>
      {projects.length === 0 ? (
         <div className="text-center py-10">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading featured projects...</p>
            <p className="text-sm text-muted-foreground mt-2">If projects don't load, please check our <Link href="/projects" className="underline">main projects page</Link>.</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
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
                <CardDescription className="text-sm mb-4 text-muted-foreground line-clamp-3">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 border-t bg-muted/30 flex flex-wrap gap-2 justify-between items-center">
                 <div className="flex flex-wrap gap-2">
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <Link href={project.demoUrl} passHref legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <PlayCircle className="mr-2 h-4 w-4" /> Demo
                          </Button>
                        </a>
                      </Link>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <Link href={project.githubUrl} passHref legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                          </Button>
                        </a>
                      </Link>
                    )}
                    {project.youtubeUrl && project.youtubeUrl !== '#' && (
                      <Link href={project.youtubeUrl} passHref legacyBehavior>
                        <a target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <YoutubeIcon className="mr-2 h-4 w-4" /> Video
                          </Button>
                        </a>
                      </Link>
                    )}
                </div>
                <Link href={`/projects/${project.id}`} passHref>
                  <Button variant="default" size="sm" className="mt-2 sm:mt-0">
                    View Details <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
       <div className="text-center mt-12">
          <Link href="/projects" passHref>
            <Button size="lg" variant="outline">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
    </Container>
  );
}
