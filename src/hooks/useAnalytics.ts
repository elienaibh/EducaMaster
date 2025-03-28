'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Monitorar mudança de página
    const trackPageView = () => {
      if (typeof window !== 'undefined') {
        // Enviar para o backend
        fetch('/api/analytics/pageview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            timestamp: new Date().toISOString(),
          }),
        }).catch(console.error);
      }
    };

    // Monitorar cliques
    const trackClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const elementId = target.id || target.className;
      const elementText = target.textContent?.trim();

      if (elementId || elementText) {
        fetch('/api/analytics/click', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: pathname,
            elementId,
            elementText,
            timestamp: new Date().toISOString(),
          }),
        }).catch(console.error);
      }
    };

    // Monitorar tempo na página
    const startTime = Date.now();
    const trackTimeSpent = () => {
      const timeSpent = Date.now() - startTime;
      fetch('/api/analytics/time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: pathname,
          timeSpent,
          timestamp: new Date().toISOString(),
        }),
      }).catch(console.error);
    };

    // Adicionar listeners
    window.addEventListener('click', trackClick);
    trackPageView();

    // Cleanup
    return () => {
      window.removeEventListener('click', trackClick);
      trackTimeSpent();
    };
  }, [pathname]);
}
