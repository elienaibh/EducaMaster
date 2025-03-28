'use client';

import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import type { PropsWithChildren } from 'react';

export default function AnalyticsProvider({ children }: PropsWithChildren) {
  return (
    <React.Fragment>
      {children}
      <Analytics />
    </React.Fragment>
  );
}

// Componente separado para o script de analytics
export const AnalyticsScript = () => <Analytics />;
