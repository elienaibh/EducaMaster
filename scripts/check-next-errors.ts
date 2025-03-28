import { execSync } from 'child_process';
import { logger } from '@/lib/logger';
import { readFileSync } from 'fs';
import { join } from 'path';
import glob from 'glob';

interface NextError {
  type: 'hydration' | 'build' | 'runtime' | 'api';
  message: string;
  file?: string;
  line?: number;
}

async function checkNextErrors() {
  try {
    const errors: NextError[] = [];

    // Verifica erros de build
    logger.info('Verificando erros de build...');
    try {
      execSync('next build', { stdio: 'pipe' });
    } catch (error) {
      const buildError = error as Error;
      errors.push({
        type: 'build',
        message: buildError.message,
      });
    }

    // Verifica erros de API
    logger.info('Verificando erros de API...');
    const apiFiles = glob.sync('src/app/api/**/*.ts');
    for (const file of apiFiles) {
      const content = readFileSync(file, 'utf-8');

      // Verifica uso de res.json() sem await
      if (content.includes('res.json(') && !content.includes('await res.json(')) {
        errors.push({
          type: 'api',
          message: 'Possível erro de API: res.json() sem await',
          file,
        });
      }

      // Verifica tratamento de erros
      if (!content.includes('try/catch')) {
        errors.push({
          type: 'api',
          message: 'API sem tratamento de erros',
          file,
        });
      }
    }

    // Verifica erros de hidratação
    logger.info('Verificando erros de hidratação...');
    const pageFiles = glob.sync('src/app/**/*.tsx');
    for (const file of pageFiles) {
      const content = readFileSync(file, 'utf-8');

      // Verifica uso de useEffect sem dependências
      if (content.includes('useEffect(() => {') && !content.includes('useEffect(() => {[')) {
        errors.push({
          type: 'hydration',
          message: 'Possível erro de hidratação: useEffect sem dependências',
          file,
        });
      }

      // Verifica uso de useState em componentes do servidor
      if (content.includes('useState') && !content.includes('use client')) {
        errors.push({
          type: 'hydration',
          message: 'Uso de useState em componente do servidor',
          file,
        });
      }

      // Verifica uso de hooks em componentes do servidor
      const hooks = ['useEffect', 'useRef', 'useMemo', 'useCallback', 'useContext'];
      for (const hook of hooks) {
        if (content.includes(hook) && !content.includes('use client')) {
          errors.push({
            type: 'hydration',
            message: `Uso de ${hook} em componente do servidor`,
            file,
          });
        }
      }
    }

    // Verifica erros de runtime
    logger.info('Verificando erros de runtime...');
    const componentFiles = glob.sync('src/components/**/*.tsx');
    for (const file of componentFiles) {
      const content = readFileSync(file, 'utf-8');

      // Verifica uso de window/document sem verificação
      if (content.includes('window.') || content.includes('document.')) {
        if (!content.includes('typeof window !== "undefined"')) {
          errors.push({
            type: 'runtime',
            message: 'Uso de window/document sem verificação de ambiente',
            file,
          });
        }
      }

      // Verifica uso de localStorage/sessionStorage sem verificação
      if (content.includes('localStorage.') || content.includes('sessionStorage.')) {
        if (!content.includes('typeof window !== "undefined"')) {
          errors.push({
            type: 'runtime',
            message: 'Uso de localStorage/sessionStorage sem verificação de ambiente',
            file,
          });
        }
      }
    }

    // Reporta erros encontrados
    if (errors.length > 0) {
      logger.warn('Erros encontrados:', { errors });
      process.exit(1);
    } else {
      logger.info('Nenhum erro encontrado!');
    }
  } catch (error) {
    logger.error(
      'Erro ao verificar erros do Next.js:',
      error instanceof Error ? error : new Error(String(error))
    );
    process.exit(1);
  }
}

checkNextErrors();
