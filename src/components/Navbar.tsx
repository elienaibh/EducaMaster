'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { UserNav } from './user-nav';
import { ThemeToggle } from './theme-toggle';

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Cursos', href: '/cursos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo e Menu Desktop */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                EducaMaster
              </Link>
            </div>
            {/* Links Desktop */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    pathname === item.href
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-muted-foreground hover:border-primary-300 hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Botões da direita */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <ThemeToggle />
            <UserNav />
          </div>

          {/* Botão Mobile */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              (onClick={() => setIsOpen( ?? (() => { throw new Error('Valor não pode ser nulo') })())isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                pathname === item.href
                  ? 'bg-primary-50 border-l-4 border-primary-500 text-primary-600'
                  : 'border-l-4 border-transparent text-muted-foreground hover:bg-muted hover:border-primary-300 hover:text-foreground'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-muted">
          <div className="flex items-center justify-between px-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
}