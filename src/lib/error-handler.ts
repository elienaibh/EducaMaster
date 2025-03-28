import { logger } from './logger';
import { errorMonitoring } from './error-monitoring';

// Capturar erros não tratados
if (typeof window === 'undefined') {
  // Verifica se estamos no ambiente Node.js (não Edge Runtime)
  if (process && typeof process.on === 'function') {
    process.on('uncaughtException', (error: Error) => {
      logger.error('Erro não tratado (Node.js)', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason: unknown) => {
      logger.error(
        'Promise rejeitada não tratada',
        reason instanceof Error ? reason : new Error(String(reason))
      );
    });
  }
} else {
  window.addEventListener('error', (event: ErrorEvent) => {
    logger.error('Erro não tratado (Browser)', event.error);
  });

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    logger.error(
      'Promise rejeitada não tratada (Browser)',
      event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    );
  });
}

// Configurar o contexto inicial do monitoramento de erros
if (typeof window !== 'undefined') {
  errorMonitoring.setContext({
    url: window.location.href,
  });
}

// Exportar uma função para atualizar o contexto do monitoramento de erros
export const updateErrorContext = (context: Record<string, unknown>) => {
  errorMonitoring.setContext(context);
};
