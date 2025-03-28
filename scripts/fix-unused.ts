import * as globModule from 'glob';
import { readFileSync, writeFileSync } from 'fs';
import { logger } from '../src/lib/logger';

interface UnusedVariable {
  file: string;
  line: number;
  variable: string;
  type: 'import' | 'parameter' | 'variable';
}

async function fixUnused() {
  try {
    logger.info('Iniciando correção de variáveis não utilizadas...');

    const files = globModule.glob.sync('src/**/*.{ts,tsx}');
    const unusedVars: UnusedVariable[] = [];

    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line: string, index: number) => {
        // Verifica imports não utilizados
        if (line.startsWith('import')) {
          const match = line.match(/import\s+{\s*([^}]+)\s*}\s+from/);
          if (match) {
            const imports = match[1].split(',').map((i: string) => i.trim());
            imports.forEach((imp: string) => {
              if (!content.includes(imp) || content.indexOf(imp) === content.indexOf(line)) {
                unusedVars.push({
                  file,
                  line: index + 1,
                  variable: imp,
                  type: 'import',
                });
              }
            });
          }
        }

        // Verifica parâmetros não utilizados
        const paramMatch = line.match(/\(([^)]+)\)/);
        if (paramMatch) {
          const params = paramMatch[1].split(',').map((p: string) => p.trim());
          params.forEach((param: string) => {
            const varName = param.split(':')[0].trim();
            if (!content.includes(varName) || content.indexOf(varName) === content.indexOf(line)) {
              unusedVars.push({
                file,
                line: index + 1,
                variable: varName,
                type: 'parameter',
              });
            }
          });
        }

        // Verifica variáveis não utilizadas
        const varMatch = line.match(/(?:const|let|var)\s+([^=]+)\s*=/);
        if (varMatch) {
          const varName = varMatch[1].trim();
          if (!content.includes(varName) || content.indexOf(varName) === content.indexOf(line)) {
            unusedVars.push({
              file,
              line: index + 1,
              variable: varName,
              type: 'variable',
            });
          }
        }
      });
    }

    // Aplica as correções
    for (const unused of unusedVars) {
      const content = readFileSync(unused.file, 'utf-8');
      const lines = content.split('\n');
      const line = lines[unused.line - 1];

      if (unused.type === 'import') {
        // Remove o import não utilizado
        lines[unused.line - 1] = '';
      } else if (unused.type === 'parameter') {
        // Adiciona underscore antes do parâmetro não utilizado
        lines[unused.line - 1] = line.replace(
          new RegExp(`\\b${unused.variable}\\b`),
          `_${unused.variable}`
        );
      } else if (unused.type === 'variable') {
        // Remove a declaração da variável não utilizada
        lines[unused.line - 1] = '';
      }

      writeFileSync(unused.file, lines.join('\n'), 'utf-8');
      logger.info(`Variável não utilizada corrigida em ${unused.file}:${unused.line}`);
    }

    logger.info('Correção de variáveis não utilizadas concluída com sucesso!');
  } catch (error) {
    logger.error(
      'Erro ao corrigir variáveis não utilizadas:',
      error instanceof Error ? error : new Error(String(error))
    );
    process.exit(1);
  }
}

fixUnused();
