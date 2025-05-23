
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import type { Project } from '@/types';
import { Github, PlayCircle, Youtube as YoutubeIcon, Tag, ArrowLeft, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function getProject(id: string): Promise<Project | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
  const res = await fetch(`${baseUrl}/api/projects/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch project details');
  }
  return res.json();
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          <Container className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4 text-foreground">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you are looking for does not exist or has been moved.</p>
            <Link href="/projects" passHref>
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Container as="article" className="section-fade-in">
          <div className="mb-8">
            <Link href="/projects" passHref>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Projects
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="md:col-span-2">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-4 text-foreground">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm py-1 px-3">
                    <Tag className="mr-1.5 h-3.5 w-3.5" /> {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              
              {project.longDescription && (
                <div className="prose prose-slate dark:prose-invert max-w-none mb-8 text-foreground">
                  <h2 className="text-2xl font-semibold mb-3 text-foreground border-b pb-2">Project Overview</h2>
                  {project.longDescription.split('\\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>
                  ))}
                </div>
              )}
            </div>

            <aside className="md:col-span-1 space-y-6">
              <Card className="shadow-lg bg-card">
                <CardHeader className="p-0">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-56 rounded-t-lg"
                      data-ai-hint={project.imageHint}
                    />
                </CardHeader>
                <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold mb-4 text-card-foreground">Project Links</CardTitle>
                    <div className="space-y-3">
                        {project.demoUrl && project.demoUrl !== '#' && (
                            <Link href={project.demoUrl} passHref legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                <PlayCircle className="mr-2 h-4 w-4" /> Live Demo
                                <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                                </Button>
                            </a>
                            </Link>
                        )}
                        {project.githubUrl && project.githubUrl !== '#' && (
                            <Link href={project.githubUrl} passHref legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                <Github className="mr-2 h-4 w-4" /> View on GitHub
                                <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                                </Button>
                            </a>
                            </Link>
                        )}
                        {project.youtubeUrl && project.youtubeUrl !== '#' && (
                            <Link href={project.youtubeUrl} passHref legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                <YoutubeIcon className="mr-2 h-4 w-4" /> Watch Tutorial
                                <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
                                </Button>
                            </a>
                            </Link>
                        )}
                        {(!project.demoUrl || project.demoUrl === '#') && 
                         (!project.githubUrl || project.githubUrl === '#') && 
                         (!project.youtubeUrl || project.youtubeUrl === '#') && (
                            <p className="text-sm text-muted-foreground">No external links available for this project.</p>
                        )}
                    </div>
                </CardContent>
              </Card>
            </aside>
          </div>
          
          <Separator className="my-12 bg-border" />

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Interested in this project?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Explore the demo, dive into the code, or watch the tutorial to learn more.
            </p>
            <Link href="/#cta" passHref>
                <Button size="lg">Get Source Code Access</Button>
            </Link>
          </div>

        </Container>
      </main>
      <Footer />
    </div>
  );
}
