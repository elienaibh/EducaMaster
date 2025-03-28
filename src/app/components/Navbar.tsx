'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Container from './Container';
import Button from './Button';

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Cursos', href: '/cursos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Ajuda', href: '/ajuda' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">EducaMaster AI</span>
              <Image src="/logo.svg" alt="EducaMaster AI" width={150} height={32} priority />
            </Link>
          </div>

          {/* Menu Mobile */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Menu Desktop */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 ${
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-900 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Botões Desktop */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link href="/entrar">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link href="/cadastro">
              <Button>Começar Agora</Button>
            </Link>
          </div>
        </nav>

        {/* Menu Mobile Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              aria-hidden="true"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">EducaMaster AI</span>
                  <Image src="/logo.svg" alt="EducaMaster AI" width={150} height={32} priority />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Fechar menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                          pathname === item.href
                            ? 'text-primary-600'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6 space-y-4">
                    <Link
                      href="/entrar"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/cadastro"
                      className="-mx-3 block rounded-lg bg-primary-600 px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-primary-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Começar Agora
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
