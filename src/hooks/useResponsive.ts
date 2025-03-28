'use client';

import { useState, useEffect } from 'react';

interface Breakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
}

export function useResponsive(): Breakpoints {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setBreakpoints({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
        height,
      });
    };

    // Verificar responsividade inicial
    handleResize();

    // Adicionar listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoints;
}
