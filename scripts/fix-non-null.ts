import * as globModule from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { logger } from '../src/lib/logger';

interface NonNullAssertion {
  file: string;
  line: number;
  expression: string;
}

async function fixNonNull() {
  try {
    logger.info('Iniciando correção de asserções não nulas...');

    const files = globModule.glob.sync('src/**/*.{ts,tsx}');
    const nonNullAssertions: NonNullAssertion[] = [];

    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line: string, index: number) => {
        // Verifica asserções não nulas
        const match = line.match(/([^!]+)!([^=!]|$)/);
        if (match) {
          const expression = match[1].trim();
          // Ignora casos onde a exclamação é parte de uma string ou comentário
          if (!/['"].*!.*['"]/.test(line) && !line.trim().startsWith('//')) {
            nonNullAssertions.push({
              file,
              line: index + 1,
              expression,
            });
          }
        }
      });
    }

    // Aplica as correções
    for (const assertion of nonNullAssertions) {
      const content = readFileSync(assertion.file, 'utf-8');
      const lines = content.split('\n');
      const line = lines[assertion.line - 1];

      // Substitui a asserção não nula por uma verificação segura
      const safeExpression = assertion.expression.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const replacement = line.replace(
        new RegExp(`${safeExpression}!`, 'g'),
        `(${assertion.expression} ?? (() => { throw new Error('Valor não pode ser nulo') })())`
      );

      lines[assertion.line - 1] = replacement;
      writeFileSync(assertion.file, lines.join('\n'), 'utf-8');
      logger.info(`Asserção não nula corrigida em ${assertion.file}:${assertion.line}`);
    }

    logger.info('Correção de asserções não nulas concluída com sucesso!');
  } catch (error) {
    logger.error(
      'Erro ao corrigir asserções não nulas:',
      error instanceof Error ? error : new Error(String(error))
    );
    process.exit(1);
  }
}

fixNonNull();
