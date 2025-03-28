'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { logger } from '@/lib/logger';

interface NavigationEvent {
  from: string;
  to: string;
  timestamp: string;
  duration: number;
}

export function NavigationTester() {
  const pathname = usePathname();
  const [navigationHistory, setNavigationHistory] = useState<NavigationEvent[]>([]);
  const [lastNavigationStart, setLastNavigationStart] = useState<number | null>(null);

  useEffect(() => {
    if (lastNavigationStart) {
      const duration = Date.now() - lastNavigationStart;
      const event: NavigationEvent = {
        from: navigationHistory[navigationHistory.length - 1]?.to || '/',
        to: pathname,
        timestamp: new Date().toISOString(),
        duration,
      };

      setNavigationHistory(prev => [...prev, event]);

      // Log da navegação
      logger.info('Navegação completada', {
        from: event.from,
        to: event.to,
        duration: event.duration,
      });
    }

    setLastNavigationStart(Date.now());
  }, [pathname]);

  // Apenas em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-background border rounded-lg shadow-lg max-w-sm">
      <h3 className="text-sm font-medium mb-2">Histórico de Navegação</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {navigationHistory.map((event, index) => (
          <div key={index} className="text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>
                {event.from} → {event.to}
              </span>
              <span>{event.duration}ms</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
