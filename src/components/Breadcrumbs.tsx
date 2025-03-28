'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items = [], className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Gerar breadcrumbs automaticamente se não fornecidos
  const breadcrumbs = items.length > 0 ? items : generateBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-2 text-sm', className)}>
      <Link
        href="/"
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Início</span>
      </Link>

      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {index === breadcrumbs.length - 1 ? (
            <span className="ml-2 text-foreground font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split('/').filter(Boolean);

  return paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/');
    const label = formatBreadcrumbLabel(path);

    return { href, label };
  });
}

function formatBreadcrumbLabel(path: string): string {
  // Remover hífens e underscores
  const formatted = path.replace(/[-_]/g, ' ');

  // Capitalizar primeira letra de cada palavra
  return formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Exemplo de uso:
// <Breadcrumbs items={[
//   { label: 'Cursos', href: '/cursos' },
//   { label: 'Programação', href: '/cursos/programacao' },
//   { label: 'JavaScript', href: '/cursos/programacao/javascript' }
// ]} />
