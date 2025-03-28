import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserNav } from '@/components/user-nav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">EducaMaster</span>
        </Link>

        <nav className="ml-6 flex gap-6">
          <Link href="/cursos" className="text-sm font-medium">
            Cursos
          </Link>
          <Link href="/conquistas" className="text-sm font-medium">
            Conquistas
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
