import React, { useEffect, useState } from 'react';
import { logger } from '@/lib/logger';

interface LayoutShift extends PerformanceEntry {
  value: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  type: 'fcp' | 'lcp' | 'fid' | 'cls' | 'ttfb';
}

interface PerformanceMonitorProps {
  children: React.ReactNode;
}

export function PerformanceMonitor({ children }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMetric = (metric: PerformanceMetric) => {
      setMetrics(prev => [...prev, metric]);
      logger.info(`Métrica de performance: ${metric.name}`, {
        value: metric.value,
        type: metric.type,
      });
    };

    // Monitora First Contentful Paint
    if (window.performance) {
      const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            handleMetric({
              name: 'First Contentful Paint',
              value: entry.startTime,
              timestamp: new Date(),
              type: 'fcp',
            });
          }
        });
      });

      observer.observe({ entryTypes: ['paint'] });
    }

    // Monitora Largest Contentful Paint
    if (window.performance) {
      const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint') {
            handleMetric({
              name: 'Largest Contentful Paint',
              value: entry.startTime,
              timestamp: new Date(),
              type: 'lcp',
            });
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // Monitora First Input Delay
    if (window.performance) {
      const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'first-input') {
            handleMetric({
              name: 'First Input Delay',
              value: entry.duration,
              timestamp: new Date(),
              type: 'fid',
            });
          }
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
    }

    // Monitora Cumulative Layout Shift
    if (window.performance) {
      const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'layout-shift') {
            const layoutShift = entry as LayoutShift;
            handleMetric({
              name: 'Cumulative Layout Shift',
              value: layoutShift.value,
              timestamp: new Date(),
              type: 'cls',
            });
          }
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    }

    // Monitora Time to First Byte
    if (window.performance) {
      const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'resource') {
            const resource = entry as PerformanceResourceTiming;
            if (resource.initiatorType === 'fetch') {
              handleMetric({
                name: 'Time to First Byte',
                value: resource.responseStart - resource.requestStart,
                timestamp: new Date(),
                type: 'ttfb',
              });
            }
          }
        });
      });

      observer.observe({ entryTypes: ['resource'] });
    }

    // Cleanup
    return () => {
      if (window.performance) {
        window.performance.clearMarks();
        window.performance.clearMeasures();
      }
    };
  }, []);

  // Renderiza o painel de métricas apenas em desenvolvimento
  if (process.env.NODE_ENV === 'development' && metrics.length > 0) {
    return (
      <div className="fixed bottom-0 left-0 w-96 h-64 bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-4 overflow-auto">
        <h3 className="text-blue-800 font-semibold mb-2">Métricas de Performance</h3>
        <div className="space-y-2">
          {metrics.map((metric, index) => (
            <div key={index} className="text-sm">
              <p className="text-blue-600">{metric.name}</p>
              <p className="text-gray-500 text-xs">
                {metric.value.toFixed(2)}ms - {metric.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
