
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import type { Project } from '@/types';
import { Github, PlayCircle, Youtube as YoutubeIcon, Tag, Rocket, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

async function getProjects(): Promise<Project[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
  const res = await fetch(`${baseUrl}/api/projects`, { cache: 'no-store' }); 
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error(error);
    // Optionally, set projects to an empty array or handle the error to display a message
    // For now, if getProjects throws, the Next.js error boundary (error.js) will catch it.
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Container as="section" id="projects-list" className="section-fade-in">
          <div className="text-center mb-12">
            <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">Our Projects</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Browse through our collection of projects. Click on any project to learn more.
            </p>
          </div>
          {projects.length === 0 ? (
             <p className="text-center text-muted-foreground">No projects available at the moment. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
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
                    <CardTitle className="text-xl font-semibold mb-2 text-card-foreground">{project.title}</CardTitle>
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
        </Container>
      </main>
      <Footer />
    </div>
  );
}
