
import { NextResponse } from 'next/server';
import { projectsData } from '@/data/projects';
import type { Project } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;
  const project = projectsData.find((p: Project) => p.id === projectId);

  if (project) {
    return NextResponse.json(project);
  } else {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
}
