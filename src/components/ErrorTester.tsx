'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';
import { errorMonitoring } from '@/lib/error-monitoring';

function ErrorTesterComponent() {
  const [count, setCount] = useState<number>(0);

  const testError = () => {
    try {
      // Gerar um erro proposital
      throw new Error('Erro de teste');
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Erro capturado no testError', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
        errorMonitoring.captureError(error, 'ErrorTester');
      }
    }
  };

  const testPromiseError = () => {
    // Gerar um erro de promessa não tratada
    Promise.reject(new Error('Erro de promessa não tratada'));
  };

  const testConsoleError = () => {
    console.error('Teste de erro no console');
  };

  const testStateError = () => {
    // Tentar atualizar um estado com um valor inválido
    setCount(0);
  };

  // Apenas em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Testador de Erros</h2>
      <div className="space-x-4">
        <Button onClick={testError}>Testar Erro</Button>
        <Button onClick={testPromiseError}>Testar Erro de Promessa</Button>
        <Button onClick={testConsoleError}>Testar Erro no Console</Button>
        <Button onClick={testStateError}>Testar Erro de Estado</Button>
      </div>
      <div>Contador: {count}</div>
    </div>
  );
}

export const ErrorTester = ErrorTesterComponent;
