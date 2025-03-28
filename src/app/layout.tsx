import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { ClientBreadcrumbs } from '@/components/ClientBreadcrumbs';
import { MonitoringProvider } from '@/components/MonitoringProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorMonitor } from '@/components/ErrorMonitor';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'EducaMaster - Plataforma de Educação Online',
  description: 'Transforme sua vida através da educação de qualidade.',
  keywords: 'educação, cursos online, aprendizado, desenvolvimento pessoal',
  authors: [{ name: 'EducaMaster Team' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <ErrorMonitor>
              <PerformanceMonitor>
                <Providers>
                  <MonitoringProvider>
                    <div className="flex min-h-screen flex-col">
                      <Header />
                      <main className="flex-1 container mx-auto px-4 py-8">
                        <ClientBreadcrumbs />
                        {children}
                      </main>
                      <Footer />
                    </div>
                    <Toaster />
                  </MonitoringProvider>
                </Providers>
              </PerformanceMonitor>
            </ErrorMonitor>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
