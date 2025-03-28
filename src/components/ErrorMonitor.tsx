import React, { useEffect, useState } from 'react';
import { logger } from '@/lib/logger';

interface CustomErrorEvent {
  message: string;
  stack?: string;
  timestamp: Date;
  type: 'runtime' | 'network' | 'react';
}

interface ErrorMonitorProps {
  children: React.ReactNode;
}

export function ErrorMonitor({ children }: ErrorMonitorProps) {
  const [errors, setErrors] = useState<CustomErrorEvent[]>([]);

  useEffect(() => {
    const handleError = (event: globalThis.ErrorEvent) => {
      const error: CustomErrorEvent = {
        message: event.message,
        stack: event.error?.stack,
        timestamp: new Date(),
        type: 'runtime',
      };

      setErrors(prev => [...prev, error]);
      logger.error('Erro capturado pelo ErrorMonitor:', event.error || new Error(error.message), {
        stack: error.stack,
        type: error.type,
      });
    };

    const handleNetworkError = (message: string) => {
      const error: CustomErrorEvent = {
        message,
        timestamp: new Date(),
        type: 'network',
      };

      setErrors(prev => [...prev, error]);
      logger.error('Erro de rede capturado:', new Error(message), {
        type: error.type,
      });
    };

    const handleReactError = (error: Error) => {
      const errorEvent: CustomErrorEvent = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date(),
        type: 'react',
      };

      setErrors(prev => [...prev, errorEvent]);
      logger.error('Erro React capturado:', error, {
        type: errorEvent.type,
      });
    };

    // Adiciona listeners para diferentes tipos de erros
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', event => {
      const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
      handleReactError(error);
    });
    window.addEventListener('offline', () => handleNetworkError('Conexão perdida'));
    window.addEventListener('online', () => handleNetworkError('Conexão restaurada'));

    // Monitora erros de performance
    if (window.performance) {
      const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'resource' && entry.duration > 5000) {
            const error: CustomErrorEvent = {
              message: `Recurso carregado muito lentamente: ${entry.name}`,
              timestamp: new Date(),
              type: 'runtime',
            };
            setErrors(prev => [...prev, error]);
            logger.error('Erro de performance:', new Error(error.message), {
              type: error.type,
            });
          }
        });
      });

      observer.observe({ entryTypes: ['resource'] });
    }

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', event => {
        const error =
          event.reason instanceof Error ? event.reason : new Error(String(event.reason));
        handleReactError(error);
      });
      window.removeEventListener('offline', () => handleNetworkError('Conexão perdida'));
      window.removeEventListener('online', () => handleNetworkError('Conexão restaurada'));
    };
  }, []);

  // Renderiza o painel de erros apenas em desenvolvimento
  if (process.env.NODE_ENV === 'development' && errors.length > 0) {
    return (
      <div className="fixed bottom-0 right-0 w-96 h-64 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 overflow-auto">
        <h3 className="text-red-800 font-semibold mb-2">Erros Detectados</h3>
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="text-sm">
              <p className="text-red-600">{error.message}</p>
              <p className="text-gray-500 text-xs">
                {error.timestamp.toLocaleTimeString()} - {error.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
