import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType; // Allow specifying the element type, e.g., 'section'
  id?: string;
}

export function Container({ children, className, as: Component = 'div', id }: ContainerProps) {
  return (
    <Component id={id} className={cn('container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24', className)}>
      {children}
    </Component>
  );
}
