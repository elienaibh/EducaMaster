import * as globModule from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { logger } from '../src/lib/logger';

interface TypeReplacement {
  file: string;
  line: number;
  original: string;
  replacement: string;
}

async function fixTypes() {
  try {
    logger.info('Iniciando correção de tipos...');

    const files = globModule.glob.sync('src/**/*.{ts,tsx}');
    const replacements: TypeReplacement[] = [];

    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line: string, index: number) => {
        // Verifica tipos any
        if (line.includes(': any') || line.includes('(any)') || line.includes('any[]')) {
          const anyReplacements = [
            { pattern: /: any/g, replace: ': unknown' },
            { pattern: /\(any\)/g, replace: '(unknown)' },
            { pattern: /any\[\]/g, replace: 'unknown[]' },
          ];

          anyReplacements.forEach(({ pattern, replace }) => {
            if (pattern.test(line)) {
              replacements.push({
                file,
                line: index + 1,
                original: line,
                replacement: line.replace(pattern, replace),
              });
            }
          });
        }
      });
    }

    // Aplica as correções
    for (const replacement of replacements) {
      const content = readFileSync(replacement.file, 'utf-8');
      const lines = content.split('\n');
      lines[replacement.line - 1] = replacement.replacement;
      writeFileSync(replacement.file, lines.join('\n'), 'utf-8');
      logger.info(`Tipo corrigido em ${replacement.file}:${replacement.line}`);
    }

    logger.info('Correção de tipos concluída com sucesso!');
  } catch (error) {
    logger.error(
      'Erro ao corrigir tipos:',
      error instanceof Error ? error : new Error(String(error))
    );
    process.exit(1);
  }
}

fixTypes();
