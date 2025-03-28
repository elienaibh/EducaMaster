import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from './logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

interface ErrorContext {
  componentName?: string;
  userId?: string;
  requestId?: string;
  url?: string;
  timestamp: Date;
}

class ErrorMonitoring {
  private static instance: ErrorMonitoring;
  private context: ErrorContext = {
    timestamp: new Date(),
  };

  private constructor() {
    this.setupErrorHandlers();
  }

  public static getInstance(): ErrorMonitoring {
    if (!ErrorMonitoring.instance) {
      ErrorMonitoring.instance = new ErrorMonitoring();
    }
    return ErrorMonitoring.instance;
  }

  public setContext(context: Partial<ErrorContext>): void {
    this.context = {
      ...this.context,
      ...context,
      timestamp: new Date(),
    };
  }

  private setupErrorHandlers(): void {
    if (typeof window === 'undefined') {
      // Ambiente Node.js
      if (process && typeof process.on === 'function') {
        process.on('uncaughtException', (error: Error) => {
          void this.handleError(error, 'uncaughtException').finally(() => {
            process.exit(1);
          });
        });

        process.on('unhandledRejection', (reason: unknown) => {
          void this.handleError(
            reason instanceof Error ? reason : new Error(String(reason)),
            'unhandledRejection'
          );
        });
      }
    } else {
      // Ambiente Browser
      window.addEventListener('error', (event: ErrorEvent) => {
        void this.handleError(event.error, 'window.error');
      });

      window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
        void this.handleError(
          event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
          'unhandledrejection'
        );
      });
    }
  }

  private async handleError(
    error: Error,
    source: string,
    additionalContext?: Record<string, unknown>
  ): Promise<void> {
    const errorContext = {
      ...this.context,
      ...additionalContext,
      source,
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack,
    };

    try {
      await logger.error(`Erro capturado em ${source}:`, error, errorContext);
    } catch (logError) {
      console.error('Falha ao registrar erro:', logError);
    }
  }

  public async captureError(
    error: Error,
    source: string,
    additionalContext?: Record<string, unknown>
  ): Promise<void> {
    await this.handleError(error, source, additionalContext);
  }
}

export const errorMonitoring = ErrorMonitoring.getInstance();

export class ErrorBoundary extends Component<Props, State> {
  public static displayName = 'ErrorBoundary';

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    void errorMonitoring.captureError(error, 'componentDidCatch', {
      componentStack: errorInfo.componentStack,
    });
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Ops! Algo deu errado
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Desculpe pelo inconveniente. Por favor, tente recarregar a página.
              </p>
            </div>
            <div className="mt-8 space-y-6">
              <button
                onClick={() => window.location.reload()}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Recarregar Página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
